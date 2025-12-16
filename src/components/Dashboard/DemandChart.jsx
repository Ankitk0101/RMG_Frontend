import React from 'react';

const DemandChart = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [682, 258, 359, 33, 27, 5, 450, 320, 280, 600, 550, 400];
  
  const maxValue = Math.max(...data);
  
  const statusColors = [
    { label: 'Added', color: 'bg-blue-500' },
    { label: 'Pending', color: 'bg-yellow-500' },
    { label: 'Fulfilled', color: 'bg-green-500' },
    { label: 'Kept on hold', color: 'bg-orange-500' },
    { label: 'Inactive/Closed', color: 'bg-gray-500' },
    { label: 'Could Not fulfill', color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end h-64">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="relative h-48 flex items-end justify-center">
              <div 
                className="w-6 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all duration-300 hover:w-8 hover:opacity-90"
                style={{ height: `${(value / maxValue) * 100}%` }}
                title={`${months[index]}: ${value} demands`}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white px-1 py-0.5 rounded shadow">
                  {value}
                </span>
              </div>
            </div>
            <span className="mt-2 text-xs text-gray-600 font-medium">{months[index]}</span>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 text-xs">
        {statusColors.map((status) => (
          <div key={status.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 ${status.color} rounded`}></div>
            <span className="text-gray-600">{status.label}</span>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t">
        <div className="text-sm text-gray-600">
          <p className="font-medium">Chart Summary:</p>
          <p className="text-xs mt-1">Showing demand distribution across 2025 with monthly breakdown.</p>
          <p className="text-xs">Total demands: {data.reduce((a, b) => a + b, 0).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default DemandChart;