import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getDashboardStats } from "../../services/dashboardAnalyticsService";

const API_CONSTANT_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const StatsCards = () => {
  const [apiStatus, setApiStatus] = useState(API_CONSTANT_STATUS.IDLE);
  const [error, setError] = useState("");
  const [stats, setStats] = useState([]);

  const fetchStats = async () => {
    try {
      setApiStatus(API_CONSTANT_STATUS.LOADING);
      setError("");

      const response = await getDashboardStats();

      // API RESPONSE PATH
      const rawData = response?.data?.data?.[0] || {};

      // 🔹 Transform API object → UI cards
      const formattedStats = [
        {
          label: "Total Demand",
          value: rawData.totalDemand ?? 0,
          color: "bg-blue-500",
        },
        {
          label: "New Requirement",
          value: rawData.newRequirement ?? 0,
          color: "bg-green-500",
        },
        {
          label: "Replacement",
          value: rawData.replacement ?? 0,
          color: "bg-purple-500",
        },
        {
          label: "Interview Selection",
          value: rawData.interviewSelection ?? 0,
          color: "bg-orange-500",
        },
      ];

      setStats(formattedStats);
      setApiStatus(API_CONSTANT_STATUS.SUCCESS);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch stats");
      setApiStatus(API_CONSTANT_STATUS.ERROR);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getTrendIcon = (label) => {
    const trendData = {
      "Total Demand": {
        icon: <TrendingUp size={16} />,
        color: "text-green-500",
      },
      "New Requirement": {
        icon: <TrendingUp size={16} />,
        color: "text-green-500",
      },
      Replacement: { icon: <Minus size={16} />, color: "text-yellow-500" },
      "Interview Selection": {
        icon: <TrendingUp size={16} />,
        color: "text-green-500",
      },
    };

    return (
      trendData[label] || { icon: <Minus size={16} />, color: "text-gray-500" }
    );
  };

  const getPercentage = (label) => {
    const percentages = {
      "Total Demand": "+10%",
      "New Requirement": "+5%",
      Replacement: "0%",
      "Interview Selection": "+8%",
    };

    return percentages[label] || "+0%";
  };

  if (apiStatus === API_CONSTANT_STATUS.ERROR) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const trend = getTrendIcon(stat.label);
        const percentage = getPercentage(stat.label);

        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className={`${trend.color} flex items-center gap-1`}>
                {trend.icon}
                <span className="text-xs font-medium">{percentage}</span>
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
