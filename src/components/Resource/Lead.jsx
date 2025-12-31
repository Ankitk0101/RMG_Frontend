import React from "react";
import { getResumeFile } from "../../services/resumeService";
const getFilteredCandidateTimelineStatus = (candidate) => {
  const filteredStatus = candidate?.candidateStatusTimeline?.filter(
    (status) => {
      const booleanValue = ![
        "CV_Selected",
        "Written_Test_Sheduled",
        "Written_Test_Cleared",
      ].includes(status);
      return booleanValue;
    }
  );
  return filteredStatus;
};

const onClickViewResume = async (
  resumeRefPath,
  setResumeUrl,
  setShowResumePopUp
) => {
  try {
    const response = await getResumeFile(resumeRefPath);

    // Blob → URL
    const fileUrl = URL.createObjectURL(response.data);
    console.log("File URl in onClickViewResume -> ", fileUrl);
    setResumeUrl(fileUrl);
    setShowResumePopUp(true);
  } catch (error) {
    console.error("Failed to load resume", error);
  }
};

export default function Lead({
  updatedResource,
  isStarted,
  isProfilesUpdating,
  setShowResumePopUp,
  setResumeUrl, // ✅ ADD
  handleUpdateStatus,
}) {
  if (isProfilesUpdating) {
    return (
      <p className="text-[14px] text-[#5B6ACF] animate-pulse">
        Profiles updating...
      </p>
    );
  }

  if (
    !isStarted &&
    (!updatedResource?.resumesOfThisResource ||
      updatedResource.resumesOfThisResource.length === 0)
  ) {
    return <p className="text-[14px]">Profiles 0</p>;
  }

  return (
    <div>
      {(updatedResource?.resumesOfThisResource ?? []).map(
        (candidate, index) => {
          const filterdCanidateStatus =
            getFilteredCandidateTimelineStatus(candidate);
          return (
            <div key={index} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <p className="text-[14px] font-medium mr-2">Lead {index + 1}</p>
                {/* Status Circles */}
                <div className="flex -space-x-1 ">
                  {(filterdCanidateStatus ?? []).map((status, i) => {
                    let statusColor;
                    if (status === "CV_Selected") statusColor = "bg-[#4C6EF5]";
                    else if (status === "Interview_Scheduled")
                      statusColor = "bg-[#FAB005]";
                    else if (status === "Interview_Cleared")
                      statusColor = "bg-[#20C997]";
                    else if (status === "HR_Cleared")
                      statusColor = "bg-[#12B886]";
                    else if (status === "Offered") statusColor = "bg-[#40C057]";
                    else if (status === "Accepted")
                      statusColor = "bg-[#2F9E44]";
                    else if (status === "Onboarded")
                      statusColor = "bg-[#2F9E44]";
                    else if (
                      status === "Rejected" ||
                      status === "CV_Ignored" ||
                      status === "CV_Rejected" ||
                      status === "Written_Test_Rejected"
                    )
                      statusColor = "bg-[#FA5252]";
                    else if (status === "Hold") statusColor = "bg-[#FD7E14]";
                    else statusColor = "bg-[#CED4DA]";

                    return (
                      <div key={i} className="relative group">
                        <div
                          className={`h-[20px] w-[20px] rounded-full text-white ${statusColor} border border-white ml-[5px] cursor-pointer`}
                          title={status}
                        />
                        {/* Tooltip Popup */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[240px] bg-white border border-[#E5E5E5] rounded-lg shadow-xl p-4 hidden group-hover:block z-100">
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
                              <span className="text-[#6C6E70]">Exp. CTC:</span>
                              <span className="font-medium">
                                {candidate?.candidateExpectedCTC}
                              </span>
                            </div>
                            <div className="flex justify-between text-[12px]">
                              <span className="text-[#6C6E70]">Status:</span>
                              <span className="font-medium">
                                {
                                  candidate?.candidateStatusTimeline?.[
                                    candidate?.candidateStatusTimeline?.length -
                                      1
                                  ]
                                }
                              </span>
                            </div>
                          </div>

                          <button
                            className="w-full py-1.5 bg-[#5B6ACF] text-white text-[12px] rounded hover:bg-[#4854c7] transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              onClickViewResume(
                                candidate.resumeRefPath,
                                setResumeUrl,
                                setShowResumePopUp
                              );
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateStatus(
                    candidate._id,
                    candidate.candidateStatusTimeline
                  );
                }}
                disabled={[
                  "Rejected",
                  "CV_Ignored",
                  "CV_Rejected",
                  "Written_Test_Rejected",
                ].includes(
                  candidate.candidateStatusTimeline?.[
                    candidate.candidateStatusTimeline.length - 1
                  ]
                )}
                className={`text-[12px] px-2 py-[4px] rounded border transition-all ${
                  [
                    "Rejected",
                    "CV_Ignored",
                    "CV_Rejected",
                    "Written_Test_Rejected",
                  ].includes(
                    candidate.candidateStatusTimeline?.[
                      candidate.candidateStatusTimeline.length - 1
                    ]
                  )
                    ? "text-[#A6A6A6] border-[#D9D9D9] bg-[#F5F5F5] cursor-not-allowed opacity-60"
                    : "text-[#6C6E70] border-[#6C6E70] hover:bg-[#F5F5F5] cursor-pointer"
                }`}
              >
                Update Status
              </button>
            </div>
          );
        }
      )}
    </div>
  );
}
