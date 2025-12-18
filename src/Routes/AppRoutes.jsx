import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Sidebar from "../components/Common/Sidebar";
import Header from "../components/Common/Header";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import DemandsPage from "../pages/DemandsPage";
import ClientPage from "../pages/ClientPage";
import AddResourcePage from "../pages/AddResourcePage";
import PageNotFound from '../pages/PageNotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// MainLayout Component
const MainLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen grid grid-rows-[80px_1fr]">
      <Header toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className={`grid transition-all duration-300 ${isOpen ? "grid-cols-[200px_1fr]" : "grid-cols-[80px_1fr]"}`}>
        <Sidebar isOpen={isOpen} />
        <main className="p-6 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

// AppRoutes Component
function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes (login/register) */}
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />

          {/* Protected routes with MainLayout */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/demands" element={
            <ProtectedRoute>
              <MainLayout>
                <DemandsPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/client/:id" element={
            <ProtectedRoute>
              <MainLayout>
                <ClientPage />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/add-resource" element={
            <ProtectedRoute>
              <MainLayout>
                <AddResourcePage />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Add routes for other sidebar menu items */}
          <Route path="/updates" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Updates</h1>
                  <p className="text-gray-600">Updates page content will be here.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/critical" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Critical Report</h1>
                  <p className="text-gray-600">Critical report page content will be here.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/employees" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Employees</h1>
                  <p className="text-gray-600">Employees page content will be here.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/allocation" element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Allocation</h1>
                  <p className="text-gray-600">Allocation page content will be here.</p>
                </div>
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* 404 Page */}
          <Route path="*" element={
            <ProtectedRoute>
              <MainLayout>
                <PageNotFound />
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;