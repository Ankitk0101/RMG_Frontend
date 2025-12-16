import React from 'react';
import { Building, User, Calendar, Tag, Award } from 'lucide-react';

const ClientHeader = ({ client }) => {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Building size={20} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Client</span>
              <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded">
                #{client.id}
              </span>
            </div>
            
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{client.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-600">{client.company}</span>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded">1/2</span>
              </div>
              <p className="text-sm text-blue-600 mt-1">{client.campaign}</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800">{client.salesPerson}</p>
                  <p className="text-sm text-gray-600">{client.salesRole}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800">Created</p>
                  <p className="text-sm text-gray-600">{client.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800">Lead ID</p>
                  <p className="text-sm text-gray-600">{client.leadId}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:text-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <Award size={20} className="text-blue-600" />
              <div>
                <p className="font-bold text-lg">Premium</p>
                <p className="text-sm text-gray-600">Client Tier</p>
              </div>
            </div>
            
            <div className="mt-4 flex lg:justify-end gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                Edit Client
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                View History
              </button>
            </div>
          </div>
        </div>
        
        {/* Status Tabs */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex gap-6">
            {[
              { label: 'Active Demands', count: 2, color: 'text-green-600' },
              { label: 'Pending Demands', count: 0, color: 'text-yellow-600' },
              { label: 'Closed Demands', count: 3, color: 'text-gray-600' },
              { label: 'Total Revenue', value: '₹1,850,000', color: 'text-blue-600' }
            ].map((tab, index) => (
              <button
                key={index}
                className="pb-2 px-1 relative group"
              >
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${tab.color}`}>
                      {tab.count !== undefined ? tab.count : tab.value}
                    </span>
                    <span className="text-sm text-gray-600">{tab.label}</span>
                  </div>
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;