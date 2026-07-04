import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  const [userRole, setUserRole] = useState<'student' | 'alumni' | 'tpo' | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header userRole={userRole} setUserRole={setUserRole} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/blog" element={<Blog userRole={userRole} />} />
          <Route path="/alumni-connect" element={<AlumniConnect userRole={userRole} />} />
          <Route path="/tpo-panel" element={<TPOPanel userRole={userRole} />} />
          <Route path="/saved-companies" element={<SavedCompanies />} />
          <Route path="/login-alumni" element={<LoginAlumni />} />
          <Route path="/login-student" element={<LoginStudent />} />
          <Route path="/login" element={<LoginPage onLogin={setUserRole} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;