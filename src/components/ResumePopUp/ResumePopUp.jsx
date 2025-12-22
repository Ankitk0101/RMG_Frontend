//import { useState } from "react";

export default function ResumePopUp({ onClose, resumeUrl }) {
  // Fallback to the local file in public folder if no URL provided
  const viewerUrl = resumeUrl || "/Ux-designer-resume-example-5.pdf";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white w-[80%] h-[85%] rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-600"
        >
          ✕
        </button>

        {/* Resume Viewer */}
        <iframe
          src={viewerUrl}
          title="Resume Viewer"
          className="w-full h-full rounded-lg"
        />
      </div>
    </div>
  );
}
