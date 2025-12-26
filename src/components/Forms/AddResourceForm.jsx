import React, { useState, useRef, useEffect } from "react";
import FormInput from "./FormInput";

const AddResourceForm = ({
  formData = {},
  errors = {},
  onInputChange = () => { },
  onFileUpload = () => { },
}) => {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const inputRefs = useRef({});



  useEffect(() => {
    const errorKeys = Object.keys(errors);

    if (errorKeys.length > 0) {
      const firstErrorField = errorKeys[0];
      const element = inputRefs.current[firstErrorField];

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        element.focus();
      }
    }
  }, [errors]);

  // Check if L2 is selected for file upload condition
  const showFileUpload =
    formData.demandBudgetInfo?.paymentConformation === "L2";

  const handleFileUpload = (field, files) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [field]: files,
    }));
    // Pass to parent component
    if (onFileUpload) {
      onFileUpload(field, files);
    }
  };

  const sections = [
    {
      title: "Resource Demand Information",
      key: "resourceDemandInfo",
      columns: [
        [
          {
            label: "Demand Category",
            type: "select",
            field: "demandCategory",
            value: formData.resourceDemandInfo?.demandCategory || "",
            error: errors.demandCategory,
            options: [
              "",
              "IT",
              "Non-IT",
              "Engineering",
              "Healthcare",
              "Finance",
              "Other",
            ],
            required: true,
          },
          {
            label: "No. of resources needed",
            type: "number",
            field: "noOfResource",
            value: formData.resourceDemandInfo?.noOfResource || "",
            error: errors.noOfResource,
            min: 1,
            max: 100,
            placeholder: "Enter number of resources",
            required: true,
          },
          {
            label: "Demand Technology",
            type: "select",
            field: "demandTechnologyName",
            value: formData.resourceDemandInfo?.demandTechnologyName || "",
            error: errors.demandTechnologyName,
            options: [
              "",
              "Node.js",
              "React",
              "Python",
              "Java",
              ".NET",
              "Angular",
              "Vue.js",
              "PHP",
              "Ruby",
              "Go",
              "Swift",
              "Kotlin",
              "Flutter",
              "React Native",
            ],
            required: true,
          },
        ],
        [
          {
            label: "Demand Level",
            type: "select",
            field: "demandLevel",
            value: formData.resourceDemandInfo?.demandLevel || "",
            error: errors.demandLevel,
            options: [
              "",
              "Junior (0-2 years)",
              "Mid (2-5 years)",
              "Senior (5-8 years)",
              "Lead (8+ years)",
              "Architect (10+ years)",
            ],
            required: true,
          },

          {
            label: "Engagement",
            type: "select",
            field: "engagement",
            value: formData.resourceDemandInfo?.engagement || "",
            error: errors.engagement,
            options: [
              "",
              "Full Time",
              "Part Time",
              "Contract",
              "Freelance",
              "Internship",
            ],
            required: true,
          },
          {
            label: "Demand Sub-Technology",
            type: "select",
            field: "demandSubTechnologyName",
            value: formData.resourceDemandInfo?.demandSubTechnologyName || "",
            options: [
              "",
              "Express.js",
              "NestJS",
              "Next.js",
              "Django",
              "Spring Boot",
              "Laravel",
              "Rails",
              "ASP.NET",
              "Flask",
              "FastAPI",
            ],
            placeholder: "Select sub-technology if applicable",
          },
          {
            label: "Demand Type",
            type: "select",
            field: "demandType",
            value: formData.resourceDemandInfo?.demandType || "",
            error: errors.demandType,
            options: [
              "",
              "Contract",
              "Permanent",
              "Temp to Perm",
              "Project Based",
            ],
            required: true,
          },
        ],
      ],
    },
    {
      title: "Contract Details",
      key: "contractDetails",
      columns: [
        [
          {
            label: "Client Need",
            type: "select",
            field: "clientNeed",
            value: formData.contractDetails?.clientNeed || "",
            error: errors.clientNeed,
            options: [
              "",
              "Immediate",
              "Urgent (1-2 weeks)",
              "Normal (2-4 weeks)",
              "Future (1+ month)",
            ],
            required: true,
          },

          {
            label: "Working Days",
            type: "select",
            field: "workingDays",
            value: formData.contractDetails?.workingDays || "",
            error: errors.workingDays,
            options: ["", "5 days", "6 days", "Flexible"],
            required: true,
          },
          {
            label: "Contract Type",
            type: "select",
            field: "contractType",
            value: formData.contractDetails?.contractType || "",
            error: errors.contractType,
            options: ["", "Full Time", "Part Time", "Contract", "Consultancy"],
            required: true,
          },
        ],
        [
          {
            label: "Working Location",
            type: "select",
            field: "workingLocation",
            value: formData.contractDetails?.workingLocation || "",
            error: errors.workingLocation,
            options: ["", "Remote", "Onsite", "Hybrid"],
            required: true,
          },
          {
            label: "Working Mode",
            type: "select",
            field: "workingMode",
            value: formData.contractDetails?.workingMode || "",
            error: errors.workingMode,
            options: ["", "WFH", "WFO", "Hybrid"],
            required: true,
          },
          {
            label: "Working Timing",
            type: "select",
            field: "workingTiming",
            value: formData.contractDetails?.workingTiming || "",
            error: errors.workingTiming,
            options: [
              "",
              "9AM - 6PM",
              "10AM - 7PM",
              "Flexible",
              "Shift",
              "Night Shift",
            ],
            required: true,
          },
        ],
        [
          {
            label: "Laptop Provide By",
            type: "select",
            field: "laptopProvideBy",
            value: formData.contractDetails?.laptopProvideBy || "",
            options: [
              "",
              "Company",
              "Client",
              "Employee",
              "Not Required",
              "Inspiron",
            ],
          },
          {
            label: "Is BGV Required",
            type: "select",
            field: "isBGVRequired",
            value: formData.contractDetails?.isBGVRequired || "",
            error: errors.isBGVRequired,
            options: ["", "Yes", "No"],
            required: true,
          },
          {
            label: "Client BGV Verify",
            type: "select",
            field: "clientBGV_Verify",
            value: formData.contractDetails?.clientBGV_Verify || "",
            error: errors.clientBGV_Verify,
            options: ["", "Yes", "No"],
            required: true,
          },
        ],
        [
          {
            label: "BGV Note",
            type: "textarea",
            field: "BGVNote",
            value: formData.contractDetails?.BGVNote || "",
            placeholder: "Enter any notes regarding BGV process...",
            rows: 3,
          },
        ],
      ],
    },
    {
      title: "Demand Job Details",
      key: "demandJobDetails",
      columns: [
        [
          {
            label: "Job Description",
            type: "textarea",
            field: "jobDescription",
            value: formData.demandJobDetails?.jobDescription || "",
            error: errors.jobDescription,
            placeholder:
              "Enter detailed job description, responsibilities, and requirements...",
            rows: 6,
            required: true,
          },
        ],
      ],
    },
    {
      title: "Company Details",
      key: "companyDetails",
      columns: [
        [
          {
            label: "Client Name",
            type: "text",
            field: "clientName",
            value: formData.companyDetails?.clientName || "",
            error: errors.clientName,
            placeholder: "Enter client company name",
            required: true,
          },
          {
            label: "Client Linked ID",
            type: "text",
            field: "clientLinkedId",
            value: formData.companyDetails?.clientLinkedId || "",
            placeholder: "Enter client LinkedIn ID or reference",
          },
        ],
      ],
    },
    {
      title: "Client Details",
      key: "clientDetails",
      columns: [
        [
          {
            label: "Lead Name",
            type: "text",
            field: "leadName",
            value: formData.clientDetails?.leadName || "",
            placeholder: "Enter lead contact name",
          },
          {
            label: "Lead Contact",
            type: "tel",
            field: "leadContact",
            value: formData.clientDetails?.leadContact || "",
            placeholder: "Enter contact number (10 digits)",
            pattern: "[0-9]{10}",
          },
          {
            label: "Experience Level",
            type: "select",
            field: "experienceLevel",
            value: formData.clientDetails?.experienceLevel || "",
            options: [
              "",
              "0-2 Years",
              "2-5 Years",
              "5-8 Years",
              "8+ Years",
              "6 Years",
            ],
          },
        ],
      ],
    },
    {
      title: "Demand Start/End Details",
      key: "demandDurationInfo",
      columns: [
        [
          {
            label: "Billing Start Date",
            type: "date",
            field: "billingStartDate",
            value: formData.demandDurationInfo?.billingStartDate || "",
            error: errors.billingStartDate,
            required: true,
          },
          {
            label: "Billing End Date",
            type: "date",
            field: "billingEndDate",
            value: formData.demandDurationInfo?.billingEndDate || "",
          },
        ],
        [
          {
            label: "Tentative Duration",
            type: "select",
            field: "tentativeDuration",
            value: formData.demandDurationInfo?.tentativeDuration || "",
            options: [
              "",
              "1 Month",
              "3 Months",
              "6 Months",
              "1 Year",
              "Flexible",
              "Project Based",
            ],
          },
        ],
        [
          {
            label: "Demand Duration Note",
            type: "textarea",
            field: "demandDurationNote",
            value: formData.demandDurationInfo?.demandDurationNote || "",
            placeholder: "Enter any notes regarding project duration...",
            rows: 3,
          },
        ],
      ],
    },
    {
      title: "Demand Budget",
      key: "demandBudgetInfo",
      columns: [
        [
          {
            label: "Budget Type",
            type: "select",
            field: "budgetType",
            value: formData.demandBudgetInfo?.budgetType || "",
            error: errors.budgetType,
            options: [
              "",
              "Monthly",
              "Hourly",
              "Project Based",
              "Annual",
              "Fixed",
            ],
            required: true,
          },
          {
            label: "Budget Currency",
            type: "select",
            field: "currency",
            value: formData.demandBudgetInfo?.currency || "",
            error: errors.currency,
            options: ["", "INR", "USD", "EUR", "GBP", "AUD", "CAD"],
            required: true,
          },
          {
            label: "Budget",
            type: "number",
            field: "budget",
            value: formData.demandBudgetInfo?.budget || "",
            error: errors.budget,
            placeholder: "Enter budget amount",
            min: 0,
            step: 1000,
            required: true,
          },
        ],
        [
          {
            label: "Profit Margin (%)",
            type: "number",
            field: "profitMargin",
            value: formData.demandBudgetInfo?.profitMargin || "",
            placeholder: "Enter profit margin percentage",
            min: 0,
            max: 100,
            step: 0.5,
          },
          {
            label: "Payout Type",
            type: "select",
            field: "payoutType",
            value: formData.demandBudgetInfo?.payoutType || "",
            options: [
              "",
              "Monthly",
              "Bi-weekly",
              "Weekly",
              "Project Milestone",
              "On Completion",
            ],
          },
          {
            label: "Budget Billing Start Date",
            type: "date",
            field: "demandBudgetBillingStartDate",
            value:
              formData.demandBudgetInfo?.demandBudgetBillingStartDate || "",
          },
        ],
        [
          {
            label: "Payment Confirmation",
            type: "select",
            field: "paymentConformation",
            value: formData.demandBudgetInfo?.paymentConformation || "",
            error: errors.paymentConformation,
            options: ["", "L1", "L2"],
            required: true,
          },
        ],
        [
          {
            label: "Budget Note",
            type: "textarea",
            field: "demandBudgetNote",
            value: formData.demandBudgetInfo?.demandBudgetNote || "",
            placeholder: "Enter any notes regarding budget...",
            rows: 3,
          },
        ],
      ],
    },
    {
      title: "Demand Interview Details",
      key: "demandInterviewDetails",
      columns: [
        [
          {
            label: "Mode of Interview",
            type: "select",
            field: "modeOfInterview",
            value: formData.demandInterviewDetails?.modeOfInterview || "",
            error: errors.modeOfInterview,
            options: [
              "",
              "Online",
              "In-person",
              "Phone",
              "Hybrid",
              "Video Call",
            ],
            required: true,
          },
          {
            label: "Interview Note",
            type: "textarea",
            field: "interviewNote",
            value: formData.demandInterviewDetails?.interviewNote || "",
            placeholder:
              "Enter interview process details, rounds, and schedule...",
            rows: 4,
          },
        ],
        [
          {
            label: "Budget Status",
            type: "select",
            field: "budgetStatus",
            value: formData.demandInterviewDetails?.budgetStatus || "",
            error: errors.budgetStatus,
            options: [
              "",
              "Approved",
              "Pending",
              "In Review",
              "Rejected",
              "Negotiation",
            ],
            required: false,
          },
          {
            label: "Technical Profile",
            type: "text",
            field: "techProfile",
            value: formData.demandInterviewDetails?.techProfile || "",
            error: errors.techProfile,
            placeholder: "Enter technical profile title",
            required: true,
          },
        ],
        [
          {
            label: "Contract to Hire",
            type: "select",
            field: "contractToHire",
            value: formData.demandInterviewDetails?.contractToHire || "",
            error: errors.contractToHire,
            options: ["", "Yes", "No"],
            required: true,
          },
          {
            label: "Requirement Resource",
            type: "select",
            field: "requirementResource",
            value: formData.demandInterviewDetails?.requirementResource || "",
            error: errors.requirementResource,
            options: [
              "",
              "Immediate",
              "15 Days",
              "30 Days",
              "60 Days",
              "90 Days",
              "Flexible",
            ],
            required: true,
          },
          {
            label: "Resource Status",
            type: "select",
            field: "resourceStatus",
            value: formData.demandInterviewDetails?.resourceStatus || "",
            error: errors.resourceStatus,
            options: ["Not Started", "In Progress", "Completed"],
            required: true,
          },
        ],
        [
          {
            label: "Sales Person Name",
            type: "text",
            field: "nameOfTheSalesPerson",
            value: formData.demandInterviewDetails?.nameOfTheSalesPerson || "",
            error: errors.nameOfTheSalesPerson,
            placeholder: "Enter sales person name",
            required: true,
          },
        ],
      ],
    },
  ];

  const handleFieldChange = (sectionKey, field, value) => {
    onInputChange(sectionKey, field, value);
  };

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6 space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border-b pb-8 last:border-b-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              {section.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.columns.map((column, colIndex) => (
                <div key={colIndex} className="space-y-4">
                  {column.map((field, fieldIndex) => (
                    <div key={fieldIndex}>
                      <FormInput
                        {...field}
                        inputRef={(el) => {
                          if (el) inputRefs.current[field.field] = el;
                        }}
                        onChange={(value) =>
                          handleFieldChange(section.key, field.field, value)
                        }
                      />

                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Conditional File Upload Section for L2 Payment Confirmation */}
            {section.key === "demandBudgetInfo" && showFileUpload && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-md font-semibold text-blue-800 mb-3">
                  L2 Payment Confirmation - Document Upload
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Payment Confirmation Document*
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-blue-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-blue-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label
                            htmlFor="payment-confirmation-file"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="payment-confirmation-file"
                              name="payment-confirmation-file"
                              type="file"
                              className="sr-only"
                              onChange={(e) =>
                                handleFileUpload(
                                  "paymentConfirmationDocumentPath",
                                  e.target.files
                                )
                              }
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, DOC, JPG, PNG up to 10MB
                        </p>
                      </div>
                    </div>
                    {errors.paymentConfirmationDocumentPath && (
                      <p className="text-sm text-red-600 mt-2">
                        {errors.paymentConfirmationDocumentPath}
                      </p>
                    )}
                    {uploadedFiles.paymentConfirmationDocumentPath && (
                      <div className="mt-3">
                        <p className="text-sm text-green-600 font-medium">
                          ✓ File selected:{" "}
                          {
                            uploadedFiles.paymentConfirmationDocumentPath[0]
                              ?.name
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddResourceForm;
