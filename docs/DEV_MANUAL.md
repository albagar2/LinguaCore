# LinguaCore - Developer Manual 🛠️

This document outlines the technical architecture and extension patterns for LinguaCore.

## 🏗️ Technical Stack
- **Frontend:** React + Vite + TypeScript.
- **State Management:** Zustand (Auth & Progress).
- **Styling:** Vanilla CSS (Modern custom properties & Glassmorphism).
- **Animations:** Framer Motion.
- **Backend:** Node.js + Express.
- **Database:** PostgreSQL (localized to SQLite for dev) via Prisma ORM.

## 📁 Key Directories

### Frontend
- `/src/pages`: Main application views.
- `/src/components`: UI primitives and layout.
- `/src/hooks`: Reusable logic (e.g., `useTTS.ts`).
- `/src/services`: API client (Axios configuration).

### Backend
- `/src/modules`: Domain-driven modules (Auth, Lessons, Progress).
- `/prisma/schema.prisma`: Database definition.
- `/src/middleware`: Security and error handling.

## 🎮 Gamification System
To add new reward types:
1. Update `schema.prisma` if persistent data is needed.
2. Modify `backend/src/modules/lessons/lessons.routes.ts` in the `complete` endpoint to adjust XP calculation logic.
3. The frontend `Dashboard.tsx` consumes the `user` object from `authStore`.

## 🔊 Audio & AI Integration
- **TTS:** Uses the browser's `SpeechSynthesis` API via the `useTTS` hook. Native and cost-free.
- **AI Coach:** Currently uses a simulated logic in `WritingCoach.tsx`. To integrate a real LLM:
    - Create a new endpoint in the backend.
    - Use the OpenAI/Mistral Node.js SDK.
    - Send the prompt with the user's text and update the frontend fetch.

## 🧪 Database Updates
After changing the schema:
```bash
npm run prisma:push
```

## 🔐 Security Standards
- **Argon2:** Password hashing.
- **JWT:** Stateless sessions.
- **Helmet:** Security headers.
- **Zod:** Runtime type validation for API input.

---
Developed with clean architecture principles for maximum scalability.
