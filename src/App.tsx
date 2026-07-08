import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import LoginAlumni from './pages/LoginAlumni';
import LoginStudent from './pages/LoginStudent';
import SavedCompanies from './pages/SavedCompanies';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Blog from './pages/Blog';
import AlumniConnect from './pages/AlumniConnect';
import TPOPanel from './pages/TPOPanel';
import { db } from './lib/db';

function App() {
  const [userRole, setUserRole] = useState<'student' | 'alumni' | 'tpo' | null>(() => {
    return (localStorage.getItem('pg_role') as 'student' | 'alumni' | 'tpo') || null;
  });

  const handleSetRole = (role: 'student' | 'alumni' | 'tpo' | null) => {
    setUserRole(role);
    if (role) {
      localStorage.setItem('pg_role', role);
      const currentUser = db.getActiveUser();
      if (!currentUser || currentUser.role !== role) {
        db.loginUser(`${role}@example.com`, `${role}123`, role);
      }
    } else {
      db.logoutUser();
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header userRole={userRole} setUserRole={handleSetRole} />
        <Routes>
          <Route path="/" element={<HomePage userRole={userRole} />} />
          <Route path="/dashboard" element={userRole ? <Dashboard userRole={userRole} /> : <Navigate to="/login" replace />} />
          <Route path="/companies" element={userRole ? <Companies /> : <Navigate to="/login" replace />} />
          <Route path="/blog" element={userRole ? <Blog userRole={userRole} /> : <Navigate to="/login" replace />} />
          <Route path="/alumni-connect" element={userRole ? <AlumniConnect userRole={userRole} /> : <Navigate to="/login" replace />} />
          <Route path="/tpo-panel" element={userRole === 'tpo' ? <TPOPanel userRole={userRole} /> : <Navigate to="/login" replace />} />
          <Route path="/saved-companies" element={userRole ? <SavedCompanies /> : <Navigate to="/login" replace />} />
          <Route path="/login-alumni" element={<LoginAlumni />} />
          <Route path="/login-student" element={<LoginStudent />} />
          <Route path="/login" element={<LoginPage onLogin={handleSetRole} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;