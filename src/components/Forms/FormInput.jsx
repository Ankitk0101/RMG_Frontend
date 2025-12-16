import React from 'react';
import { HelpCircle } from 'lucide-react';

const FormInput = ({ 
  label, 
  description, 
  type = 'text', 
  options = [],
  required = true,
  placeholder = '' 
}) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">Select {label.replace('*', '')}</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24"
            placeholder={placeholder || `Enter ${label.toLowerCase().replace('*', '')}...`}
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={placeholder || `Enter ${label.toLowerCase().replace('*', '')}`}
          />
        );
      
      default:
        return (
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={placeholder || `Enter ${label.toLowerCase().replace('*', '')}`}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {required && <span className="text-red-500">*</span>}
        {description && (
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            title={description}
          >
            <HelpCircle size={16} />
          </button>
        )}
      </div>
      
      {renderInput()}
      
      {/* Options for checkboxes or radio */}
      {options.length > 0 && (
        <div className="space-y-2 mt-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              {option.type === 'checkbox' ? (
                <>
                  <input
                    type="checkbox"
                    id={`option-${index}`}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className="text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </>
              ) : (
                <>
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="option-group"
                    className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className="text-sm text-gray-600"
                  >
                    {option.label}
                  </label>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Description */}
      {description && !options.length && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
};

export default FormInput;