# 🛡️ Adarsh Vardhan — Developer & Security Portfolio

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<br />

**A cyber-tactical, high-signal developer portfolio engineered for cybersecurity research, digital forensics, and modern full-stack development.**

[Explore Live Demo](https://adarshvardhannn-portfolio.vercel.app) • [AdarshOS Terminal](#-interactive-adarshos-terminal) • [Featured Projects](#-featured-projects) • [Contact](#-connect)

</div>

---

## ⚡ Overview

Designed with a cyber-tactical dark glassmorphism interface, this portfolio serves as the command center for my academic journey at **National Forensic Sciences University (NFSU), Bhopal**, professional internships, and technical research projects across **Digital Forensics**, **Mobile Security**, **SOC Operations**, and **AI-Assisted Security**.

### ✨ Highlights
- **Interactive AdarshOS Terminal (`/terminal`):** A custom simulated virtual terminal complete with a hierarchical file system (`projects/`, `skills/`, `contact/`, `about.ts`), command history, and responsive navigation (`ls`, `cd`, `cat`, `whoareyou`, `clear`, etc.).
- **Zero-Key-Leak Serverless Contact Pipeline:** Form submissions route through a secure Vercel Serverless Function (`api/contact.js`), ensuring third-party APIs and credentials are never exposed in browser network inspection.
- **Micro-Interaction UI & Motion:** Fluid typography, custom cursor glows, dynamic spotlight card borders, and buttery 60fps Lenis smooth scrolling.
- **Mobile-First Responsive Layout:** Handcrafted breakpoints optimized for mobile viewports, tablet screens, and ultra-wide displays.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite 5, TypeScript |
| **Styling & Design** | Tailwind CSS, Custom Glassmorphism, CSS Variables |
| **Motion & Animation** | Framer Motion, Lenis Smooth Scroll, GSAP |
| **Serverless Backend** | Vercel Serverless Functions (`api/contact.js`) |
| **Contact Delivery** | Web3Forms API with Server-Side Reverse Proxy & Honeypot |
| **Icons & Media** | React Icons (`react-icons/hi`, `react-icons/hi2`) |

---

## 💻 Interactive AdarshOS Terminal

The portfolio includes an in-browser simulated terminal environment (`/terminal`):

```bash
/home/adarsh $ ls
about.ts   projects/   skills/   contact/

/home/adarsh $ cd projects
/home/adarsh/projects $ ls
MobileSentinel.txt   DarkEye.txt   DamageClaimVerifier.txt

/home/adarsh/projects $ cat MobileSentinel.txt
```

### Supported Shell Commands:
- `ls [dir]` — List directory contents with case-insensitive path resolution
- `cd <dir>` — Change directories (`cd projects`, `cd skills`, `cd ..`, `cd ~`)
- `cat <file>` — Display file contents with preserved formatting
- `whoareyou` — Quick biography and focus areas overview
- `clear` — Clear terminal screen buffer
- `hello` — ASCII art greeting
- `time` — System timestamp display
- `fact` — Random tech and digital forensics insight
- `sudo` — Privilege escalation check (denied by default 🔒)
- `exit` — Seamless transition back to home layout

---

## 🎯 Featured Projects

### 01. [MobileSentinel](https://github.com/adarshvardhannn/MobileSentinel)
> **Android Security Assessment & Digital Forensics Suite**
> *Kotlin • Jetpack Compose • Gemini AI • Android SDK • Gradle*
- Real-time permission audits, insecure exported component analysis, and attack-surface mapping.
- Local port reconnaissance and suspicious background socket detection.
- Google Gemini AI integration for contextual natural-language remediation guidance.
- Automated cryptographically timestamped forensic PDF audit report generation.

### 02. [DarkEye](https://github.com/adarshvardhannn/DarkEye)
> **Cyber-Tactical Visual Intelligence & Reverse Image Reconnaissance**
> *Python • Flask • OpenCV • ImageHash (pHash / dHash) • HTML5 Glassmorphism*
- Dual-Vector Perceptual Engine combining 64-bit DCT pHash (low-frequency invariant) and dHash (gradient transitions).
- Composite Hamming Distance Metric: $\Delta = \text{round}(0.6 \times d_{\text{phash}} + 0.4 \times d_{\text{dhash}})$.
- Multi-engine OSINT sweep in parallel across Google Lens, Bing Visual Search, Yandex, and TinEye.
- Zero-scroll (100vh) tactical glassmorphism workspace with side-by-side modal dossiers.

### 03. [Multi-Modal Damage Claim Verification System](https://github.com/adarshvardhannn/hackerrank-orchestrate-june26)
> **Automated Insurance & Warranty Fraud Detection Engine**
> *Python • Gemini 1.5 Flash • GPT-4o • OpenCV • Pandas • Pydantic*
- Integrates Vision-Language Models (VLMs) and rule-based decision matrices.
- Analyzes multi-turn dialogue transcripts against submitted visual photographic evidence.
- Anomaly inspection detecting glare, blur, and digital manipulation attempts.
- Automated structured verdicts: `SUPPORTED`, `CONTRADICTED`, `NOT_ENOUGH_INFORMATION`.

---

## 🔒 Security Architecture: Serverless Contact Form

To ensure **zero credential leakage**:

```
Browser (User Submission)
  │
  ▼ POST /api/contact (Same-Origin Relative URL)
Vercel Edge / Serverless Function (api/contact.js)
  │
  ├─ 1. Silently drops bots via honeypot trap
  ├─ 2. Validates string length and email patterns
  ├─ 3. Injects WEB3FORMS_ACCESS_KEY from private environment
  │
  ▼ Server-to-Server POST
Web3Forms API ────▶ Direct to adarshraj5206@gmail.com
```

- **No Public API Keys:** The Web3Forms access key is never bundled in the frontend JavaScript or exposed in browser network tabs.
- **Honeypot Trap:** Hidden field (`website`) silently traps automated spam scrapers.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adarshvardhannn/adarshvardhannn-portfolio.git
   cd adarshvardhannn-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   # Web3Forms API Key (Get a free key from https://web3forms.com)
   WEB3FORMS_ACCESS_KEY=your_access_key_here
   VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here

   # Contact email recipient
   CONTACT_RECEIVER_EMAIL=adarshraj5206@gmail.com
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## ☁️ Deployment

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Under **Settings ➔ Environment Variables**, add:
   - `WEB3FORMS_ACCESS_KEY` = `your_web3forms_key`
4. Click **Deploy**. Vercel will build the Vite SPA and deploy the `/api/contact` serverless function automatically.

---

## 📬 Connect

- **Email:** [adarshraj5206@gmail.com](mailto:adarshraj5206@gmail.com)
- **GitHub:** [@adarshvardhannn](https://github.com/adarshvardhannn)
- **LinkedIn:** [linkedin.com/in/adarshvardhannn](https://www.linkedin.com/in/adarshvardhannn/)
- **X (Twitter):** [@adarshvardhannx](https://x.com/adarshvardhannx)
- **GeeksforGeeks:** [geeksforgeeks.org/profile/adarshvardhannn](https://www.geeksforgeeks.org/profile/adarshvardhannn)

---

<div align="center">

*Engineered with precision by Adarsh Vardhan • Built for high security & performant web standards.*

</div>
