// Virtual Filesystem for AdarshOS Terminal

export interface FSEntry {
  name: string;
  isDir: boolean;
  content?: string;
  children?: Record<string, FSEntry>;
}

export const VIRTUAL_FS: Record<string, FSEntry> = {
  '~': {
    name: '~',
    isDir: true,
    children: {
      'about.ts': {
        name: 'about.ts',
        isDir: false,
        content: `/**
 * Adarsh Vardhan — Profile & System Specification
 */
const adarsh = {
  name: "Adarsh Vardhan",
  age: 22,
  role: "Cybersecurity Postgraduate & MERN Stack Developer",
  university: "National Forensic Sciences University (NFSU), Bhopal",
  specialization: "Digital Forensics & Information Security",
  credentials: [
    "FACT 2026 Qualified (Digital Forensics)",
    "Google Student Ambassador (GSA) 2026",
    "Campus Mantri @ GeeksforGeeks",
    "Digital Forensics Intern @ State Crime Branch, Haryana"
  ],
  passion: "Cybersecurity, Digital Forensics & AI Systems",
  location: "India",
  primaryProjects: [
    "MobileSentinel (Android Security Assessment & Forensics)",
    "DarkEye (Dual-Vector Reverse Image Reconnaissance)",
    "Damage Claim Verifier (Multi-Modal VLM Claim System)",
    "MARC (Memory Forensics Analysis)"
  ],
  connect: () => {
    console.log("Let's build secure, high-signal software!");
  }
};

adarsh.connect();`,
      },
      projects: {
        name: 'projects',
        isDir: true,
        children: {
          'MobileSentinel.txt': {
            name: 'MobileSentinel.txt',
            isDir: false,
            content: `================================================================================
PROJECT 01: MOBILESENTINEL
================================================================================
Role        : Android Security Assessment & Digital Forensics Suite
Tech Stack  : Kotlin, Jetpack Compose, Gemini AI, Android SDK, Gradle
Repository  : https://github.com/adarshvardhannn/MobileSentinel

OVERVIEW:
MobileSentinel is an advanced on-device security audit and vulnerability assessment
application built for Android. It enables security researchers and users to audit
device posture, inspect running services, and discover attack surfaces in real-time.

CORE CAPABILITIES:
- Real-Time Vulnerability Scanning: Deep-inspects installed app permissions,
  identifies dangerous privilege grants, exported activities, and insecure configs.
- Network & Port Reconnaissance: Scans open local ports and active network sockets
  to detect unauthorized listeners and background telemetry channels.
- Google Gemini AI Threat Analysis: Translates raw technical security scans into
  actionable, plain-language remediation steps powered by Gemini AI.
- Forensic PDF Audit Export: Produces structured, cryptographically timestamped
  PDF audit reports suitable for compliance and incident investigations.
- Tamper & Integrity Verification: Verifies device root status, Magisk/KernelSU
  signatures, and bootloader integrity.
================================================================================`,
          },
          'DarkEye.txt': {
            name: 'DarkEye.txt',
            isDir: false,
            content: `================================================================================
PROJECT 02: DARKEYE
================================================================================
Role        : Cyber-Tactical Visual Intelligence & Reverse Image Reconnaissance
Tech Stack  : Python 3.10+, Flask, OpenCV, ImageHash (pHash / dHash), HTML5/CSS3
Repository  : https://github.com/adarshvardhannn/DarkEye

OVERVIEW:
DarkEye is an open-source visual intelligence suite built for digital investigators,
cybersecurity analysts, and OSINT researchers. It bridges offline forensic hash
matching and global multi-engine visual OSINT into a single tactical dashboard.

CORE CAPABILITIES:
- Dual-Vector Perceptual Forensic Engine:
  * pHash (Perceptual Hash): 64-bit DCT captures invariant low-frequency visual
    structures (resistant to scaling, compression, and watermarks).
  * dHash (Difference Hash): Measures horizontal gradient transitions for edge
    and contour tracking.
  * Composite Distance Metric: Δ = round(0.6 × d_phash + 0.4 × d_dhash).
- Multi-Engine OSINT Reconnaissance Sweep:
  * Automated parallel search across Google Lens, Bing Visual Search,
    Yandex Images (facial recognition & CIS index), and TinEye (timeline crawl).
  * Resilient Edge CDN dispatch via FreeImage.host with Catbox.moe fallback.
- Cyber-Tactical Zero-Scroll UI:
  * Locked 100vh workspace with side-by-side modal dossiers, visual similarity
    gauges, and one-click perceptual hash copying.
================================================================================`,
          },
          'DamageClaimVerifier.txt': {
            name: 'DamageClaimVerifier.txt',
            isDir: false,
            content: `================================================================================
PROJECT 03: MULTI-MODAL DAMAGE CLAIM VERIFICATION SYSTEM
================================================================================
Role        : Automated Insurance & Warranty Fraud Detection Engine
Tech Stack  : Python, Google Gemini 1.5 Flash, GPT-4o, OpenCV, Pandas, Pydantic
Repository  : https://github.com/adarshvardhannn/hackerrank-orchestrate-june26

OVERVIEW:
A production-grade, multi-modal claim verification system designed to automate
insurance and warranty claim adjudication. The engine cross-examines multi-turn
claim dialogues, claimant risk history, and submitted photographic evidence.

CORE CAPABILITIES:
- Multi-Modal VLM Integration: Analyzes visual damage with advanced Chain-of-Thought
  (CoT) prompting leveraging Google Gemini 1.5 Flash and OpenAI GPT-4o.
- Part & Damage Validation: Automatically confirms whether claimed damaged components
  (windshield, bumper, LCD screen, body panels) match photographic evidence.
- Anomaly & Tamper Detection: Detects blur, glare, lighting anomalies, obstructions,
  and potential digital manipulation in submitted image sets.
- Rule-Based Sufficiency Matrix: Matches visual evidence against strict minimum angle
  and distance requirements defined in evidence policies.
- Automated Verdict Generation: Produces structured, deterministic verdicts:
  [SUPPORTED], [CONTRADICTED], or [NOT_ENOUGH_INFORMATION] with natural explanations.
================================================================================`,
          },
        },
      },
      skills: {
        name: 'skills',
        isDir: true,
        children: {
          'Cybersecurity.txt': {
            name: 'Cybersecurity.txt',
            isDir: false,
            content: `================================================================================
SKILLS: CYBERSECURITY & DIGITAL FORENSICS
================================================================================
- Digital Forensics & Incident Response (DFIR)
- Mobile Forensics & In-Depth Android Security Assessment
- SOC Operations & Threat Analysis
- Open-Source Intelligence (OSINT)
- Network Packet Dissection & Traffic Analysis
- Memory Forensics & Reverse Engineering (MARC Project)
- Qualified: FACT 2026 (Digital Forensics)
================================================================================`,
          },
          'AI_Security.txt': {
            name: 'AI_Security.txt',
            isDir: false,
            content: `================================================================================
SKILLS: AI & SECURITY AUTOMATION
================================================================================
- Ollama & Local LLM Deployments
- Large Language Models (LLMs) & Vision-Language Models (VLMs)
- Google Gemini 1.5 Flash / Pro API Integration
- OpenAI GPT-4o Visual Reasoning & Chain-of-Thought
- Automated Vulnerability & Forensic Triage Pipelines
================================================================================`,
          },
          'Frontend.txt': {
            name: 'Frontend.txt',
            isDir: false,
            content: `================================================================================
SKILLS: FRONTEND DEVELOPMENT
================================================================================
- React (Hooks, Context, State Architecture)
- TypeScript (Strict Types, Generics, Component Contracts)
- Tailwind CSS (Cyber-Tactical & Glassmorphism Design)
- Framer Motion & GSAP (Performance-Tuned Animations)
- Responsive Layouts & Cross-Browser Optimization
================================================================================`,
          },
          'Backend.txt': {
            name: 'Backend.txt',
            isDir: false,
            content: `================================================================================
SKILLS: BACKEND DEVELOPMENT
================================================================================
- Node.js & Express.js
- Python (FastAPI, Flask)
- RESTful APIs & Microservices Architecture
- Databases: PostgreSQL, MongoDB, SQLite
- Secure Authentication, JWT & Access Control
================================================================================`,
          },
          'Tools.txt': {
            name: 'Tools.txt',
            isDir: false,
            content: `================================================================================
SKILLS: SYSTEMS, TOOLS & ENVIRONMENTS
================================================================================
- Operating Systems: Linux (Kali, Ubuntu, Arch), macOS, Windows
- Forensics & Sec Tools: Wireshark, Burp Suite, Metasploit, Volatility 3, Autopsy
- Developer Tools: Git, GitHub, Docker, Vite, Gradle
- Scripting & Automation: Bash, Python, PowerShell
================================================================================`,
          },
        },
      },
      contact: {
        name: 'contact',
        isDir: true,
        children: {
          'Email.txt': {
            name: 'Email.txt',
            isDir: false,
            content: `================================================================================
CONTACT INFORMATION
================================================================================
Email          : adarshraj5206@gmail.com
Inquiries      : adarshraj5206@gmail.com
Location       : Bhopal / India
Availability   : Open for Cybersecurity Research, DFIR & Full-Stack Projects
Response Time  : Within 24 hours
================================================================================`,
          },
          'Socials.txt': {
            name: 'Socials.txt',
            isDir: false,
            content: `================================================================================
SOCIAL PLATFORMS & PROFILES
================================================================================
GitHub         : https://github.com/adarshvardhannn
LinkedIn       : https://www.linkedin.com/in/adarshvardhannn/
X (Twitter)    : https://x.com/adarshvardhannx
GeeksforGeeks  : https://www.geeksforgeeks.org/profile/adarshvardhannn
================================================================================`,
          },
        },
      },
    },
  },
};

// Aliases for /home/adarsh
VIRTUAL_FS['/home/adarsh'] = VIRTUAL_FS['~'];

/**
 * Normalizes a path string based on current working directory.
 */
export function normalizePath(cwd: string, targetPath: string): string {
  let cleanCwd = cwd.trim();
  if (cleanCwd.startsWith('/home/adarsh')) {
    cleanCwd = cleanCwd.replace('/home/adarsh', '~');
  }
  if (!cleanCwd.startsWith('~')) {
    cleanCwd = '~';
  }

  const trimmed = targetPath.trim();
  // CRITICAL FIX: Empty targetPath must return cleanCwd, not '~'!
  if (!trimmed) {
    return cleanCwd;
  }
  if (trimmed === '~' || trimmed === '/home/adarsh') {
    return '~';
  }

  let full = trimmed;
  if (full.startsWith('/home/adarsh')) {
    full = full.replace('/home/adarsh', '~');
  } else if (!full.startsWith('~')) {
    if (full.startsWith('/')) {
      full = `~${full}`;
    } else {
      full = `${cleanCwd}/${full}`;
    }
  }

  // Tokenize parts
  const rawParts = full.split('/');
  const resolvedParts: string[] = [];

  for (const part of rawParts) {
    if (!part || part === '.') continue;
    if (part === '..') {
      if (resolvedParts.length > 1) {
        resolvedParts.pop();
      }
    } else {
      resolvedParts.push(part);
    }
  }

  if (resolvedParts.length === 0 || resolvedParts[0] !== '~') {
    resolvedParts.unshift('~');
  }

  return resolvedParts.join('/');
}

/**
 * Case-insensitive child resolver.
 * Tolerates case differences, missing .txt, and underscores/hyphens.
 */
function findChild(children: Record<string, FSEntry> | undefined, name: string): FSEntry | null {
  if (!children) return null;
  // Exact match
  if (children[name]) return children[name];

  const lower = name.toLowerCase();
  // Case-insensitive exact match
  for (const [key, value] of Object.entries(children)) {
    if (key.toLowerCase() === lower) {
      return value;
    }
  }

  // Without/with .txt extension match
  for (const [key, value] of Object.entries(children)) {
    if (
      key.toLowerCase() === `${lower}.txt` ||
      key.toLowerCase().replace(/\.[^.]+$/, '') === lower
    ) {
      return value;
    }
  }

  // Fuzzy match ignoring underscores and hyphens (e.g. mobile_sentinel -> MobileSentinel.txt)
  const cleanLower = lower.replace(/[-_]/g, '');
  for (const [key, value] of Object.entries(children)) {
    const keyClean = key.toLowerCase().replace(/[-_]/g, '').replace(/\.[^.]+$/, '');
    if (keyClean === cleanLower) {
      return value;
    }
  }

  return null;
}

/**
 * Resolves a directory node from path.
 * Supports case-insensitivity (e.g. Projects vs projects).
 */
export function getNode(path: string): FSEntry | null {
  const normalized = normalizePath('~', path);
  if (normalized === '~') return VIRTUAL_FS['~'];

  const parts = normalized.split('/').slice(1); // skip '~'
  let current: FSEntry = VIRTUAL_FS['~'];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const found = findChild(current.children, part);

    if (!found) {
      // If user typed e.g. "cd projects" while already in ~/projects
      if (current.name.toLowerCase() === part.toLowerCase()) {
        continue;
      }
      return null;
    }
    current = found;
  }

  return current;
}

/**
 * Resolves the canonical virtual path (e.g. ~/projects even if typed ~/Projects).
 */
export function getCanonicalPath(cwd: string, targetPath: string): string {
  const normalized = normalizePath(cwd, targetPath);
  if (normalized === '~') return '~';

  const parts = normalized.split('/').slice(1);
  let current: FSEntry = VIRTUAL_FS['~'];
  const resolved: string[] = ['~'];

  for (const part of parts) {
    const found = findChild(current.children, part);
    if (!found) {
      if (current.name.toLowerCase() === part.toLowerCase()) {
        continue;
      }
      return normalized;
    }
    current = found;
    resolved.push(found.name);
  }

  return resolved.join('/');
}

/**
 * Checks if a path is a directory.
 */
export function isDirectory(cwd: string, path: string): boolean {
  const full = normalizePath(cwd, path);
  const node = getNode(full);
  return Boolean(node && node.isDir);
}

/**
 * Lists contents of a directory.
 */
export function listDirectory(cwd: string, path = ''): { name: string; isDir: boolean }[] | null {
  const target = path ? normalizePath(cwd, path) : normalizePath(cwd, '');
  const node = getNode(target);
  if (!node || !node.isDir || !node.children) return null;

  return Object.values(node.children).map((child) => ({
    name: child.name,
    isDir: child.isDir,
  }));
}

/**
 * Reads a file content given cwd and file path.
 */
export function readFile(cwd: string, filePath: string): { content?: string; isDir?: boolean; notFound?: boolean } {
  const target = normalizePath(cwd, filePath);
  const node = getNode(target);

  if (!node) {
    return { notFound: true };
  }
  if (node.isDir) {
    return { isDir: true };
  }
  return { content: node.content ?? '' };
}
