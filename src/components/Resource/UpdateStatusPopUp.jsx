import React, { useState } from "react";
import { updateResumeStatus } from "../../services/resumeService";
import { getSingalResource } from "../../services/resourceApi";
import {
  STATUSES,
  getResumeStatus,
  buildUpdatedTimeline,
  getAvailableStatuses,
} from "../../utils/statusUtils";

export default function UpdateStatusPopUp({
  showStatusModal,
  setShowStatusModal,
  candidateToUpdate,
  setCandidateToUpdate,
  updatedResource,
  setUpdatedResource,
  setIsProfilesUpdating,
}) {
  const [selectedStatus, setSelectedStatus] = useState("");

  if (!showStatusModal || !candidateToUpdate) return null;

  const { candidateId, currentTimeline } = candidateToUpdate;

  const filteredStatuses = getAvailableStatuses(STATUSES, currentTimeline);

  const handleStatusSubmit = async () => {
    if (!selectedStatus) {
      alert("Please select a status.");
      return;
    }

    const resumeStatus = getResumeStatus(selectedStatus);
    const updatedTimeline = buildUpdatedTimeline(
      currentTimeline,
      selectedStatus
    );

    try {
      setIsProfilesUpdating(true);
      setShowStatusModal(false);

      const response = await updateResumeStatus(
        candidateId,
        updatedTimeline,
        resumeStatus
      );

      if (!response.success) {
        alert(response.message || "Failed to update status.");
        setIsProfilesUpdating(false);
        return;
      }

      const updatedResourceFromDb = await getSingalResource(
        updatedResource._id
      );

      if (updatedResourceFromDb.success) {
        setTimeout(() => {
          setIsProfilesUpdating(false);
          setUpdatedResource(updatedResourceFromDb.data.data);
          setCandidateToUpdate(null);
          setSelectedStatus("");
        }, 3000);
      } else {
        setIsProfilesUpdating(false);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An unexpected error occurred.");
      setIsProfilesUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[12px] shadow-2xl w-[400px] p-6">
        <h3 className="text-[18px] font-semibold text-[#1C1C1C] mb-4">
          Update Candidate Status
        </h3>

        <p className="text-[14px] text-[#6C6E70] mb-4">
          Select the round for the candidate:
        </p>

        <div className="grid grid-cols-1 gap-2 mb-6 max-h-[300px] overflow-y-auto pr-2">
          {filteredStatuses.map((status) => (
            <div
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`flex items-center px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                selectedStatus === status
                  ? "border-[#5B6ACF] bg-[#5B6ACF]/5 text-[#5B6ACF]"
                  : "border-[#E5E5E5] hover:border-[#5B6ACF]/50"
              }`}
            >
              <span className="text-[14px] font-medium">
                {status.replaceAll("_", " ")}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => {
              setShowStatusModal(false);
              setSelectedStatus("");
            }}
            className="px-4 py-2 text-[14px] rounded bg-[#BFBFBF] text-white hover:bg-[#A6A6A6]"
          >
            Cancel
          </button>

          <button
            onClick={handleStatusSubmit}
            className="px-6 py-2 text-[14px] rounded bg-[#5B6ACF] text-white hover:bg-[#4A59B8]"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
