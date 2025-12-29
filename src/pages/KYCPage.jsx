import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingalResource } from "../services/resourceApi";

const KYCPage = () => {
  const [loading, setLoading] = useState(true);
  const [kycData, setKycData] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();
  console.log("id in KYC Page -> ", id);
  useEffect(() => {
    const fetchKYCDetails = async () => {
      try {
        setLoading(true);
        const response = await getSingalResource(id);
        console.log("response in KYC Page -> ", response);
        if (!response.success) throw new Error("API Error");
        setKycData(response.data.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchKYCDetails();
  }, []);

  return (
    <div className="relative w-full h-full bg-white overflow-auto">
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-500 mt-3">Loading KYC details...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="h-full flex items-center justify-center text-red-500 text-lg">
          Failed to load KYC details
        </div>
      )}

      {/* Content */}
      {!loading && kycData && (
        <div className="w-full flex justify-start">
          <div className="max-w-[1280px] w-full px-8 py-8">
            {/* Title */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-medium text-[#1C1C1C]">
                KYC Details
              </h1>

              <div className="text-right">
                <h1 className="text-xl font-medium text-[#1C1C1C]">
                  #{kycData.resourceDemandInfoId.leadId.leadId}
                </h1>
                <h6 className="text-base font-normal text-[#1C1C1C]">
                  Lead Id
                </h6>
              </div>
            </div>

            {/* Lead Info */}
            <div className="w-[370px] h-[153px] border border-[#E5E5E5] rounded-[8px] p-4 mb-8 top-40 mt-7">
              <p className="font-medium text-[#1C1C1C] text-[20px]">
                {kycData?.resourceDemandInfoId?.leadId?.leadName}
              </p>

              <p className="text-[16px] text-[#000000] mt-5px">
                {kycData?.resourceDemandInfoId?.leadId?.clientId?.clientName}
              </p>

              <p className="text-[16px] text-[#000000] mt-1">
                Campaign:{" "}
                {
                  kycData?.resourceDemandInfoId?.leadId?.clientId
                    ?.clientLinkedId
                }
              </p>

              <p className="text-[16px] text-[#000000]">
                {
                  kycData?.resourceDemandInfoId?.leadId?.clientId
                    ?.clientLinkedId
                }
              </p>
            </div>

            {/* Onboarding Process */}
            <div className="w-[1013px] h-[238px] border border-[#E5E5E5] rounded-[8px] p-4 mb-8">
              <h2 className="font-regular text-[20px] leading-[150%] tracking-[2%] text-[#1C1C1C] mb-4">
                Onboarding Process
              </h2>

              <div className="grid grid-cols-3 gap-x-12 gap-y-6 text-sm text-[#000000]">
                <div>
                  <p className="font-regular text-[16px] mb-1">
                    1. Laptop will be provided by
                  </p>
                  <p className="font-medium text-[#000000] text-[16px]">
                    {kycData?.contractDetailsId?.laptopProvideBy}
                  </p>
                </div>

                <div>
                  <p className="font-regular text-[16px] mb-1">
                    2. BGV report is needed
                  </p>
                  <p className="font-medium text-[#000000] text-[16px]">
                    {kycData?.contractDetailsId?.isBGVRequired}
                  </p>
                </div>

                <div>
                  <p className="font-regular text-[16px] mb-1">
                    3. Client is going to do BGV
                  </p>
                  <p className="font-medium text-[#000000] text-[16px]">
                    {kycData?.contractDetailsId?.clientBGV_Verify}
                  </p>
                </div>

                <div className="col-span-3">
                  <p className="font-regular text-[16px] mb-1">
                    4. Note / Remarks
                  </p>
                  <p className="font-medium text-[#000000] text-[16px]">
                    {kycData?.contractDetailsId?.BGVNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Interview Process */}
            <div className="w-[1013px] h-[238px] border border-[#E5E5E5] rounded-[8px] p-4 mb-10">
              <h2 className="font-[''] font-[] text-[20px] leading-[150%] tracking-[2%] text-[#1C1C1C] mb-4">
                Interview Process
              </h2>

              <div className="grid grid-cols-3 gap-x-12 gap-y-6 text-sm text-[#000000]">
                <div>
                  <p className="font-regular text-[16px] mb-1">
                    1. Written test is there?
                  </p>
                  <p className="font-medium text-[#000000] text-[16px]">
                    {kycData?.writtenTextisThere}
                  </p>
                </div>

                <div>
                  <p className="font-regular text-[16px] mb-1">
                    2. No. of interview rounds?
                  </p>
                  <p className="font-medium text-[#000000] text-[16px]">
                    {kycData?.noOfInterviewRounds}
                  </p>
                </div>

                <div>
                  <p className="font-regular text-[16px] mb-1">3. Trail</p>
                  <p className="font-medium text-[#000000] text-[16px]">
                    {kycData?.trail}
                  </p>
                </div>

                <div className="col-span-3">
                  <p className="font-regular text-[16px] mb-1">
                    4. Outside candidate is allowed? (if no bench resources with
                    us)
                  </p>
                  <p className="font-medium text-[#000000] text-[16px]">
                    {kycData?.outsideCandidateAllowed}
                  </p>
                </div>
              </div>
            </div>

            <button className="h-12 px-8 rounded-lg bg-[#6C6E70] text-white text-sm font-medium">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCPage;
