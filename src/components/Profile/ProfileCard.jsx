import React from 'react';
import { User, Briefcase, DollarSign, FileText, Award } from 'lucide-react';

const ProfileCard = ({ profile }) => {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 hover:border-blue-300 transition-colors">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
              <User size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{profile.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">Exp. {profile.experience} years</span>
                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded">
                  Available
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-yellow-600">
              <Award size={16} />
              <span className="text-sm font-medium">{profile.rating || '4.5'}</span>
            </div>
            <button className="mt-2 px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
              View Resume
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-600">Current CTC</p>
              <p className="text-sm font-medium">{profile.currentCTC}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-600">Expected CTC</p>
              <p className="text-sm font-medium">{profile.expectedCTC}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-600">Notice Period</p>
              <p className="text-sm font-medium">{profile.noticePeriod}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-600">Status</p>
              <p className={`text-sm font-medium ${
                profile.status === 'Shortlisted' ? 'text-green-600' :
                profile.status === 'Rejected' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {profile.status}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-xs text-gray-600 mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {profile.skills?.slice(0, 4).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {skill}
              </span>
            ))}
            {profile.skills?.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                +{profile.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
            Select for Interview
          </button>
          <button className="px-3 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;