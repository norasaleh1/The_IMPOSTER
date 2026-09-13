<p align="center">
  <img src="logo.png" alt="THE IMPOSTOR Logo" width="300">
</p>


#  THE IMPOSTOR
### An AI-Powered Full-Stack Detective Investigation Game

**THE IMPOSTOR** is an interactive detective game where players step into the role of an investigator, examine evidence, interrogate suspects, uncover contradictions, and solve confidential criminal cases.

Built as a full-stack web application, the project combines investigation gameplay with persistent data, interactive case mechanics, and an AI detective assistant powered by Google Gemini.

> **Observe carefully. Question everything. Trust the evidence. Find the impostor.**

---

##  About the Game

Each case begins with an incident briefing and a group of suspects.

The investigator must explore the available evidence, interrogate suspects, reconstruct the timeline, connect clues on the investigation board, and determine who is responsible.

But accusations have consequences — players have limited attempts, and their final performance determines their investigation score and rank.

---

##  Confidential Case Files

The game currently contains **three complete investigations**:

### Case #01 — The Missing Dossier

A confidential dossier disappears from a secure cybernetics laboratory vault.

### Case #02 — The Sovereign Cyber Heist

A sophisticated FinTech heist takes place on the 44th floor, leaving investigators with digital evidence and conflicting stories.

### Case #03 — The Stolen Heirloom

During a wedding at Al-Yamamah, a valuable royal emerald necklace suddenly disappears.

Every case includes its own suspects, evidence, timeline, interrogations, contradictions, and final solution.

---

##  Key Features

###  Interactive Interrogation Room

Question suspects and unlock new confrontation options as the investigation progresses.

###  Evidence Locker & Forensics

Inspect digital logs, CCTV records, forensic findings, and other evidence collected during each case.

###  Investigation Board

Connect suspects and clues using an interactive investigation board to discover relationships and contradictions.

Correct connections can earn bonus investigation points.

###  Case Timeline

Compare verified timestamps with suspect statements to identify inconsistencies in their stories.

###  AI Detective Assistant — AIDEN

An integrated detective assistant powered by the **Google Gemini API** helps investigators reason about the case without directly revealing the solution.

If Gemini is unavailable, the game can continue using its built-in heuristic fallback system.

###  Accusation System

When enough evidence has been collected, investigators can submit their final accusation.

Players receive limited attempts, making every decision important.

###  Scoring & Investigator Ranking

Performance is evaluated based on investigation accuracy and player decisions.

###  Hall of Fame

Completed investigations and scores are stored using SQLite and displayed through a persistent leaderboard.

###  Procedural Audio

The game includes dynamically generated sound effects such as typewriter sounds, clue notifications, and victory effects using the Web Audio API.

No external audio files are required.

---

##  Tech Stack

| Layer             | Technologies               |
| ----------------- | -------------------------- |
| Frontend          | React 19, TypeScript, Vite |
| Backend           | Node.js, Express.js        |
| Database          | SQLite                     |
| AI                | Google Gemini API          |
| UI                | Lucide React               |
| Effects           | Canvas Confetti            |
| Audio             | Web Audio API              |
| API Communication | REST API                   |

---

##  Investigation Flow

```text
CASE BRIEFING
      ↓
REVIEW SUSPECTS
      ↓
INTERROGATION
      ↓
COLLECT EVIDENCE
      ↓
ANALYZE TIMELINE
      ↓
CONNECT CLUES
      ↓
CONSULT AIDEN
      ↓
FINAL ACCUSATION
      ↓
SCORE & INVESTIGATOR RANK
```

---

##  What Makes THE IMPOSTOR Different?

Rather than presenting the player with a simple sequence of questions, **THE IMPOSTOR** creates an investigation environment where information is distributed across multiple systems.

Players must actively combine:

* suspect statements
* physical and digital evidence
* forensic findings
* timestamps
* contradictions
* clue relationships
* AI-assisted reasoning

The goal is not simply to guess the culprit — it is to **build a case against them**.

---

##  Future Improvements

Potential future development includes:

* Additional investigation cases
* More advanced AI-driven interrogations
* Dynamic case generation
* Difficulty levels
* Expanded forensic mechanics
* Player profiles and investigation history
* More complex clue relationships
* Enhanced animations and sound design

---

##  Project

Developed as a full-stack interactive investigation game combining **web development, database systems, artificial intelligence, and game design**.

---

<div align="center">

###  THE IMPOSTOR

**Every suspect has a story.
Every clue has a purpose.
Only the evidence tells the truth.**



</div>
