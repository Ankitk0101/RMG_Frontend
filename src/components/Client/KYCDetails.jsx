import React from 'react';

const KYCDetails = ({ client }) => {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">KYC Details</h2>
        
        {/* Client Info */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-800">{client.name}</h3>
              <p className="text-gray-600">{client.company}</p>
              <p className="text-sm text-blue-600">Campaign: {client.campaign}</p>
              <p className="text-sm text-gray-500">Others</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded">
                {client.leadId}
              </span>
              <p className="text-sm text-gray-500 mt-1">Lead id</p>
            </div>
          </div>
        </div>
        
        {/* Onboarding Process */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3">Onboarding Process</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">1. Laptop will be provided by</span>
              <span className="font-medium">{client.laptopProvidedBy}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">2. BGV report is needed</span>
              <span className="font-medium text-green-600">{client.bgvRequired}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">3. Client is going to do BGV</span>
              <span className="font-medium text-green-600">{client.clientBGV}</span>
            </div>
            <div>
              <span className="text-gray-600">4. Note/Remarks</span>
              <p className="text-sm text-gray-700 mt-1 italic">{client.bgvNotes}</p>
            </div>
          </div>
        </div>
        
        {/* Interview Process */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Interview Process</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">1. Written test is there?</span>
              <span className="font-medium">{client.writtenTest}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">2. No. of interview rounds?</span>
              <span className="font-medium">{client.interviewRounds}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">3. Trial</span>
              <span className="font-medium">{client.trialPeriod}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">4. Outside candidate is allowed?</span>
              <span className="font-medium text-green-600">{client.outsideCandidate}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCDetails;