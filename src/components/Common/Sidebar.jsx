import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  AlertTriangle,
  Users,
  Building2,
  PieChart,
  LayersPlus,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: BarChart3, label: "Demands", path: "/demands" },
  { icon: LayersPlus, label: "Add Resource", path: "/add-resource" },
  { icon: Settings, label: "Updates", path: "/updates" },
  { icon: AlertTriangle, label: "Critical Report", path: "/critical" },
  { icon: Users, label: "Employees", path: "/employees" },
  { icon: Building2, label: "Client", path: "/client" },
  { icon: PieChart, label: "Allocation", path: "/allocation" },
];

const Sidebar = ({ isOpen }) => {
  return (
    <aside className="bg-white border-r border-[#D9D9D9] py-6 transition-all duration-300">

      {menuItems.map(({ icon: Icon, label, path }) => (
        <NavLink
          key={label}
          to={path}
          className={({ isActive }) =>
            `
            flex ${isOpen ? "flex-row" : "flex-col"}
            items-center
            ${isOpen ? "gap-4 px-6" : "gap-1"}
            mb-6
            text-[11px]
            ${isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-800"}
            `
          }
        >
          <Icon size={22} />

          <span
            className={`${
              isOpen
                ? "text-sm whitespace-nowrap"
                : "text-[11px] text-center"
            }`}
          >
            {label}
          </span>
        </NavLink>
      ))}

    </aside>
  );
};

export default Sidebar;
