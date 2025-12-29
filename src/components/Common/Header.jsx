import { Bell, Grip, LogOut, Menu, User, AlertCircle, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <header className="h-20 w-full bg-white border-b border-[#D9D9D9] flex items-center px-6 relative">
      <div className="flex w-full items-center justify-between">
        {/* Left - App Branding */}
        {/* <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
            Resource Manager
          </h1>
        </div> */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden">
            <img
              src="https://inspiron-web-media.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/09/29064639/home-page-banner-svg.svg"
              alt="Company Logo"
              className="w-full h-full"
            />
          </div>
          <div className="hidden sm:block h-8">
            <img
              src="https://inspironlabs.com/wp-content/uploads/2024/07/Inspiron-main-logo.svg"
              alt="Company Name"
              className="h-full object-contain"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <div className="relative cursor-pointer group">
            <Bell
              size={20}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4">
                <p className="font-medium text-gray-900 mb-2">Notifications</p>
                <div className="space-y-2">
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="text-sm text-gray-700">
                      New requirement added
                    </p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Menu */}
          <Grip
            size={20}
            className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
          />

          {/* User Actions */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-linear-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-medium shadow-sm">
                  {(user.fullname || user.name || user.username || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>
                <div className="hidden md:flex flex-col items-start leading-tight">
                  <p className="text-sm font-semibold text-gray-900">
                    {user.fullname || user.name || user.username || "User"}
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium capitalize">
                    {user.role || "Member"}
                  </p>
                </div>
              </div>

              <div className="relative group ml-1">
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="p-2 hover:bg-red-50 rounded-full transition-all duration-200 group/btn"
                >
                  <LogOut
                    size={19}
                    className="text-gray-400 group-hover/btn:text-red-500 transition-colors"
                  />
                  <span className="absolute right-0 top-full mt-2 w-20 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <User size={18} />
                <span className="text-sm font-medium">Login</span>
              </button>

              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-colors shadow-sm"
              >
                <span className="text-sm font-medium">Register</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transform animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <AlertCircle size={24} />
              </div>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
