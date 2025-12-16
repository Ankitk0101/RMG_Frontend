import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../components/Common/Sidebar"
import Header from "../components/Common/Header";
import DashboardPage from "../pages/DashboardPage";
import DemandsPage from "../pages/DemandsPage";
import ClientPage from "../pages/ClientPage";
import AddResourcePage from "../pages/AddResourcePage";

function AppRoutes() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Router>
      <div className="h-screen grid grid-rows-[80px_1fr]">

        {/* HEADER */}
        <Header toggleSidebar={() => setIsOpen(!isOpen)} />

        {/* BODY */}
        <div
          className={`grid transition-all duration-300 ${
            isOpen ? "grid-cols-[200px_1fr]" : "grid-cols-[120px_1fr]"
          }`}
        >
          <Sidebar isOpen={isOpen} />

          <main className="p-6 overflow-y-auto">
            <Routes>
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

export default AppRoutes;
