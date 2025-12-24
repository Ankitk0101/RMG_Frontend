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
  { icon: BarChart3, label: "Demands", path: "/iteration" },
  { icon: LayersPlus, label: "Add Resource", path: "/add-resource" },
  { icon: Settings, label: "Updates", path: "/updates" },
  { icon: AlertTriangle, label: "Critical Report", path: "/critical" },
  { icon: Users, label: "Employees", path: "/employees" },
  { icon: Building2, label: "Client", path: "/client" },
  { icon: PieChart, label: "Allocation", path: "/allocation" },
];

const Sidebar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="bg-white border-r border-[#D9D9D9] py-6 transition-all duration-300 h-full flex flex-col">
      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto mt-2">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `
              flex flex-col
              items-center justify-center
              gap-1
              mb-4
              py-2 px-1
              rounded-lg
              ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }
              transition-all duration-200
              `
            }
          >
            <div className="mx-auto">
              <Icon size={22} />
            </div>

            <span
              className={`
                text-[10px] font-semibold
                text-center
                leading-tight
                whitespace-nowrap
              `}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </div>

      {/* Footer Section */}
      <div className="mt-auto px-2 py-4 border-t border-gray-100">
        {user ? (
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center w-full gap-1 p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={20} />
            <span className="text-[10px] font-semibold">Logout</span>
          </button>
        ) : (
          <div className="space-y-4">
            <NavLink
              to="/login"
              className="flex flex-col items-center justify-center w-full gap-1 p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <LogIn size={20} />
              <span className="text-[10px] font-semibold">Login</span>
            </NavLink>
            <NavLink
              to="/register"
              className="flex flex-col items-center justify-center w-full gap-1 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-md"
            >
              <UserPlus size={20} />
              <span className="text-[10px] font-semibold">Join</span>
            </NavLink>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
