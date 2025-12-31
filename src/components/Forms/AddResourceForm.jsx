import React, { useState, useRef, useEffect } from "react";
import FormInput from "./FormInput";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from 'libphonenumber-js';


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

  const handleFileUpload = (file) => {
    setUploadedFiles({
      paymentConfirmationDocumentPath: file,
    });

    onFileUpload(file);
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
            options: ["", "IT", "Non-IT", "Engineering", "Healthcare", "Finance", "Other"],
            required: true,
          },
          {
            label: "Demand Type",
            type: "select",
            field: "demandType",
            value: formData.resourceDemandInfo?.demandType || "",
            error: errors.demandType,
            options: ["", "Contract", "Permanent", "Temp to Perm", "Project Based"],
            required: true,
          },
          {
            label: "No. of Resources Needed",
            type: "number",
            field: "noOfResource",
            value: formData.resourceDemandInfo?.noOfResource || "",
            error: errors.noOfResource,
            min: 1,
            max: 100,
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
            label: "Engagement Type",
            type: "select",
            field: "engagement",
            value: formData.resourceDemandInfo?.engagement || "",
            error: errors.engagement,
            options: ["", "Full Time", "Part Time", "Contract", "Freelance", "Internship"],
            required: true,
          },
        ],
        [
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
              "Flutter",
              "React Native",
            ],
            required: true,
          },
          {
            label: "Demand Sub Technology",
            type: "select",
            field: "demandSubTechnologyName",
            value: formData.resourceDemandInfo?.demandSubTechnologyName || "",
            error: errors.demandSubTechnologyName,
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
              "FastAPI",
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
            error: errors.laptopProvideBy,
            options: [
              "",
              "Company",
              "Client",
              "Employee",
              "Not Required",
              "Inspiron",
            ],
            required: true
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
            error: errors.BGVNote,
            placeholder: "Enter any notes regarding BGV process...",
            rows: 3,
            equired: true,
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
      title: "Client Details",
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
            label: "Client Linkedin ID",
            type: "text",
            field: "clientLinkedId",
            value: formData.companyDetails?.clientLinkedId || "",
            error: errors.clientLinkedId,
            placeholder: "Enter client LinkedIn ID or reference",
          },
        ],
      ],
    },
    {
      title: "Lead Details",
      key: "clientDetails",
      columns: [
        [
          {
            label: "Lead Name",
            type: "text",
            field: "leadName",
            value: formData.clientDetails?.leadName || "",
            error: errors.leadName,
            placeholder: "Enter lead contact name",
            required: true,
          },
          {
            label: "Lead Contact",
            type: "tel",
            field: "leadContact",
            value: formData.clientDetails?.leadContact || "",
            error: errors.leadContact,
            placeholder: "Enter contact number (10 digits)",
            pattern: "[0-9]{10}",
            required: true,
          },
          {
            label: "Experience Level",
            type: "select",
            field: "experienceLevel",
            value: formData.clientDetails?.experienceLevel || "",
            error: errors.experienceLevel,
            options: [
              "",
              "0-2 Years",
              "2-5 Years",
              "5-8 Years",
              "8+ Years",
              "6 Years",
            ],
            required: true,
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
            error: errors.billingEndDate,
            required: true,
          },
        ],
        [
          {
            label: "Tentative Duration",
            type: "select",
            field: "tentativeDuration",
            value: formData.demandDurationInfo?.tentativeDuration || "",
            error: errors.tentativeDuration,
            options: [
              "",
              "1 Month",
              "3 Months",
              "6 Months",
              "1 Year",
              "Flexible",
              "Project Based",
            ],
            required: true,
          },
        ],
        [
          {
            label: "Demand Duration Note",
            type: "textarea",
            field: "demandDurationNote",
            value: formData.demandDurationInfo?.demandDurationNote || "",
            error: errors.demandDurationNote,
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
            required: true,
            options: ["", "Monthly", "Hourly", "Project Based", "Annual"]
          },
          {
            label: "Currency",
            type: "select",
            field: "currency",
            value: formData.demandBudgetInfo?.currency || "",
            error: errors.currency,
            required: true,
            options: ["", "INR", "USD", "EUR"]
          },
          {
            label: "Budget Amount",
            type: "number",
            field: "budget",
            value: formData.demandBudgetInfo?.budget || "",
            error: errors.budget,
            required: true
          }
        ],
        [
          {
            label: "Profit Margin (%)",
            type: "number",
            field: "profitMargin",
            value: formData.demandBudgetInfo?.profitMargin || "",
            error: errors.profitMargin,
            required: true
          },
          {
            label: "Payout Type",
            type: "select",
            field: "payoutType",
            value: formData.demandBudgetInfo?.payoutType || "",
            required: true,
            error: errors.payoutType,
            options: ["", "Monthly", "Weekly"]
          },
          {
            label: "Budget Level",
            type: "select",
            field: "budgetLevel",
            value: formData.demandBudgetInfo?.budgetLevel || "",
            error: errors.budgetLevel,
            required: true,
            options: ["", "B1", "B2", "B3"]
          }
        ], [
          {
            label: "Budget Billing Start Date",
            type: "date",
            field: "demandBudgetBillingStartDate",
            value: formData.demandBudgetInfo?.demandBudgetBillingStartDate || "",
            error: errors.demandBudgetBillingStartDate,
            required: true
          }
        ],
        [
          {
            label: "Budget Note",
            type: "textarea",
            field: "demandBudgetNote",
            value: formData.demandBudgetInfo?.demandBudgetNote || "",
            rows: 3
          }
        ],
        [
          {
            label: "Payment Confirmation",
            type: "select",
            field: "paymentConformation",
            value: formData.demandBudgetInfo?.paymentConformation || "",
            error: errors.paymentConformation,
            required: true,
            options: ["", "L1", "L2"]
          },
        ]
      ]
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
            required: true,
            options: ["", "Online", "In-person", "Hybrid"]
          },
          {
            label: "No. of Interview Rounds",
            type: "number",
            field: "noOfInterviewRounds",
            value: formData.demandInterviewDetails?.noOfInterviewRounds || "",
            error: errors.noOfInterviewRounds,
            required: true
          }
        ],

        [
          {
            label: "Written Test",
            type: "select",
            field: "writtenTextisThere",
            value: formData.demandInterviewDetails?.writtenTextisThere || "",
            error: errors.writtenTextisThere,
            options: ["", "Yes", "No"],
            required: true,
          },
          {
            label: "Outside Candidate Allowed",
            type: "select",
            field: "outsideCandidateAllowed",
            value: formData.demandInterviewDetails?.outsideCandidateAllowed || "",
            error: errors.outsideCandidateAllowed,
            options: ["", "Yes", "No"],
            required: true,
          }
        ],

        [
          {
            label: "Assigned Channel",
            type: "text",
            field: "assignedChannel",
            value: formData.demandInterviewDetails?.assignedChannel || "",
            error: errors.assignedChannel,
            required: true,
          },
          {
            label: "Trial / Notes",
            type: "textarea",
            field: "trail",
            value: formData.demandInterviewDetails?.trail || "",
            error: errors.trail,
            required: true,
          }
        ],

        [
          {
            label: "Technical Profile",
            type: "select",
            field: "techProfile",
            value: formData.demandInterviewDetails?.techProfile || "",
            error: errors.techProfile,
            required: true,
            options: ["", "Frontend", "Backend", "Full Stack", "Mobile"]
          },
          {
            label: "Contract to Hire",
            type: "select",
            field: "contractToHire",
            value: formData.demandInterviewDetails?.contractToHire || "",
            error: errors.contractToHire,
            required: true,
            options: ["", "Yes", "No"]
          }
        ], [
          {
            label: "Interview Note",
            type: "textarea",
            field: "interviewNote",
            value: formData.demandInterviewDetails?.interviewNote || "",
            error: errors.interviewNote,
            required: true,
            rows: 3
          },
          {
            label: "Budget Status",
            type: "select",
            field: "budgetStatus",
            value: formData.demandInterviewDetails?.budgetStatus || "",
            error: errors.budgetStatus,
            required: true,
            options: ["", "Approved", "Pending", "Rejected"]
          }
        ],

        [
          {
            label: "Requirement Resource Timeline",
            type: "select",
            field: "requirementResource",
            value: formData.demandInterviewDetails?.requirementResource || "",
            error: errors.requirementResource,
            required: true,
            options: [
              "",
              "Immediate",
              "Within 7 Days",
              "Within 15 Days",
              "Within 30 Days",
              "Flexible"
            ]
          },
          {
            label: "Sales Person Name",
            type: "text",
            field: "nameOfTheSalesPerson",
            value: formData.demandInterviewDetails?.nameOfTheSalesPerson || "",
            error: errors.nameOfTheSalesPerson,
            required: true
          },
          {
            label: "Resource Status",
            type: "select",
            field: "resourceStatus",
            value: formData.demandInterviewDetails?.resourceStatus || "",
            error: errors.resourceStatus,
            required: true,
            options: ["", "Open", "Closed", "On Hold"]
          }
        ]
      ]
    }


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
                      {section.key === "clientDetails" && field.field === "leadContact" ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Lead Contact <span className="text-red-500">*</span>
                          </label>

                          <PhoneInput
                            country="in"
                            value={formData.clientDetails?.leadContact || ""}
                            onChange={(value, country) => {
                              const phoneNumber = parsePhoneNumberFromString(
                                `+${value}`,
                                country.countryCode.toUpperCase()
                              );

                              if (phoneNumber && phoneNumber.isValid()) {
                                handleFieldChange(
                                  "clientDetails",
                                  "leadContact",
                                  phoneNumber.number // E.164 format
                                );
                              } else {
                                handleFieldChange(
                                  "clientDetails",
                                  "leadContact",
                                  `+${value}`
                                );
                              }
                            }}
                            inputStyle={{ width: "100%" }}
                          />

                          {errors.leadContact && (
                            <p className="text-sm text-red-600 mt-1">
                              {errors.leadContact}
                            </p>
                          )}
                        </div>
                      ) : (
                        <FormInput
                          {...field}
                          forceShowError={Object.keys(errors).length > 0}
                          inputRef={(el) => {
                            if (el) inputRefs.current[field.field] = el;
                          }}
                          onChange={(value) =>
                            handleFieldChange(section.key, field.field, value)
                          }
                        />
                      )}
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
                                handleFileUpload(e.target.files[0])
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
                      <p className="text-sm text-green-600">
                        ✓ File selected: {uploadedFiles.paymentConfirmationDocumentPath.name}
                      </p>
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
