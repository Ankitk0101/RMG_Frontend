import React, { useState } from 'react';
import DemandCard from '../components/Demands/DemandCard';
import DemandList from '../components/Demands/DemandList';
import RequirementDetail from '../components/Demands/RequirementDetail';

const DemandsPage = () => {
  const [selectedDemand, setSelectedDemand] = useState(null);
  
  const demands = [
    {
      id: '39303',
      client: 'Shriram B',
      company: 'Huber Group',
      leadSource: 'LinkedIn connect Rashi 2025',
      salesPerson: 'Rashi Sharma',
      salesRole: 'Sales(s/w local)',
      date: '29 Oct 25, 01:58 PM',
      status: 'Unsold',
      level: 'Senior (3+)',
      category: 'Database, full time',
      hours: '8 hours',
      budget: '185000 INR',
      frequency: 'Monthly',
      location: 'Onsite',
      band: 'B3',
      duration: '6 months',
      startDate: '31 Oct, 25',
      endDate: '30 Apr, 26',
      startIn: '3 day(s)',
      profiles: 0,
      premium: true,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Demands</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add New Demand
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Filter
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <DemandList 
            demands={demands}
            onSelectDemand={setSelectedDemand}
            selectedId={selectedDemand?.id}
          />
        </div>
        <div>
          {selectedDemand ? (
            <RequirementDetail demand={selectedDemand} />
          ) : (
            <div className="bg-white rounded-xl shadow p-6 h-full flex items-center justify-center">
              <p className="text-gray-500">Select a demand to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemandsPage;