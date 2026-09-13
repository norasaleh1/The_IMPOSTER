import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import db, { initDB } from './db.js';
import { CASES } from './casesData.js';
import { askAIDetective } from './geminiService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend assets if built
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Initialize SQLite Database schema
initDB();

// Helper: Calculate detective rank
function calculateDetectiveRank(score, accuracy, attemptsUsed, hintsUsed) {
  if (score >= 1350 && attemptsUsed === 1 && hintsUsed <= 1) return 'Master Detective';
  if (score >= 1150 && attemptsUsed <= 2) return 'Elite Detective';
  if (score >= 950) return 'Senior Investigator';
  if (score >= 750) return 'Sharp Investigator';
  if (score >= 500) return 'Junior Detective';
  return 'Rookie Investigator';
}

// 1. GET /api/cases - List all cases
app.get('/api/cases', (req, res) => {
  try {
    const list = CASES.map(c => ({
      id: c.id,
      caseNumber: c.caseNumber,
      title: c.title,
      location: c.location,
      timeOfIncident: c.timeOfIncident,
      difficulty: c.difficulty,
      estimatedTime: c.estimatedTime,
      briefing: c.briefing,
      suspectCount: c.suspects.length,
      evidenceCount: c.evidence.length
    }));
    res.json({ success: true, cases: list });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. GET /api/cases/:id - Get specific case details
app.get('/api/cases/:id', (req, res) => {
  try {
    const caseData = CASES.find(c => c.id === req.params.id);
    if (!caseData) return res.status(404).json({ success: false, error: 'Case not found' });
    
    // Return case without directly revealing solution
    const sanitizedCase = {
      ...caseData,
      solution: undefined
    };
    res.json({ success: true, case: sanitizedCase });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. POST /api/sessions - Start new game session
app.post('/api/sessions', (req, res) => {
  try {
    const { playerName, caseId } = req.body;
    if (!playerName || !caseId) {
      return res.status(400).json({ success: false, error: 'Player name and Case ID are required' });
    }

    const currentCase = CASES.find(c => c.id === caseId);
    if (!currentCase) {
      return res.status(404).json({ success: false, error: 'Case not found' });
    }

    const playerId = 'plyr-' + uuidv4().slice(0, 8);
    const sessionId = 'sess-' + uuidv4().slice(0, 8);

    // Save player
    db.prepare('INSERT INTO players (id, name) VALUES (?, ?)').run(playerId, playerName.trim());

    // Initial session state
    const initialEvidence = currentCase.initialDiscoveredEvidence || [];
    const sessionRecord = {
      id: sessionId,
      player_id: playerId,
      player_name: playerName.trim(),
      case_id: caseId,
      status: 'IN_PROGRESS',
      score: 1000,
      attempts_left: 3,
      hints_used: 0,
      ai_consultations: 0,
      notes: '',
      suspicion_data: JSON.stringify({}),
      discovered_evidence: JSON.stringify(initialEvidence),
      unlocked_questions: JSON.stringify([]),
      reviewed_suspects: JSON.stringify([]),
      interrogated_suspects: JSON.stringify([]),
      interrogation_logs: JSON.stringify([]),
      connections: JSON.stringify([]),
      start_time: Date.now(),
      completed_at: null
    };

    db.prepare(`
      INSERT INTO sessions (
        id, player_id, player_name, case_id, status, score, attempts_left,
        hints_used, ai_consultations, notes, suspicion_data, discovered_evidence,
        unlocked_questions, reviewed_suspects, interrogated_suspects, interrogation_logs,
        connections, start_time, completed_at
      ) VALUES (
        @id, @player_id, @player_name, @case_id, @status, @score, @attempts_left,
        @hints_used, @ai_consultations, @notes, @suspicion_data, @discovered_evidence,
        @unlocked_questions, @reviewed_suspects, @interrogated_suspects, @interrogation_logs,
        @connections, @start_time, @completed_at
      )
    `).run(sessionRecord);

    res.json({
      success: true,
      sessionId,
      session: {
        ...sessionRecord,
        suspicion_data: {},
        discovered_evidence: initialEvidence,
        unlocked_questions: [],
        reviewed_suspects: [],
        interrogated_suspects: [],
        interrogation_logs: [],
        connections: []
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. GET /api/sessions/:id - Get session details
app.get('/api/sessions/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM sessions WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ success: false, error: 'Session not found' });

    const session = {
      ...row,
      suspicion_data: JSON.parse(row.suspicion_data || '{}'),
      discovered_evidence: JSON.parse(row.discovered_evidence || '[]'),
      unlocked_questions: JSON.parse(row.unlocked_questions || '[]'),
      reviewed_suspects: JSON.parse(row.reviewed_suspects || '[]'),
      interrogated_suspects: JSON.parse(row.interrogated_suspects || '[]'),
      interrogation_logs: JSON.parse(row.interrogation_logs || '[]'),
      connections: JSON.parse(row.connections || '[]')
    };

    res.json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. POST /api/sessions/:id/action - Perform investigation actions
app.post('/api/sessions/:id/action', (req, res) => {
  try {
    const { actionType, payload } = req.body;
    const row = db.prepare('SELECT * FROM sessions WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ success: false, error: 'Session not found' });

    const currentCase = CASES.find(c => c.id === row.case_id);
    if (!currentCase) return res.status(404).json({ success: false, error: 'Case not found' });

    let score = row.score;
    let suspicionData = JSON.parse(row.suspicion_data || '{}');
    let discoveredEvidence = JSON.parse(row.discovered_evidence || '[]');
    let unlockedQuestions = JSON.parse(row.unlocked_questions || '[]');
    let reviewedSuspects = JSON.parse(row.reviewed_suspects || '[]');
    let interrogatedSuspects = JSON.parse(row.interrogated_suspects || '[]');
    let interrogationLogs = JSON.parse(row.interrogation_logs || '[]');
    let connections = JSON.parse(row.connections || '[]');
    let notes = row.notes || '';
    let hintsUsed = row.hints_used || 0;

    let responseMessage = 'Action recorded';

    switch (actionType) {
      case 'REVIEW_SUSPECT': {
        const { suspectId } = payload;
        if (!reviewedSuspects.includes(suspectId)) {
          reviewedSuspects.push(suspectId);
          score += 25; // discovery points
        }
        break;
      }

      case 'REVIEW_EVIDENCE': {
        const { evidenceId } = payload;
        if (!discoveredEvidence.includes(evidenceId)) {
          discoveredEvidence.push(evidenceId);
          score += 50; // evidence discovery points
        }
        // Check if reviewing this evidence unlocks questions
        currentCase.suspects.forEach(sus => {
          (sus.unlockedQuestions || []).forEach(uq => {
            if (uq.triggerEvidenceId === evidenceId && !unlockedQuestions.includes(uq.id)) {
              unlockedQuestions.push(uq.id);
            }
          });
        });
        break;
      }

      case 'ASK_QUESTION': {
        const { suspectId, questionId, questionText, answerText } = payload;
        if (!interrogatedSuspects.includes(suspectId)) {
          interrogatedSuspects.push(suspectId);
        }
        interrogationLogs.push({
          suspectId,
          questionId,
          question: questionText,
          answer: answerText,
          timestamp: Date.now()
        });
        score += 30; // interrogation progress points

        // Find the specific question asked
        const suspectObj = currentCase.suspects.find(s => s.id === suspectId);
        let askedQ = null;
        if (suspectObj) {
          askedQ = (suspectObj.initialQuestions || []).find(q => q.id === questionId) ||
                   (suspectObj.unlockedQuestions || []).find(uq => uq.id === questionId);
        }

        // Only unlock evidence explicitly attached to this question
        if (askedQ && askedQ.unlocksEvidenceId) {
          const evIdToUnlock = askedQ.unlocksEvidenceId;
          if (!discoveredEvidence.includes(evIdToUnlock)) {
            discoveredEvidence.push(evIdToUnlock);
            score += 50; // New clue discovery bonus
            responseMessage = 'Critical Clue Discovered through Interrogation!';
            // Check if this newly unlocked evidence triggers any suspect unlocked questions
            currentCase.suspects.forEach(sus => {
              (sus.unlockedQuestions || []).forEach(uq => {
                if (uq.triggerEvidenceId === evIdToUnlock && !unlockedQuestions.includes(uq.id)) {
                  unlockedQuestions.push(uq.id);
                }
              });
            });
          }
        }
        break;
      }

      case 'ADD_CONNECTION': {
        const { itemA, itemB, type, customExplanation } = payload;
        // Check if this connection matches a valid case contradiction
        const match = currentCase.validConnections.find(
          vc => (vc.itemA === itemA && vc.itemB === itemB) || (vc.itemA === itemB && vc.itemB === itemA)
        );

        const newConn = {
          id: 'conn-' + Date.now(),
          itemA,
          itemB,
          type: match ? match.type : (type || 'Contradiction'),
          explanation: match ? match.explanation : (customExplanation || 'Investigator note connection'),
          isValidContradiction: !!match
        };

        connections.push(newConn);
        if (match) {
          score += 150; // Contradiction discovered bonus!
          responseMessage = 'Valid Contradiction Identified! +150 Points';

          // If this valid connection unlocks a breakthrough evidence item
          if (match.unlocksEvidenceId && !discoveredEvidence.includes(match.unlocksEvidenceId)) {
            discoveredEvidence.push(match.unlocksEvidenceId);
            currentCase.suspects.forEach(sus => {
              (sus.unlockedQuestions || []).forEach(uq => {
                if (uq.triggerEvidenceId === match.unlocksEvidenceId && !unlockedQuestions.includes(uq.id)) {
                  unlockedQuestions.push(uq.id);
                }
              });
            });
          }
        } else {
          score += 30; // General connection points
          responseMessage = 'Connection recorded on Board';
        }
        break;
      }

      case 'UPDATE_SUSPICION': {
        const { suspectId, level } = payload;
        suspicionData[suspectId] = level;
        break;
      }

      case 'UPDATE_NOTES': {
        const { text } = payload;
        notes = text;
        break;
      }

      default:
        break;
    }

    // Save updated session state
    db.prepare(`
      UPDATE sessions SET
        score = ?,
        suspicion_data = ?,
        discovered_evidence = ?,
        unlocked_questions = ?,
        reviewed_suspects = ?,
        interrogated_suspects = ?,
        interrogation_logs = ?,
        connections = ?,
        notes = ?
      WHERE id = ?
    `).run(
      score,
      JSON.stringify(suspicionData),
      JSON.stringify(discoveredEvidence),
      JSON.stringify(unlockedQuestions),
      JSON.stringify(reviewedSuspects),
      JSON.stringify(interrogatedSuspects),
      JSON.stringify(interrogationLogs),
      JSON.stringify(connections),
      notes,
      req.params.id
    );

    res.json({
      success: true,
      message: responseMessage,
      session: {
        ...row,
        score,
        suspicion_data: suspicionData,
        discovered_evidence: discoveredEvidence,
        unlocked_questions: unlockedQuestions,
        reviewed_suspects: reviewedSuspects,
        interrogated_suspects: interrogatedSuspects,
        interrogation_logs: interrogationLogs,
        connections,
        notes
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. POST /api/sessions/:id/ai-consult - AI Detective Assistant
app.post('/api/sessions/:id/ai-consult', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ success: false, error: 'Question is required' });

    const row = db.prepare('SELECT * FROM sessions WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ success: false, error: 'Session not found' });

    const currentCase = CASES.find(c => c.id === row.case_id);
    if (!currentCase) return res.status(404).json({ success: false, error: 'Case not found' });

    const discoveredEvidence = JSON.parse(row.discovered_evidence || '[]');
    const reviewedSuspects = JSON.parse(row.reviewed_suspects || '[]');
    const connections = JSON.parse(row.connections || '[]');
    const notes = row.notes || '';

    // Apply minor AI consultation score deduction per BRD
    const aiConsultations = (row.ai_consultations || 0) + 1;
    const score = Math.max(100, row.score - 40);

    const aiResult = await askAIDetective({
      question,
      currentCase,
      discoveredEvidence,
      reviewedSuspects,
      connections,
      notes
    });

    db.prepare('UPDATE sessions SET ai_consultations = ?, score = ? WHERE id = ?').run(
      aiConsultations,
      score,
      req.params.id
    );

    res.json({
      success: true,
      reply: aiResult.reply,
      source: aiResult.source,
      aiConsultations,
      score
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. POST /api/sessions/:id/accuse - Final Accusation Terminal
app.post('/api/sessions/:id/accuse', (req, res) => {
  try {
    const { suspectId, contradictionId, supportingEvidenceId } = req.body;
    const row = db.prepare('SELECT * FROM sessions WHERE id = ?').get(req.params.id);
    if (!row) return res.status(404).json({ success: false, error: 'Session not found' });

    const currentCase = CASES.find(c => c.id === row.case_id);
    if (!currentCase) return res.status(404).json({ success: false, error: 'Case not found' });

    let attemptsLeft = row.attempts_left - 1;
    let score = row.score;
    const isCorrectSuspect = (suspectId === currentCase.solution.culpritId);
    const durationSeconds = Math.max(10, Math.floor((Date.now() - row.start_time) / 1000));
    const attemptsUsed = 3 - attemptsLeft;

    if (isCorrectSuspect) {
      // VICTORY!
      const firstTryBonus = attemptsUsed === 1 ? 300 : (attemptsUsed === 2 ? 100 : 0);
      const timeBonus = durationSeconds < 300 ? 200 : (durationSeconds < 600 ? 100 : 0);
      const finalScore = score + 500 + firstTryBonus + timeBonus;
      const accuracy = attemptsUsed === 1 ? 100 : (attemptsUsed === 2 ? 80 : 60);
      const rank = calculateDetectiveRank(finalScore, accuracy, attemptsUsed, row.hints_used);

      const completedAt = Date.now();

      // Update session to SOLVED
      db.prepare(`
        UPDATE sessions SET
          status = 'SOLVED',
          score = ?,
          attempts_left = ?,
          completed_at = ?
        WHERE id = ?
      `).run(finalScore, attemptsLeft, completedAt, req.params.id);

      // Record to Leaderboard
      const lbId = 'lb-' + uuidv4().slice(0, 8);
      db.prepare(`
        INSERT INTO leaderboard (
          id, session_id, player_name, case_id, score, rank,
          duration_seconds, accuracy, attempts_used, hints_used, ai_consultations
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        lbId,
        row.id,
        row.player_name,
        row.case_id,
        finalScore,
        rank,
        durationSeconds,
        accuracy,
        attemptsUsed,
        row.hints_used,
        row.ai_consultations
      );

      const finalReport = {
        caseNumber: currentCase.caseNumber,
        caseTitle: currentCase.title,
        status: 'CASE CLOSED',
        isSuccess: true,
        culprit: currentCase.solution.culpritName,
        motive: currentCase.solution.motive,
        criticalContradiction: currentCase.solution.criticalContradiction,
        closingNarrative: currentCase.solution.closingNarrative,
        playerName: row.player_name,
        finalScore,
        rank,
        durationSeconds,
        accuracy,
        attemptsUsed,
        hintsUsed: row.hints_used,
        aiConsultations: row.ai_consultations
      };

      return res.json({
        success: true,
        solved: true,
        attemptsLeft,
        report: finalReport
      });
    } else {
      // INCORRECT ACCUSATION
      score = Math.max(100, score - 250);

      if (attemptsLeft <= 0) {
        // CASE FAILED
        db.prepare(`
          UPDATE sessions SET
            status = 'FAILED',
            score = ?,
            attempts_left = 0,
            completed_at = ?
          WHERE id = ?
        `).run(score, Date.now(), req.params.id);

        const failReport = {
          caseNumber: currentCase.caseNumber,
          caseTitle: currentCase.title,
          status: 'CASE FAILED',
          isSuccess: false,
          culprit: currentCase.solution.culpritName,
          motive: currentCase.solution.motive,
          criticalContradiction: currentCase.solution.criticalContradiction,
          closingNarrative: 'The investigation was derailed by false accusations. The true culprit slipped through the net.',
          playerName: row.player_name,
          finalScore: score,
          rank: 'Discredited Investigator',
          durationSeconds,
          accuracy: 0,
          attemptsUsed: 3,
          hintsUsed: row.hints_used,
          aiConsultations: row.ai_consultations
        };

        return res.json({
          success: true,
          solved: false,
          attemptsLeft: 0,
          report: failReport
        });
      } else {
        // ATTEMPTS REMAIN
        db.prepare('UPDATE sessions SET score = ?, attempts_left = ? WHERE id = ?').run(
          score,
          attemptsLeft,
          req.params.id
        );

        return res.json({
          success: true,
          solved: false,
          attemptsLeft,
          score,
          message: `Incorrect suspect! The suspect provided a corroborated alibi or lacked sufficient motive. You have ${attemptsLeft} attempt(s) remaining.`
        });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. GET /api/leaderboard - Global or Case-filtered Leaderboard
app.get('/api/leaderboard', (req, res) => {
  try {
    const { caseId } = req.query;
    let query = 'SELECT * FROM leaderboard';
    let params = [];
    if (caseId) {
      query += ' WHERE case_id = ?';
      params.push(caseId);
    }
    query += ' ORDER BY score DESC, duration_seconds ASC LIMIT 50';

    const entries = db.prepare(query).all(...params);
    res.json({ success: true, leaderboard: entries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. GET /api/health - Server health & environment check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    service: 'THE IMPOSTOR Game Backend',
    database: 'SQLite (WAL Active)',
    aiAvailable: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// SPA wildcard fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[THE IMPOSTOR Backend] Running on http://localhost:${PORT}`);
});

