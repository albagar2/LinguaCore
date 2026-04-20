# LinguaCore - Advanced English Learning Platform

LinguaCore is a professional, production-ready full-stack application designed to help users learn English from zero to native fluency. Built with modern technologies and a focus on security, scalability, and premium user experience.

## 🚀 Quick Start (Windows)

### Prerequisites
- Node.js (v16.x or higher)
- npm (v8.x or higher)

### Installation & Setup

1. **Clone the repository** (if not already there)
2. **Run the setup script**:
   ```powershell
   cd backend
   npm install
   npm run prisma:generate
   npm run prisma:push
   npm run prisma:seed
   
   cd ../frontend
   npm install
   ```

### Execution

1. **Start Backend**:
   ```powershell
   cd backend
   npm run dev
   ```
2. **Start Frontend**:
   ```powershell
   cd frontend
   npm run dev
   ```

---

## 🛡️ Security Implementation (OWASP Top 10)

This application was built with a "Security-First" mindset:

1. **Authentication (JWT & Argon2)**: Secure password hashing using Argon2 (modern alternative to Bcrypt) and stateless authentication via JWT.
2. **Input Validation (Zod)**: All API endpoints are protected by schema validation to prevent malformed data and injection.
3. **Protection Headers (Helmet)**: Implements HTTP security headers to prevent XSS, clickjacking, and other common attacks.
4. **CORS Control**: Restricted cross-origin resource sharing to trusted domains.
5. **Rate Limiting**: (Planned/Implementation ready) Prevents Brute-force and DoS attacks.
6. **SQL Injection Prevention**: Using Prisma ORM with parameterized queries.
7. **RBAC (Role-Based Access Control)**: Granular permissions for Students and Admins.

---

## 🏗️ Architecture

- **Backend**: Clean Architecture principles. Separated by modules (Auth, Lessons, Progress).
- **Frontend**: React with Vite, utilizing Zustand for state management and Framer Motion for premium aesthetics.
- **Database**: PostgreSQL (demonstrated with SQLite for easy local setup).

---

## 🧪 Testing

- **Backend**: Integration tests with Jest and Supertest.
- **Run tests**:
  ```bash
  cd backend
  npm test
  ```

---

## 🔮 Future Improvements

1. **AI Speaking Evaluation**: Integrate OpenAI Whisper or Azure Voice for real-time pronunciation feedback.
2. **Real-time Chatbot**: A dedicated "English Coach" powered by LLMs.
3. **Gamification**: Badges, streaks, and experience points (XP).
4. **Mobile App**: Native version using React Native or Capacitor.
5. **Server-Side Rendering (SSR)**: Migrate to Next.js for better SEO and performance.

---

## 👩‍💻 Developed with ❤️ by Antigravity
