import React from "react";
import ResumePopUp from "../ResumePopUp/ResumePopUp";
import { useState } from "react";
import { Link } from "react-router-dom";
import UploadProfilePopUp from "./UploadProfilePopUp";
import UpdateStatusPopUp from "./UpdateStatusPopUp";
import Lead from "./Lead";

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
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [candidateToUpdate, setCandidateToUpdate] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);

  console.log("updatedResource ----- ", updatedResource);

  const handleUpdateStatus = (candidateId, currentTimeline) => {
    setCandidateToUpdate({ candidateId, currentTimeline });
    setShowStatusModal(true);
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

    return `It's already  ${Math.abs(
      diffDays
    )} days Still Not Started (${formattedDate})`;
  }
  // Helper to check if started
  const isResourceStarted = () => {
    return updatedResource?.resumesOfThisResource?.length > 0;
  };

  const isStarted = isResourceStarted(updatedResource.resourceStatus);

  return (
    <>
      <div key={index}>
        <div className="relative flex">
          {/* Timeline */}
          {/* Timeline */}
          <div className="relative w-[40px] flex justify-center shrink-0">
            <div className="absolute top-0 bottom-0 w-[5px] bg-[#5B6ACF] rounded-full"></div>
            {showClientId && (
              <div className="relative z-10 top-0 w-[24px] h-[160px] rounded-full bg-[#5B6ACF] flex items-center justify-center shadow-sm">
                <span className="text-white text-[12px] font-medium -rotate-90 whitespace-nowrap tracking-wide">
                  {
                    updatedResource.resourceDemandInfoId.leadId.clientId
                      .clientId
                  }
                </span>
              </div>
            )}
          </div>

          {/* Card */}
          <div className="flex-1 border border-[#E5E5E5] rounded-[8px] mb-6 overflow-x-auto">
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
            <div className="grid grid-cols-[minmax(200px,1.5fr)_minmax(150px,1fr)_minmax(120px,0.8fr)_minmax(250px,2fr)_minmax(150px,1fr)_40px] px-6 py-4 items-start gap-4">
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
                    <p className="text-[12px] text-[#6C6E70]">
                      Sales (w/ local)
                    </p>
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
                  {updatedResource.demandBudgetId.budget}{" "}
                  {updatedResource.demandBudgetId.currency}
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
              <Lead
                updatedResource={updatedResource}
                isStarted={isStarted}
                isProfilesUpdating={isProfilesUpdating}
                setShowResumePopUp={setShowResumePopUp}
                setResumeUrl={setResumeUrl}
                handleUpdateStatus={handleUpdateStatus}
              />

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
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowModal(true);
                    }}
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
              <Link to={`/kyc/${updatedResource._id}`}>
                <button
                  onClick={""}
                  className="px-3 py-1.5 text-[12px] font-medium text-white bg-[#5B6ACF] rounded hover:bg-[#4854c7] transition-colors mr-1"
                >
                  View KYC
                </button>
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMoreDetails((prev) => !prev);
                }}
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
                      <span className="text-[#6C6E70]">
                        Interview conducted:
                      </span>
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
                      <span className="text-[#6C6E70]">
                        Waiting to Onboard:
                      </span>
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
        <UploadProfilePopUp
          showModal={showModal}
          setShowModal={setShowModal}
          updatedResource={updatedResource}
          setUpdatedResource={setUpdatedResource}
          setIsProfilesUpdating={setIsProfilesUpdating}
          setShowDuration={setShowDuration}
        />
        <UpdateStatusPopUp
          showStatusModal={showStatusModal}
          setShowStatusModal={setShowStatusModal}
          candidateToUpdate={candidateToUpdate}
          setCandidateToUpdate={setCandidateToUpdate}
          updatedResource={updatedResource}
          setUpdatedResource={setUpdatedResource}
          setIsProfilesUpdating={setIsProfilesUpdating}
        />
        {showResumePopUp && (
          <ResumePopUp
            resumeUrl={resumeUrl}
            onClose={() => {
              if (resumeUrl) URL.revokeObjectURL(resumeUrl); // 🧹 cleanup
              setResumeUrl(null);
              setShowResumePopUp(false);
            }}
          />
        )}
      </div>
    </>
  );
}
