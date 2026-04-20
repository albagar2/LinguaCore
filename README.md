# LinguaCore - Advanced English Learning Platform 🚀

LinguaCore is a professional, production-ready full-stack application designed to take users from zero to native English fluency. It combines premium aesthetics, advanced security, and modern learning patterns like gamification and AI-assisted coaching.

## ✨ Key Features

- **📊 Personal Dashboard:** Track your XP, Daily Streaks, and overall progress in real-time.
- **🔊 Interactive Audio (TTS):** Native pronunciation available across the Glossary and Lessons using browser-native Speech Synthesis.
- **🤖 AI Writing Coach:** Get professional feedback on your writing including clarity scores and grammatical corrections.
- **🎮 Gamified Learning:** Earn points (XP) by completing lessons and maintain streaks to build a consistent learning habit.
- **⌨️ Fluid UX:** Intensive keyboard support (1-4 keys, Enter) for a lightning-fast learning experience.
- **🛡️ Security-First:** Argon2 hashing, JWT sessions, Helmet headers, and Zod validation.

## 📖 Documentation
- [User Manual](docs/USER_MANUAL.md) - How to use the platform.
- [Developer Manual](docs/DEV_MANUAL.md) - Architecture and extension guide.

## 🚀 Quick Start (Windows)

### Prerequisites
- Node.js (v16.x or higher)
- npm (v8.x or higher)

### Installation & Setup
1. **Clone the repository**
2. **Run setup**:
   ```powershell
   cd backend
   npm install
   npm run prisma:push
   npm run prisma:seed
   
   cd ../frontend
   npm install
   ```

### Execution
1. **Start Backend**: `cd backend; npm run dev`
2. **Start Frontend**: `cd frontend; npm run dev`

---

## 🏗️ Technical Architecture
- **Backend:** Node.js, Express, Prisma, SQLite/PostgreSQL.
- **Frontend:** React, Vite, TypeScript, Zustand, Framer Motion, Lucide Icons.
- **Security:** OWASP Top 10 compliance, RBAC support.

## 🧪 Testing
- **Backend:** Integration tests with Jest and Supertest.
- `cd backend; npm test`

---

## 👩‍💻 Developed with ❤️ by Antigravity
Building the future of personalized language education.
