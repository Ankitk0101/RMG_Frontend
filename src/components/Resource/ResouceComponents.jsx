import React from "react";
import ResumePopUp from "../ResumePopUp/ResumePopUp";
import { useState, useRef } from "react";

const sampleJsonCandidates = [
  {
    name: "John Wick",
    email: "rashi.sharma@example.com",
    phone: "1234567890",
    resume: "resume.pdf",
    coverLetter: "cover-letter.pdf",
    status: "Interviewed",
    interviewDate: "2023-01-01",
    interviewer: "John Doe",
    notes: "Candidate is a good fit for the role.",
    experience: "5 years",
    "Exp CTC": "500000 INR",
    currentProfileStatusList: [
      "Screening",
      "Shortlisted",
      "Interviewed",
      "Offered",
      "Hired",
    ],
  },
  {
    name: "Krunal Sharma",
    email: "rashi.sharma@example.com",
    phone: "1234567890",
    resume: "resume.pdf",
    coverLetter: "cover-letter.pdf",
    status: "Interviewed",
    interviewDate: "2023-01-01",
    interviewer: "John Doe",
    notes: "Candidate is a good fit for the role.",
    experience: "5 years",
    "Exp CTC": "500000 INR",
    currentProfileStatusList: ["Screening", "Shortlisted"],
  },
  {
    name: "Steave Smith",
    email: "rashi.sharma@example.com",
    phone: "1234567890",
    resume: "resume.pdf",
    coverLetter: "cover-letter.pdf",
    status: "Interviewed",
    interviewDate: "2023-01-01",
    interviewer: "John Doe",
    notes: "Candidate is a good fit for the role.",
    experience: "5 years",
    "Exp CTC": "500000 INR",
    currentProfileStatusList: [
      "Screening",
      "Shortlisted",
      "Interviewed",
      "Rejected",
    ],
  },
  {
    name: "Cameron Green",
    email: "rashi.sharma@example.com",
    phone: "1234567890",
    resume: "resume.pdf",
    coverLetter: "cover-letter.pdf",
    status: "Interviewed",
    interviewDate: "2023-01-01",
    interviewer: "John Doe",
    notes: "Candidate is a good fit for the role.",
    experience: "5 years",
    "Exp CTC": "500000 INR",
    currentProfileStatusList: ["Screening", "Shortlisted"],
  },
];
// const resource = {
//   _id: "69453e1235cfab603173880f",
//   resourceId: "RES19122025V1729",
//   resourceDemandInfoId: {
//     _id: "69453e1235cfab6031738807",
//     resourceInfoId: "RIN19122025C1729",
//     demandCategory: "Non-IT",
//     noOfResource: 8790,
//     demandLevel: "Mid (2-5 years)",
//     engagement: "Contract",
//     demandTechnology: {
//       _id: "69453e1235cfab6031738802",
//       demandTechnologyName: "React",
//       createdAt: "2025-12-19T11:59:14.813Z",
//       updatedAt: "2025-12-19T11:59:14.813Z",
//       __v: 0,
//     },
//     demandSubTechnology: {
//       _id: "69453e1235cfab6031738805",
//       demandSubTechnologyName: "Next.js",
//       demandTechnologyId: "69453e1235cfab6031738802",
//       createdAt: "2025-12-19T11:59:14.817Z",
//       updatedAt: "2025-12-19T11:59:14.817Z",
//       __v: 0,
//     },
//     demandType: "Permanent",
//     leadId: {
//       _id: "69453e1235cfab60317387ff",
//       clientId: {
//         _id: "69453e1235cfab60317387fc",
//         clientName: "Mahesh",
//         clientLinkedId: "7777777",
//         clientId: "MAH19122025L1729",
//         createdAt: "2025-12-19T11:59:14.789Z",
//         updatedAt: "2025-12-19T11:59:14.789Z",
//         __v: 0,
//       },
//       leadName: "Mahesh",
//       leadContact: "9959822122",
//       experienceLevel: "5-8 Years",
//       leadId: "MAH19122025U1729",
//       createdAt: "2025-12-19T11:59:14.805Z",
//       updatedAt: "2025-12-19T11:59:14.805Z",
//       __v: 0,
//     },
//     createdAt: "2025-12-19T11:59:14.820Z",
//     updatedAt: "2025-12-19T11:59:14.820Z",
//     __v: 0,
//   },
//   contractDetailsId: {
//     _id: "69453e1235cfab6031738809",
//     contractDetailsId: "NOR19122025C1729",
//     clientNeed: "Normal (2-4 weeks)",
//     contractType: "Contract",
//     workingDays: "6 days",
//     workingTiming: "10AM - 7PM",
//     workingLocation: "Hybrid",
//     workingMode: "Hybrid",
//     laptopProvideBy: "Client",
//     isBGVRequired: "No",
//     clientBGV_Verify: "No",
//     BGVNote: "fghjk,",
//     createdAt: "2025-12-19T11:59:14.824Z",
//     updatedAt: "2025-12-19T11:59:14.824Z",
//     __v: 0,
//   },
//   demandDurationId: {
//     _id: "69453e1235cfab603173880d",
//     billingStartDate: "2025-12-20T00:00:00.000Z",
//     billingEndDate: "2025-12-27T00:00:00.000Z",
//     tentativeDuration: "3 Months",
//     demandDurationNote: "sdfh",
//     demandDurationId: "DEM19122025X1729",
//     createdAt: "2025-12-19T11:59:14.827Z",
//     updatedAt: "2025-12-19T11:59:14.827Z",
//     __v: 0,
//   },
//   demandBudgetId: {
//     _id: "69453e1235cfab603173880b",
//     demandBudgetId: "HOU19122025W1729",
//     budgetType: "Hourly",
//     demandBudgetBillingStartDate: "2025-12-31T00:00:00.000Z",
//     currency: "USD",
//     demandBudgetNote: "d,",
//     budget: 77,
//     profitMargin: 7,
//     payoutType: "Weekly",
//     paymentConformation: "L1",
//     paymentConformationDocumentPath: "",
//     createdAt: "2025-12-19T11:59:14.825Z",
//     updatedAt: "2025-12-19T11:59:14.825Z",
//     __v: 0,
//   },
//   jobDescription: "ertyuiol",
//   modeOfInterview: "Phone",
//   interviewNote: "dfghj",
//   budgetStatus: "In Review",
//   techProfile: "werty",
//   contractToHire: "No",
//   requirementResource: "15 Days",
//   nameOfTheSalesPerson: "asdfgh",
//   resourceStatus: "shortlisted",
//   createdAt: "2025-12-19T11:59:14.828Z",
//   updatedAt: "2025-12-19T11:59:14.828Z",
//   __v: 0,
// };
export default function ResouceComponents(props) {
  console.log("ResouceComponents Called");
  const { index, clientId, showClientId, oneResource } = props;
  console.log("resource ---- from BE ->  ", oneResource);
  const [showModal, setShowModal] = useState(false);
  const [showDuration, setShowDuration] = useState(true);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [candidatesObjList, setCandidatesObjList] = useState([
    ...sampleJsonCandidates,
  ]);
  const [showResumePopUp, setShowResumePopUp] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  console.log("oneResource ----- ", oneResource);
  const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    handleFiles(e.target.files);
  };

  const handleUpdateStatus = (candidateName, status) => {
    const updatedCandidates = candidatesObjList.map((candidate) => {
      if (candidate.name === candidateName) {
        // Create a new object to avoid mutating state directly
        return {
          ...candidate,
          currentProfileStatusList: [
            ...candidate.currentProfileStatusList,
            status,
          ],
        };
      }
      return candidate;
    });
    setCandidatesObjList(updatedCandidates);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    return date
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "")
      .replace(/am|pm/, (match) => match.toUpperCase());
  }

  function formatDateOnly(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  }

  function getStartMessage(dateString) {
    const today = new Date();
    const targetDate = new Date(dateString);

    // Reset time to avoid hour differences
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const formattedDate = targetDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });

    if (diffDays > 0) {
      return `Need to start in ${diffDays} day${
        diffDays > 1 ? "s" : ""
      } (${formattedDate})`;
    }

    if (diffDays === 0) {
      return `Need to start today (${formattedDate})`;
    }

    return `Started ${Math.abs(diffDays)} day${
      Math.abs(diffDays) > 1 ? "s" : ""
    } ago (${formattedDate})`;
  }

  return (
    <>
      <div key={index} className="relative flex">
        {/* Timeline */}
        {/* Timeline */}
        <div className="relative w-[40px] flex justify-center shrink-0">
          <div className="absolute top-0 bottom-0 w-[5px] bg-[#5B6ACF] rounded-full"></div>
          {showClientId && (
            <div className="relative z-10 top-0 w-[24px] h-[160px] rounded-full bg-[#5B6ACF] flex items-center justify-center shadow-sm">
              <span className="text-white text-[12px] font-medium -rotate-90 whitespace-nowrap tracking-wide">
                {clientId}
              </span>
            </div>
          )}
        </div>

        {/* Card */}
        <div className="flex-1 border border-[#E5E5E5] rounded-[8px] mb-6">
          {/* BGV */}
          <div className="px-6 py-3">
            {oneResource.contractDetailsId.isBGVRequired === "Yes" ? (
              <span className="inline-block px-3 py-[4px] text-[12px] rounded bg-[#C92A2A] text-white">
                BGV required
              </span>
            ) : (
              ""
            )}
          </div>
          {/* Main Row */}
          <div className="grid grid-cols-[280px_200px_160px_300px_180px_40px] px-6 py-4 items-start">
            {/* Client */}
            <div>
              <span className="inline-block mb-2 px-2 py-[2px] text-[12px] rounded bg-[#FF6B6B] text-white">
                Lead {oneResource.resourceDemandInfoId.leadId.leadId}
              </span>

              <p className="text-[14px] font-medium text-[#1C1C1C]">
                #
                {oneResource.resourceDemandInfoId.leadId.leadId
                  .split("")
                  .splice(9, 5)
                  .join("")}{" "}
                {oneResource.resourceDemandInfoId.leadId.leadName}
              </p>
              <p className="text-[12px] text-[#6C6E70]">
                {oneResource.resourceDemandInfoId.leadId.clientId.clientName}
              </p>
              <p className="text-[12px] text-[#6C6E70] mt-1">
                LinkedIn connect Rashi 2025
              </p>

              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full bg-[#D9D9D9]" />
                <div>
                  <p className="text-[13px] text-[#1C1C1C]">
                    {oneResource.nameOfTheSalesPerson}
                  </p>
                  <p className="text-[12px] text-[#6C6E70]">Sales (w/ local)</p>
                  <p className="text-[11px] text-[#6C6E70]">
                    {formatDate(oneResource.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <p className="text-[14px] font-medium">(Unsold)</p>
              <p className="text-[13px] mt-1">
                {oneResource.resourceDemandInfoId.demandLevel}
              </p>
              <p className="text-[13px]">
                Database, {oneResource.resourceDemandInfoId.engagement}
              </p>
              <p className="text-[12px] text-[#6C6E70]">(8 hours)</p>

              <span className="inline-block mt-2 px-2 py-[2px] text-[11px] rounded bg-[#C92A2A] text-white">
                P1
              </span>
            </div>

            {/* Budget */}
            <div className="flex flex-col items-start justify-center">
              <p className="text-[14px] font-medium">
                {oneResource.demandBudgetId.budget}
              </p>
              <span className="w-[80px] inline-block mt-2 px-2 py-[2px] text-[12px] rounded bg-[#4C6EF5] text-white text-center">
                {oneResource.demandBudgetId.budgetType}
              </span>
              <span className="w-[80px] inline-block mt-1 px-2 py-[2px] text-[12px] rounded bg-[#FAB005] text-white text-center">
                {oneResource.contractDetailsId.workingLocation}
              </span>
              <span className="w-[80px] inline-block mt-1 px-2 py-[2px] text-[12px] rounded border text-center">
                B3
              </span>
            </div>

            {/* Profile */}
            {uploadedFiles.length > 0 ? (
              <div>
                {candidatesObjList.map((candidate, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-2"
                  >
                    <div className="flex items-center">
                      <p className="text-[14px] font-medium mr-2">
                        Lead {index + 1}
                      </p>
                      {/* Status Circles */}
                      <div className="flex -space-x-1 ">
                        {candidate.currentProfileStatusList.map((status, i) => {
                          let statusColor;
                          if (status === "Screening")
                            statusColor = "bg-[#C92A2A]";
                          else if (status === "Shortlisted")
                            statusColor = "bg-[#2F9E44]";
                          else if (status === "Interviewed")
                            statusColor = "bg-[#FAB005]";
                          else if (status === "Hired")
                            statusColor = "bg-[#2F9E44]";
                          else if (status === "Rejected")
                            statusColor = "bg-[#C92A2A]";
                          else if (status === "Offered")
                            statusColor = "bg-[#2F9E44]";
                          else statusColor = "bg-[#C92A2A]";

                          return (
                            <div key={i} className="relative group">
                              <div
                                className={`h-[20px] w-[20px] rounded-full text-white ${statusColor} border border-white ml-[5px] cursor-pointer`}
                                title={status}
                              />
                              {/* Tooltip Popup */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[240px] bg-white border border-[#E5E5E5] rounded-lg shadow-xl p-4 hidden group-hover:block z-[100]">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <p className="text-[14px] font-semibold text-[#1C1C1C]">
                                      {candidate.name}
                                    </p>
                                    <p className="text-[12px] text-[#6C6E70]">
                                      {candidate.email}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-1 mb-3">
                                  <div className="flex justify-between text-[12px]">
                                    <span className="text-[#6C6E70]">
                                      Experience:
                                    </span>
                                    <span className="font-medium">
                                      {candidate.experience}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-[12px]">
                                    <span className="text-[#6C6E70]">
                                      Exp. CTC:
                                    </span>
                                    <span className="font-medium">
                                      {candidate["Exp CTC"]}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-[12px]">
                                    <span className="text-[#6C6E70]">
                                      Status:
                                    </span>
                                    <span className="font-medium">
                                      {candidate.status}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  className="w-full py-1.5 bg-[#5B6ACF] text-white text-[12px] rounded hover:bg-[#4854c7] transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowResumePopUp(true);
                                  }}
                                >
                                  View Resume
                                </button>

                                {/* Arrow tail */}
                                <div className="absolute left-1/2 -top-[5px] -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-[#E5E5E5] transform rotate-45"></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdateStatus(candidate.name)}
                      className="text-[12px] text-[#6C6E70] border border-[#6C6E70] px-2 py-[4px] rounded cursor-pointer"
                    >
                      Update Status
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[14px]">Profiles 0</p>
            )}

            {/* Duration */}
            {showDuration && (
              <div>
                <p className="text-[14px] text-[#2F9E44] font-medium">
                  {oneResource.demandDurationId.tentativeDuration}
                </p>
                <p className="text-[12px] text-[#6C6E70]">
                  {formatDateOnly(
                    oneResource.demandDurationId.billingStartDate
                  )}{" "}
                  -{" "}
                  {formatDateOnly(
                    oneResource.demandDurationId.billingStartDate
                  )}
                </p>

                {/* GREEN BUTTON */}
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-block mt-2 px-3 py-[4px] text-[12px] rounded bg-[#2F9E44] text-white cursor-pointer"
                >
                  {getStartMessage(
                    oneResource.demandDurationId.billingStartDate
                  )}
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end">
              <span className="cursor-pointer">⋮</span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-dashed text-[12px] text-[#6C6E70] flex justify-between">
            <p>Assigned Channel: NA</p>
            <p>Technical Vetting: NA</p>
            <p
              onClick={() => setShowMoreDetails((prev) => !prev)}
              className="underline cursor-pointer"
            >
              {showMoreDetails ? "Show less" : "Show more"}
            </p>
          </div>
          {showMoreDetails && (
            <div className="px-6 py-4 border-t border-[#E5E5E5] bg-[#FFFFFF]">
              {/* Top details */}
              {/* <div className="grid grid-cols-2 gap-y-3 text-[13px] mb-4">
                <div className="flex gap-2">
                  <span className="text-[#6C6E70]">Assigned Channel:</span>
                  <span className="text-[#1C1C1C] font-medium">
                    Sourced - Hiring Technologies Pvt Ltd
                  </span>
                </div>

                <div className="flex gap-2">
                  <span className="text-[#6C6E70]">Technical Vetting:</span>
                  <span className="text-[#1C1C1C] font-medium">NA</span>
                </div>
              </div> */}

              {/* Summary Section */}
              <div className="pt-4">
                <p className="text-[13px] font-medium text-[#1C1C1C] mb-3">
                  Summary
                </p>

                <div className="grid grid-cols-3 gap-y-3 text-[13px]">
                  <div className="flex gap-2">
                    <span className="text-[#6C6E70]">Interview conducted:</span>
                    <span className="font-medium text-[#1C1C1C]">2</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-[#6C6E70]">Final Select:</span>
                    <span className="font-medium text-[#1C1C1C]">0</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-[#6C6E70]">Selected (L1):</span>
                    <span className="font-medium text-[#1C1C1C]">4</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-[#6C6E70]">Waiting to Onboard:</span>
                    <span className="font-medium text-[#1C1C1C]">0</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-[#6C6E70]">Selected (L2):</span>
                    <span className="font-medium text-[#1C1C1C]">0</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-[#6C6E70]">Rejected:</span>
                    <span className="font-medium text-[#1C1C1C]">2</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center">
          <div className="bg-white w-[520px] rounded-[8px] p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[18px] font-medium text-[#1C1C1C]">
                Upload Resumes
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#6C6E70]"
              >
                ✕
              </button>
            </div>

            {/* Drag & Drop + Click */}
            <div
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="h-[160px] border-2 border-dashed border-[#D9D9D9] rounded-[8px]
                                flex flex-col justify-center items-center text-center
                                cursor-pointer hover:bg-[#F8F9FA]"
            >
              <p className="text-[14px] text-[#6C6E70]">
                Drag & drop resumes here or click to browse
              </p>
              <p className="text-[12px] text-[#9A9A9A]">
                PDF, DOC, DOCX supported
              </p>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Files List */}
            {files.length > 0 && (
              <div className="mt-4 max-h-[120px] overflow-auto">
                {files.map((file, i) => (
                  <p key={i} className="text-[13px] text-[#1C1C1C]">
                    📄 {file.name}
                  </p>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false), setFiles([]);
                }}
                className="px-4 py-2 text-[14px] rounded bg-[#BFBFBF] text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (files.length === 0) {
                    alert("Please upload at least one resume");
                    return;
                  }

                  // 🔹 Example: prepare data for backend
                  const formData = new FormData();
                  files.forEach((file) => {
                    formData.append("resumes", file);
                  });

                  console.log("Uploading files:", files);

                  // 🔹 Later you will call API here
                  // axios.post("/api/upload-resumes", formData)

                  // 🔹 Success behaviour
                  setUploadedFiles([...uploadedFiles, ...files]);
                  setFiles([]);
                  setShowModal(false);
                  setShowDuration(false);
                }}
                className="px-4 py-2 text-[14px] rounded bg-[#2F9E44] text-white"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
      {showResumePopUp && (
        <ResumePopUp
          onClose={() => setShowResumePopUp(false)}
          resumeUrl="/Ux-designer-resume-example-5.pdf"
        />
      )}
    </>
  );
}
