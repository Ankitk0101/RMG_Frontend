import React from 'react';
import AddResourceForm from '../components/Forms/AddResourceForm';

const AddResourcePage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add a resource</h1>
          <p className="text-gray-600">Pending request for requirement of new resources</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit
          </button>
        </div>
      </div>
      
      <AddResourceForm />
    </div>
  );
};

export default AddResourcePage;