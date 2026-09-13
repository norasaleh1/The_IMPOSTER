import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, 'impostor.sqlite');

let SQL;
let dbInstance = null;

// Helper to save SQLite database buffer to disk
function persistToDisk() {
  if (dbInstance) {
    try {
      const data = dbInstance.export();
      const buffer = Buffer.from(data);
      fs.writeFileSync(dbFilePath, buffer);
    } catch (err) {
      console.error('[SQLite] Error persisting database to disk:', err.message);
    }
  }
}

// Wrapper for statement execution similar to better-sqlite3
class StatementWrapper {
  constructor(sql) {
    this.sql = sql;
  }

  run(...params) {
    let binding = params;
    // If passed a named object e.g. @param or object
    if (params.length === 1 && typeof params[0] === 'object' && !Array.isArray(params[0])) {
      const obj = params[0];
      binding = {};
      for (const [k, v] of Object.entries(obj)) {
        binding[k.startsWith('@') || k.startsWith(':') || k.startsWith('$') ? k : '@' + k] = v;
      }
    }
    
    try {
      dbInstance.run(this.sql, binding);
      persistToDisk();
      return { changes: 1 };
    } catch (err) {
      console.error('[SQLite Run Error]:', err.message, 'SQL:', this.sql);
      throw err;
    }
  }

  get(...params) {
    let binding = params;
    if (params.length === 1 && typeof params[0] === 'object' && !Array.isArray(params[0])) {
      const obj = params[0];
      binding = {};
      for (const [k, v] of Object.entries(obj)) {
        binding[k.startsWith('@') || k.startsWith(':') || k.startsWith('$') ? k : '@' + k] = v;
      }
    }

    try {
      const stmt = dbInstance.prepare(this.sql);
      if (binding && (Array.isArray(binding) ? binding.length > 0 : Object.keys(binding).length > 0)) {
        stmt.bind(binding);
      }
      if (stmt.step()) {
        const row = stmt.getAsObject();
        stmt.free();
        return row;
      }
      stmt.free();
      return null;
    } catch (err) {
      console.error('[SQLite Get Error]:', err.message, 'SQL:', this.sql);
      throw err;
    }
  }

  all(...params) {
    let binding = params;
    if (params.length === 1 && typeof params[0] === 'object' && !Array.isArray(params[0])) {
      const obj = params[0];
      binding = {};
      for (const [k, v] of Object.entries(obj)) {
        binding[k.startsWith('@') || k.startsWith(':') || k.startsWith('$') ? k : '@' + k] = v;
      }
    }

    try {
      const stmt = dbInstance.prepare(this.sql);
      if (binding && (Array.isArray(binding) ? binding.length > 0 : Object.keys(binding).length > 0)) {
        stmt.bind(binding);
      }
      const results = [];
      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }
      stmt.free();
      return results;
    } catch (err) {
      console.error('[SQLite All Error]:', err.message, 'SQL:', this.sql);
      throw err;
    }
  }
}

