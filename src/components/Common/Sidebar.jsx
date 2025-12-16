import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Briefcase,
  Bell,
  AlertCircle,
  Users,
  Building,
  PieChart
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Briefcase size={20} />, label: 'Demands', path: '/demands' },
    { icon: <Bell size={20} />, label: 'Updates', path: '/updates' },
    { icon: <AlertCircle size={20} />, label: 'Critical Report', path: '/critical' },
    { icon: <Users size={20} />, label: 'Employees', path: '/employees' },
    { icon: <Building size={20} />, label: 'Client', path: '/client/39303' },
    { icon: <PieChart size={20} />, label: 'Allocation', path: '/allocation' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Resource Portal</h1>
        <p className="text-gray-400 text-sm mt-2">Resource Management System</p>
      </div>
      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="font-semibold">CD</span>
          </div>
          <div>
            <p className="font-medium">Cindy Duran</p>
            <p className="text-sm text-gray-400">Vice President</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;