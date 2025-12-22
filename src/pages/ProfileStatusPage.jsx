import React from 'react';

const ProfileStatusPage = () => {
    return (
        <div className="h-screen w-screen bg-[#F5F5F5] overflow-hidden">
        {/* Header */}
        <div className="fixed top-0 left-0 h-20 w-full bg-white border-b border-[#D9D9D9] z-50" />

        {/* Sidebar */}
        <div className="fixed top-20 left-0 h-[calc(100vh-80px)] w-20 bg-white border-r border-[#D9D9D9] z-40" />

        {/* Content */}
        <div className="absolute top-20 left-20 h-[calc(100vh-80px)] w-[calc(100vw-80px)] bg-white overflow-auto">
            <div className="w-full flex justify-start">
            <div className="w-[1280px] ml-[32px] py-8">

                {/* Header Row */}
                <div className="flex justify-between items-start mb-6">
                <h1 className="text-[24px] font-medium leading-[150%] tracking-[0.02em] text-[#1C1C1C]">
                    Profile Status
                </h1>

                <div className="text-right">
                    <p className="text-[16px] font-medium text-[#1C1C1C]">#3903</p>
                    <p className="text-[14px] text-[#6C6E70]">Lead Id</p>
                </div>
                </div>

                {/* Table Card */}
                <div className="w-[1280px] border border-[#E5E5E5] rounded-[8px] overflow-hidden">

                {/* Table Header */}
                <div className="grid grid-cols-[1fr_1fr_1fr] px-6 py-4 border-b border-[#E5E5E5] bg-white">
                    <p className="text-[16px] font-medium text-[#1C1C1C]">Titles</p>
                    <p className="text-[16px] font-medium text-[#1C1C1C] text-center">Internal</p>
                    <p className="text-[16px] font-medium text-[#1C1C1C] text-center">JIT</p>
                </div>

                {/* Table Rows */}
                {[
                    "Profiles",
                    "CV Selected",
                    "CV Rejected",
                    "CV Ignored",
                    "CV Awaiting",
                    "Interview Selected",
                    "Interview Rejected",
                    "Interview Pending",
                ].map((title, index) => (
                    <div
                    key={index}
                    className="grid grid-cols-[1fr_1fr_1fr] px-6 py-3 border-b last:border-b-0 border-[#F0F0F0]"
                    >
                    <p className="text-[14px] text-[#1C1C1C]">{title}</p>
                    <p className="text-[14px] text-[#1C1C1C] text-center">0</p>
                    <p className="text-[14px] text-[#1C1C1C] text-center">4</p>
                    </div>
                ))}
                </div>

                {/* Footer Buttons */}
                <div className="w-[1280px] flex justify-end gap-4 mt-6">
                <button className="h-[40px] px-6 rounded-[6px] bg-[#B5B5B5] text-white text-[14px] font-medium">
                    Close
                </button>
                <button className="h-[40px] px-6 rounded-[6px] bg-[#6C6E70] text-white text-[14px] font-medium">
                    Submit
                </button>
                </div>

            </div>
            </div>
        </div>
        </div>
    );
};

export default ProfileStatusPage;