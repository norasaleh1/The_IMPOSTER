// Cases data definitions for THE IMPOSTOR
export const CASES = [
  {
    id: 'case-01',
    caseNumber: 'CASE #01',
    title: 'The Missing Dossier',
    location: 'Blackwood Cybernetics Research Division, Sub-Level 4',
    timeOfIncident: '21:00 Hours',
    difficulty: 'Normal',
    estimatedTime: '10-15 Min',
    briefing: {
      headline: 'PROJECT CHIMERA BLUEPRINTS COMPROMISED FROM AIR-GAPPED VAULT',
      summary: 'At 21:00 hours, the biometric alarm on Vault 4B was triggered. The physical drive containing the classified Project Chimera cybernetics blueprint was stolen from the air-gapped terminal. The vault requires dual authorization or root-override credentials. Four personnel were present in the sub-level during the security blackout.',
      objective: 'Analyze access logs, interrogate the four suspects, identify the fatal contradiction in their alibis, and catch the imposter who stole the dossier.'
    },
    initialDiscoveredEvidence: ['ev-01-01', 'ev-01-02'],
    suspects: [
      {
        id: 'sus-01-01',
        name: 'Dr. Alex Vance',
        role: 'Lead Cryptographer & Vault Keyholder',
        department: 'Cryptographic Security',
        avatar: '👨‍🔬',
        clearance: 'Level 5 (Vault)',
        statement: 'I left the facility at 20:30 to eat dinner at the diner across the street. I didn\'t return until security called me at 21:40. If my keycard was scanned at the vault at 21:12, someone must have duplicated it!',
        accessInfo: 'Master Vault Keycard holder. Badge was reported scanned at Sub-Level 4 at 21:12.',
        knownActivities: 'Logged leaving turnstiles at 20:30. Seen at Red Lantern Diner.',
        initialQuestions: [
          {
            id: 'q-01-01-1',
            question: 'Can anyone confirm you were at the diner during the theft?',
            answer: 'Yes! The waitress gave me a timestamped receipt at 20:42, and the diner street-facing window has CCTV. I was enjoying my meal when the alarm happened.'
          },
          {
            id: 'q-01-01-2',
            question: 'Did anyone have access to your keycard prior to the incident?',
            answer: 'I left my badge on my office desk while Marcus Sterling was running routine diagnostic scans in my office around 17:00.'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-01-01-1',
            triggerEvidenceId: 'ev-01-05',
            question: 'We found an NFC cloning device in Marcus\'s locker with your exact digital signature.',
            answer: 'I knew it! Marcus cloned my badge while doing the diagnostic scan. That explains how my card logged access at 21:12 while I was across the street eating dinner!'
          }
        ]
      },
      {
        id: 'sus-01-02',
        name: 'Elena Rostova',
        role: 'Chief Security Officer',
        department: 'Physical Security',
        avatar: '👮‍♀️',
        clearance: 'Level 4 (Surveillance)',
        statement: 'I was in the central monitoring station until 20:45 when a motion sensor was triggered at the North Gate perimeter. I went to inspect it personally and returned at 21:15 to find the vault offline.',
        accessInfo: 'Security monitoring station master controls, CCTV feeds, perimeter gates.',
        knownActivities: 'Patrolled North Gate from 20:45 to 21:15.',
        initialQuestions: [
          {
            id: 'q-01-02-1',
            question: 'What caused the North Gate alarm at 20:45?',
            answer: 'It was a false trip—someone had physically tampered with the sensor wire inside the utility box. It felt like a deliberate distraction to pull me away from the monitors.',
            unlocksEvidenceId: 'ev-01-04'
          },
          {
            id: 'q-01-02-2',
            question: 'Did you notice any unauthorized logins to the CCTV mainframe?',
            answer: 'When I got back at 21:15, the screen showed normal feeds, but later forensic review showed eight minutes of video were purged during my absence.',
            unlocksEvidenceId: 'ev-01-03'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-01-02-1',
            triggerEvidenceId: 'ev-01-03',
            question: 'The server logs confirm root admin credentials purged the CCTV at 21:25.',
            answer: 'Only one person in this wing has root administrative rights to purge server footage without triggering secondary flags: our Senior Systems Admin, Marcus.'
          }
        ]
      },
      {
        id: 'sus-01-03',
        name: 'Marcus Sterling',
        role: 'Senior Systems Administrator',
        department: 'Infrastructure & Networks',
        avatar: '👨‍💻',
        clearance: 'Level 5 (Root Admin)',
        statement: 'I was in Server Room 3 from 20:15 until 21:45 straight, applying critical security firmware patches to the internal routers. I never stepped out into the hallway or near the vault corridor.',
        accessInfo: 'Root system admin, server room access, maintenance vent access.',
        knownActivities: 'Server Room 3 scheduled maintenance.',
        initialQuestions: [
          {
            id: 'q-01-03-1',
            question: 'Did you leave Server Room 3 at any point between 20:15 and 21:45?',
            answer: 'Not for a single second. The firmware patch required continuous console monitoring. If anything happened outside, I was completely isolated in the server room.'
          },
          {
            id: 'q-01-03-2',
            question: 'Why did the vault CCTV log an 8-minute deletion during that window?',
            answer: 'Must have been a glitch during the firmware reboot cycle. As the admin, automated maintenance routines run frequently.'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-01-03-1',
            triggerEvidenceId: 'ev-01-06',
            question: 'Your branded Earl Grey thermal mug and fiber traces were discovered inside the ventilation shaft connecting Server Room 3 to the Vault ceiling.',
            answer: '...What?! I... I frequently inspect the ventilation ducting for thermal airflow! That doesn\'t prove I dropped into the vault!',
            unlocksEvidenceId: 'ev-01-05'
          },
          {
            id: 'uq-01-03-2',
            triggerEvidenceId: 'ev-01-05',
            question: 'We found a $250,000 Swiss bank wire and an NFC badge cloner in your locker.',
            answer: 'This is an outrage! You have no right digging through private lockers! I demand legal representation!'
          }
        ]
      },
      {
        id: 'sus-01-04',
        name: 'Dr. Clara Chen',
        role: 'Bio-Engineering Director',
        department: 'Research & Development',
        avatar: '👩‍🔬',
        clearance: 'Level 4 (Lab 2)',
        statement: 'I was in Lab 2 conducting high-temperature incubation assays on synthetic cell cultures from 19:30 to 21:30 with my lab assistant, Maya.',
        accessInfo: 'Bio-labs and chemical storage.',
        knownActivities: 'Lab 2 incubation protocol.',
        initialQuestions: [
          {
            id: 'q-01-04-1',
            question: 'Did you hear or see anything unusual around 21:00?',
            answer: 'Around 20:55, I heard metallic clattering in the ceiling vents near the corridor, but I assumed it was building maintenance.',
            unlocksEvidenceId: 'ev-01-06'
          },
          {
            id: 'q-01-04-2',
            question: 'Do you have access to Vault 4B where the dossier was stored?',
            answer: 'No, my clearance is strictly limited to Bio-Lab 2. I have no cryptographic or cybernetics clearance.'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-01-04-1',
            triggerEvidenceId: 'ev-01-04',
            question: 'Your observation of vent noises matches the maintenance layout above Server Room 3.',
            answer: 'Yes! The vent runs directly from Server Room 3 over the hallway and right into the ceiling of Vault 4B.'
          }
        ]
      }
    ],
    evidence: [
      {
        id: 'ev-01-01',
        title: 'Vault 4B Keycard Access Log',
        type: 'Access Log',
        category: 'Digital',
        icon: 'Key',
        timestamp: '21:12:04',
        status: 'Available',
        isCritical: true,
        summary: 'Electronic lock record showing Dr. Alex Vance\'s Level 5 card accessed Vault 4B.',
        details: 'Timestamp: 21:12:04 PM. Card ID: #VANCE-L5-8821. Status: Door unlocked for 42 seconds. Drive bay opened at 21:12:28 PM.'
      },
      {
        id: 'ev-01-02',
        title: 'Red Lantern Diner CCTV & Receipt',
        type: 'Alibi / CCTV',
        category: 'Physical',
        icon: 'Receipt',
        timestamp: '20:42:15 - 21:35:00',
        status: 'Available',
        isCritical: true,
        summary: 'Verified receipt and timestamped exterior camera proving Dr. Alex Vance was dining across town.',
        details: 'Order #409 paid via credit card at 20:42:15 PM by Alex Vance. Street camera footage confirms Alex remained seated inside the booth until 21:35 PM.'
      },
      {
        id: 'ev-01-03',
        title: 'Security Mainframe Audit Log',
        type: 'Server Logs',
        category: 'Digital',
        icon: 'Server',
        timestamp: '21:25:10',
        status: 'Locked',
        unlockRequirement: 'Interrogate Elena Rostova regarding unauthorized mainframe logins',
        isCritical: true,
        summary: 'Root admin terminal deleted 8 minutes of North Gate and Vault Hallway CCTV.',
        details: 'User: ROOT_ADMIN (Terminal ID: SRV-03-CONSOLE). Action: PURGE_ARCHIVE (Range: 21:05 - 21:13). Terminal location: Server Room 3.'
      },
      {
        id: 'ev-01-04',
        title: 'North Gate Sensor Tamper Report',
        type: 'Incident Report',
        category: 'Physical',
        icon: 'AlertTriangle',
        timestamp: '20:50:00',
        status: 'Locked',
        unlockRequirement: 'Interrogate Elena Rostova regarding the North Gate perimeter trip',
        isCritical: false,
        summary: 'Perimeter alarm wire was deliberately cut from inside the maintenance utility box.',
        details: 'Wire snipped with precision electronics wire-cutters. Purpose was to generate a false alarm, drawing security away from the main hub.'
      },
      {
        id: 'ev-01-05',
        title: 'Locker #104 Seizure Record (Marcus Sterling)',
        type: 'Physical Evidence',
        category: 'Forensic',
        icon: 'Briefcase',
        timestamp: '22:15:00',
        status: 'Locked',
        unlockRequirement: 'Confront Marcus Sterling regarding ventilation traces or connect Server Audit Log with Marcus on Board',
        isCritical: true,
        summary: 'Hardware RFID/NFC cloner with Vance\'s keycard profile and a $250,000 Swiss bank transfer receipt.',
        details: 'Device contains duplicated cryptographic hash for card #VANCE-L5-8821. Bank slip shows beneficiary account in Zurich under alias "M. S. Sterling".'
      },
      {
        id: 'ev-01-06',
        title: 'Ventilation Shaft Forensic Dusting',
        type: 'Forensic Evidence',
        category: 'Forensic',
        icon: 'Search',
        timestamp: '22:30:00',
        status: 'Locked',
        unlockRequirement: 'Interrogate Dr. Clara Chen regarding unusual corridor noises',
        isCritical: true,
        summary: 'Thermal mug with Marcus\'s custom Earl Grey blend and glove scuffs in the vent above Vault 4B.',
        details: 'Vibration dampeners removed from vent grating directly connecting Server Room 3 ceiling to Vault 4B maintenance hatch.'
      }
    ],
    timeline: [
      { time: '20:15', label: 'Marcus enters Server Room 3', description: 'Marcus Sterling logs into console SRV-03 claiming to begin router firmware patch.', verified: true, suspectId: 'sus-01-03' },
      { time: '20:30', label: 'Alex Vance exits facility', description: 'Alex scans badge at turnstile and heads to the Red Lantern Diner.', verified: true, suspectId: 'sus-01-01' },
      { time: '20:42', label: 'Alex pays diner bill & stays seated', description: 'CCTV and credit card transaction confirm Alex is at the diner until 21:35.', verified: true, suspectId: 'sus-01-01' },
      { time: '20:50', label: 'North Gate alarm triggered', description: 'Elena leaves surveillance post to investigate the perimeter wire short.', verified: true, suspectId: 'sus-01-02' },
      { time: '20:55', label: 'Metallic noise in ceiling vents', description: 'Dr. Clara Chen hears movement above corridor while in Bio-Lab 2.', verified: true, suspectId: 'sus-01-04' },
      { time: '21:12', label: 'Vault 4B accessed with cloned badge', description: 'Electronic lock records Alex Vance\'s keycard ID entering Vault 4B.', verified: true, suspectId: 'sus-01-01' },
      { time: '21:25', label: 'CCTV footage deleted from Server Room 3', description: 'ROOT_ADMIN console in Server Room 3 wipes 8 minutes of surveillance footage.', verified: true, suspectId: 'sus-01-03' },
      { time: '21:40', label: 'Security blackout discovered', description: 'Elena returns to find vault door ajar and Project Chimera dossier missing.', verified: true, suspectId: 'sus-01-02' }
    ],
    validConnections: [
      {
        id: 'conn-01-1',
        itemA: 'ev-01-01',
        itemB: 'ev-01-02',
        type: 'Contradiction',
        explanation: 'Alex Vance could not have physically swiped into Vault 4B at 21:12 because he was proven to be inside the diner at 21:12 on CCTV.'
      },
      {
        id: 'conn-01-2',
        itemA: 'ev-01-03',
        itemB: 'sus-01-03',
        type: 'Contradiction',
        explanation: 'Marcus claimed he was purely applying router firmware, but the terminal logs show active manual CCTV deletion from his console at 21:25.',
        unlocksEvidenceId: 'ev-01-05'
      },
      {
        id: 'conn-01-3',
        itemA: 'ev-01-05',
        itemB: 'ev-01-01',
        type: 'Alibi Disproved',
        explanation: 'The NFC cloner found in Marcus\'s locker proves Marcus forged Alex Vance\'s badge signature to frame him.'
      }
    ],
    solution: {
      culpritId: 'sus-01-03',
      culpritName: 'Marcus Sterling',
      motive: 'Corporate espionage for a $250,000 offshore payout from a rival cybernetics syndicate.',
      criticalContradiction: 'Marcus claimed he was solely running router updates in Server Room 3, but he used root access to delete CCTV footage, cloned Alex\'s badge during a prior diagnostic scan, and climbed through the server room vent to steal the dossier while Alex was verified at the diner.',
      closingNarrative: 'Caught in a web of digital footprints, Marcus Sterling confessed after being confronted with the NFC cloner, the Swiss wire slip, and his Earl Grey mug in the ceiling shaft. Dr. Alex Vance was fully cleared, and the Project Chimera dossier was recovered from Marcus\'s encrypted backup drive.'
    }
  },
  {
    id: 'case-02',
    caseNumber: 'CASE #02',
    title: 'The Sovereign Cyber Heist',
    location: 'Apex Global Financial Tower, 44th Floor Trading Floor',
    timeOfIncident: '23:45 Hours',
    difficulty: 'Hard',
    estimatedTime: '15-20 Min',
    briefing: {
      headline: '$42 MILLION IN CRYPTOGRAPHIC BEARER BONDS SIPHONED DURING MIGRATION',
      summary: 'At 23:45 hours, during an off-peak scheduled database maintenance window on the 44th floor of Apex Tower, $42 Million in cryptographic bearer bonds were transferred to an offshore cold wallet. The transaction was authenticated from CEO Richard Hayes\'s private workstation in the executive suite. Four key personnel had technical or physical access to the 44th floor.',
      objective: 'Examine VPN logs, physical terminal keystroke injectors, security badge re-entries, interrogate the suspects (Sara, Tariq, Layan, Khalid), and uncover who executed the cyber heist.'
    },
    initialDiscoveredEvidence: ['ev-02-01', 'ev-02-02'],
    suspects: [
      {
        id: 'sus-02-01',
        name: 'Sara Al-Mansoor',
        role: 'VP of Engineering',
        department: 'Core Infrastructure',
        avatar: '👩‍💼',
        clearance: 'Tier-1 Architecture Access',
        statement: 'I was at my apartment in North District monitoring the database migration script remotely over our enterprise VPN from 23:00 to 00:30.',
        accessInfo: 'Database migration supervisor, root cryptographic signer.',
        knownActivities: 'VPN logged session active from 23:02.',
        initialQuestions: [
          {
            id: 'q-02-01-1',
            question: 'Can you verify your physical location during the VPN session?',
            answer: 'I was on my home desktop computer on my private fiber connection. I have no reason to steal company funds—I own 4% equity in Apex!',
            unlocksEvidenceId: 'ev-02-03'
          },
          {
            id: 'q-02-01-2',
            question: 'Did anyone ask for your remote credentials recently?',
            answer: 'Our external auditor Khalid Al-Ghamdi requested a temporary shadow token yesterday afternoon for compliance penetration testing.'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-02-01-1',
            triggerEvidenceId: 'ev-02-03',
            question: 'The VPN log indicates the session IP address originated from the Apex Tower Guest WiFi subnet, not a home fiber line.',
            answer: 'What?! Someone must have connected a rogue hardware gateway inside the building and spoofed my connection through our internal guest WiFi!'
          }
        ]
      },
      {
        id: 'sus-02-02',
        name: 'Tariq Al-Harbi',
        role: 'Chief Financial Officer',
        department: 'Executive Finance',
        avatar: '🧔',
        clearance: 'Tier-1 Treasury Authorization',
        statement: 'I was in the 44th-floor executive lounge from 23:20 to midnight sipping single malt scotch while waiting for the migration batch to finalize.',
        accessInfo: 'Executive suite physical key, secondary dual-approval token.',
        knownActivities: 'Lounge smart bar log shows order placed at 23:38.',
        initialQuestions: [
          {
            id: 'q-02-02-1',
            question: 'Did you approve the $42 Million transfer token?',
            answer: 'Never! The system bypassed the dual-approval protocol because the rogue transaction originated directly from CEO Richard Hayes\'s physical desktop terminal.'
          },
          {
            id: 'q-02-02-2',
            question: 'Did you see anyone enter the executive hallway near Richard\'s office?',
            answer: 'Around 23:40, I heard footsteps near the NOC back corridor, but the frosted glass prevented me from seeing the person\'s face.',
            unlocksEvidenceId: 'ev-02-04'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-02-02-1',
            triggerEvidenceId: 'ev-02-04',
            question: 'The smart bar biometric glass confirms you were sitting in the lounge continuously from 23:30 to 00:10.',
            answer: 'Exactly. I never set foot near the CEO\'s terminal or the server room.'
          }
        ]
      },
      {
        id: 'sus-02-03',
        name: 'Layan Al-Otaibi',
        role: 'Senior DevOps Lead',
        department: 'Site Reliability Engineering',
        avatar: '👩‍💻',
        clearance: 'Tier-2 NOC Access',
        statement: 'I was stationed inside the 44th-floor NOC (Network Operations Center) rack room from 23:00 to 00:30 monitoring data synchronization metrics.',
        accessInfo: 'Physical NOC badge, server rack key.',
        knownActivities: 'NOC console keystroke logs active during migration.',
        initialQuestions: [
          {
            id: 'q-02-03-1',
            question: 'Did you notice any unexpected USB devices mounted to the server racks?',
            answer: 'At 23:42, our automated port-sentry alerted on a brief USB HID device mounted on Terminal 44-B, but it detached before I could inspect rack 3.',
            unlocksEvidenceId: 'ev-02-05'
          },
          {
            id: 'q-02-03-2',
            question: 'Who had physical keys to the NOC back door?',
            answer: 'DevOps team members, and the facilities audit team led by Khalid Al-Ghamdi was issued an emergency master override key during the audit.'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-02-03-1',
            triggerEvidenceId: 'ev-02-05',
            question: 'Forensics confirmed a USB Rubber Ducky keystroke injector executed the automated payload on Terminal 44-B at 23:43.',
            answer: 'Terminal 44-B is located right next to the NOC back door by the freight elevator stairs!'
          }
        ]
      },
      {
        id: 'sus-02-04',
        name: 'Khalid Al-Ghamdi',
        role: 'Lead External Security Auditor',
        department: 'Cyber Risk Assessment',
        avatar: '🕵️‍♂️',
        clearance: 'Temporary Audit Master Key',
        statement: 'I finished my compliance audit walkthrough, handed over my report summary to security, and left the Apex Tower at 22:30 to return to my hotel room.',
        accessInfo: 'Temporary master pass (supposedly surrendered at 22:30).',
        knownActivities: 'Logged leaving main lobby turnstiles at 22:30.',
        initialQuestions: [
          {
            id: 'q-02-04-1',
            question: 'Where were you between 23:15 and 00:00?',
            answer: 'I was resting in room 812 at the Grand Hyatt Hotel, reviewing notes on my tablet.'
          },
          {
            id: 'q-02-04-2',
            question: 'Did you return the temporary master access keycard when leaving at 22:30?',
            answer: 'Of course. I handed it to the front desk guard on my way out.'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-02-04-1',
            triggerEvidenceId: 'ev-02-04',
            question: 'Basement freight elevator logs show someone used a duplicate contractor badge to re-enter at 23:15, and camera capture matches your coat and build.',
            answer: 'That... that is an absurd coincidence! Many contractors wear dark trench coats in winter!',
            unlocksEvidenceId: 'ev-02-06'
          },
          {
            id: 'uq-02-04-2',
            triggerEvidenceId: 'ev-02-06',
            question: 'Federal agents intercepted your briefcase at the airport hotel containing the cold wallet private seed phrase and a flight ticket to Zurich.',
            answer: 'No... how did you track the cold wallet destination that quickly?!'
          }
        ]
      }
    ],
    evidence: [
      {
        id: 'ev-02-01',
        title: 'Blockchain Outflow Transaction Record',
        type: 'Financial Ledger',
        category: 'Digital',
        icon: 'CreditCard',
        timestamp: '23:45:12',
        status: 'Available',
        isCritical: true,
        summary: '$42,000,000 in cryptographic bearer bonds transferred to cold wallet 0x7F...9A4C.',
        details: 'Origin Terminal: Physical Workstation 44-CEO. Signing key: Dual-token override via local USB hardware injector.'
      },
      {
        id: 'ev-02-02',
        title: 'Turnstile Exit Log (Lobby Gate 1)',
        type: 'Access Log',
        category: 'Physical',
        icon: 'LogOut',
        timestamp: '22:30:18',
        status: 'Available',
        isCritical: false,
        summary: 'Turnstile record showing Khalid Al-Ghamdi scanned out at 22:30.',
        details: 'Badge: AUDIT-EXT-09. Status: Exit recorded. Lobby camera shows subject leaving through main revolving door.'
      },
      {
        id: 'ev-02-03',
        title: 'VPN Subnet & Gateway Analysis',
        type: 'Network Log',
        category: 'Digital',
        icon: 'Wifi',
        timestamp: '23:02:40 - 23:50:00',
        status: 'Locked',
        unlockRequirement: 'Interrogate Sara Al-Mansoor regarding her physical location during VPN session',
        isCritical: true,
        summary: 'Sara Al-Mansoor\'s active VPN session was routed through an on-premise Guest WiFi router.',
        details: 'IP: 192.168.44.108 (Apex-Guest-SSID). MAC address belongs to a portable GL-iNet pocket router plugged into the 44th floor utility closet.'
      },
      {
        id: 'ev-02-04',
        title: 'Basement Freight Elevator & Loading Dock CCTV',
        type: 'Surveillance Video',
        category: 'Physical',
        icon: 'Video',
        timestamp: '23:15:22',
        status: 'Locked',
        unlockRequirement: 'Interrogate Tariq Al-Harbi regarding corridor footsteps',
        isCritical: true,
        summary: 'Person matching Khalid Al-Ghamdi\'s silhouette re-enters through basement freight door at 23:15.',
        details: 'Access badge: BACKUP-MAINT-44 (Unregistered duplicate). Subject carries a slim aluminum briefcase and ascends directly to Floor 44 via service stairs.'
      },
      {
        id: 'ev-02-05',
        title: 'Terminal 44-B USB Forensic Capture',
        type: 'Forensic Dump',
        category: 'Digital',
        icon: 'Cpu',
        timestamp: '23:43:08',
        status: 'Locked',
        unlockRequirement: 'Interrogate Layan Al-Otaibi regarding unexpected USB devices on server racks',
        isCritical: true,
        summary: 'Automated Rubber Ducky script executed keystroke payload injecting CEO bypass token.',
        details: 'Hardware VID/PID: 0x0483 (Rubber Ducky). Script payload sent commands over local LAN to initiate bond transaction from CEO Richard\'s unattended unlocked terminal.'
      },
      {
        id: 'ev-02-06',
        title: 'Airport Hotel Briefcase Seizure',
        type: 'Physical Seizure',
        category: 'Physical',
        icon: 'Briefcase',
        timestamp: '00:45:00',
        status: 'Locked',
        unlockRequirement: 'Confront Khalid with Freight Elevator CCTV or connect Turnstile Log with Freight CCTV on Board',
        isCritical: true,
        summary: 'Aluminum briefcase containing cold storage hardware wallet, recovery seed phrase, and boarding pass.',
        details: 'Seized from room 812: Ledger Nano X holding wallet 0x7F...9A4C, pocket router matching guest WiFi spoof, and Swiss Air flight LX-18 to Zurich booked 3 days ago.'
      }
    ],
    timeline: [
      { time: '22:30', label: 'Khalid exits lobby', description: 'Khalid Al-Ghamdi scans out through the front turnstile to establish an apparent exit alibi.', verified: true, suspectId: 'sus-02-04' },
      { time: '23:02', label: 'Spoofed VPN session initiated', description: 'Pocket router in utility closet launches spoofed VPN under Sara\'s account.', verified: true, suspectId: 'sus-02-01' },
      { time: '23:15', label: 'Khalid re-enters via freight dock', description: 'Basement CCTV captures Khalid entering via service stairwell with duplicate pass.', verified: true, suspectId: 'sus-02-04' },
      { time: '23:38', label: 'Tariq orders drink in lounge', description: 'Smart bar biometric scan confirms Tariq Al-Harbi is seated in executive lounge.', verified: true, suspectId: 'sus-02-02' },
      { time: '23:43', label: 'USB keystroke injector mounted', description: 'Rubber Ducky device connected to Terminal 44-B in NOC to trigger transfer script.', verified: true, suspectId: 'sus-02-03' },
      { time: '23:45', label: '$42M transferred to cold wallet', description: 'Funds siphoned from CEO terminal to destination wallet 0x7F...9A4C.', verified: true, suspectId: 'sus-02-04' }
    ],
    validConnections: [
      {
        id: 'conn-02-1',
        itemA: 'ev-02-02',
        itemB: 'ev-02-04',
        type: 'Contradiction',
        explanation: 'Khalid claimed he left at 22:30 and stayed at his hotel, but basement CCTV proves he re-entered the building via the freight elevator at 23:15.',
        unlocksEvidenceId: 'ev-02-06'
      },
      {
        id: 'conn-02-2',
        itemA: 'ev-02-03',
        itemB: 'sus-02-01',
        type: 'Alibi Disproved',
        explanation: 'Sara\'s supposed VPN connection from home was actually launched from an unauthorized rogue router on the building\'s internal Guest WiFi.'
      },
      {
        id: 'conn-02-3',
        itemA: 'ev-02-05',
        itemB: 'ev-02-06',
        type: 'Corroboration',
        explanation: 'The USB injector used on Terminal 44-B perfectly matches the hardware and seed keys seized in Khalid\'s briefcase.'
      }
    ],
    solution: {
      culpritId: 'sus-02-04',
      culpritName: 'Khalid Al-Ghamdi',
      motive: 'Greed and planned retirement in Switzerland before his audit contract expired.',
      criticalContradiction: 'Khalid claimed he left Apex Tower at 22:30 and remained in his hotel room all night, but basement freight logs and surveillance footage prove he sneaked back into the building at 23:15, planted the USB injector in NOC, and routed the attack through a rogue router to frame Sara.',
      closingNarrative: 'Confronted with the basement CCTV footage, the USB Rubber Ducky forensics, and the seized Swiss cold wallet in his briefcase, Khalid Al-Ghamdi admitted to orchestrating the $42M heist. The cryptographic bearer bonds were frozen and restored to Apex Global Financial.'
    }
  },
  {
    id: 'case-03',
    caseNumber: 'CASE #03',
    title: 'The Stolen Heirloom at Al-Yamamah Wedding',
    location: 'Al-Yamamah Royal Wedding Pavilion, VIP Bridal Suite & Banquet Hall',
    timeOfIncident: '23:15 Hours',
    difficulty: 'Expert',
    estimatedTime: '15-20 Min',
    briefing: {
      headline: 'ROYAL EMERALD HEIRLOOM NECKLACE STOLEN FROM BRIDAL SUITE SAFE',
      summary: 'At 23:15 hours, during the climax of the ceremonial bridal entrance at the Al-Yamamah Wedding Pavilion, the bride\'s priceless heirloom emerald necklace ("The Star of Najd") was stolen from the high-security safe inside the private bridal suite. The safe was unlocked without forced entry using an authorized emergency PIN code. Four key organizers and family members had access to the private bridal wing.',
      objective: 'Examine safe access records, stage drone video, waiter logbooks, interrogate suspects (Reem, Faisal, Noor, Omar), uncover the contradiction in their whereabouts, and retrieve the heirloom.'
    },
    initialDiscoveredEvidence: ['ev-03-01', 'ev-03-02'],
    suspects: [
      {
        id: 'sus-03-01',
        name: 'Reem Al-Zahrani',
        role: 'Chief Wedding Coordinator & Keyholder',
        department: 'Bridal Operations & Event Logistics',
        avatar: '👰‍♀️',
        clearance: 'Master VIP Suite Key',
        statement: 'I was on the main ballroom floor orchestrating the grand dinner banquet and managing the bridal procession from 22:45 to 23:30 without leaving the banquet hall floor.',
        accessInfo: 'VIP Bridal suite physical key, master lighting console.',
        knownActivities: 'Coordinating ballroom stage from 22:45 to 23:30.',
        initialQuestions: [
          {
            id: 'q-03-01-1',
            question: 'Who knew the emergency PIN to the bridal safe where the necklace was kept?',
            answer: 'Only the bridal family and the financial manager Faisal Al-Dosari, who insured the jewelry prior to the ceremony.'
          },
          {
            id: 'q-03-01-2',
            question: 'Did you notice anyone missing from the VIP banquet tables around 23:15?',
            answer: 'Yes! When I glanced at the head family table at 23:10, Faisal\'s seat at VIP Table #1 was completely empty during the entire bridal march.',
            unlocksEvidenceId: 'ev-03-03'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-03-01-1',
            triggerEvidenceId: 'ev-03-03',
            question: 'Waiter records confirm you remained in the ballroom directing the service staff.',
            answer: 'Yes, 200 guests and the banquet team saw me at the head of the ballroom all evening.'
          }
        ]
      },
      {
        id: 'sus-03-02',
        name: 'Faisal Al-Dosari',
        role: 'Family Financial Manager & Cousin',
        department: 'Family Trust & Accounts',
        avatar: '🤵',
        clearance: 'VIP Family Pass & Safe PIN Custodian',
        statement: 'I was sitting continuously at VIP banquet table #1 drinking Arabian coffee with the groom\'s uncle from 22:40 to 23:35 without standing up once. Ask the guests at table 1!',
        accessInfo: 'Emergency safe PIN #9942, VIP bridal corridor access.',
        knownActivities: 'VIP table #1 dinner banquet.',
        initialQuestions: [
          {
            id: 'q-03-02-1',
            question: 'Why did the safe log show your assigned family emergency PIN #9942 entered at 23:12?',
            answer: 'I gave the written code to the family earlier this week in an envelope. Anyone could have found that note!',
            unlocksEvidenceId: 'ev-03-05'
          },
          {
            id: 'q-03-02-2',
            question: 'Did you leave your seat at table #1 at any point during the bridal entrance?',
            answer: 'Never! I was right there next to the groom\'s uncle clapping for the bride.'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-03-02-1',
            triggerEvidenceId: 'ev-03-03',
            question: 'The official banquet waiter log sheet explicitly notes you walked away from table #1 from 23:05 to 23:30.',
            answer: 'I... I just went to the restroom to adjust my cufflinks! That doesn\'t prove I took the necklace!',
            unlocksEvidenceId: 'ev-03-06'
          },
          {
            id: 'uq-03-02-2',
            triggerEvidenceId: 'ev-03-06',
            question: 'Forensics found the emerald necklace wrapped in your monogrammed garment bag in the dressing locker with your glove fibers.',
            answer: 'My business went bankrupt! The creditors threatened to seize my family home at midnight unless I wired $500,000! I was desperate!'
          }
        ]
      },
      {
        id: 'sus-03-03',
        name: 'Noor Al-Khatib',
        role: 'Lead Wedding Photographer & Videographer',
        department: 'Media & Production',
        avatar: '📸',
        clearance: 'All-Area Media Access',
        statement: 'I was on the main center stage operating the camera crane and drone to capture the bride\'s grand entrance continuously from 22:50 to 23:40.',
        accessInfo: 'Stage media pass, backstage equipment room.',
        knownActivities: 'Filming on main stage and drone pilot booth.',
        initialQuestions: [
          {
            id: 'q-03-03-1',
            question: 'Did your drone camera capture anyone entering the private bridal hallway?',
            answer: 'At 23:08, my crane camera recorded a man in a dark tailored tuxedo with gold cufflinks slipping through the VIP bridal suite service door.'
          },
          {
            id: 'q-03-03-2',
            question: 'Do you have keys or access to the bridal safe?',
            answer: 'No, I only handle camera equipment and lighting. I have no access to the private dressing room safe.'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-03-03-1',
            triggerEvidenceId: 'ev-03-02',
            question: 'Drone logs confirm your continuous recording timestamp throughout the robbery.',
            answer: 'My camera recorded every single second of the ballroom entrance uninterrupted.'
          }
        ]
      },
      {
        id: 'sus-03-04',
        name: 'Omar Al-Sayed',
        role: 'Venue Security Supervisor',
        department: 'Pavilion Security Operations',
        avatar: '👮‍♂️',
        clearance: 'Master Security Override',
        statement: 'I was outside at the North Valet gate managing a traffic incident and guiding VIP guest arrivals from 22:50 to 23:30.',
        accessInfo: 'Pavilion master keys, perimeter security controls.',
        knownActivities: 'North Gate exterior patrol.',
        initialQuestions: [
          {
            id: 'q-03-04-1',
            question: 'What caused the commotion at the North Gate valet entrance around 22:55?',
            answer: 'Someone intentionally triggered the valet emergency call box, creating confusion among the parking valets.',
            unlocksEvidenceId: 'ev-03-04'
          },
          {
            id: 'q-03-04-2',
            question: 'Did anyone on security duty enter the bridal suite during that window?',
            answer: 'No security personnel entered. The private bridal suite is reserved exclusively for family and coordinators.'
          }
        ],
        unlockedQuestions: [
          {
            id: 'uq-03-04-1',
            triggerEvidenceId: 'ev-03-04',
            question: 'Valet logs show the emergency call was a false alarm from the parking lot.',
            answer: 'Yes, it seemed designed to pull security away from the main pavilion entrances.'
          }
        ]
      }
    ],
    evidence: [
      {
        id: 'ev-03-01',
        title: 'Bridal Suite Electronic Safe Audit Log',
        type: 'Access Log',
        category: 'Digital',
        icon: 'Key',
        timestamp: '23:12:08',
        status: 'Available',
        isCritical: true,
        summary: 'Safe unlocked at 23:12 using authorized emergency PIN #9942 assigned to Faisal Al-Dosari.',
        details: 'Timestamp: 23:12:08 PM. Safe Door: Opened for 38 seconds. Jewel box compartment unlatched. Authorization PIN: #9942-FAISAL.'
      },
      {
        id: 'ev-03-02',
        title: 'Bridal Stage Portrait Drone Footage',
        type: 'Video Footage',
        category: 'Digital',
        icon: 'Video',
        timestamp: '22:55:00 - 23:35:00',
        status: 'Available',
        isCritical: false,
        summary: 'Continuous 4K drone video proving Noor Al-Khatib was piloting cameras on stage throughout the theft.',
        details: 'Live video telemetry confirms Noor was stationed at crane console from 22:55 to 23:35. Footage also captures a figure in a dark tuxedo entering the private bridal wing at 23:08.'
      },
      {
        id: 'ev-03-03',
        title: 'VIP Banquet Seating Log & Waiter Records',
        type: 'Event Logbook',
        category: 'Physical',
        icon: 'FileSpreadsheet',
        timestamp: '22:40:00 - 23:40:00',
        status: 'Locked',
        unlockRequirement: 'Interrogate Reem Al-Zahrani regarding missing guests at VIP tables',
        isCritical: true,
        summary: 'Official head waiter service sheet proves Faisal Al-Dosari was absent from Table #1 from 23:05 to 23:30.',
        details: 'Waiter note: "Seat #4 (Faisal Al-Dosari) vacant during main course service between 23:05 and 23:30. Guest returned at 23:31 breathing heavily."'
      },
      {
        id: 'ev-03-04',
        title: 'North Gate Valet Disturbance Report',
        type: 'Incident Report',
        category: 'Physical',
        icon: 'AlertTriangle',
        timestamp: '22:55:10',
        status: 'Locked',
        unlockRequirement: 'Interrogate Omar Al-Sayed regarding the North Gate commotion',
        isCritical: false,
        summary: 'Emergency call button was manually pressed near the valet booth to distract perimeter security.',
        details: 'False alarm button triggered outside at 22:55. Pulled security supervisor Omar away from monitoring the inner VIP hallways.'
      },
      {
        id: 'ev-03-05',
        title: 'Urgent Debt Settlement Notice & WhatsApp Export',
        type: 'Financial Document',
        category: 'Digital',
        icon: 'FileWarning',
        timestamp: 'Seized 23:45:00',
        status: 'Locked',
        unlockRequirement: 'Interrogate Faisal Al-Dosari regarding safe PIN authorization',
        isCritical: true,
        summary: 'Legal foreclosure notice demanding Faisal pay $500,000 by midnight or face bankruptcy arrest.',
        details: 'Document found on phone: "Final Notice: Bankruptcy enforcement scheduled for 00:00 AM tonight unless $500,000 settlement is completed."'
      },
      {
        id: 'ev-03-06',
        title: 'Bridal Suite Balcony Forensic Trace & Seized Pouch',
        type: 'Forensic Evidence',
        category: 'Forensic',
        icon: 'Fingerprint',
        timestamp: '23:55:00',
        status: 'Locked',
        unlockRequirement: 'Confront Faisal Al-Dosari with Waiter records or connect Waiter Log with Faisal Statement on Board',
        isCritical: true,
        summary: 'The stolen emerald necklace recovered from Faisal\'s garment bag with his partial glove fibers.',
        details: 'Found inside Faisal\'s customized tuxedo garment bag in dressing locker #3: "The Star of Najd" emerald necklace along with gold fibers matching his cufflink trim.'
      }
    ],
    timeline: [
      { time: '22:40', label: 'Guests arrive at banquet tables', description: 'Faisal Al-Dosari sits down at VIP Table #1 with family members.', verified: true, suspectId: 'sus-03-02' },
      { time: '22:55', label: 'Valet false alarm triggered', description: 'Distraction alarm sounds at North Gate, pulling Omar outside.', verified: true, suspectId: 'sus-03-04' },
      { time: '23:05', label: 'Faisal leaves VIP Table #1', description: 'Waiter logs confirm Faisal slips away from his seat right before the bridal march.', verified: true, suspectId: 'sus-03-02' },
      { time: '23:08', label: 'Tuxedo figure enters bridal corridor', description: 'Drone camera captures subject entering private suite hallway.', verified: true, suspectId: 'sus-03-03' },
      { time: '23:12', label: 'Bridal safe opened with PIN #9942', description: 'Safe unlocked using Faisal\'s assigned code and necklace removed.', verified: true, suspectId: 'sus-03-02' },
      { time: '23:15', label: 'Grand bridal entrance begins', description: 'Reem coordinates bridal procession; safe discovery triggers immediate alert.', verified: true, suspectId: 'sus-03-01' },
      { time: '23:31', label: 'Faisal returns to Table #1', description: 'Faisal resumes his seat at the banquet table claiming he was there all along.', verified: true, suspectId: 'sus-03-02' }
    ],
    validConnections: [
      {
        id: 'conn-03-1',
        itemA: 'ev-03-03',
        itemB: 'sus-03-02',
        type: 'Contradiction',
        explanation: 'Faisal claimed he sat continuously at Table #1 from 22:40 to 23:35, but waiter records prove he was absent for 25 minutes between 23:05 and 23:30.',
        unlocksEvidenceId: 'ev-03-06'
      },
      {
        id: 'conn-03-2',
        itemA: 'ev-03-05',
        itemB: 'sus-03-02',
        type: 'Motive',
        explanation: 'The $500,000 bankruptcy foreclosure deadline at midnight provided an urgent motive for Faisal to steal the heirloom necklace.'
      },
      {
        id: 'conn-03-3',
        itemA: 'ev-03-06',
        itemB: 'ev-03-01',
        type: 'Corroboration',
        explanation: 'The recovered necklace in Faisal\'s garment bag directly confirms he used PIN #9942 to extract the jewelry from the safe.'
      }
    ],
    solution: {
      culpritId: 'sus-03-02',
      culpritName: 'Faisal Al-Dosari',
      motive: 'Desperation to pay off a $500,000 bankruptcy foreclosure debt due at midnight.',
      criticalContradiction: 'Faisal claimed he had an unbreakable alibi sitting at VIP Table #1 from 22:40 to 23:35, but official waiter records prove he vanished for 25 minutes at 23:05, used his family PIN #9942 to rob the bridal safe at 23:12, hid the necklace in his garment bag, and returned to pretend nothing happened.',
      closingNarrative: 'Trapped by the waiter service log, the emergency safe audit PIN, and the recovery of the emerald necklace in his garment bag, Faisal Al-Dosari confessed to stealing the heirloom to pay his midnight debt. The heirloom necklace was safely returned to the bride before the ceremony concluded.'
    }
  }
];
