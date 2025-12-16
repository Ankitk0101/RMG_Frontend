import React from 'react';
import FormInput from './FormInput';

const AddResourceForm = () => {
  const sections = [
    {
      title: 'Resource Demand Information',
      columns: [
        [
          { label: 'Demand Category*', type: 'select' },
          { label: 'No. of resources needed*', type: 'select' },
          { label: 'Demand Technology*', type: 'select' },
        ],
        [
          { label: 'Demand Type*', type: 'select' },
          { label: 'Demand Business Technology*', type: 'select' },
          { label: 'Work Timing*', type: 'select' },
        ]
      ]
    },
    {
      title: 'Contract Details',
      columns: [
        [
          { label: 'Client Need*', type: 'select' },
          { label: 'Working Paper*', type: 'select' },
          { label: 'Contract Type*', type: 'select' },
        ],
        [
          { label: 'Working Location*', type: 'select' },
          { label: 'Working Mode*', type: 'select' },
          { label: 'Laptop Provide*', type: 'select' },
        ]
      ]
    },
    {
      title: 'Demand Job Details',
      columns: [
        [
          { label: 'Primary Staff*', type: 'select' },
          { label: 'Job Description*', type: 'textarea' },
        ],
        [
          { label: 'Secondary Staff*', type: 'select' },
        ]
      ]
    },
    {
      title: 'Demand Start/End Details',
      columns: [
        [
          { 
            label: 'Sitting start date*',
            description: 'If more than 1 demand are there then it is not too start to start at the start OR all needs start on the same date*',
            type: 'date',
            options: [
              { label: 'All on the same day', type: 'checkbox' },
              { label: 'Suggesting is accepted', type: 'checkbox' }
            ]
          },
        ],
        [
          { label: 'Tentative Duration', type: 'select' },
          { label: 'Sitting End Date*', type: 'date' },
          { label: 'Notes/Remarks', type: 'textarea' },
        ]
      ]
    },
    {
      title: 'Demand Budget',
      columns: [
        [
          { label: 'Type*', type: 'select' },
          { label: 'Budget Model Remarks', type: 'textarea' },
        ],
        [
          { label: 'Sitting start date*', type: 'date' },
          { label: 'Budget currency*', type: 'select' },
          { label: 'Budget', type: 'number' },
        ],
        [
          { label: 'Profit Margin', type: 'number' },
          { label: 'Payout Type', type: 'select' },
        ]
      ]
    },
    {
      title: 'Demand Interview Details',
      columns: [
        [
          { 
            label: 'Mode of interview (which client is installing only by far no interviews) or insert signer or phone',
            type: 'select'
          },
          { label: 'Interview details Notes/Remarks', type: 'textarea' },
        ],
        [
          { 
            label: 'Checked with sales, budget is approved from client/three*',
            type: 'select'
          },
          { 
            label: 'Payment Terms & Agreed takes confirmation on email for server*',
            type: 'select'
          },
        ],
        [
          { 
            label: 'If full stack or .0D, then try to convince client/three! for splitting .10 into 2 profiles*',
            type: 'select'
          },
          { label: 'Requirement resource are for*', type: 'select' },
          { label: 'Is this contract to hire*', type: 'select' },
        ]
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6 space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border-b pb-8 last:border-b-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.columns.map((column, colIndex) => (
                <div key={colIndex} className="space-y-4">
                  {column.map((field, fieldIndex) => (
                    <FormInput key={fieldIndex} {...field} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddResourceForm;