# LinguaCore - Developer Architecture Manual 🛠️

This guide covers the advanced technical patterns, AI integrations, and state management of LinguaCore.

## 🏗️ Technical Stack (Pro)
- **Frontend:** React 18, Vite, TypeScript.
- **State:** Zustand (Persistence with `middleware/persist`).
- **Styles:** CSS Variable-based Theming + Advanced Glassmorphism.
- **AI/Speech:** Web Speech API (Recognition + Synthesis).
- **Backend:** Node.js 20+, Express, Prisma ORM.

## 📁 Key Abstractions

### 1. Smart Translation System (`SmartText.tsx`)
- **Logic**: Scans strings for glossary terms and wraps them in an interactive component.
- **Service**: `TranslationContext.tsx` pre-fetches the vocabulary dictionary on app initialization for O(1) lookup during rendering.

### 2. AI Speaking Module (`useSpeechRecognition.ts`)
- **Engine**: Browser-native `webkitSpeechRecognition`.
- **Validation**: Implements deterministic fuzzy matching on the `LessonDetail.tsx` component to calculate pronunciation accuracy without external API costs.

### 3. Real-time AI Tutor (`AIChatTutor.tsx`)
- **UI**: Uses `AnimatePresence` for fluid transitions.
- **Integration**: Currently has a simulated LLM response logic. To connect to OpenAI:
    - Route requests through the backend `/api/ai/chat` to keep API keys secure.

### 4. Spaced Repetition Engine (SRS)
- **Logic**: Implements a modified SuperMemo-2 algorithm.
- **Model**: `FlashcardProgress` tracks `interval`, `mastery`, and `nextReview`.
- **API**: `POST /api/vocabulary/mastery` updates memory records based on user feedback.

### 5. Analytics Aggregator
- **Implementation**: `progress.routes.ts` aggregates XP history and categorical accuracy.
- **Mastery Tracker**: Uses Prisma `_count` and `_avg` to calculate performance per study module (Grammar, Listening, etc.).

### 6. Gamification Architecture
- **Auth Store**: Manages `xp`, `streak`, and `level` with real-time state updates via `updateUser`.
- **Sync**: Backend atomic updates ensure consistent leaderboard state across the distributed ecosystem.

## 🎨 Design System & Theming
- **Store**: `themeStore.ts` toggles a `.light-theme` class on `document.body`.
- **Tokens**: Global CSS variables in `index.css` handle automatic property shifts. Use `var(--primary)` and `var(--card-bg)` for all new components.

## 🧪 Database & Content
To expand the curriculum:
1. Update `backend/src/shared/seed.ts`.
2. Fields including `synonyms` and `translation` must be provided for the hover-translate system to work.
3. Run:
```bash
npx prisma db push --accept-data-loss
npm run prisma:seed
```

## 🔐 Compliance
- **Security**: Argon2id hashing, JWT (Stateless), Helmet.js protection.
- **Validation**: Strict Zod schemas for all request bodies.

---
*Maintained by Antigravity - Optimized for Human-AI Pairing.*
