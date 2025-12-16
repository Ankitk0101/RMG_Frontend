import React from 'react';

const DemandTable = () => {
  const tableData = [
    {
      month: 'Oct-25',
      demandAdded: '682',
      client: '258',
      lead: '359',
      pending: '33',
      keepOnHold: '27',
      inactiveClosed: '5',
      couldNotFulfill: '447',
      noAction: '0',
      fulfilled: '154'
    }
  ];

  const columns = [
    { key: 'month', label: 'Month' },
    { key: 'demandAdded', label: 'Demand Added' },
    { key: 'client', label: 'Client' },
    { key: 'lead', label: 'Lead' },
    { key: 'pending', label: 'Pending' },
    { key: 'keepOnHold', label: 'Keep on hold' },
    { key: 'inactiveClosed', label: 'Inactive/closed' },
    { key: 'couldNotFulfill', label: 'Could not fulfill' },
    { key: 'noAction', label: 'No Action' },
    { key: 'fulfilled', label: 'Fulfilled' }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              St. No
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  <span className={
                    column.key === 'fulfilled' ? 'text-green-600 font-semibold' :
                    column.key === 'couldNotFulfill' ? 'text-red-600 font-semibold' :
                    'text-gray-900'
                  }>
                    {row[column.key]}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemandTable;