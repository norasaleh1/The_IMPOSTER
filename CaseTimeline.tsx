import React, { useState } from 'react';
import { TimelineEvent, Suspect } from '../types';
import { Clock, CheckCircle2, AlertCircle, User, Filter } from 'lucide-react';
import { sound } from '../services/audio';

interface CaseTimelineProps {
  timeline: TimelineEvent[];
  suspects: Suspect[];
  timeOfIncident: string;
}

export const CaseTimeline: React.FC<CaseTimelineProps> = ({
  timeline,
  suspects,
  timeOfIncident
}) => {
  const [selectedSuspectFilter, setSelectedSuspectFilter] = useState<string>('ALL');

  const filteredTimeline = timeline.filter(event => {
    if (selectedSuspectFilter === 'ALL') return true;
    return event.suspectId === selectedSuspectFilter;
  });

  const getSuspectName = (id?: string) => {
    if (!id) return null;
    const sus = suspects.find(s => s.id === id);
    return sus ? sus.name : null;
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="stamp-classified">CHRONOLOGICAL LOGS</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
            INCIDENT TIMELINE RECONSTRUCTION
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Compare verified electronic logs against suspect claims surrounding the zero-hour incident ({timeOfIncident}).
          </p>
        </div>

        {/* Suspect Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            value={selectedSuspectFilter}
            onChange={(e) => { sound.playClick(); setSelectedSuspectFilter(e.target.value); }}
            style={{
              background: '#0a0c10',
              border: '1px solid var(--border-color)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem'
            }}
          >
            <option value="ALL">Show All Events</option>
            {suspects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline Stream */}
      <div style={{ position: 'relative', paddingLeft: '32px', borderLeft: '2px solid #2a3349' }}>
        {filteredTimeline.map((ev, idx) => {
          const suspectName = getSuspectName(ev.suspectId);
          const isIncidentTime = ev.time.includes(timeOfIncident.slice(0, 5));

          return (
            <div
              key={idx}
              style={{
                marginBottom: '24px',
                position: 'relative'
              }}
            >
              {/* Timeline Marker Dot */}
              <div style={{
                position: 'absolute',
                left: '-41px',
                top: '4px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: isIncidentTime ? '#ef4444' : '#1e293b',
                border: isIncidentTime ? '2px solid #fff' : '2px solid var(--accent-red)',
                boxShadow: isIncidentTime ? '0 0 12px rgba(239, 68, 68, 0.9)' : 'none'
              }} />

              {/* Event Card */}
              <div className="glass-panel" style={{
                padding: '16px',
                borderLeft: isIncidentTime ? '4px solid #ef4444' : '1px solid #2a3349',
                background: isIncidentTime ? 'rgba(230, 57, 70, 0.12)' : 'rgba(24, 29, 42, 0.85)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={15} color="var(--accent-cyan)" />
                    <span className="mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
                      {ev.time}
                    </span>
                    {isIncidentTime && (
                      <span className="stamp-classified" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                        CRIME WINDOW
                      </span>
                    )}
                  </div>

                  {suspectName && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
                      👤 {suspectName}
                    </span>
                  )}
                </div>

                <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>
                  {ev.label}
                </h4>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.4' }}>
                  {ev.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
