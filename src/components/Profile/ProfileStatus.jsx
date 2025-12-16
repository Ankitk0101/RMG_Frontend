import React from 'react';

const ProfileStatus = () => {
  const statusTypes = [
    { type: 'Internal', profiles: 0, cvSelected: 0, cvRejected: 0, cvIgnored: 0, cvAwaiting: 0, interviewSelected: 0, interviewRejected: 0, interviewPending: 0 },
    { type: 'JIT', profiles: 4, cvSelected: 4, cvRejected: 4, cvIgnored: 4, cvAwaiting: 4, interviewSelected: 4, interviewRejected: 4, interviewPending: 4 }
  ];

  const metrics = [
    'Profiles',
    'CV Selected',
    'CV Rejected',
    'CV Ignored',
    'CV Awaiting',
    'Interview Selected',
    'Interview Rejected',
    'Interview Pending'
  ];

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Profile Status</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">#3903 Lead Id</span>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Submit
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                {statusTypes.map((status) => (
                  <th
                    key={status.type}
                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {status.type}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {metrics.map((metric, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {metric}
                  </td>
                  {statusTypes.map((status, statusIndex) => (
                    <td
                      key={statusIndex}
                      className="px-4 py-3 text-center text-sm"
                    >
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        metric === 'CV Selected' || metric === 'Interview Selected' ? 'bg-green-100 text-green-800' :
                        metric === 'CV Rejected' || metric === 'Interview Rejected' ? 'bg-red-100 text-red-800' :
                        metric === 'CV Awaiting' || metric === 'Interview Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {status[metric.toLowerCase().replace(' ', '')]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-800">8</p>
              <p className="text-sm text-gray-600">Total Profiles</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-800">4</p>
              <p className="text-sm text-gray-600">Selected</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-800">4</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-800">4</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatus;