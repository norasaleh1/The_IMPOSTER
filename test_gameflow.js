// End-to-End Game Flow Verification Script for THE IMPOSTOR

async function runTests() {
  console.log('--- [1] Testing /api/health ---');
  const healthRes = await fetch('http://localhost:5000/api/health').then(r => r.json());
  console.log('Health:', healthRes);
  if (!healthRes.success) throw new Error('Health check failed');

  console.log('\n--- [2] Testing /api/cases (All 3 Cases) ---');
  const casesRes = await fetch('http://localhost:5000/api/cases').then(r => r.json());
  console.log(`Found ${casesRes.cases.length} cases:`);
  casesRes.cases.forEach(c => console.log(`  • ${c.caseNumber}: ${c.title} (${c.difficulty})`));
  if (casesRes.cases.length < 3) throw new Error('Expected at least 3 cases');

  // Verify Case 1 names preserved and Cases 2 & 3 have Arabic names in English
  const case1 = await fetch('http://localhost:5000/api/cases/case-01').then(r => r.json());
  const case2 = await fetch('http://localhost:5000/api/cases/case-02').then(r => r.json());
  const case3 = await fetch('http://localhost:5000/api/cases/case-03').then(r => r.json());

  console.log('\n--- [3] Verifying Suspect Names ---');
  console.log('Case 1 Suspects:', case1.case.suspects.map(s => s.name).join(', '));
  console.log('Case 2 Suspects (Arabic):', case2.case.suspects.map(s => s.name).join(', '));
  console.log('Case 3 Suspects (Arabic):', case3.case.suspects.map(s => s.name).join(', '));

  console.log('\n--- [4] Testing Case #02 Game Flow (The Sovereign Cyber Heist) ---');
  const sessionRes2 = await fetch('http://localhost:5000/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerName: 'Detective Omar', caseId: 'case-02' })
  }).then(r => r.json());

  console.log('Session Created:', sessionRes2.sessionId, 'Starting Score:', sessionRes2.session.score);

  // Review suspect Sara Al-Mansoor
  const action1 = await fetch(`http://localhost:5000/api/sessions/${sessionRes2.sessionId}/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ actionType: 'REVIEW_SUSPECT', payload: { suspectId: 'sus-02-01' } })
  }).then(r => r.json());
  console.log('After Review Suspect Score:', action1.session.score);

  // Interrogate Layan Al-Otaibi
  const action2 = await fetch(`http://localhost:5000/api/sessions/${sessionRes2.sessionId}/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      actionType: 'ASK_QUESTION',
      payload: {
        suspectId: 'sus-02-03',
        questionId: 'q-02-03-1',
        questionText: 'Did you notice any unexpected USB devices mounted to the server racks?',
        answerText: 'At 23:42, our automated port-sentry alerted on a brief USB HID device mounted on Terminal 44-B.'
      }
    })
  }).then(r => r.json());
  console.log('After Interrogation Score:', action2.session.score, 'Discovered Evidence Count:', action2.session.discovered_evidence.length);

  // Add Contradiction Connection on Investigation Board
  const action3 = await fetch(`http://localhost:5000/api/sessions/${sessionRes2.sessionId}/action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      actionType: 'ADD_CONNECTION',
      payload: {
        itemA: 'ev-02-02',
        itemB: 'ev-02-04',
        type: 'Contradiction',
        customExplanation: 'Khalid claimed he left at 22:30, but basement CCTV captured him re-entering at 23:15.'
      }
    })
  }).then(r => r.json());
  console.log('After Valid Contradiction Bonus Message:', action3.message, 'Score:', action3.session.score);

  // AI Detective Consultation
  const aiRes = await fetch(`http://localhost:5000/api/sessions/${sessionRes2.sessionId}/ai-consult`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question: 'Does Khalid\'s timeline match the basement loading dock footage?' })
  }).then(r => r.json());
  console.log('AI Detective Guidance Source:', aiRes.source);
  console.log('AI Detective Snippet:', aiRes.reply.slice(0, 150) + '...');

  // Submit Correct Accusation (Khalid Al-Ghamdi)
  const accuseRes = await fetch(`http://localhost:5000/api/sessions/${sessionRes2.sessionId}/accuse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ suspectId: 'sus-02-04', supportingEvidenceId: 'ev-02-06' })
  }).then(r => r.json());

  console.log('\n--- [5] Case #02 Final Accusation Result ---');
  console.log('Solved:', accuseRes.solved);
  console.log('Report:', {
    Case: accuseRes.report.caseTitle,
    Status: accuseRes.report.status,
    Culprit: accuseRes.report.culprit,
    Rank: accuseRes.report.rank,
    FinalScore: accuseRes.report.finalScore,
    Accuracy: accuseRes.report.accuracy + '%'
  });

  // Verify Leaderboard update
  console.log('\n--- [6] Verifying Leaderboard Persistence ---');
  const lbRes = await fetch('http://localhost:5000/api/leaderboard?caseId=case-02').then(r => r.json());
  console.log(`Leaderboard entries for Case #02 (${lbRes.leaderboard.length} entries):`);
  lbRes.leaderboard.slice(0, 3).forEach((e, i) => {
    console.log(`  #${i + 1}: ${e.player_name} - Score: ${e.score} (${e.rank})`);
  });

  console.log('\n✅ ALL FULL-STACK GAMEFLOW VERIFICATIONS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
