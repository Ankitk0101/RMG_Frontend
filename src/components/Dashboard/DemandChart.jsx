import React from 'react';

const DemandChart = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = [682, 258, 359, 33, 27, 5];
  
  const maxValue = Math.max(...data);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end h-48">
        {data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg relative"
              style={{ height: `${(value / maxValue) * 100}%` }}
            >
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-semibold">
                {value}
              </span>
            </div>
            <span className="mt-2 text-sm text-gray-600">{months[index]}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-8 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Added</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Fulfilled</span>
        </div>
      </div>
    </div>
  );
};

export default DemandChart;