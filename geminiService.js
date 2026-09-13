import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || '';
let genAI = null;
if (apiKey) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
  } catch (err) {
    console.warn('Failed to initialize GoogleGenerativeAI:', err.message);
  }
}

export async function askAIDetective({ question, currentCase, discoveredEvidence, reviewedSuspects, connections, timeline, notes }) {
  // Construct context strictly containing ONLY what the player has already discovered
  const discoveredEvidenceDetails = currentCase.evidence
    .filter(ev => discoveredEvidence.includes(ev.id))
    .map(ev => `• [${ev.type}] ${ev.title} (Time: ${ev.timestamp}): ${ev.summary} | Details: ${ev.details}`)
    .join('\n');

  const reviewedSuspectsDetails = currentCase.suspects
    .filter(s => reviewedSuspects.includes(s.id))
    .map(s => `• Suspect: ${s.name} (${s.role} - ${s.department}): Statement: "${s.statement}"`)
    .join('\n');

  const connectionsSummary = connections && connections.length > 0
    ? connections.map(c => `• Connection [${c.type}]: ${c.explanation || 'User link'}`).join('\n')
    : 'None established yet.';

  const systemInstructions = `You are AIDEN, an elite confidential AI Detective Assistant for THE IMPOSTOR investigation game.
You assist the player in solving "${currentCase.title}" (${currentCase.caseNumber}).

CRITICAL INVESTIGATION SAFETY GUARDRAILS (NEVER BREAK THESE):
1. NEVER reveal, name, or directly confirm the culprit.
2. NEVER mention, reveal, or hint at undiscovered evidence, unreviewed suspects, or facts not present in the DISCOVERED DATA below.
3. Your role is strictly to guide the detective's reasoning: point out discrepancies between timestamps, highlight gaps in statements, and advise which unlocked clues to cross-reference on the Investigation Board.
4. Keep your response concise (2-4 brief paragraphs or bullet points), suspenseful, immersive, and actionable.
5. Emphasize contradictions and timeline analysis without spoiling the final deduction.

DISCOVERED DATA ONLY:
--- CASE BRIEFING ---
${currentCase.briefing.headline}
${currentCase.briefing.summary}

--- DISCOVERED EVIDENCE ITEMS ---
${discoveredEvidenceDetails || 'No evidence items examined yet.'}

--- REVIEWED SUSPECTS & STATEMENTS ---
${reviewedSuspectsDetails || 'No suspects interrogated yet.'}

--- ESTABLISHED BOARD CONNECTIONS ---
${connectionsSummary}

--- DETECTIVE NOTES ---
${notes || 'No active notes.'}
`;

  // If Gemini API is available, invoke it
  if (genAI && apiKey) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `${systemInstructions}\n\nDetective's Question: "${question}"\n\nProvide your analysis and investigative recommendation:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      if (text && text.trim().length > 0) {
        return {
          source: 'gemini',
          reply: text.trim()
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, switching to heuristic detective engine:', err.message);
    }
  }

  // Smart Heuristic Fallback Engine
  return generateHeuristicAdvice({ question, currentCase, discoveredEvidence, reviewedSuspects, connections });
}

function generateHeuristicAdvice({ question, currentCase, discoveredEvidence, reviewedSuspects, connections }) {
  const qLower = question.toLowerCase();
  
  // Specific query matching
  if (qLower.includes('who') || qLower.includes('culprit') || qLower.includes('guilty') || qLower.includes('killer')) {
    return {
      source: 'heuristic',
      reply: `🛡️ **CONFIDENTIAL PROTOCOL**: As an AI Detective Assistant, I cannot directly name the culprit for you.

🔍 **Investigative Tip**: Compare the exact timestamps in your discovered access logs and timeline against each suspect's stated whereabouts. Look for someone who claimed to be somewhere else when an unauthorized action or log was recorded.`
    };
  }

  if (qLower.includes('contradiction') || qLower.includes('lying') || qLower.includes('connect') || qLower.includes('board')) {
    if (discoveredEvidence.length < 2) {
      return {
        source: 'heuristic',
        reply: `📋 **Analysis**: You need more evidence before a definitive contradiction emerges. Interrogate the available personnel to unlock restricted logs and forensic files.`
      };
    }
    return {
      source: 'heuristic',
      reply: `⚡ **Contradiction Analysis**:
• Look at the **timestamps** recorded in your available evidence versus the claims in suspect files.
• If a suspect claims an unbroken alibi (e.g., being in a server room, dining out, or at a card table), check if physical or electronic logs place their credentials or physical presence elsewhere.
• Pin both items on the **Investigation Board** to solidify the contradiction!`
    };
  }

  if (qLower.includes('timeline') || qLower.includes('time') || qLower.includes('when')) {
    return {
      source: 'heuristic',
      reply: `⏱️ **Chronological Focus**:
The critical incident occurred around **${currentCase.timeOfIncident}**. 
Review the timeline closely between 15 minutes before and 20 minutes after this marker. Focus on who claimed to be isolated without direct witness corroboration.`
    };
  }

  if (qLower.includes('evidence') || qLower.includes('what next') || qLower.includes('next') || qLower.includes('help')) {
    const undiscoveredCount = currentCase.evidence.length - discoveredEvidence.length;
    return {
      source: 'heuristic',
      reply: `🔎 **Tactical Recommendations**:
• You have cataloged **${discoveredEvidence.length}/${currentCase.evidence.length}** evidence items. (${undiscoveredCount} remain locked).
• **Action**: Interrogate suspects with pending questions. Confronting them with new findings will unlock critical physical and digital exhibits.
• Once you spot a clear conflict between a statement and a hard log, prepare your final accusation.`
    };
  }

  // General investigative guidance
  return {
    source: 'heuristic',
    reply: `🕵️ **AIDEN Tactical Guidance**:
I have reviewed your **${discoveredEvidence.length} discovered evidence items** and **${reviewedSuspects.length} suspect interviews**.
• Cross-reference each person's claimed alibi against electronic timestamps and security footage.
• Remember: Physical evidence and server logs don't lie, but someone's narrative definitely does.
• Establish links on the **Investigation Board** to unlock further leads before submitting your final accusation.`
  };
}
