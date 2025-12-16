import React from 'react';

const DemandCard = ({ demand, isSelected, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-xl shadow p-4 cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">Local (123456)</span>
            <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded">L2</span>
          </div>
          <h3 className="font-bold text-gray-800">#{demand.id} {demand.client}</h3>
          <p className="text-sm text-gray-600">({demand.company}) (1/2)</p>
          <p className="text-xs text-blue-600">{demand.leadSource}</p>
        </div>
        {demand.premium && (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
            Premium
          </span>
        )}
      </div>
      
      <div className="mb-3">
        <p className="font-medium text-gray-800">{demand.salesPerson}</p>
        <p className="text-sm text-gray-600">{demand.salesRole}</p>
        <p className="text-xs text-gray-500">{demand.date}</p>
      </div>
      
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-red-600">({demand.status})</span>
          <span className="text-sm font-medium">{demand.level}</span>
        </div>
        <p className="text-sm text-gray-600">{demand.category}</p>
        <p className="text-xs text-gray-500">({demand.hours})</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="font-bold text-lg text-gray-800">{demand.budget}</p>
          <p className="text-sm text-gray-600">{demand.frequency}</p>
          <p className="text-sm text-gray-600">{demand.location}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs px-2 py-1 bg-gray-200 rounded">{demand.band}</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="font-bold text-sm text-gray-800">
            {demand.profiles > 0 ? `Profiles(${demand.profiles})` : 'Profiles(0)'}
          </p>
          <p className="text-sm text-gray-600 mt-1">{demand.duration}</p>
          <p className="text-sm text-gray-600">
            {demand.startDate} - {demand.endDate}
          </p>
          <p className="text-xs text-orange-600 font-medium mt-1">
            Need to start in {demand.startIn}
          </p>
        </div>
      </div>
      
      <div className="border-t pt-3">
        <div className="flex justify-between text-sm text-gray-600">
          <div>
            <span className="font-medium">Assigned Channel:</span> NA
          </div>
          <div>
            <span className="font-medium">Technical Vetting:</span> NA
          </div>
        </div>
        <button className="w-full mt-3 text-center text-blue-600 text-sm font-medium hover:text-blue-800">
          Show more
        </button>
      </div>
    </div>
  );
};

export default DemandCard;