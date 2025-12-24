import React from "react";
import ResumePopUp from "../ResumePopUp/ResumePopUp";
import { useState, useRef } from "react";
import { uploadResume, updateResumeStatus } from "../../services/resumeService";
import { getSingalResource } from "../../services/resourceApi";

export default function ResouceComponents(props) {
  console.log("ResouceComponents Called");
  const { index, showClientId, oneResource } = props;
  const [isProfilesUpdating, setIsProfilesUpdating] = useState(false);
  const [updatedResource, setUpdatedResource] = useState(oneResource);
  console.log("resource ---- from BE ->  ", updatedResource);
  const [showModal, setShowModal] = useState(false);
  const [showDuration, setShowDuration] = useState(true);
  const [showResumePopUp, setShowResumePopUp] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const fileInputRef = useRef(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [candidateToUpdate, setCandidateToUpdate] = useState(null);
  console.log("updatedResource ----- ", updatedResource);

  const [candidateForm, setCandidateForm] = useState({
    candidateName: "",
    candidateEmail: "",
    candidateExperience: 0,
    candidateExpectedCTC: "",
    candidateCurrentCTC: "",
    candidateSkills: "",
    resumeRefPath: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCandidateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCandidateForm((prev) => ({
        ...prev,
        resumeRefPath: file.name,
      }));
    }
  };

  const handleUploadSubmit = async () => {
    console.log("handleUploadSubmit called");
    setIsProfilesUpdating(true);
    if (
      !candidateForm.candidateName ||
      !candidateForm.candidateEmail ||
      !candidateForm.resumeRefPath
    ) {
      alert("Please fill in all required fields and upload a resume.");
      return;
    }

    console.log("Submitting Candidate Form:", candidateForm);

    const recruterId = JSON.parse(localStorage.getItem("user")).id;

    try {
      await uploadResume({
        ...candidateForm,
        resourceModelId: updatedResource._id,
        recruterId,
      });
      const updatedResourcefromDb = await getSingalResource(
        updatedResource._id
      );
      console.log("updatedResourcefromDb", updatedResourcefromDb);
      setTimeout(() => {
        if (updatedResourcefromDb.success) {
          setIsProfilesUpdating(false);
          setUpdatedResource(updatedResourcefromDb.data.data);
        }
      }, 3000);

      // Reset form and close modal
      setCandidateForm({
        candidateName: "",
        candidateEmail: "",
        candidateExperience: 0,
        candidateExpectedCTC: "",
        candidateCurrentCTC: "",
        candidateSkills: "",
        resumeRefPath: null,
      });
      setShowModal(false);
      setShowDuration(false);
    } catch (error) {
      console.error("Error uploading profile:", error);
      alert("Failed to upload profile. Please try again.");
    }
  };

  const handleUpdateStatus = (candidateId, currentTimeline) => {
    setCandidateToUpdate({ candidateId, currentTimeline });
    setShowStatusModal(true);
  };

  const handleStatusSubmit = async () => {
    if (!selectedStatus) {
      alert("Please select a status.");
      return;
    }

    const { candidateId, currentTimeline } = candidateToUpdate;
    const updatedCandidateStatusTimeline = [...currentTimeline, selectedStatus];

    try {
      setIsProfilesUpdating(true);
      setShowStatusModal(false);
      const response = await updateResumeStatus(
        candidateId,
        updatedCandidateStatusTimeline
      );

      if (response.success) {
        const updatedResourcefromDb = await getSingalResource(
          updatedResource._id
        );
        setTimeout(() => {
          if (updatedResourcefromDb.success) {
            setIsProfilesUpdating(false);
            setUpdatedResource(updatedResourcefromDb.data.data);
            setSelectedStatus("");
            setCandidateToUpdate(null);
          }
        }, 3000);
      } else {
        alert(response.message || "Failed to update status.");
        setIsProfilesUpdating(false);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An unexpected error occurred.");
      setIsProfilesUpdating(false);
    }
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
  // Helper to check if started
  const isResourceStarted = (status) => {
    return status === "In Progress" || status === "Completed";
  };

  const isStarted = isResourceStarted(updatedResource.resourceStatus);

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
                {updatedResource.resourceDemandInfoId.leadId.clientId.clientId}
              </span>
            </div>
          )}
        </div>

        {/* Card */}
        <div className="flex-1 border border-[#E5E5E5] rounded-[8px] mb-6">
          {/* BGV */}
          <div className="px-6 py-3">
            {updatedResource.contractDetailsId.isBGVRequired === "Yes" ? (
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
                Lead {updatedResource.resourceDemandInfoId.leadId.leadId}
              </span>

              <p className="text-[14px] font-medium text-[#1C1C1C]">
                #
                {updatedResource.resourceDemandInfoId.leadId.leadId
                  .split("")
                  .splice(9, 5)
                  .join("")}{" "}
                {updatedResource.resourceDemandInfoId.leadId.leadName}
              </p>
              <p className="text-[12px] text-[#6C6E70]">
                {
                  updatedResource.resourceDemandInfoId.leadId.clientId
                    .clientName
                }
              </p>
              <p className="text-[12px] text-[#6C6E70] mt-1">
                LinkedIn connect Rashi 2025
              </p>

              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full bg-[#D9D9D9]" />
                <div>
                  <p className="text-[13px] text-[#1C1C1C]">
                    {updatedResource.nameOfTheSalesPerson}
                  </p>
                  <p className="text-[12px] text-[#6C6E70]">Sales (w/ local)</p>
                  <p className="text-[11px] text-[#6C6E70]">
                    {formatDate(updatedResource.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <p className="text-[14px] font-medium">(Unsold)</p>
              <p className="text-[13px] mt-1">
                {updatedResource.resourceDemandInfoId.demandLevel}
              </p>
              <p className="text-[13px]">
                Database, {updatedResource.resourceDemandInfoId.engagement}
              </p>
              <p className="text-[12px] text-[#6C6E70]">(8 hours)</p>

              <span className="inline-block mt-2 px-2 py-[2px] text-[11px] rounded bg-[#C92A2A] text-white">
                P1
              </span>
            </div>

            {/* Budget */}
            <div className="flex flex-col items-start justify-center">
              <p className="text-[14px] font-medium">
                {updatedResource.demandBudgetId.budget} INR
              </p>
              <span className="w-[80px] inline-block mt-2 px-2 py-[2px] text-[12px] rounded bg-[#4C6EF5] text-white text-center">
                {updatedResource.demandBudgetId.budgetType}
              </span>
              <span className="w-[80px] inline-block mt-1 px-2 py-[2px] text-[12px] rounded bg-[#FAB005] text-white text-center">
                {updatedResource.contractDetailsId.workingLocation}
              </span>
              <span className="w-[80px] inline-block mt-1 px-2 py-[2px] text-[12px] rounded border text-center">
                B3
              </span>
            </div>

            {/* Profile */}
            {isProfilesUpdating ? (
              <p className="text-[14px] text-[#5B6ACF] animate-pulse">
                Profiles updating...
              </p>
            ) : isStarted ||
              (updatedResource?.resumesOfThisResource?.length ?? 0) > 0 ? (
              <div>
                {(updatedResource?.resumesOfThisResource ?? []).map(
                  (candidate, index) => (
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
                          {(candidate?.candidateStatusTimeline ?? []).map(
                            (status, i) => {
                              let statusColor;
                              if (status === "Screening_Scheduled")
                                statusColor = "bg-[#4C6EF5]";
                              else if (status === "Interview_Scheduled")
                                statusColor = "bg-[#FAB005]";
                              else if (status === "Interview_Cleared")
                                statusColor = "bg-[#20C997]";
                              else if (status === "HR_Cleared")
                                statusColor = "bg-[#12B886]";
                              else if (status === "Offered")
                                statusColor = "bg-[#40C057]";
                              else if (status === "Accepted")
                                statusColor = "bg-[#2F9E44]";
                              else if (status === "Onboarded")
                                statusColor = "bg-[#2F9E44]";
                              else if (status === "Rejected")
                                statusColor = "bg-[#FA5252]";
                              else if (status === "Hold")
                                statusColor = "bg-[#FD7E14]";
                              else statusColor = "bg-[#CED4DA]";

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
                                          {candidate.candidateName}
                                        </p>
                                        <p className="text-[12px] text-[#6C6E70]">
                                          {candidate.candidateEmail}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="space-y-1 mb-3">
                                      <div className="flex justify-between text-[12px]">
                                        <span className="text-[#6C6E70]">
                                          Experience:
                                        </span>
                                        <span className="font-medium">
                                          {candidate?.candidateExperience}
                                        </span>
                                      </div>
                                      <div className="flex justify-between text-[12px]">
                                        <span className="text-[#6C6E70]">
                                          Exp. CTC:
                                        </span>
                                        <span className="font-medium">
                                          {candidate?.candidateExpectedCTC}
                                        </span>
                                      </div>
                                      <div className="flex justify-between text-[12px]">
                                        <span className="text-[#6C6E70]">
                                          Status:
                                        </span>
                                        <span className="font-medium">
                                          {
                                            candidate
                                              ?.candidateStatusTimeline?.[
                                              candidate?.candidateStatusTimeline
                                                ?.length - 1
                                            ]
                                          }
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
                            }
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleUpdateStatus(
                            candidate._id,
                            candidate.candidateStatusTimeline
                          )
                        }
                        disabled={
                          candidate.candidateStatusTimeline?.[
                            candidate.candidateStatusTimeline.length - 1
                          ] === "Rejected"
                        }
                        className={`text-[12px] px-2 py-[4px] rounded border transition-all ${
                          candidate.candidateStatusTimeline?.[
                            candidate.candidateStatusTimeline.length - 1
                          ] === "Rejected"
                            ? "text-[#A6A6A6] border-[#D9D9D9] bg-[#F5F5F5] cursor-not-allowed opacity-60"
                            : "text-[#6C6E70] border-[#6C6E70] hover:bg-[#F5F5F5] cursor-pointer"
                        }`}
                      >
                        Update Status
                      </button>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-[14px]">Profiles 0</p>
            )}

            {/* Duration */}
            {!isStarted && showDuration && (
              <div>
                <p className="text-[14px] text-[#2F9E44] font-medium">
                  {updatedResource.demandDurationId.tentativeDuration}
                </p>
                <p className="text-[12px] text-[#6C6E70]">
                  {formatDateOnly(
                    updatedResource.demandDurationId.billingStartDate
                  )}{" "}
                  -{" "}
                  {formatDateOnly(
                    updatedResource.demandDurationId.billingStartDate
                  )}
                </p>

                {/* GREEN BUTTON */}
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-block mt-2 px-3 py-[4px] text-[12px] rounded bg-[#2F9E44] text-white cursor-pointer"
                >
                  {getStartMessage(
                    updatedResource.demandDurationId.billingStartDate
                  )}
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end">
              <span className="cursor-pointer">⋮</span>
            </div>
          </div>
          <div className="px-6 py-2 flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-1.5 text-[12px] font-medium text-white bg-[#5B6ACF] rounded hover:bg-[#4854c7] transition-colors"
            >
              Add Profiles
            </button>
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
          <div className="bg-white w-[600px] rounded-[8px] p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <p className="text-[18px] font-medium text-[#1C1C1C]">
                Upload Candidate Profile
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#6C6E70] text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-[12px] text-[#6C6E70] mb-1">
                  Candidate Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="candidateName"
                  value={candidateForm.candidateName}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9D9D9] rounded p-2 text-[13px] outline-none focus:border-[#5B6ACF]"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[12px] text-[#6C6E70] mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="candidateEmail"
                  value={candidateForm.candidateEmail}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9D9D9] rounded p-2 text-[13px] outline-none focus:border-[#5B6ACF]"
                  placeholder="john@example.com"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-[12px] text-[#6C6E70] mb-1">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  name="candidateExperience"
                  value={candidateForm.candidateExperience}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9D9D9] rounded p-2 text-[13px] outline-none focus:border-[#5B6ACF]"
                  placeholder="e.g. 5"
                />
              </div>

              {/* Current CTC */}
              <div>
                <label className="block text-[12px] text-[#6C6E70] mb-1">
                  Current CTC
                </label>
                <input
                  type="text"
                  name="candidateCurrentCTC"
                  value={candidateForm.candidateCurrentCTC}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9D9D9] rounded p-2 text-[13px] outline-none focus:border-[#5B6ACF]"
                  placeholder="e.g. 10 LPA"
                />
              </div>

              {/* Expected CTC */}
              <div>
                <label className="block text-[12px] text-[#6C6E70] mb-1">
                  Expected CTC
                </label>
                <input
                  type="text"
                  name="candidateExpectedCTC"
                  value={candidateForm.candidateExpectedCTC}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9D9D9] rounded p-2 text-[13px] outline-none focus:border-[#5B6ACF]"
                  placeholder="e.g. 15 LPA"
                />
              </div>

              {/* Skills */}
              <div className="col-span-2">
                <label className="block text-[12px] text-[#6C6E70] mb-1">
                  Skills
                </label>
                <input
                  type="text"
                  name="candidateSkills"
                  value={candidateForm.candidateSkills}
                  onChange={handleInputChange}
                  className="w-full border border-[#D9D9D9] rounded p-2 text-[13px] outline-none focus:border-[#5B6ACF]"
                  placeholder="Java, React, Node.js..."
                />
              </div>

              {/* Resume Upload */}
              <div className="col-span-2 mt-2">
                <label className="block text-[12px] text-[#6C6E70] mb-1">
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="block w-full text-[12px] text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-[12px] file:font-semibold
                      file:bg-[#F0F2FF] file:text-[#5B6ACF]
                      hover:file:bg-[#E1E5FF] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-[#F0F0F0]">
              <button
                onClick={() => {
                  setShowModal(false);
                  setCandidateForm({
                    candidateName: "",
                    candidateEmail: "",
                    candidateExperience: 0,
                    candidateExpectedCTC: "",
                    candidateCurrentCTC: "",
                    candidateSkills: "",
                    resumeRefPath: null,
                  });
                }}
                className="px-4 py-2 text-[14px] rounded bg-[#BFBFBF] text-white hover:bg-[#A6A6A6]"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadSubmit}
                className="px-6 py-2 text-[14px] rounded bg-[#2F9E44] text-white hover:bg-[#288b3c]"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
      {showStatusModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[12px] shadow-2xl w-[400px] p-6">
            <h3 className="text-[18px] font-semibold text-[#1C1C1C] mb-4">
              Update Candidate Status
            </h3>
            <p className="text-[14px] text-[#6C6E70] mb-4">
              Select the round for the candidate:
            </p>
            <div className="grid grid-cols-1 gap-2 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {[
                "Screening_Scheduled",
                "Interview_Scheduled",
                "Interview_Cleared",
                "HR_Cleared",
                "Offered",
                "Accepted",
                "Onboarded",
                "Rejected",
                "Hold",
              ].map((status) => (
                <label
                  key={status}
                  className={`flex items-center px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                    selectedStatus === status
                      ? "border-[#5B6ACF] bg-[#5B6ACF]/5 text-[#5B6ACF]"
                      : "border-[#E5E5E5] hover:border-[#5B6ACF]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="candidateStatus"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="hidden"
                  />
                  <span className="text-[14px] font-medium">
                    {status.replace("_", " ")}
                  </span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedStatus("");
                }}
                className="px-4 py-2 text-[14px] rounded bg-[#BFBFBF] text-white hover:bg-[#A6A6A6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusSubmit}
                className="px-6 py-2 text-[14px] rounded bg-[#5B6ACF] text-white hover:bg-[#4A59B8] transition-colors"
              >
                Update
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

// const sampleJsonCandidates = [
//   {
//     name: "John Wick",
//     email: "rashi.sharma@example.com",
//     phone: "1234567890",
//     resume: "resume.pdf",
//     coverLetter: "cover-letter.pdf",
//     status: "Interviewed",
//     interviewDate: "2023-01-01",
//     interviewer: "John Doe",
//     notes: "Candidate is a good fit for the role.",
//     experience: "5 years",
//     "Exp CTC": "500000 INR",
//     currentProfileStatusList: [
//       "Screening",
//       "Shortlisted",
//       "Interviewed",
//       "Offered",
//       "Hired",
//     ],
//   },
//   {
//     name: "Krunal Sharma",
//     email: "rashi.sharma@example.com",
//     phone: "1234567890",
//     resume: "resume.pdf",
//     coverLetter: "cover-letter.pdf",
//     status: "Interviewed",
//     interviewDate: "2023-01-01",
//     interviewer: "John Doe",
//     notes: "Candidate is a good fit for the role.",
//     experience: "5 years",
//     "Exp CTC": "500000 INR",
//     currentProfileStatusList: ["Screening", "Shortlisted"],
//   },
//   {
//     name: "Steave Smith",
//     email: "rashi.sharma@example.com",
//     phone: "1234567890",
//     resume: "resume.pdf",
//     coverLetter: "cover-letter.pdf",
//     status: "Interviewed",
//     interviewDate: "2023-01-01",
//     interviewer: "John Doe",
//     notes: "Candidate is a good fit for the role.",
//     experience: "5 years",
//     "Exp CTC": "500000 INR",
//     currentProfileStatusList: [
//       "Screening",
//       "Shortlisted",
//       "Interviewed",
//       "Rejected",
//     ],
//   },
//   {
//     name: "Cameron Green",
//     email: "rashi.sharma@example.com",
//     phone: "1234567890",
//     resume: "resume.pdf",
//     coverLetter: "cover-letter.pdf",
//     status: "Interviewed",
//     interviewDate: "2023-01-01",
//     interviewer: "John Doe",
//     notes: "Candidate is a good fit for the role.",
//     experience: "5 years",
//     "Exp CTC": "500000 INR",
//     currentProfileStatusList: ["Screening", "Shortlisted"],
//   },
// ];
