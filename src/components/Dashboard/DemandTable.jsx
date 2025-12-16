import React from 'react';

const DemandTable = () => {
  const tableData = [
    {
      month: 'Oct-25',
      demandAdded: '682',
      client: '258',
      lead: '359',
      status11: '33',
      status12: '27',
      status13: '5',
      na: '447',
      pending: '0',
      keepOnHold: '154',
      inactiveClosed: '0',
      couldNotFulfill: '81',
      fulfilled: '81',
      noAction: '81'
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Sr. No
            </th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Month
            </th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Demand Added
            </th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Client
            </th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Lead
            </th>
            <th colSpan="3" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Current Status of Demand
            </th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              NA
            </th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Pending
            </th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Keep on hold
            </th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Inactive/closed
            </th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Could not fulfill
            </th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
              Fulfilled
            </th>
            <th rowSpan="2" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No Action
            </th>
          </tr>
          <tr>
            <th className="px-6 py-2 text-center text-xs font-medium text-gray-500 border-r">11</th>
            <th className="px-6 py-2 text-center text-xs font-medium text-gray-500 border-r">12</th>
            <th className="px-6 py-2 text-center text-xs font-medium text-gray-500 border-r">13</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 border-r">
                {row.month}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 border-r">
                {row.demandAdded}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                {row.client}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                {row.lead}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center border-r">
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                  {row.status11}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center border-r">
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                  {row.status12}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center border-r">
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                  {row.status13}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r">
                {row.na}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm border-r">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  parseInt(row.pending) > 0 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {row.pending}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm border-r">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  parseInt(row.keepOnHold) > 0 ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {row.keepOnHold}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm border-r">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  parseInt(row.inactiveClosed) > 0 ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {row.inactiveClosed}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm border-r">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  parseInt(row.couldNotFulfill) > 0 ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {row.couldNotFulfill}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm border-r">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  parseInt(row.fulfilled) > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {row.fulfilled}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  parseInt(row.noAction) > 0 ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {row.noAction}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemandTable;