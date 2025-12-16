import React from 'react';
import DemandCard from './DemandCard';

const DemandList = ({ demands, onSelectDemand, selectedId }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Demands List</h2>
        <div className="flex gap-2">
          <span className="text-sm text-gray-600">Total: {demands.length}</span>
          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option>Sort by: Latest</option>
            <option>Sort by: Oldest</option>
            <option>Sort by: Budget</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {demands.map((demand) => (
          <DemandCard
            key={demand.id}
            demand={demand}
            isSelected={selectedId === demand.id}
            onClick={() => onSelectDemand(demand)}
          />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        <div className="text-sm text-gray-600">
          Showing 1-{demands.length} of {demands.length} demands
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemandList;