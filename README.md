# THE IMPOSTOR — Full-Stack AI Investigation Game 🕵️‍♂️🔍

An immersive, full-stack AI detective investigation game built with **React + TypeScript + Vite**, **Node.js + Express**, **SQLite**, and **Google Gemini API**.

---

## 🌟 Key Features

- **3 Confidential Case Files**:
  1. **Case #01: The Missing Dossier** (Cybernetics Laboratory Vault Theft)
  2. **Case #02: The Sovereign Cyber Heist** (44th Floor FinTech Heist)
  3. **Case #03: The Stolen Heirloom at Al-Yamamah Wedding** (Royal Emerald Necklace Theft)
- **Interactive Interrogation Room**: Dynamic dialogue and unlocked confrontation questions.
- **Evidence Locker & Forensics**: Digital access logs, CCTV footage, and laboratory analysis.
- **Investigation Board**: Link clues and suspects with red yarn strings to uncover contradictions (+150 pts bonus).
- **Interactive Case Timeline**: Compare verified electronic timestamps against suspect statements.
- **AI Detective Assistant (AIDEN)**: Powered by Gemini API with spoiler-free guardrails and heuristic fallback engine.
- **Accusation Terminal & Scoring**: 3 attempts, difficulty scaling, accuracy rating, and rank assignment.
- **Hall of Fame Leaderboard**: SQLite-persisted clearance records and scores.
- **Procedural Web Audio Engine**: Synthesized typewriter SFX, clue chimes, and victory fanfare without external audio files.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Setup (Optional for Gemini API)
Create a `.env` file in the `server` directory:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```
*(If no API key is provided, the game automatically runs using its built-in intelligent heuristic engine at $0 cost).*

### 3. Build & Run
```bash
# Build frontend
cd client
npm run build

# Start the full-stack app
cd ../server
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser!

---

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Lucide Icons, Canvas Confetti, Web Audio API
- **Backend**: Node.js, Express.js, CORS, UUID
- **Database**: SQLite (WAL mode, persistent storage)
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`)
