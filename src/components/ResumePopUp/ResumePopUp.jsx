//import { useState } from "react";

export default function ResumePopUp({ onClose, resumeUrl }) {
  // Fallback to the local file in public folder if no URL provided
  const viewerUrl = resumeUrl;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-[85%] h-[90%] rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar for close button to avoid overlap with iframe controls */}
        <div className="flex justify-end items-center p-2 bg-gray-50 border-b">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 text-gray-600 transition-all text-xl"
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="flex-1">
          <iframe
            src={viewerUrl}
            title="Resume Viewer"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
}
