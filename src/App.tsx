import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 ml-16 relative">
          <div className="max-w-[1920px] mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/metrics" element={<Analytics />} />
              <Route path="/talkier" element={
                <div className="p-6">
                  <h1 className="text-2xl font-semibold text-gray-900">Talkier AI</h1>
                  <p className="text-gray-600 mt-2">Integración con IA en desarrollo...</p>
                </div>
              } />
              <Route path="/keysync" element={
                <div className="p-6">
                  <h1 className="text-2xl font-semibold text-gray-900">KeySync Tech</h1>
                  <p className="text-gray-600 mt-2">Panel de configuración en desarrollo...</p>
                </div>
              } />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;