# 👑 Reggae Kitchen | The Legend of Wayne Reid

Welcome to **Reggae Kitchen**, a premium, rich-aesthetic web application celebrating the five-flavor culinary legacy of the legendary **Wayne Reid**. 

This node is built on the **Sovereign Stack** architectural standard, leveraging a secure, **Zero-Exposure Server-Side Proxy Model** for AI-driven speech synthesis.

---

## 🎨 Design & Aesthetic Excellence

Reggae Kitchen is built to amaze with state-of-the-art visuals and UX polish:
- **Typography**: Powered by the premium **Outfit** typeface from Google Fonts.
- **Glassmorphism**: Elegant glass cards with deep blur (`backdrop-filter: blur(20px)`) and subtle structural borders.
- **Micro-Animations**: Hover-responsive buttons, floating action bubbles, scotch-bonnet fire pulses, and sliding entry transitions.
- **Theme Palette**: The vibrant colors of Jamaica (Rasta Gold, Red, Green) harmonized within an ultra-premium pitch-black dark mode canvas.

---

## 🏗️ System Architecture

To guarantee total API security and protect the **Antigravity** usage limits, the application splits operations between client and server:

```
┌────────────────────────────────────────────────────────┐
│                   CLIENT BROWSER                       │
│  - React UI (v18) + Standalone Babel Compiler          │
│  - Tailwind CSS + Lucide Icons                         │
│  - Dynamic Audio Player (PCM WAV Synthesizer)          │
└──────────────────────────┬─────────────────────────────┘
                           │
                 /api/tts  │  (Standard Secure Proxy)
                           ▼
┌────────────────────────────────────────────────────────┐
│                LOCAL DEV SERVER (Node.js)              │
│  - Express.js HTTP Host                                │
│  - Environment Isolation (.env Profile)                │
│  - Secure Backend-to-Backend Gemini API Proxy         │
└──────────────────────────┬─────────────────────────────┘
                           │
       HTTPS POST          │  (Zero Client-Side Key Exposure)
                           ▼
┌────────────────────────────────────────────────────────┐
│             GOOGLE GEMINI TTS ENGINE                   │
│  - Model: gemini-2.5-flash-preview-tts                 │
│  - Accent Config: Fenrir (Authentic Patois Accent)     │
└────────────────────────────────────────────────────────┘
```

---

## ⚙️ Setup & Configuration

### Prerequisites
- **Node.js**: Version eighteen (18) or higher (v20.20.2 recommended)
- **NPM**: Version ten (10) or higher

### Step 1: Install Dependencies
Install Express.js and Dotenv:
```bash
npm install
```

### Step 2: Configure Environment Profile
Duplicate the environment template and configure your secure variables:
```bash
cp .env.example .env
nano .env
```

Inside your `.env` file, populate the following parameters:
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

> [!IMPORTANT]
> The `GEMINI_API_KEY` is fully isolated on the backend. It is never exposed in network requests sent to client web browsers!

### Step 3: Run the Development Server
Launch the Node development server:
```bash
npm run dev
```

The application will launch on your local host:
- **Local URL**: [http://localhost:3000](http://localhost:3000)

---

## 🎙️ Interactive Features & TTS Controls

### 1. The AI Pantry Chef
Enter ingredients in your kitchen (e.g. `chicken, rice, mango`) and hit **Synthesize**. The system queries the recipe matrix and generates an exquisite culinary composition complete with required flavor profiles.

### 2. Elder Kaleb Speech Synthesis (Dual-Mode Execution)
Elder Kaleb is your interactive culinary guide. He is voice-enabled with an authentic, warm Jamaican Patois accent.

The TTS engine runs in one of two modes:
- **Backend-Proxy Mode (Recommended)**: Serve the app with `npm start` and configure your API key in the `.env` file. Network requests flow through the server securely.
- **Client-Side Bypass**: If you want to host static files on a third-party server without Node.js, you can supply your API key directly through the URL query string:
  ```
  http://localhost:3000/?key=AIzaSy...
  ```

---

## 📊 Verification & Diagnostics Checklist

To ensure absolute system stability, verify the following nodes:
- [ ] Dependencies installed successfully via `npm install`
- [ ] Local `.env` profile contains a valid `GEMINI_API_KEY`
- [ ] Express server successfully binds to port `3000`
- [ ] Direct page request resolves correctly (`http://localhost:3000`)
- [ ] Voice TTS generation succeeds without console errors

---

## 🛡️ Sovereign Stack Compliance
This repository supports ZeroTier private tunnel routing and is optimized for deployment on multi-cloud redundancy nodes (Hetzner, OCI, AWS, GCP) under the principal orchestrator directives.

**Where there's a will, there's a way!** 🚀
