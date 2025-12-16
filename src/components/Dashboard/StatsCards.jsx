import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatsCards = ({ data }) => {
  const getTrendIcon = (label) => {
    const trendData = {
      'Added': { icon: <TrendingUp size={16} />, color: 'text-green-500' },
      'Pending': { icon: <TrendingDown size={16} />, color: 'text-red-500' },
      'Fulfilled': { icon: <TrendingUp size={16} />, color: 'text-green-500' },
      'Kept on hold': { icon: <Minus size={16} />, color: 'text-yellow-500' },
      'Inactive/Closed': { icon: <TrendingDown size={16} />, color: 'text-red-500' },
      'Could Not fulfill': { icon: <TrendingDown size={16} />, color: 'text-red-500' },
    };
    
    return trendData[label] || { icon: <Minus size={16} />, color: 'text-gray-500' };
  };

  const getPercentage = (label, value) => {
    const percentages = {
      'Added': '+12%',
      'Pending': '+5%',
      'Fulfilled': '+18%',
      'Kept on hold': '-2%',
      'Inactive/Closed': '+3%',
      'Could Not fulfill': '+8%',
    };
    
    return percentages[label] || '+0%';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {data.map((stat) => {
        const trend = getTrendIcon(stat.label);
        const percentage = getPercentage(stat.label, stat.value);
        
        return (
          <div key={stat.label} className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
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
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-500">Last month: {Math.round(parseInt(stat.value) * 0.9).toLocaleString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;