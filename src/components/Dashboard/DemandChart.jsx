import React from "react";

// const DemandChart = () => {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const data = [682, 258, 359, 33, 27, 5, 450, 320, 280, 600, 550, 400];

//   const maxValue = Math.max(...data);

//   const statusColors = [
//     { label: 'Added', color: 'bg-blue-500' },
//     { label: 'Pending', color: 'bg-yellow-500' },
//     { label: 'Fulfilled', color: 'bg-green-500' },
//     { label: 'Kept on hold', color: 'bg-orange-500' },
//     { label: 'Inactive/Closed', color: 'bg-gray-500' },
//     { label: 'Could Not fulfill', color: 'bg-red-500' },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-end h-64">
//         {data.map((value, index) => (
//           <div key={index} className="flex flex-col items-center flex-1">
//             <div className="relative h-48 flex items-end justify-center">
//               <div
//                 className="w-6 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg transition-all duration-300 hover:w-8 hover:opacity-90"
//                 style={{ height: `${(value / maxValue) * 100}%` }}
//                 title={`${months[index]}: ${value} demands`}
//               >
//                 <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold bg-white px-1 py-0.5 rounded shadow">
//                   {value}
//                 </span>
//               </div>
//             </div>
//             <span className="mt-2 text-xs text-gray-600 font-medium">{months[index]}</span>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-wrap justify-center gap-4 text-xs">
//         {statusColors.map((status) => (
//           <div key={status.label} className="flex items-center gap-2">
//             <div className={`w-3 h-3 ${status.color} rounded`}></div>
//             <span className="text-gray-600">{status.label}</span>
//           </div>
//         ))}
//       </div>

//       <div className="pt-4 border-t">
//         <div className="text-sm text-gray-600">
//           <p className="font-medium">Chart Summary:</p>
//           <p className="text-xs mt-1">Showing demand distribution across 2025 with monthly breakdown.</p>
//           <p className="text-xs">Total demands: {data.reduce((a, b) => a + b, 0).toLocaleString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DemandChart;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    Added: 20,
    Pending: 12,
    Fulfilled: 25,
    "Kept on hold": 8,
    "Inactive Closed": 10,
    "Could Not fulfill": 15,
  },
  {
    month: "Feb",
    Added: 22,
    Pending: 14,
    Fulfilled: 26,
    "Kept on hold": 9,
    "Inactive Closed": 12,
    "Could Not fulfill": 16,
  },
  {
    month: "Mar",
    Added: 24,
    Pending: 15,
    Fulfilled: 28,
    "Kept on hold": 10,
    "Inactive Closed": 13,
    "Could Not fulfill": 18,
  },
  {
    month: "Apr",
    Added: 23,
    Pending: 14,
    Fulfilled: 27,
    "Kept on hold": 9,
    "Inactive Closed": 12,
    "Could Not fulfill": 17,
  },
  {
    month: "May",
    Added: 25,
    Pending: 15,
    Fulfilled: 29,
    "Kept on hold": 10,
    "Inactive Closed": 14,
    "Could Not fulfill": 18,
  },
  {
    month: "Jun",
    Added: 26,
    Pending: 16,
    Fulfilled: 30,
    "Kept on hold": 11,
    "Inactive Closed": 15,
    "Could Not fulfill": 19,
  },
];

export default function RequestsFlowChart() {
  return (
    <div className="w-[1136px] h-[616px] border border-[#D9D9D9] rounded-[8px] bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[16px] font-medium text-[#1C1C1C]">2025 requests</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} barSize={14} barGap={6}>
          <CartesianGrid
            vertical={false}
            stroke="#E5E5E5"
            strokeDasharray="0"
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "#6C6E70", fontSize: 12 }}
            axisLine={{ stroke: "#6C6E70" }}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#6C6E70", fontSize: 12 }}
            axisLine={{ stroke: "#6C6E70" }}
            tickLine={false}
          />

          <Tooltip />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="square"
            wrapperStyle={{
              fontSize: "12px",
              color: "#1C1C1C",
            }}
          />

          {/* Bars – exact grey shades like Figma */}
          <Bar dataKey="Added" fill="#E0E0E0" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Pending" fill="#D6D6D6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Fulfilled" fill="#BDBDBD" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Kept on hold" fill="#CFCFCF" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Inactive Closed" fill="#B0B0B0" radius={[4, 4, 0, 0]} />
          <Bar
            dataKey="Could Not fulfill"
            fill="#A8A8A8"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
