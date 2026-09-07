# Ainzigartig — Public Portfolio Snapshot

> **Transparency notice:**  
> This repository is a public portfolio snapshot of Ainzigartig. It contains the application source and selected implementation details used to demonstrate the architecture and engineering work behind the project. Production credentials, private operational infrastructure and sensitive configuration are intentionally excluded. The production system is maintained separately.

- **Live Deployment:** [https://ainzigartig.sejerlaenner.tech/](https://ainzigartig.sejerlaenner.tech/)
- **Portfolio Case Study:** [https://sejerlaenner.tech/work/ainzigartig](https://sejerlaenner.tech/work/ainzigartig)

---

## What is Ainzigartig?

Ainzigartig is a web application and AI consultancy platform created for small and medium-sized businesses (*KMU*) in the DACH region.

Instead of presenting an abstract catalog of consulting services or relying on screenshots of closed client engagements, the platform is built around the principle of **demonstrating capabilities through usable software**. Visitors can directly interact with bounded, functional versions of the AI workflows that the consultancy delivers.

---

## Implemented Workflows

The codebase combines a multi-route editorial web application with production-grade, bounded AI runtime handlers:

1. **Website Analysis (`api/analyze.js`):**
   - Accepts a public URL and dispatches it to an isolated scraping service.
   - Enforces strict SSRF protection, disallowing private, loopback, or cloud metadata IP ranges.
   - Treats scraped web content as untrusted input with prompt-injection defenses.
   - Returns a structured JSON evaluation containing digital maturity scores, concrete opportunities (impact/effort), and explicit observations.

2. **Multimodal Document Agent (`api/live-agent-demo.js`):**
   - Processes sample text or client-rendered PDF pages.
   - Uses `pdfjs-dist` in the browser to convert PDF pages into images, transmitting up to 5 page images as base64 to an OpenAI-compatible vision model.
   - Sanitizes and validates outputs into structured JSON: document classifications, key field extractions, prioritized action items, and risk flags.

3. **Edi — Grounded Chat Assistant (`api/chat.js`):**
   - Conversational assistant grounded strictly in `api/company-context.md`.
   - Restricts conversation history to a sliding 6-message window to bound latency, tokens, and context drift.
   - Bounded by strict in-memory rate limiting and origin protection.

4. **Transparent ROI Calculator (`components/ROICalculator.tsx`):**
   - Fully client-side business case workbench with editable assumptions (team size, hours, rate, automation share, adoption).
   - Generates deterministic conservative/baseline/favorable scenarios and break-even timelines without sending data to a backend.

5. **Industry Intelligence (`api/insights.js`):**
   - Server proxy integrating with an external editorial intelligence pipeline (*Industry Watcher*) to display curated AI developments.

---

## Technical Stack

- **Frontend:** React 19, TypeScript, React Router 6, Vite 6, Tailwind CSS 3, PostCSS
- **Server Runtime:** Custom Node.js runtime (`server.mjs`) serving pre-built static assets and executing `/api/*` handlers
- **Scraper:** Python 3.12, FastAPI, BeautifulSoup4, html2text, uvicorn
- **AI Integration:** OpenAI Chat Completions API (text & vision), Vercel AI Gateway fallback
- **Delivery & Email:** Resend API for contact form submissions
- **Infrastructure (Production Reference):** VPS deployment with Caddy (HTTPS & Unix socket reverse proxy), immutable Docker containers, and an isolated systemd scraper daemon

---

## Architecture

```text
Browser (React 19 / Vite SPA)
   │
   ▼
Caddy (HTTPS Reverse Proxy / Unix Socket)
   │
   ▼
Custom Node Runtime (server.mjs)
   ├── Static assets (dist/)
   └── API Handlers (api/*.js)
         ├── Origin Allowlist & IP Rate Limiting
         ├── /api/analyze  ──────────► FastAPI Scraper (SSRF-protected)
         │                                   │
         │                                   ▼
         │                             Target Website
         ├── /api/chat     ──────────► OpenAI / AI Gateway (company-context.md)
         ├── /api/live-agent-demo ───► OpenAI Vision (Client-rendered PDF/images)
         └── /api/contact  ──────────► Resend API
```

---

## Security & Reliability Design

- **Origin Protection:** Sensitive endpoints (`/api/chat`, `/api/analyze`, `/api/live-agent-demo`, `/api/contact`) reject cross-origin requests from unapproved domains before provider calls are made, preventing unauthorized API credit consumption.
- **Rate Limiting & Cooldowns:** In-memory per-IP sliding windows and cooldown timers prevent bot spam and denial-of-wallet attacks.
- **SSRF Defense:** URL validation resolves hostnames and blocks private, link-local, multicast, and loopback IPs, with re-validation on every HTTP redirect hop.
- **Output Sanitization:** All LLM outputs pass through deterministic normalization functions (`sanitizeAnalysis`) with clamped numbers, length limits, and enum validation before reaching the client.

---

## Local Development

### Prerequisites

- Node.js 20+ (Node 24 recommended)
- Python 3.10+ (optional, required only for running the local scraper)

### 1. Install Dependencies

```bash
npm ci
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Set your API keys (e.g., `OPENAI_API_KEY`, `RESEND_API_KEY`) in `.env`.

### 3. Run Frontend & API

**Vite dev server (frontend only):**
```bash
npm run dev
```

**Production-like server (frontend + API handlers):**
```bash
npm run build
npm start
```
By default, `server.mjs` runs on port 3010 and serves the built application alongside all `/api/*` endpoints.

### 4. Run the Python Scraper (Optional)

```bash
cd scraper
python -m venv venv
# On Linux/macOS:
source venv/bin/activate
# On Windows:
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python service.py
```
The scraper will run on `http://localhost:8501`.

---

## Testing & Quality Gates

The repository includes regression test suites for all API handlers, verifying schema normalization, SSRF rejection, rate limiting, and origin protection:

```bash
# Typecheck
npx tsc --noEmit

# Run automated tests
npm test

# Production build
npm run build
```

---

## Intentional Exclusions

As a public portfolio snapshot, the following components are deliberately excluded:
- Production API keys and production environment files
- Private host deployment automation and server provisioning scripts (`ops/deploy.sh`)
- Host-specific `systemd` daemon unit definitions
- Private internal handoff notes and agent scaffolding
- Private contact details (legal pages feature pre-launch placeholders)
