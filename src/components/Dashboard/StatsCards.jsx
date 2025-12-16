import React from 'react';

const StatsCards = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {data.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-4 h-4 ${stat.color} rounded-full`}></div>
            <span className="text-sm text-gray-600">{stat.label}</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;