export async function initDB() {
  SQL = await initSqlJs();

  if (fs.existsSync(dbFilePath)) {
    try {
      const fileBuffer = fs.readFileSync(dbFilePath);
      dbInstance = new SQL.Database(fileBuffer);
      console.log('[SQLite] Loaded existing database from disk:', dbFilePath);
    } catch (e) {
      console.warn('[SQLite] Could not read existing DB, creating fresh instance:', e.message);
      dbInstance = new SQL.Database();
    }
  } else {
    dbInstance = new SQL.Database();
    console.log('[SQLite] Initialized new SQLite database instance');
  }

  // Create tables
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS players (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      player_id TEXT NOT NULL,
      player_name TEXT NOT NULL,
      case_id TEXT NOT NULL,
      status TEXT DEFAULT 'IN_PROGRESS',
      score INTEGER DEFAULT 1000,
      attempts_left INTEGER DEFAULT 3,
      hints_used INTEGER DEFAULT 0,
      ai_consultations INTEGER DEFAULT 0,
      notes TEXT DEFAULT '',
      suspicion_data TEXT DEFAULT '{}',
      discovered_evidence TEXT DEFAULT '[]',
      unlocked_questions TEXT DEFAULT '[]',
      reviewed_suspects TEXT DEFAULT '[]',
      interrogated_suspects TEXT DEFAULT '[]',
      interrogation_logs TEXT DEFAULT '[]',
      connections TEXT DEFAULT '[]',
      start_time INTEGER NOT NULL,
      completed_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS leaderboard (
      id TEXT PRIMARY KEY,
      session_id TEXT NOT NULL,
      player_name TEXT NOT NULL,
      case_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      rank TEXT NOT NULL,
      duration_seconds INTEGER NOT NULL,
      accuracy INTEGER NOT NULL,
      attempts_used INTEGER NOT NULL,
      hints_used INTEGER NOT NULL,
      ai_consultations INTEGER NOT NULL,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default leaderboard entries if empty
  const countStmt = dbInstance.prepare('SELECT COUNT(*) as cnt FROM leaderboard');
  countStmt.step();
  const count = countStmt.getAsObject();
  countStmt.free();

  if (count.cnt === 0) {
    const seedRecords = [
      { id: 'lb-1', session_id: 'seed-1', player_name: 'Agent Thorne', case_id: 'case-01', score: 1450, rank: 'Master Detective', duration_seconds: 240, accuracy: 100, attempts_used: 1, hints_used: 0, ai_consultations: 1 },
      { id: 'lb-2', session_id: 'seed-2', player_name: 'Detective Vance', case_id: 'case-01', score: 1280, rank: 'Elite Detective', duration_seconds: 310, accuracy: 95, attempts_used: 1, hints_used: 1, ai_consultations: 2 },
      { id: 'lb-3', session_id: 'seed-3', player_name: 'Agent Khalid', case_id: 'case-02', score: 1420, rank: 'Master Detective', duration_seconds: 280, accuracy: 100, attempts_used: 1, hints_used: 0, ai_consultations: 1 },
      { id: 'lb-4', session_id: 'seed-4', player_name: 'Inspector Sara', case_id: 'case-02', score: 1190, rank: 'Senior Investigator', duration_seconds: 390, accuracy: 88, attempts_used: 2, hints_used: 1, ai_consultations: 2 },
      { id: 'lb-5', session_id: 'seed-5', player_name: 'Detective Faisal', case_id: 'case-03', score: 1390, rank: 'Elite Detective', duration_seconds: 305, accuracy: 100, attempts_used: 1, hints_used: 1, ai_consultations: 1 },
      { id: 'lb-6', session_id: 'seed-6', player_name: 'Agent Reem', case_id: 'case-03', score: 1150, rank: 'Sharp Investigator', duration_seconds: 440, accuracy: 85, attempts_used: 2, hints_used: 2, ai_consultations: 3 },
      { id: 'lb-7', session_id: 'seed-7', player_name: 'Rookie Miller', case_id: 'case-01', score: 920, rank: 'Junior Detective', duration_seconds: 520, accuracy: 70, attempts_used: 2, hints_used: 3, ai_consultations: 4 }
    ];

    for (const record of seedRecords) {
      dbInstance.run(`
        INSERT INTO leaderboard (id, session_id, player_name, case_id, score, rank, duration_seconds, accuracy, attempts_used, hints_used, ai_consultations)
        VALUES ($id, $session_id, $player_name, $case_id, $score, $rank, $duration_seconds, $accuracy, $attempts_used, $hints_used, $ai_consultations)
      `, {
        $id: record.id,
        $session_id: record.session_id,
        $player_name: record.player_name,
        $case_id: record.case_id,
        $score: record.score,
        $rank: record.rank,
        $duration_seconds: record.duration_seconds,
        $accuracy: record.accuracy,
        $attempts_used: record.attempts_used,
        $hints_used: record.hints_used,
        $ai_consultations: record.ai_consultations
      });
    }
  }

  persistToDisk();
  console.log('[SQLite] Database initialized and verified.');
}

const db = {
  prepare: (sql) => new StatementWrapper(sql),
  exec: (sql) => {
    dbInstance.run(sql);
    persistToDisk();
  },
  export: persistToDisk
};

export default db;
