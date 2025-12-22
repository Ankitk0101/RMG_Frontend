import React from 'react';

const CommentPage = () => {
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
                            <div>
                                <h1 className="text-[24px] font-medium leading-[150%] tracking-[0.02em] text-[#1C1C1C]">
                                    Comment Section
                                </h1>
                                <p className="text-[16px] text-[#6C6E70] mt-1">
                                    You can Add/View comment in this section of #3903
                                </p>
                            </div>

                            <div className="text-right">
                                <h6 className="text-[20px] font-medium text-[#1C1C1C]">#3903</h6>
                                <p className="text-[16px] text-[#000000]">Lead Id</p>
                            </div>
                        </div>

                            {/* Main Layout */}
                        <div className="flex">
                            <div className="flex flex-col">
                                {/* Left Card */}
                                <div className="w-[370px] border border-[#E5E5E5] rounded-[8px] p-4 h-auto">
                                    <p className="text-[20px] font-medium text-[#1C1C1C]">
                                        Shriram B
                                    </p>
                                    <p className="text-[16px] text-[#000000] mt-1">
                                        Huber Group
                                    </p>
                                    <p className="text-[16px] text-[#000000] mt-2">
                                        Campaign: LinkedIn connect Rashi 2025
                                    </p>
                                    <p className="text-[16px] text-[#000000] mt-1">
                                        Others
                                    </p>

                                    <div className="border-t border-b border-[#E5E5E5] mt-4 pt-4 pb-4">
                                        <p className="text-[16px] font-medium text-[#1C1C1C] mb-1">
                                            Job Description
                                        </p>
                                        <p className="text-[16px] text-[#000000]">Senior (3+)</p>
                                        <p className="text-[16px] text-[#000000] mt-1">
                                            Database, full time
                                        </p>
                                    </div>
                                    <div className="flex items-center ">
                                        <p className="text-[16px] text-[#000000] mt-1">
                                            Location
                                        </p>
                                        <div className="mt-2 ml-3 inline-flex items-center px-3 py-1 rounded-[16px] border border-[#E5E5E5] text-[14px]">
                                            Onsite
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <input type="checkbox" className="w-4 h-4" />
                                    <p className="text-[16px] text-[#626262]">
                                        Apply to remaining demand of this group
                                    </p>
                                </div>
                            </div>
                            {/* 🔴 Vertical Divider (Figma Line) */}
                            <div className="mx-8 w-px bg-[#E5E5E5] ml-[75px]" />

                            {/* Right Comment Section */}
                            <div className="flex-1">
                                <p className="text-[16px] text-[#626262] mb-4">
                                    No comments found!
                                </p>

                                <div>
                                    <label className="text-[16px] font-medium text-[#1C1C1C]">
                                        Add comments<span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter your comment"
                                        className="mt-2 w-full h-[56px] px-3 border border-[#E5E5E5] rounded-[6px] text-[16px] focus:outline-none"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    //     <div className="h-screen w-screen bg-[#F5F5F5] overflow-hidden">
    //     {/* Header */}
    //     <div className="fixed top-0 left-0 h-20 w-full bg-white border-b border-[#D9D9D9] z-50" />

    //     {/* Sidebar */}
    //     <div className="fixed top-20 left-0 h-[calc(100vh-80px)] w-20 bg-white border-r border-[#D9D9D9] z-40" />

    //     {/* Content */}
    //     <div className="absolute top-20 left-20 h-[calc(100vh-80px)] w-[calc(100vw-80px)] bg-white overflow-auto">
    //         <div className="w-full flex justify-start">
    //         <div className="w-[1280px] ml-[32px] py-8">

    //             {/* Header Row */}
    //             <div className="flex justify-between items-start mb-6">
    //             <div>
    //                 <h1 className="text-[24px] font-medium leading-[150%] tracking-[0.02em] text-[#1C1C1C]">
    //                 Comment Section
    //                 </h1>
    //                 <p className="text-[14px] text-[#6C6E70] mt-1">
    //                 You can Add/View comment in this section of #3903
    //                 </p>
    //             </div>

    //             <div className="text-right">
    //                 <p className="text-[16px] font-medium text-[#1C1C1C]">#3903</p>
    //                 <p className="text-[14px] text-[#6C6E70]">Lead Id</p>
    //             </div>
    //             </div>

    //             {/* Main Grid */}
    //             <div className="grid grid-cols-[370px_1fr] gap-8">

    //             {/* Left Card */}
    //             <div className="border border-[#E5E5E5] rounded-[8px] p-4">
    //                 <p className="text-[20px] font-medium text-[#1C1C1C]">
    //                 Shriram B
    //                 </p>
    //                 <p className="text-[16px] text-[#000000] mt-1">
    //                 Huber Group
    //                 </p>
    //                 <p className="text-[16px] text-[#000000] mt-2">
    //                 Campaign: LinkedIn connect Rashi 2025
    //                 </p>
    //                 <p className="text-[16px] text-[#000000] mt-1">
    //                 Others
    //                 </p>

    //                 <div className="border-t border-[#E5E5E5] mt-4 pt-4">
    //                 <p className="text-[16px] font-medium text-[#1C1C1C] mb-1">
    //                     Job Description
    //                 </p>
    //                 <p className="text-[16px] text-[#000000]">Senior (3+)</p>
    //                 <p className="text-[16px] text-[#000000] mt-1">
    //                     Database, full time
    //                 </p>

    //                 <div className="mt-3 inline-flex items-center px-3 py-1 rounded-[16px] border border-[#E5E5E5] text-[14px]">
    //                     Onsite
    //                 </div>
    //                 </div>

    //                 <div className="mt-4 flex items-center gap-2">
    //                 <input type="checkbox" className="w-4 h-4" />
    //                 <p className="text-[14px] text-[#6C6E70]">
    //                     Apply to remaining demand of this group
    //                 </p>
    //                 </div>
    //             </div>

    //             {/* Right Comment Section */}
    //             <div>
    //                 <p className="text-[14px] text-[#6C6E70] mb-4">
    //                 No comments found!
    //                 </p>

    //                 <div>
    //                 <label className="text-[14px] font-medium text-[#1C1C1C]">
    //                     Add comments<span className="text-red-500">*</span>
    //                 </label>

    //                 <input
    //                     type="text"
    //                     placeholder="Enter your comment"
    //                     className="mt-2 w-full h-[40px] px-3 border border-[#E5E5E5] rounded-[6px] text-[14px] focus:outline-none"
    //                 />
    //                 </div>
    //             </div>

    //             </div>
    //         </div>
    //         </div>
    //     </div>
    //     </div>
    // );
};

export default CommentPage;