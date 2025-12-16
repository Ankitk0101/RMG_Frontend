import React from 'react';
import StatsCards from '../components/Dashboard/StatsCards';
import DemandChart from '../components/Dashboard/DemandChart';
import DemandTable from '../components/Dashboard/DemandTable';

const DashboardPage = () => {
  const statsData = [
    { label: 'Added', value: '682', color: 'bg-blue-500' },
    { label: 'Pending', value: '258', color: 'bg-yellow-500' },
    { label: 'Fulfilled', value: '359', color: 'bg-green-500' },
    { label: 'Kept on hold', value: '33', color: 'bg-orange-500' },
    { label: 'Inactive/Closed', value: '27', color: 'bg-gray-500' },
    { label: 'Could Not fulfill', value: '5', color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-4">
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>Select Year</option>
            <option>2025</option>
            <option>2024</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>Select Quarter</option>
            <option>Q1</option>
            <option>Q2</option>
            <option>Q3</option>
            <option>Q4</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>BU</option>
            <option>Technology</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">2025 Requests</h2>
            <DemandChart />
          </div>
        </div>
        {/* <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Status Overview</h2>
          <div className="space-y-4">
            {statsData.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
                  <span className="text-gray-600">{stat.label}</span>
                </div>
                <span className="font-semibold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      
      <div className="bg-white rounded-xl shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">By Status (Based on created on)</h2>
          <DemandTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;