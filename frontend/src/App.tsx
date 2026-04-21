import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import Glossary from './pages/Glossary';
import WritingCoach from './pages/WritingCoach';
import Flashcards from './pages/Flashcards';
import Documentation from './pages/Documentation';
import VideoImmersion from './pages/VideoImmersion';

import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { TranslationProvider } from './context/TranslationContext';
import { Toaster } from 'sonner';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  return token ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const { isDarkMode } = useThemeStore();
  const { user } = useAuthStore();

  React.useEffect(() => {
    if (!isDarkMode) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }

    // Atmospheric Level Themes
    document.body.classList.remove('level-beginner', 'level-intermediate', 'level-advanced');
    if (user?.level) {
      document.body.classList.add(`level-${user.level.toLowerCase()}`);
    }
  }, [isDarkMode, user?.level]);

  return (
    <TranslationProvider>
      <Router>
        <Toaster 
          position="top-right" 
          expand={true} 
          richColors 
          theme={isDarkMode ? 'dark' : 'light'}
          toastOptions={{
            style: {
              background: isDarkMode ? '#090e1a' : '#ffffff',
              color: isDarkMode ? '#f8fafc' : '#0f172a',
              border: `1px solid ${isDarkMode ? 'rgba(99, 102, 241, 0.4)' : 'rgba(0,0,0,0.1)'}`,
            },
          }}
        />
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/writing-coach" 
            element={
              <ProtectedRoute>
                <WritingCoach />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/glossary" 
            element={
              <ProtectedRoute>
                <Glossary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lessons" 
            element={
              <ProtectedRoute>
                <Lessons />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lessons/:id" 
            element={
              <ProtectedRoute>
                <LessonDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/flashcards" 
            element={
              <ProtectedRoute>
                <Flashcards />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/documentation" 
            element={
              <ProtectedRoute>
                <Documentation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/immersion" 
            element={
              <ProtectedRoute>
                <VideoImmersion />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  </TranslationProvider>
  );
}

export default App;
