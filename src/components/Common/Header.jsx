import { Bell, Grip, LogOut, Menu, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-20 w-full bg-white border-b border-[#D9D9D9] flex items-center px-6">
      <div className="flex w-full items-center justify-between">
        {/* Left - Menu Button */}
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>

        {/* Center - App Title */}
        {/* <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </div> */}

        {/* Right */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <div className="relative cursor-pointer group">
            <Bell size={20} className="text-gray-600 hover:text-gray-900 transition-colors" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
              3
            </span>
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-4">
                <p className="font-medium text-gray-900 mb-2">Notifications</p>
                <div className="space-y-2">
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="text-sm text-gray-700">New requirement added</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Menu */}
          <Grip size={20} className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />

          {/* User Info */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role || 'Member'}</p>
                </div>
              </div>

              <div className="relative group">
                <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                  <LogOut 
                    size={20} 
                    className="text-gray-600 hover:text-red-600 transition-colors"
                    onClick={handleLogout}
                    title="Logout"
                  />
                </button>
                <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
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
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium">Register</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;