import React from 'react';
import { CaseDetail } from '../types';
import { ShieldAlert, AlertTriangle, Target, Users, FileText, ArrowRight, Eye } from 'lucide-react';
import { sound } from '../services/audio';

interface IncidentBriefingProps {
  caseData: CaseDetail;
  onNavigate: (tab: string) => void;
  onSelectSuspect: (suspectId: string) => void;
}

export const IncidentBriefing: React.FC<IncidentBriefingProps> = ({
  caseData,
  onNavigate,
  onSelectSuspect
}) => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
      {/* Classified Header Banner */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="stamp-classified">CONFIDENTIAL // EYES ONLY</span>
              <span className="mono" style={{ color: 'var(--accent-red)', fontWeight: 700 }}>
                {caseData.caseNumber}
              </span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
              {caseData.title}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              📍 {caseData.location} • ⏰ Incident Occurred: <strong>{caseData.timeOfIncident}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => { sound.playClick(); onNavigate('suspects'); }}
              className="btn-primary"
            >
              <Users size={16} /> Interrogate Suspects
            </button>
            <button
              onClick={() => { sound.playClick(); onNavigate('evidence'); }}
              className="btn-secondary"
            >
              <FileText size={16} /> Inspect Evidence
            </button>
          </div>
        </div>

        {/* Headline Box */}
        <div style={{
          background: 'rgba(230, 57, 70, 0.1)',
          borderLeft: '4px solid var(--accent-red)',
          padding: '16px',
          borderRadius: '0 6px 6px 0',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <AlertTriangle size={18} color="var(--accent-red)" />
            <h3 className="mono" style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.05em' }}>
              {caseData.briefing.headline}
            </h3>
          </div>
          <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {caseData.briefing.summary}
          </p>
        </div>

        {/* Objective */}
        <div style={{
          background: 'rgba(10, 12, 16, 0.7)',
          border: '1px solid #1e2638',
          padding: '16px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Target size={22} color="var(--accent-amber)" />
          <div>
            <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 700, textTransform: 'uppercase' }}>
              MISSION DIRECTIVE
            </span>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500, marginTop: '2px' }}>
              {caseData.briefing.objective}
            </p>
          </div>
        </div>
      </div>

      {/* Suspect Roster Summary Grid */}
      <h3 className="mono" style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.05em' }}>
        PERSONS OF INTEREST ({caseData.suspects.length})
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {caseData.suspects.map((suspect) => (
          <div
            key={suspect.id}
            onClick={() => { sound.playClick(); onSelectSuspect(suspect.id); }}
            className="glass-panel glass-panel-hover"
            style={{ padding: '16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '2rem', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '8px' }}>
                {suspect.avatar}
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700 }}>{suspect.name}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{suspect.role}</p>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.4', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '4px', borderLeft: '2px solid #334155' }}>
              "{suspect.statement.slice(0, 95)}..."
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--accent-red)' }}>{suspect.clearance}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Interrogate <ArrowRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
