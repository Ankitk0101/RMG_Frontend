import React from 'react';
import { Briefcase, Clock, MapPin, DollarSign, Users, FileText } from 'lucide-react';

const ClientInfo = ({ client }) => {
  const jobDetails = [
    { icon: <Briefcase size={18} />, label: 'Position', value: 'Senior (3+) Database Engineer' },
    { icon: <Clock size={18} />, label: 'Type', value: 'Full time (8 hours)' },
    { icon: <MapPin size={18} />, label: 'Location', value: 'Onsite - Mumbai' },
    { icon: <DollarSign size={18} />, label: 'Budget', value: '₹185,000 Monthly' },
    { icon: <Users size={18} />, label: 'Resources Needed', value: '2' },
    { icon: <FileText size={18} />, label: 'Status', value: 'Unsold' }
  ];

  const interviewStats = [
    { label: 'Interview conducted', value: '2' },
    { label: 'Selected (L1)', value: '4' },
    { label: 'Selected (L2)', value: '0' },
    { label: 'Final Select', value: '0' },
    { label: 'Waiting to Onboard', value: '0' },
    { label: 'Rejected', value: '2' }
  ];

  return (
    <div className="bg-white rounded-xl shadow mb-6">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Job Information</h2>
        
        {/* Job Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {jobDetails.map((detail, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600">
                {detail.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600">{detail.label}</p>
                <p className="font-medium text-gray-800">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Timeline */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-4">Project Timeline</h3>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-gray-600">31 Oct, 2025</p>
            </div>
            <div className="flex-1 h-1 bg-blue-200 mx-4"></div>
            <div className="text-center">
              <div className="w-3 h-3 bg-green-600 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">End Date</p>
              <p className="text-gray-600">30 Apr, 2026</p>
            </div>
            <div className="flex-1 h-1 bg-blue-200 mx-4"></div>
            <div className="text-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-gray-600">6 months</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
              <Clock size={14} />
              Need to start in 3 days
            </span>
          </div>
        </div>
        
        {/* Interview Statistics */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-4">Interview Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {interviewStats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Assigned Channel */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Assigned Channel</p>
              <p className="font-medium">Sourced- Hiring technologies Pvt Ltd</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Technical Vetting</p>
              <p className="font-medium">NA</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              View All Profiles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;