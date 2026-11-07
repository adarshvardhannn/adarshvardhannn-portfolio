import mobilesentinelBanner from '@/assets/mobilesentinel-banner.jpg';
import darkeyeBanner from '@/assets/darkeye-banner.jpg';
import claimVerificationBanner from '@/assets/claim-verification-banner.jpg';

export const navigationItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
] as const;

export const heroHighlights = ['MERN Stack', 'Cybersecurity', 'React', 'Node.js', 'Python', 'OSINT'];

export const aboutFacts = [
  { label: 'Location', value: 'Bhopal, India' },
  { label: 'Focus', value: 'Cybersecurity, Digital Forensics & Full-Stack Development' },
  { label: 'Currently', value: 'Building AI + Cybersecurity ideas' },
  { label: 'Stack', value: 'React, Node.js, Python, APIs' },
] as const;

export const experienceItems = [
  {
    role: 'Google Student Ambassador',
    company: '@Google Student Ambassadors (India)',
    period: 'May 2026 – Oct 2026',
    description:
      'Representing Google technologies on campus, supporting technical initiatives, and helping students explore modern developer tools and technologies.',
    tags: ['Google Technologies', 'Community Building', 'Technical Advocacy'],
  },
  {
    role: 'Digital Forensics Intern',
    company: '@State Crime Branch, Haryana',
    period: 'Jun 2026 – Jul 2026',
    description:
      'Gained hands-on exposure to digital evidence handling, forensic imaging, case documentation, and digital forensic investigation within the Cyber Forensic Division.',
    tags: ['Digital Forensics', 'Computer Forensics', 'Evidence Analysis', 'Cybersecurity'],
  },
  {
    role: 'Campus Mantri',
    company: '@GeeksforGeeks',
    period: 'Jan 2026 – May 2026',
    description:
      'Promoted technical learning on campus, supported student engagement, and encouraged participation in coding and computer science initiatives.',
    tags: ['Leadership', 'Community Engagement', 'Technical Outreach'],
  },
] as const;

export const projects = [
  {
    name: 'MobileSentinel',
    description:
      'An Android security assessment app for on-device vulnerability analysis, port scanning, and security auditing with optional Gemini AI explanations and PDF report exports.',
    tags: ['Android', 'Kotlin', 'Gemini AI', 'Security Audit', 'Digital Forensics'],
    accent: 'from-emerald-400/20 via-lime-400/10 to-transparent',
    demo: '',
    github: 'https://github.com/adarshvardhannn/MobileSentinel',
    image: mobilesentinelBanner,
  },
  {
    name: 'DarkEye',
    description:
      'An open-source visual intelligence suite built for digital investigators, cybersecurity analysts, and OSINT researchers with dual-vector perceptual forensic hashing and multi-engine OSINT reconnaissance.',
    tags: ['Python', 'Flask', 'OSINT', 'pHash / dHash', 'Forensics'],
    accent: 'from-blue-500/20 via-cyan-400/10 to-transparent',
    demo: '',
    github: 'https://github.com/adarshvardhannn/DarkEye',
    image: darkeyeBanner,
  },
  {
    name: 'Multi-Modal Damage Claim Verification System',
    description:
      'A production-grade, multi-modal claim verification engine integrating Vision-Language Models (Gemini 1.5 Flash / GPT-4o) and rule-based decision trees to assess visual and conversational evidence automatically.',
    tags: ['Python', 'VLM', 'Gemini 1.5', 'GPT-4o', 'Computer Vision'],
    accent: 'from-purple-500/20 via-pink-400/10 to-transparent',
    demo: '',
    github: 'https://github.com/adarshvardhannn/hackerrank-orchestrate-june26',
    image: claimVerificationBanner,
  },
] as const;

export const skillGroups = [
  {
    title: 'Frontend',
    items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Python', 'FastAPI', 'REST APIs', 'PostgreSQL'],
  },
  {
    title: 'Cybersecurity',
    items: ['Digital Forensics', 'Mobile Forensics', 'SOC', 'Threat Analysis', 'OSINT'],
  },
  {
    title: 'Systems & Tools',
    items: ['Linux', 'Git', 'Docker', 'Wireshark', 'Metasploit', 'Burp Suite', 'Volatility'],
  },
  {
    title: 'AI & Security',
    items: ['Ollama', 'LLMs', 'AI-assisted Analysis', 'Security Automation'],
  },
] as const;

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/adarshvardhannn', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adarshvardhannn/', icon: 'linkedin' },
  { label: 'X', href: 'https://x.com/adarshvardhannx', icon: 'twitter' },
] as const;
