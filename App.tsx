import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { Bucket0to30Page } from './pages/Bucket0to30Page';
import { Bucket30to60Page } from './pages/Bucket30to60Page';
import { Bucket60to90Page } from './pages/Bucket60to90Page';
import { BucketOver90Page } from './pages/BucketOver90Page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/bucket/0-30" element={<Bucket0to30Page />} />
        <Route path="/bucket/30-60" element={<Bucket30to60Page />} />
        <Route path="/bucket/60-90" element={<Bucket60to90Page />} />
        <Route path="/bucket/over-90" element={<BucketOver90Page />} />
      </Routes>
    </Router>
  );
}

export default App;