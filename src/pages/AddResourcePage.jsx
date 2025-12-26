import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddResourceForm from "../components/Forms/AddResourceForm";
import { addResources } from "../services/resourceApi";

// Empty form data structure - UPDATED to match the provided fields
const emptyFormData = {
  resourceDemandInfo: {
    demandCategory: "",
    noOfResource: "",
    demandLevel: "",
    engagement: "",
    demandTechnologyName: "",
    demandSubTechnologyName: "",
    demandType: "",
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
    BGVNote: "",
  },
  demandJobDetails: {
    jobDescription: "",
  },
  companyDetails: {
    clientName: "",
    clientLinkedId: "",
  },
  clientDetails: {
    leadName: "",
    leadContact: "",
    experienceLevel: "",
  },
  demandDurationInfo: {
    billingStartDate: "",
    billingEndDate: "",
    tentativeDuration: "",
    demandDurationNote: "",
  },
  demandBudgetInfo: {
    budgetType: "",
    demandBudgetBillingStartDate: "",
    currency: "",
    demandBudgetNote: "",
    budget: "",
    profitMargin: "",
    payoutType: "",
    paymentConformation: "",
    paymentConformationDocumentPath: "",
  },
  demandInterviewDetails: {
    modeOfInterview: "",
    interviewNote: "",
    budgetStatus: "",
    techProfile: "",
    contractToHire: "",
    requirementResource: "",
    nameOfTheSalesPerson: "",
    resourceStatus: "",
  },
  // File uploads section
  fileUploads: {
    paymentConfirmationDocumentPath: null,
    supportingDocuments: [],
  },
};

const AddResourcePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    // Resource Demand Info validations
    if (!formData.resourceDemandInfo.demandCategory) {
      newErrors.demandCategory = "Demand Category is required";
    }
    if (
      !formData.resourceDemandInfo.noOfResource ||
      formData.resourceDemandInfo.noOfResource <= 0
    ) {
      newErrors.noOfResource = "Number of resources must be greater than 0";
    }
    if (!formData.resourceDemandInfo.demandTechnologyName) {
      newErrors.demandTechnologyName = "Demand Technology is required";
    }
    if (!formData.resourceDemandInfo.demandLevel) {
      newErrors.demandLevel = "Demand Level is required";
    }
    if (!formData.resourceDemandInfo.engagement) {
      newErrors.engagement = "Engagement type is required";
    }
    if (!formData.resourceDemandInfo.demandType) {
      newErrors.demandType = "Demand Type is required";
    }

    // Contract Details validations
    if (!formData.contractDetails.clientNeed) {
      newErrors.clientNeed = "Client Need is required";
    }
    if (!formData.contractDetails.workingLocation) {
      newErrors.workingLocation = "Working Location is required";
    }
    if (!formData.contractDetails.contractType) {
      newErrors.contractType = "Contract Type is required";
    }
    if (!formData.contractDetails.workingDays) {
      newErrors.workingDays = "Working Days is required";
    }
    if (!formData.contractDetails.workingTiming) {
      newErrors.workingTiming = "Working Timing is required";
    }
    if (!formData.contractDetails.workingMode) {
      newErrors.workingMode = "Working Mode is required";
    }
    if (!formData.contractDetails.isBGVRequired) {
      newErrors.isBGVRequired = "BGV Requirement is required";
    }
    if (!formData.contractDetails.clientBGV_Verify) {
      newErrors.clientBGV_Verify = "Client BGV Verification is required";
    }

    // Demand Job Details validations
    if (!formData.demandJobDetails.jobDescription) {
      newErrors.jobDescription = "Job Description is required";
    }

    // Demand Duration validations
    if (!formData.demandDurationInfo.billingStartDate) {
      newErrors.billingStartDate = "Billing Start Date is required";
    }

    // Demand Budget validations
    if (
      !formData.demandBudgetInfo.budget ||
      formData.demandBudgetInfo.budget <= 0
    ) {
      newErrors.budget = "Valid budget is required";
    }
    if (!formData.demandBudgetInfo.budgetType) {
      newErrors.budgetType = "Budget Type is required";
    }
    if (!formData.demandBudgetInfo.currency) {
      newErrors.currency = "Currency is required";
    }
    if (!formData.demandBudgetInfo.paymentConformation) {
      newErrors.paymentConformation = "Payment Confirmation is required";
    }

    // Company Details validations
    if (!formData.companyDetails.clientName) {
      newErrors.clientName = "Client Name is required";
    }

    // Demand Interview Details validations
    if (!formData.demandInterviewDetails.modeOfInterview) {
      newErrors.modeOfInterview = "Interview Mode is required";
    }
    if (!formData.demandInterviewDetails.techProfile) {
      newErrors.techProfile = "Technical Profile is required";
    }
    if (!formData.demandInterviewDetails.contractToHire) {
      newErrors.contractToHire = "Contract to Hire status is required";
    }
    if (!formData.demandInterviewDetails.requirementResource) {
      newErrors.requirementResource =
        "Requirement Resource timeline is required";
    }
    if (!formData.demandInterviewDetails.nameOfTheSalesPerson) {
      newErrors.nameOfTheSalesPerson = "Sales Person Name is required";
    }
    if (!formData.demandInterviewDetails.resourceStatus) {
      newErrors.resourceStatus = "Resource Status is required";
    }

    // Special validation for L2 Payment Confirmation
 if (formData.demandBudgetInfo.paymentConformation === "L2") {
  const files = formData.fileUploads?.paymentConfirmationDocumentPath;
  if (!files || files.length === 0) {
    newErrors.paymentConfirmationDocumentPath =
      "Payment confirmation document is required for L2";
  }
}

   setErrors(newErrors);

  return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("call handle ")
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) return;

  setIsSubmitting(true);

  try {
    const payload = new FormData();

    // JSON data (without files)
    const jsonData = {
      ...formData,
      fileUploads: undefined,
    };

    payload.append("data", JSON.stringify(jsonData));

    // File only if L2
    if (
      formData.demandBudgetInfo.paymentConformation === "L2" &&
      formData.fileUploads?.paymentConfirmationDocumentPath?.length > 0
    ) {
      payload.append(
        "paymentConfirmationDocument",
        formData.fileUploads.paymentConfirmationDocumentPath[0]
      );
    }
    console.log("Form Data in add Resource Page befor sending data to addResources ->  " , formData)
     console.log("this pay load data value",payload)
     const result = await addResources(payload);

    if (result.success) {
      alert("Resource added successfully!");
      navigate("/iteration");
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error(error);
    alert("Unexpected error");
  } finally {
    setIsSubmitting(false);
  }
};




  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Special handler for file uploads
  const handleFileUpload = (field, files) => {
    setFormData((prev) => ({
      ...prev,
      fileUploads: {
        ...(prev.fileUploads || {}),
        [field]: files,
      },
    }));

    // Clear file upload error if exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleResetForm = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the form? All entered data will be lost."
      )
    ) {
      setFormData(emptyFormData);
      setErrors({});
      setSubmitMessage("");
      alert("Form reset successfully!");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Success/Error Message */}
      {submitMessage === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          Resource added successfully!
        </div>
      )}

      {submitMessage === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          Failed to add resource. Please try again.
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add a resource</h1>
          <p className="text-gray-600">
            Pending request for requirement of new resources
          </p>
        </div>
      </div>

      <AddResourceForm
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
        onFileUpload={handleFileUpload}
      />

      {/* Form Action Buttons at Bottom */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          className="px-6 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer font-medium"
          onClick={handleResetForm}
          type="button"
        >
          Reset Form
        </button>
        <button
          className="px-10 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg cursor-pointer font-medium"
          onClick={handleSubmit}
          disabled={isSubmitting}
          type="button"
        >
          {isSubmitting ? "Submitting..." : "Submit Resource"}
        </button>
      </div>
    </div>
  );
};

export default AddResourcePage;
