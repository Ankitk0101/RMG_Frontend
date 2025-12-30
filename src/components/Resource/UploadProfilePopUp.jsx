import React, { useState, useRef } from "react";
import {
  uploadResumeToS3,
  uploadResumeToDb,
} from "../../services/resumeService";
import { getSingalResource } from "../../services/resourceApi";

export default function UploadProfilePopUp({
  showModal,
  setShowModal,
  updatedResource,
  setUpdatedResource,
  setIsProfilesUpdating,
  setShowDuration,
}) {
  const [candidateForm, setCandidateForm] = useState({
    candidateName: "",
    candidateEmail: "",
    candidateExperience: 0,
    candidateExpectedCTC: "",
    candidateCurrentCTC: "",
    candidateSkills: "",
    resumeRefPath: null,
    resumeFile: null,
  });
  const fileInputRef = useRef(null);

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
        resumeFile: file,
      }));
    }
  };

  const handleUploadSubmit = async () => {
    if (
      !candidateForm.candidateName ||
      !candidateForm.candidateEmail ||
      !candidateForm.resumeRefPath
    ) {
      alert("Please fill in all required fields and upload a resume.");
      return;
    }

    setIsProfilesUpdating(true);
    const recruterId = JSON.parse(localStorage.getItem("user")).id;

    try {
      const payload = new FormData();
      const jsonData = {
        ...candidateForm,
        resourceModelId: updatedResource._id,
        recruterId,
        resumeFile: undefined,
      };

      payload.append("type", "resume");
      payload.append("data", JSON.stringify(jsonData));

      if (candidateForm.resumeFile) {
        payload.append("file", candidateForm.resumeFile);
      }

      const uploadResumeToS3Response = await uploadResumeToS3(payload);
      const resumePath = uploadResumeToS3Response?.data?.path;

      await uploadResumeToDb({
        ...jsonData,
        resumeRefPath: resumePath,
        resumeFile: undefined,
      });

      const updatedResourcefromDb = await getSingalResource(
        updatedResource._id
      );

      if (updatedResourcefromDb?.success) {
        setUpdatedResource(updatedResourcefromDb.data.data);
      }

      setCandidateForm({
        candidateName: "",
        candidateEmail: "",
        candidateExperience: 0,
        candidateExpectedCTC: "",
        candidateCurrentCTC: "",
        candidateSkills: "",
        resumeRefPath: null,
        resumeFile: null,
      });

      setShowModal(false);
      if (setShowDuration) setShowDuration(false);
    } catch (error) {
      console.error("Error uploading profile:", error);
      alert("Failed to upload profile. Please try again.");
    } finally {
      setIsProfilesUpdating(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-100 flex items-center justify-center">
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
                resumeFile: null,
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
  );
}
