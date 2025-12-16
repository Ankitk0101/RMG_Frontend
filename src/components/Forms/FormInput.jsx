import React, { useState } from 'react';
import { HelpCircle, AlertCircle } from 'lucide-react';

const FormInput = ({ 
  label, 
  description, 
  type = 'text', 
  field,
  value,
  error,
  options = [],
  required = false,
  placeholder = '',
  rows = 3,
  min,
  max,
  step,
  pattern,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e) => {
    let newValue;
    if (type === 'checkbox') {
      newValue = e.target.checked;
    } else if (type === 'number') {
      newValue = e.target.value === '' ? '' : parseFloat(e.target.value);
    } else {
      newValue = e.target.value;
    }
    
    setIsTouched(true);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsTouched(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const showError = isTouched && error;

  const renderInput = () => {
    const commonClasses = `w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${
      showError 
        ? 'border-red-500 focus:ring-red-300 bg-red-50' 
        : isFocused 
          ? 'border-blue-500 focus:ring-blue-300 focus:border-blue-500 bg-white' 
          : 'border-gray-300 bg-gray-50 hover:bg-white'
    }`;

    switch (type) {
      case 'select':
        return (
          <select
            className={commonClasses}
            value={value || ''}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option === '' ? `Select ${label.replace('*', '').toLowerCase()}` : option}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            className={`${commonClasses} resize-vertical`}
            value={value || ''}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            rows={rows}
            required={required}
          />
        );
      
      case 'date':
        return (
          <input
            type="date"
            className={commonClasses}
            value={value || ''}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required={required}
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            className={commonClasses}
            value={value || ''}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            required={required}
          />
        );
      
      case 'tel':
        return (
          <input
            type="tel"
            className={commonClasses}
            value={value || ''}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            pattern={pattern}
            required={required}
          />
        );
      
      default:
        return (
          <input
            type={type}
            className={commonClasses}
            value={value || ''}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            {...props}
          />
        );
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <label className={`block text-sm font-medium ${
            showError ? 'text-red-700' : 'text-gray-700'
          }`}>
            {label}
          </label>
          {required && <span className="text-red-500 ml-0.5">*</span>}
          {description && (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              title={description}
            >
              <HelpCircle size={14} />
            </button>
          )}
        </div>
        {!required && (
          <span className="text-xs text-gray-500">Optional</span>
        )}
      </div>
      
      {renderInput()}
      
      {/* Error message */}
      {showError && (
        <div className="flex items-center gap-1 text-red-600 text-xs mt-1 animate-pulse">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
      
      {/* Character count for textarea */}
      {type === 'textarea' && (
        <div className="text-xs text-gray-500 text-right">
          {value?.length || 0} characters
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