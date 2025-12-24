import React, { useEffect, useState } from "react";

import { getFlowChartData } from "../../services/dashboardAnalyticsService";

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

const API_CONSTANT_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const jsonData = [
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
  const [apiStatus, setApiStatus] = useState(API_CONSTANT_STATUS.IDLE);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState([]);

  const fetchFlowChartData = async () => {
    try {
      setApiStatus(API_CONSTANT_STATUS.LOADING);
      setError("");

      const response = await getFlowChartData();
      console.log("flow chart data", response);
      // 🔹 API → Recharts data
      const data = response?.data?.data || [];

      setChartData(jsonData);
      setApiStatus(API_CONSTANT_STATUS.SUCCESS);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load chart data");
      setApiStatus(API_CONSTANT_STATUS.ERROR);
    }
  };

  useEffect(() => {
    fetchFlowChartData();
  }, []);

  if (apiStatus === API_CONSTANT_STATUS.ERROR) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-[1136px] h-[616px] border border-[#D9D9D9] rounded-[8px] bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[16px] font-medium text-[#1C1C1C]">2025 requests</p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData} barSize={14} barGap={6}>
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
          {/* Bars – exact Figma shades */}
          <Bar dataKey="Added" fill="#3B82F6" radius={[4, 4, 0, 0]} />{" "}
          {/* Blue */}
          <Bar dataKey="Pending" fill="#FACC15" radius={[4, 4, 0, 0]} />{" "}
          {/* Yellow */}
          <Bar dataKey="Fulfilled" fill="#22C55E" radius={[4, 4, 0, 0]} />{" "}
          {/* Green */}
          <Bar
            dataKey="Kept on hold"
            fill="#FB923C"
            radius={[4, 4, 0, 0]}
          />{" "}
          {/* Orange */}
          <Bar dataKey="Inactive Closed" fill="#6B7280" radius={[4, 4, 0, 0]} />
          {/* Gray */}
          <Bar
            dataKey="Could Not fulfill"
            fill="#A8A8A8"
            radius={[4, 4, 0, 0]}
          />
          {/* Light Gray */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
