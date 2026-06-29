
import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import FoodAnalyzePage from './pages/FoodAnalyzePage';
import HistoryPage from './pages/HistoryPage';
import DailyAnalyticsPage from './pages/DailyAnalyticsPage';
import WeeklyAnalyticsPage from './pages/WeeklyAnalyticsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './contexts/AuthContext';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import HealthDashboard from './pages/HealthDashboard';
import HealthProfileSetupPage from './pages/HealthProfileSetupPage';


const App: React.FC = () => {
  return (
    
      <BrowserRouter>
      <AuthProvider>

        <Layout>
          <Routes>
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />

            <Route path="/analyze" element={
              <ProtectedRoute>
                <FoodAnalyzePage />
              </ProtectedRoute>
            } />

            <Route path="/history" element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            } />

            <Route path="/daily" element={
              <ProtectedRoute>
                <DailyAnalyticsPage />
              </ProtectedRoute>
            } />

            <Route path="/weekly" element={
              <ProtectedRoute>
                <WeeklyAnalyticsPage />
              </ProtectedRoute>
            } />

            <Route path="/health" element={
              <ProtectedRoute>
                <HealthDashboard />
              </ProtectedRoute>
            } />

            <Route path="/health-profile" element={
              <ProtectedRoute>
                <HealthProfileSetupPage />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
        </AuthProvider>
      </BrowserRouter>
  );
};

export default App;
