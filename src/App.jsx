import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterInstitute from './pages/RegisterInstitute';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import TraineeDashboard from './pages/TraineeDashboard';
import EmployerVerificationPage from './pages/EmployerVerificationPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register-institute" element={<RegisterInstitute />} />
              <Route path="/verify-employer/:id" element={<EmployerVerificationPage />} />

              {/* Protected Routes by Role */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
                <Route path="/teacher" element={<TeacherDashboard />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={['trainee']} />}>
                <Route path="/trainee" element={<TraineeDashboard />} />
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Official Portal Footer */}
          <footer className="bg-slate-900 text-slate-400 py-6 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-xs">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-semibold text-slate-300 font-serif">
                  National Skill Impact & Employment Outcomes Tracking Platform (Prototype)
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Built on MERN Architecture • Automated Follow-ups & Employer Validation Engine
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>Government of India Prototype</span>
                <span>•</span>
                <a href="#top" className="hover:text-slate-200">Back to Top ↑</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
