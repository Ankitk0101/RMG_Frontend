// utils/statusUtils.js

export const STATUSES = [
  "CV_Selected",
  "CV_Rejected",
  "CV_Ignored",
  "Written_Test_Sheduled",
  "Written_Test_Cleared",
  "Written_Test_Rejected",
  "Interview_Scheduled",
  "Interview_Cleared",
  "HR_Cleared",
  "Offered",
  "Accepted",
  "Onboarded",
  "Rejected",
  "Hold",
];

export function getResumeStatus(selectedStatus) {
  if (selectedStatus === "Onboarded") return "Fullfilled";

  if (
    ["Rejected", "CV_Rejected", "Written_Test_Rejected"].includes(
      selectedStatus
    )
  ) {
    return "Rejected";
  }

  if (selectedStatus === "Hold") return "Hold";

  return "Pending";
}

export function buildUpdatedTimeline(currentTimeline, selectedStatus) {
  return [...currentTimeline, selectedStatus];
}

export function getAvailableStatuses(statuses, currentTimeline) {
  return statuses.filter((status) => !currentTimeline.includes(status));
}
