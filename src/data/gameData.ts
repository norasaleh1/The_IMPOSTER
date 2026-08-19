import { Suspect, Evidence, DetectiveRank } from '../types';

export const SUSPECTS: Suspect[] = [
  {
    id: 'alex',
    name: 'Alex Carter',
    role: 'Software Engineer',
    statement: '“I left the office at 8:30 PM and went straight home.”',
    isGuilty: true,
    avatarSeed: 'alex',
    department: 'Core Infrastructure & Security Systems',
    keycardId: 'KC-9904-AC',
    shiftHours: '09:00 AM – 05:30 PM (Overtime recorded)',
    notes: 'Reported working on database schema migrations earlier in the day. Claims no involvement in the 9:00 PM incident.',
  },
  {
    id: 'maya',
    name: 'Maya Brooks',
    role: 'Project Manager',
    statement: '“I was in a video meeting from 8:45 PM until 9:30 PM.”',
    isGuilty: false,
    avatarSeed: 'maya',
    department: 'Product Strategy & Client Relations',
    keycardId: 'KC-4412-MB',
    shiftHours: '10:00 AM – 06:30 PM (Late remote call)',
    notes: 'Organized sprint review with London partner team. Connected from Conference Room B via encrypted video client.',
  },
  {
    id: 'daniel',
    name: 'Daniel Reed',
    role: 'Security Officer',
    statement: '“I was monitoring the main entrance all evening.”',
    isGuilty: false,
    avatarSeed: 'daniel',
    department: 'Physical Facilities & Perimeter Defense',
    keycardId: 'KC-1008-DR',
    shiftHours: '06:00 PM – 02:00 AM (Night Guard Shift)',
    notes: 'Stationed at the lobby reception turnstiles. Maintained the physical visitor desk and front gate monitors.',
  },
  {
    id: 'sophia',
    name: 'Sophia Lane',
    role: 'Designer',
    statement: '“I stayed in the design room until around 9:15 PM.”',
    isGuilty: false,
    avatarSeed: 'sophia',
    department: 'User Experience & Brand Prototyping',
    keycardId: 'KC-7721-SL',
    shiftHours: '11:00 AM – 07:30 PM (Evening crunch)',
    notes: 'Finalizing high-fidelity prototype boards for client pitch. Located on 3rd Floor East Wing design lab.',
  },
];

export const EVIDENCE_LIST: Evidence[] = [
  {
    id: 'keycard',
    title: 'Keycard Access Log',
    category: 'Keycard Access Log',
    shortSummary: '9:12 PM — Alex Carter’s keycard was used to enter the office.',
    timestamp: '21:12:04 EST',
    source: 'Automated RFID Door Controller Server (Turnstile B-04)',
    classification: 'CONFIDENTIAL // PHYSICAL SECURITY AUDIT',
    logEntries: [
      { time: '20:15:30', event: 'Badge In', detail: 'Sophia Lane (Design Wing Door 3)' },
      { time: '20:29:44', event: 'Badge Out', detail: 'Alex Carter (Main Exit Turnstile 1)' },
      { time: '20:44:19', event: 'Badge In', detail: 'Maya Brooks (Conference Room B)' },
      { time: '21:12:04', event: 'BADGE IN', detail: 'Alex Carter (Side Fire Door Entry 2)', flagged: true },
      { time: '21:18:50', event: 'Badge Out', detail: 'Sophia Lane (East Stairwell Exit)' },
    ],
  },
  {
    id: 'meeting',
    title: 'Meeting Record',
    category: 'Virtual Meeting Log',
    shortSummary: 'Maya Brooks joined the video meeting at 8:46 PM and remained connected until 9:31 PM.',
    timestamp: '20:46:00 - 21:31:00 EST',
    source: 'Enterprise Video Call Server Audit & Telemetry Log',
    classification: 'INTERNAL RECORD // TELECOM ARCHIVE',
    logEntries: [
      { time: '20:45:00', event: 'Room Created', detail: 'Session #882-901-UK initiated by Host' },
      { time: '20:46:12', event: 'User Joined', detail: 'Maya Brooks (Audio & Video 1080p Active)' },
      { time: '21:00:22', event: 'Screen Share', detail: 'Maya Brooks presented Q3 Roadmap Slides' },
      { time: '21:28:40', event: 'Q&A Discussion', detail: 'Maya Brooks vocal participant' },
      { time: '21:31:05', event: 'User Left', detail: 'Maya Brooks disconnected cleanly' },
    ],
  },
  {
    id: 'security_cam',
    title: 'Security Camera Feed',
    category: 'CCTV Security Camera',
    shortSummary: 'Daniel Reed appears at the main entrance between 8:50 PM and 9:20 PM.',
    timestamp: '20:50:00 - 21:20:00 EST',
    source: 'CCTV Camera #01 (Lobby Reception & Turnstiles 4K Stream)',
    classification: 'SURVEILLANCE FOOTAGE // TIMESTAMP VERIFIED',
    logEntries: [
      { time: '20:50:11', event: 'Motion Verified', detail: 'Daniel Reed sitting at Guard Desk inspecting monitor' },
      { time: '20:58:30', event: 'Turnstile Check', detail: 'Daniel Reed performs manual turnstile check' },
      { time: '21:05:14', event: 'Phone Call', detail: 'Daniel Reed answers front desk intercom handset' },
      { time: '21:14:00', event: 'Perimeter Scan', detail: 'Daniel Reed visibly present behind lobby glass' },
      { time: '21:20:00', event: 'Continuous Log', detail: 'No movement away from main lobby perimeter' },
    ],
  },
  {
    id: 'design_cam',
    title: 'Design Room Camera Feed',
    category: 'CCTV Facility Camera',
    shortSummary: 'Sophia Lane appears inside the design room at 9:08 PM.',
    timestamp: '21:08:15 EST',
    source: 'CCTV Camera #07 (Floor 3 Design Lab Panoramic Stream)',
    classification: 'SURVEILLANCE FOOTAGE // TIME STAMP VERIFIED',
    logEntries: [
      { time: '20:30:00', event: 'Active Session', detail: 'Sophia Lane sitting at workstation drafting' },
      { time: '21:00:00', event: 'Lighting Sensor', detail: 'Desk lamp on; Sophia Lane working on tablet' },
      { time: '21:08:15', event: 'Camera Capture', detail: 'Sophia Lane standing near mood board pinned sketches', flagged: true },
      { time: '21:15:20', event: 'Packup Motion', detail: 'Sophia Lane gathering bag and turning off monitor' },
      { time: '21:17:45', event: 'Lab Exit', detail: 'Sophia Lane leaves Design Lab via main hall' },
    ],
  },
];

export function calculateRank(score: number): DetectiveRank {
  if (score >= 900) return 'Master Detective';
  if (score >= 700) return 'Sharp Investigator';
  if (score >= 500) return 'Junior Detective';
  return 'Rookie Investigator';
}
