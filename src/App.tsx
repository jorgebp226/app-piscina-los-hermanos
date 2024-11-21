import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import TalkyImprovement from '../src/talky/TalkyImprovement';
import KeySync from './pages/KeySync';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-16 relative overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/metrics" element={<Analytics />} />
            <Route path="/talkier" element={<TalkyImprovement />} />
            <Route 
              path="/keysync" 
              element={
                <KeySync url="https://keysync.es" />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;