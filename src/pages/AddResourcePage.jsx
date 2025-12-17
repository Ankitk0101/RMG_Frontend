import React, { useState } from 'react';
import AddResourceForm from '../components/Forms/AddResourceForm';
import  {addResources } from '../services/resourceApi'



// Empty form data structure
const emptyFormData = {
  resourceDemandInfo: {
    demandCategory: "",
    noOfResource: "",
    demandLevel: "",
    engagement: "",
    demandTechnologyName: "",
    demandSubTechnologyName: "",
    demandType: ""
  },
  contractDetails: {
    clientNeed: "",
    contractType: "",
    workingDays: "",
    workingTiming: "",
    workingLocation: "",
    workingMode: "",
    laptopProvideBy: "",
    isBGVRequired: "",
    clientBGV_Verify: "",
    BGVNote: ""
  },
  demandJobDetails: {
    jobDescription: ""
  },
  demandDurationInfo: {
    billingStartDate: "",
    billingEndDate: "",
    tentativeDuration: "",
    demandDurationNote: "",
    uniqueId: ""
  },
  demandBudgetInfo: {
    budgetType: "",
    demandBudgetBillingStartDate: "",
    currency: "",
    demandBudgetNote: "",
    budget: "",
    profitMargin: "",
    payoutType: ""
  },
  demandInterviewDetails: {
    modeOfInterview: "",
    interviewNote: "",
    budgetStatus: "",
    techProfile: "",
    contractToHire: "",
    paymentConfirmation: "",
    requirementResource: "",
    nameOfTheSalesPerson: "",
    resourceStatus: ""
  },
  companyDetails: {
    clientName: "",
    clientLinkedId: ""
  },
  clientDetails: {
    leadName: "",
    leadContact: "",
    experienceLevel: ""
  },
  // Add file uploads section
  fileUploads: {
    paymentConfirmationFile: null,
    supportingDocuments: [],
    uploadNotes: ""
  }
};

const AddResourcePage = () => {
  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Resource Demand Info validations
    if (!formData.resourceDemandInfo.demandCategory) {
      newErrors.demandCategory = 'Demand Category is required';
    }
    if (!formData.resourceDemandInfo.noOfResource || formData.resourceDemandInfo.noOfResource <= 0) {
      newErrors.noOfResource = 'Number of resources must be greater than 0';
    }
    if (!formData.resourceDemandInfo.demandTechnologyName) {
      newErrors.demandTechnologyName = 'Demand Technology is required';
    }
    if (!formData.resourceDemandInfo.demandLevel) {
      newErrors.demandLevel = 'Demand Level is required';
    }
    if (!formData.resourceDemandInfo.engagement) {
      newErrors.engagement = 'Engagement type is required';
    }
    if (!formData.resourceDemandInfo.demandType) {
      newErrors.demandType = 'Demand Type is required';
    }
    
    // Contract Details validations
    if (!formData.contractDetails.clientNeed) {
      newErrors.clientNeed = 'Client Need is required';
    }
    if (!formData.contractDetails.workingLocation) {
      newErrors.workingLocation = 'Working Location is required';
    }
    if (!formData.contractDetails.contractType) {
      newErrors.contractType = 'Contract Type is required';
    }
    if (!formData.contractDetails.workingDays) {
      newErrors.workingDays = 'Working Days is required';
    }
    if (!formData.contractDetails.workingTiming) {
      newErrors.workingTiming = 'Working Timing is required';
    }
    if (!formData.contractDetails.workingMode) {
      newErrors.workingMode = 'Working Mode is required';
    }
    if (!formData.contractDetails.isBGVRequired) {
      newErrors.isBGVRequired = 'BGV Requirement is required';
    }
    if (!formData.contractDetails.clientBGV_Verify) {
      newErrors.clientBGV_Verify = 'Client BGV Verification is required';
    }
    
    // Demand Job Details validations
    if (!formData.demandJobDetails.jobDescription) {
      newErrors.jobDescription = 'Job Description is required';
    }
    
    // Demand Duration validations
    if (!formData.demandDurationInfo.billingStartDate) {
      newErrors.billingStartDate = 'Billing Start Date is required';
    }
    
    // Demand Budget validations
    if (!formData.demandBudgetInfo.budget || formData.demandBudgetInfo.budget <= 0) {
      newErrors.budget = 'Valid budget is required';
    }
    if (!formData.demandBudgetInfo.budgetType) {
      newErrors.budgetType = 'Budget Type is required';
    }
    if (!formData.demandBudgetInfo.currency) {
      newErrors.currency = 'Currency is required';
    }
    
    // Company Details validations
    if (!formData.companyDetails.clientName) {
      newErrors.clientName = 'Client Name is required';
    }
    
    // Demand Interview Details validations
    if (!formData.demandInterviewDetails.modeOfInterview) {
      newErrors.modeOfInterview = 'Interview Mode is required';
    }
    if (!formData.demandInterviewDetails.techProfile) {
      newErrors.techProfile = 'Technical Profile is required';
    }
    if (!formData.demandInterviewDetails.contractToHire) {
      newErrors.contractToHire = 'Contract to Hire status is required';
    }
    if (!formData.demandInterviewDetails.paymentConfirmation) {
      newErrors.paymentConfirmation = 'Payment Confirmation is required';
    }
    if (!formData.demandInterviewDetails.requirementResource) {
      newErrors.requirementResource = 'Requirement Resource timeline is required';
    }
    if (!formData.demandInterviewDetails.nameOfTheSalesPerson) {
      newErrors.nameOfTheSalesPerson = 'Sales Person Name is required';
    }
    if (!formData.demandInterviewDetails.resourceStatus) {
      newErrors.resourceStatus = 'Resource Status is required';
    }
    
    // Special validation for L2 Payment Confirmation
    if (formData.demandInterviewDetails.paymentConfirmation === 'L2') {
      if (!formData.fileUploads?.paymentConfirmationFile) {
        newErrors.paymentConfirmationFile = 'Payment confirmation document is required for L2';
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log("array for errro",Object.keys(errors))
      let errorarray=Object.keys(errors)
      console.log(errorarray)
     alert(`fill this field - ${errorarray[0]}`);
      console.log(errorarray[0]);
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Prepare form data for API submission
      const submitData = {
        ...formData,
        // Convert files to base64 or prepare for upload
        fileUploads: {
          ...formData.fileUploads,
          hasFiles: formData.fileUploads.paymentConfirmationFile !== null || 
                   formData.fileUploads.supportingDocuments.length > 0
        }
      };
      
      console.log('Submitting form data:', submitData);
      
      // submiting data to API call
       addResources(formData)
      
      alert('Resource added successfully!');
      
      // Reset form
      setFormData(emptyFormData);
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add resource. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
   
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Special handler for file uploads
  const handleFileUpload = (field, files) => {
    setFormData(prev => ({
      ...prev,
      fileUploads: {
        ...prev.fileUploads,
        [field]: files
      }
    }));
  };

 

  const handleResetForm = () => {
    if (window.confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
      setFormData(emptyFormData);
      setErrors({});
      alert('Form reset successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add a resource</h1>
          <p className="text-gray-600">Pending request for requirement of new resources</p>
        </div>
        <div className="flex gap-3">
          <button 
            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
            onClick={handleResetForm}
          >
            Reset
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>

     
      
      <AddResourceForm 
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default AddResourcePage;