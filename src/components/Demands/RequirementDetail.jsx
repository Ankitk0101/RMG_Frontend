import React from 'react';

const RequirementDetail = ({ demand }) => {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6">
        {/* Client Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded">Lead (123456)</span>
            <span className="text-sm font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded">L2</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">#{demand.id} {demand.client}</h2>
          <p className="text-gray-600">({demand.company}) (1/2)</p>
          <p className="text-blue-600">{demand.leadSource}</p>
        </div>
        
        {/* Job Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Job description</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-600 font-medium">({demand.status})</span>
              <span className="font-medium">{demand.level}</span>
            </div>
            <p className="text-gray-700">{demand.category}</p>
            <p className="text-sm text-gray-500">({demand.hours})</p>
          </div>
        </div>
        
        {/* Budget */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Budget</h3>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-2xl text-gray-800">{demand.budget}</p>
                <p className="text-gray-600">{demand.frequency}</p>
                <p className="text-gray-600">{demand.location}</p>
              </div>
              <span className="text-lg font-bold px-3 py-1 bg-white border border-gray-300 rounded">
                {demand.band}
              </span>
            </div>
          </div>
        </div>
        
        {/* Profile Status */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Profile Status</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-center mb-2">Internal</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Profiles', 'CV Selected', 'CV Rejected', 'CV Ignored', 'CV Awaiting', 'Interview Selected', 'Interview Rejected', 'Interview Pending'].map((item) => (
                  <div key={item} className="flex justify-between">
                    <span className="text-sm text-gray-600">{item}</span>
                    <span className="font-medium">0</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-center mb-2">JIT</h4>
              <div className="grid grid-cols-2 gap-2">
                {[0, 4, 0, 4, 0, 4, 0, 4].map((value, index) => (
                  <div key={index} className="flex justify-end">
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Duration */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">{demand.duration}</p>
              <p className="text-gray-600">
                {demand.startDate} - {demand.endDate}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Need to start in</p>
              <p className="text-2xl font-bold text-orange-600">{demand.startIn}</p>
            </div>
          </div>
        </div>
        
        {/* BGV Required */}
        <div className="border border-red-200 bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="font-medium text-red-700">BGV required</span>
          </div>
          <p className="text-sm text-red-600">
            BGV report is needed. Client is going to do BGV. The client might do the BGV.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequirementDetail;