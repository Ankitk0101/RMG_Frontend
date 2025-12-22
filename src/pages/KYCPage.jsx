import React from 'react';

const KYCPage = () => {


    return (

        <div className="h-screen w-screen bg-[#F5F5F5] overflow-hidden">
            <div className="fixed top-0 left-0 h-20 w-full bg-white border-b border-[#D9D9D9] z-50 flex items-center px-6">
            </div>

            <div className="fixed top-20 left-0 h-[calc(100vh-80px)] w-20 bg-white border-r border-[#D9D9D9] z-40"></div>

            <div className="absolute top-20 left-20 h-[calc(100vh-80px)] w-[calc(100vw-80px)] bg-white overflow-auto">
                <div className="w-full flex justify-start">
                    <div className="w-[1280px] ml-[32px] py-8">
                        <div className="flex items-center justify-between mt-[10px]">
                            <h1 className="w-[131px] h-[36px] text-[24px] font-medium leading-[150%] tracking-[0.02em] text-[#1C1C1C]">
                                KYC Details
                            </h1>
                            <div className="flex flex-col  items-center"    >
                                <h1 className="text-[20px] font-medium text-[#1C1C1C] m-0">#123456</h1>
                                {/* <h6 className="text-[16px] font-regular text-[#1C1C1C] m-0">Lead Id</h6> */}
                            </div>
                        </div>
                        <h6 className="text-[16px] font-regular text-[#1C1C1C] m-0 text-right w-[1280px]">Lead Id</h6>
                        <div className="w-[370px] h-[153px] border border-[#E5E5E5] rounded-[8px] p-4 mb-8 top-40 mt-7">
                            <p className="font-medium  text-[#1C1C1C] text-[20px]">Shriram B</p>
                            <p className="text-[16px]  text-[#000000] mt-5px">Huber Group</p>
                            <p className="text-[16px]  text-[#000000] mt-1">Campaign: LinkedIn connect Rashi 2025</p>
                            <p className="text-[16px]  text-[#000000]">Others</p>
                        </div>

                        <div className="w-[1013px] h-[238px] border border-[#E5E5E5] rounded-[8px] p-4 mb-8">
                            <h2 className="font-regular text-[20px] leading-[150%] tracking-[2%] text-[#1C1C1C] mb-4">Onboarding Process</h2>

                            <div className="grid grid-cols-3 gap-x-12 gap-y-6 text-sm text-[#000000]">
                                <div>
                                    <p className="font-regular text-[16px]  mb-1">1. Laptop will be provided by</p>
                                    <p className="font-medium text-[#000000] text-[16px]">Neosoft</p>
                                </div>

                                <div>
                                    <p className="font-regular text-[16px] mb-1">2. BGV report is needed</p>
                                    <p className="font-medium text-[#000000] text-[16px]">Yes</p>
                                </div>

                                <div>
                                    <p className="font-regular text-[16px] mb-1">3. Client is going to do BGV</p>
                                    <p className="font-medium text-[#000000] text-[16px]">Yes</p>
                                </div>

                                <div className="col-span-3">
                                    <p className="font-regular text-[16px] mb-1">4. Note / Remarks</p>
                                    <p className="font-medium text-[#000000] text-[16px]">The client might do the BGV</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-[1013px] h-[238px] border border-[#E5E5E5] rounded-[8px] p-4 mb-10">
                            <h2 className="font-[''] font-[] text-[20px] leading-[150%] tracking-[2%] text-[#1C1C1C] mb-4">
                                Interview Process
                            </h2>   

                            <div className="grid grid-cols-3 gap-x-12 gap-y-6 text-sm text-[#000000]">
                                <div>
                                    <p className="font-regular text-[16px] mb-1">1. Written test is there?</p>
                                    <p className="font-medium text-[#000000] text-[16px]">No</p>
                                </div>

                                <div>
                                    <p className="font-regular text-[16px] mb-1">2. No. of interview rounds?</p>
                                    <p className="font-medium text-[#000000] text-[16px]">2</p>
                                </div>

                                <div>
                                    <p className="font-regular text-[16px] mb-1">3. Trial</p>
                                    <p className="font-medium text-[#000000] text-[16px]">Not there</p>
                                </div>

                                <div className="col-span-3">
                                    <p className="font-regular text-[16px] mb-1">4. Outside candidate is allowed? (if no bench resources with us)</p>
                                    <p className="font-medium text-[#000000] text-[16px]">Yes</p>
                                </div>
                            </div>
                        </div>

                        <button className="h-[48px] px-[32px] py-[8px] flex items-center gap-[8px] rounded-[8px] bg-[#6C6E70] text-white text-sm font-medium">
                            Close
                        </button>

                    </div>
                </div>
            </div>
        </div>




        // <div className="h-screen w-screen bg-[#F5F5F5] overflow-hidden">
        //     {/* Header */}
        //     <div className="fixed top-0 left-0 h-20 w-full bg-white border-b border-[#D9D9D9] z-50 flex items-center px-6">
        //         <span className="text-sm text-gray-600">KYC details</span>
        //     </div>

        //     {/* Sidebar */}
        //     <div className="fixed top-20 left-0 h-[calc(100vh-80px)] w-20 bg-white border-r border-[#D9D9D9] z-40">
        //         {/* sidebar icons later */}
        //     </div>

        //     {/* Content */}
        //     <div className="absolute top-20 left-20 h-[calc(100vh-80px)]  bg-white w-[calc(100vw-80px)] overflow-auto">
        //         <div className="max-w-[1013px]  py-8">

        //         {/* Title Row */}
        //         <div className="flex justify-between items-center mb-6">
        //             <h1 className="text-lg font-semibold text-gray-900">KYC Details</h1>
        //             <div className="text-sm text-gray-600">
        //             #123456 <span className="block text-xs">Lead Id</span>
        //             </div>
        //         </div>

        //         {/* Card 1 */}
        //         <div className="bg-white border border-[#E5E5E5] rounded-md p-4 mb-6 w-[420px]">
        //             <p className="font-semibold text-gray-900">Shriram B</p>
        //             <p className="text-sm text-gray-600">Huber Group</p>
        //             <p className="text-sm text-gray-600 mt-1">
        //             Campaign: LinkedIn connect Rashi 2025
        //             </p>
        //             <p className="text-sm text-gray-600">Others</p>
        //         </div>

        //         {/* Onboarding Process */}
        //         <div className="bg-white border border-[#E5E5E5] rounded-md p-4 mb-6">
        //             <h2 className="font-semibold text-gray-900 mb-3">Onboarding Process</h2>

        //             <div className="grid grid-cols-3 gap-6 text-sm text-gray-700">
        //             <div>
        //                 <p className="mb-1">1. Laptop will be provided by</p>
        //                 <p className="font-medium text-gray-900">Neosoft</p>
        //             </div>

        //             <div>
        //                 <p className="mb-1">2. BGV report is needed</p>
        //                 <p className="font-medium text-gray-900">Yes</p>
        //             </div>

        //             <div>
        //                 <p className="mb-1">3. Client is going to do BGV</p>
        //                 <p className="font-medium text-gray-900">Yes</p>
        //             </div>

        //             <div className="col-span-3">
        //                 <p className="mb-1">4. Note / Remarks</p>
        //                 <p className="font-medium text-gray-900">
        //                 The client might do the BGV
        //                 </p>
        //             </div>
        //             </div>
        //         </div>

        //         {/* Interview Process */}
        //         <div className="bg-white border border-[#E5E5E5] rounded-md p-4 mb-8">
        //             <h2 className="font-semibold text-gray-900 mb-3">Interview Process</h2>

        //             <div className="grid grid-cols-3 gap-6 text-sm text-gray-700">
        //             <div>
        //                 <p className="mb-1">1. Written test is there?</p>
        //                 <p className="font-medium text-gray-900">No</p>
        //             </div>

        //             <div>
        //                 <p className="mb-1">2. No. of interview rounds?</p>
        //                 <p className="font-medium text-gray-900">2</p>
        //             </div>

        //             <div>
        //                 <p className="mb-1">3. Trial</p>
        //                 <p className="font-medium text-gray-900">Not there</p>
        //             </div>

        //             <div className="col-span-3">
        //                 <p className="mb-1">
        //                 4. Outside candidate is allowed? (if no bench resources with us)
        //                 </p>
        //                 <p className="font-medium text-gray-900">Yes</p>
        //             </div>
        //             </div>
        //         </div>

        //         {/* Footer Button */}
        //         <button className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm">
        //             Close
        //         </button>

        //         </div>
        //     </div>
        // </div>


        // <>
        //     <div className="h-screen w-screen bg-[#F5F5F5] overflow-hidden">
        //     {/* Header */}
        //     <div className="fixed top-0 left-0 h-20 w-full bg-white border-b border-[#D9D9D9] z-50">
                
        //     </div>

        //     {/* Sidebar */}
        //     <div className="fixed top-20 left-0 h-[calc(100vh-80px)] w-20 bg-white border-r border-[#D9D9D9] z-40">
                
        //     </div>

        //     {/* Content */}
        //     <div className="absolute top-20 left-20 h-[calc(100vh-80px)] w-[calc(100vw-80px)] bg-white">
                
        //     </div>
        //     </div>
        // </>
    )
};


export default KYCPage;