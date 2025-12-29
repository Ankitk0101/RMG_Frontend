import React from "react";
import StatsCards from "./StatsCards";
import DemandChart from "./DemandChart";
import DemandTable from "./DemandTable";
import InAndOutHouseTable from "./InAndOutHouseTable";

const DashboardLayout = () => {
  const statsData = [
    { label: "Total Demand", value: "10035", color: "bg-blue-500" },
    { label: "New Requirement", value: "10035", color: "bg-green-500" },
    { label: "Replacement", value: "10035", color: "bg-purple-500" },
    { label: "Interview Selection", value: "10035", color: "bg-orange-500" },
  ];

  // const statusData = [
  //   { label: "Added", value: "682", color: "bg-blue-500" },
  //   { label: "Pending", value: "258", color: "bg-yellow-500" },
  //   { label: "Fulfilled", value: "359", color: "bg-green-500" },
  //   { label: "Kept on hold", value: "33", color: "bg-orange-500" },
  //   { label: "Inactive Closed", value: "27", color: "bg-gray-500" },
  //   { label: "Could Not fulfill", value: "5", color: "bg-red-500" },
  // ];

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex gap-3">
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white">
              <option>Select Year</option>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white">
              <option>Select Quarter</option>
              <option>Q1</option>
              <option>Q2</option>
              <option>Q3</option>
              <option>Q4</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white">
              <option>BU</option>
              <option>Technology</option>
              <option>Operations</option>
              <option>Sales</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Added By</h2>
          <StatsCards data={statsData} />
        </div>

        {/* 2025 Requests Chart */}
        <div className="mb-8">
          {/* <div className="flex flex-wrap gap-3 mb-4">
            {statusData.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div> */}
          <div className="rounded-lg p-6 flex justify-center">
            <DemandChart />
          </div>
        </div>
        {/* Table Section */}
        <div className="p-6 flex justify-center">
          <DemandTable />
        </div>
        <div className="p-6 flex justify-center">
          <InAndOutHouseTable resourceType="Internal" />
        </div>
        <div className="p-6 flex justify-center">
          <InAndOutHouseTable resourceType="External" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
