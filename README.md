# Resumely — Modern Full-Stack Resume Builder

A modern, responsive, and full-featured resume builder web application built with **React.js**, **Node.js**, **Express.js**, and persistent storage (MongoDB with automatic local persistent fallback).

---

## 🚀 Key Features

1. **Split-Screen Live Editor**: Form controls on the left, pixel-perfect real-time live preview on the right that updates instantly as you type.
2. **4 Executive Resume Templates**:
   - **Modern Minimal**: Contemporary layout with clean typography, icon contact badges, and structured sections.
   - **Classic Professional**: Traditional corporate layout with serif typography and clean dividers.
   - **Creative Portfolio**: High-contrast dark sidebar, custom avatar badges, and visual skill progress meters.
   - **Technical Resume**: Monospace and terminal accents highlighting tech stacks, git repos, and architecture.
3. **Instant Customization**:
   - Live accent color picker with curated palette presets or any custom HEX code.
   - Dynamic template switcher preserving all user data.
4. **PDF Export & Print**:
   - One-click PDF generation with **selectable text** and realistic A4 document dimensions via `html2pdf.js`.
   - Browser print integration with dedicated `@media print` CSS stylesheet.
   - Interactive zoom controls (`60%` to `130%`).
5. **Complete User Authentication & Cloud Dashboard**:
   - Secure registration, login, and JWT-authenticated session management with bcrypt password hashing.
   - Multi-resume management dashboard: Create blank or from sample, rename, duplicate, edit, and delete with confirmation dialogs.
6. **Optional AI Assistance**:
   - Backend endpoint (`/api/ai/improve`) with secure environment variable API key protection (`GEMINI_API_KEY`).
   - Graceful fallback notifications if the API key is not configured.
7. **Zero-Configuration Resiliency**:
   - Supports both local MongoDB and built-in atomic file-based JSON persistence (`server/data/`) if MongoDB is not running locally.

---

## 🛠️ Project Structure

```text
Resume-builder/
├── client/                      # React + Vite frontend
│   ├── src/
│   │   ├── components/          # Navbar, ResumeForm, ResumePreview, SocialIcons
│   │   ├── context/             # AuthContext (JWT, user state)
│   │   ├── pages/               # LandingPage, EditorPage, DashboardPage, LoginPage, RegisterPage
│   │   ├── styles/              # templates.css, layout.css
│   │   ├── templates/           # ModernMinimal, Classic, Creative, Technical
│   │   ├── utils/               # api.js, sampleData.js
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── server/                      # Node.js + Express backend
│   ├── config/                  # db.js (MongoDB + fileDb fallback)
│   ├── controllers/             # authController, resumeController, aiController
│   ├── middleware/              # auth.js (JWT protect)
│   ├── models/                  # User.js, Resume.js
│   ├── routes/                  # authRoutes, resumeRoutes, aiRoutes
│   ├── index.js                 # Express server entry point
│   ├── .env                     # Local environment file
│   ├── .env.example             # Template environment file
│   └── package.json
└── README.md
```

---

## 💻 Quick Start & Running Locally

### Prerequisites
- Node.js (v18+)
- npm

### 1. Start the Backend Server
```bash
cd server
npm install
node index.js
```
The server will start on `http://localhost:5000`.

### 2. Start the Frontend Application
In a separate terminal:
```bash
cd client
npm install --legacy-peer-deps
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🔐 Environment Variables

The server configuration resides in `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resumely
JWT_SECRET=resumely_super_secure_jwt_secret_2026_key
NODE_ENV=development
GEMINI_API_KEY=
```
*Note: If MongoDB is not installed or running, the server automatically saves data to `server/data/users.json` and `server/data/resumes.json`.*
