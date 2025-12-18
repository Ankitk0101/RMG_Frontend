import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  AlertTriangle,
  Users,
  Building2,
  PieChart,
  LayersPlus,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: BarChart3, label: "Demands", path: "/demands" },
  { icon: LayersPlus, label: "Add Resource", path: "/add-resource" },
  { icon: Settings, label: "Updates", path: "/updates" },
  { icon: AlertTriangle, label: "Critical Report", path: "/critical" },
  { icon: Users, label: "Employees", path: "/employees" },
  { icon: Building2, label: "Client", path: "/client" },
  { icon: PieChart, label: "Allocation", path: "/allocation" },
];

const Sidebar = ({ isOpen }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="bg-white border-r border-[#D9D9D9] py-6 transition-all duration-300 h-full flex flex-col">
      {/* User Info (Only shown when sidebar is open) */}
      {isOpen && user && (
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate capitalize">{user.role || 'Member'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `
              flex ${isOpen ? "flex-row" : "flex-col"}
              items-center
              ${isOpen ? "gap-4 px-6" : "gap-2"}
              mb-1
              py-3 mx-2
              rounded-lg
              ${isActive 
                ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-sm" 
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }
              transition-all duration-200
              `
            }
          >
            <div className={`${isOpen ? "ml-0" : "mx-auto"} ${isOpen ? "" : "mt-1"}`}>
              <Icon size={isOpen ? 20 : 18} />
            </div>

            {isOpen && (
              <span
                className={`
                  text-sm font-medium
                  whitespace-nowrap
                  transition-all duration-200
                `}
              >
                {label}
              </span>
            )}
            
            {!isOpen && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {label}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* Footer Section */}
      <div className="mt-auto px-4">
        {user ? (
          // Logout button for logged in users
          <button
            onClick={handleLogout}
            className={`
              flex items-center w-full p-3 rounded-lg
              text-gray-600 hover:text-red-600 hover:bg-red-50 
              transition-colors duration-200
              ${isOpen ? "justify-start gap-3" : "justify-center"}
            `}
          >
            <LogOut size={isOpen ? 18 : 20} />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        ) : (
          // Auth buttons for logged out users
          <div className={`space-y-2 ${isOpen ? "px-2" : "px-1"}`}>
            <NavLink
              to="/login"
              className={`
                flex items-center p-3 rounded-lg
                text-gray-600 hover:text-blue-600 hover:bg-blue-50
                transition-colors duration-200
                ${isOpen ? "justify-start gap-3" : "justify-center"}
              `}
            >
              <LogIn size={isOpen ? 18 : 20} />
              {isOpen && <span className="text-sm font-medium">Login</span>}
            </NavLink>
            
            <NavLink
              to="/register"
              className={`
                flex items-center p-3 rounded-lg
                bg-gradient-to-r from-blue-600 to-indigo-600 text-white
                hover:from-blue-700 hover:to-indigo-700
                transition-colors duration-200
                ${isOpen ? "justify-start gap-3" : "justify-center"}
              `}
            >
              <UserPlus size={isOpen ? 18 : 20} />
              {isOpen && <span className="text-sm font-medium">Register</span>}
            </NavLink>
          </div>
        )}
        
        {/* Sidebar toggle indicator */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            {isOpen ? "Collapse sidebar" : "Expand sidebar"}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;