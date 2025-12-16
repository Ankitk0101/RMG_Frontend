import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Common/Sidebar';
//import Header from './components/Common/Header';
import DashboardPage from './pages/DashboardPage';
import DemandsPage from './pages/DemandsPage';
import ClientPage from './pages/ClientPage';
import AddResourcePage from './pages/AddResourcePage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* <Header /> */}
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/demands" element={<DemandsPage />} />
              <Route path="/client/:id" element={<ClientPage />} />
              <Route path="/add-resource" element={<AddResourcePage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;