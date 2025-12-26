import React, { useState } from 'react';
import { HelpCircle, AlertCircle, Upload, X } from 'lucide-react';

const FormInput = ({
  label,
  description,
  type = 'text',
  field,
  value,
  error,
  inputRef,
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
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    let newValue;
    if (type === 'file') {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
      newValue = files;
    } else if (type === 'checkbox') {
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

  const handleRemoveFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    if (onChange) {
      onChange(newFiles);
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
    const commonClasses = `w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm ${showError
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
            ref={inputRef}
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
            ref={inputRef}
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
            ref={inputRef}
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
            ref={inputRef}
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
            ref={inputRef}
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

      case 'file':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-center w-full">
              <label htmlFor={`file-upload-${field}`} className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, JPG, PNG up to 10MB</p>
                </div>
                <input
                  id={`file-upload-${field}`}
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                  multiple={props.multiple}
                  accept={props.accept || "*"}
                  required={required}
                />
              </label>
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Selected files:</p>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-800">
                          {file.name.split('.').pop().toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            type={type}
            ref={inputRef}
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
          <label className={`block text-sm font-medium ${showError ? 'text-red-700' : 'text-gray-700'
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