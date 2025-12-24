import { useEffect, useState } from "react";
import ResouceComponents from "../components/Resource/ResouceComponents";
import { getAllResource } from "../services/resourceApi";

/* ================= API STATUS CONSTANTS ================= */
const API_CONSTANT_STATUS = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export default function IterationPage() {
  const [resources, setResources] = useState([]);
  const [apiStatus, setApiStatus] = useState(API_CONSTANT_STATUS.IDLE);
  const [error, setError] = useState("");

  const fetchResources = async () => {
    try {
      setApiStatus(API_CONSTANT_STATUS.LOADING);
      setError("");

      const response = await getAllResource();
      const data = response?.data?.data || [];
      console.log("data from BE -> :  ", data);
      setResources(data);
      setApiStatus(API_CONSTANT_STATUS.SUCCESS);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch resources");
      setApiStatus(API_CONSTANT_STATUS.ERROR);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm min-h-full">
      <div className="w-full">
        <div className="max-w-[1280px] mx-auto py-8">
          {/* Column Headers */}
          <div className="grid grid-cols-[320px_200px_160px_300px_180px_40px] text-[14px] text-[#6C6E70] mb-4 px-6">
            <p>Client</p>
            <p>Job description</p>
            <p>Budget</p>
            <p>Profile</p>
            <p>Duration</p>
          </div>

          {/*  Loader – ONLY while BE call is in progress */}
          {apiStatus === API_CONSTANT_STATUS.LOADING && (
            <div className="flex justify-center items-center h-[300px]">
              <div className="h-8 w-8 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
            </div>
          )}

          {/* Error */}
          {apiStatus === API_CONSTANT_STATUS.ERROR && (
            <div className="text-center text-red-500 py-20">{error}</div>
          )}

          {/* Empty State */}
          {apiStatus === API_CONSTANT_STATUS.SUCCESS &&
            resources.length === 0 && (
              <div className="text-center text-[#6C6E70] py-20">
                No resources found
              </div>
            )}

          {/* Data */}
          {apiStatus === API_CONSTANT_STATUS.SUCCESS &&
            resources.map((oneResource, index) => {
              console.log("reources.map executed .....");
              console.log("oneResource in resources  ----- ", oneResource);
              const showClientId =
                index === 0 ||
                oneResource.resourceDemandInfoId.leadId.clientId.clientId !==
                  resources[index - 1]?.resourceDemandInfoId.leadId.clientId
                    .clientId;

              return (
                <ResouceComponents
                  key={oneResource.id || index}
                  index={index}
                  clientId={oneResource.clientId}
                  showClientId={showClientId}
                  oneResource={oneResource}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

{
  // import { useEffect, useState } from "react";
  // import ResouceComponents from "../components/Resource/ResouceComponents";
  // import { getAllResource } from "../services/resourceApi";
  // export default function IterationPage() {
  //   const [resources, setResources] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");
  //   useEffect(() => {
  //     // ⏳ Show loader for 1 second first
  //     fetchResources();
  //   }, []);
  //   const fetchResources = async () => {
  //     try {
  //       setError("");
  //       setLoading(true);
  //       const response = await getAllResource();
  //       console.log("response ----- ", response);
  //       // Need to modify this data to match data from BE
  //       setResources(response.data.data);
  //       console.log("Allresources got from BE ----- ", response.data.data);
  //       console.log("current updated resources ----- ", resources);
  //     } catch (err) {
  //       setError(err.response?.data?.message || "Failed to fetch resources");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   return (
  //     <>
  //       {/* <div className="h-screen w-screen bg-[#F5F5F5] overflow-hidden"> */}
  //       {/* Header */}
  //       {/* <div className="fixed top-0 left-0 h-20 w-full bg-white border-b border-[#D9D9D9] z-50" /> */}
  //       {/* Sidebar */}
  //       {/* <div className="fixed top-20 left-0 h-[calc(100vh-80px)] w-20 bg-white border-r border-[#D9D9D9] z-40" /> */}
  //       {/* Content */}
  //       <div className="absolute top-20 left-20 h-[calc(100vh-80px)] w-[calc(100vw-80px)] bg-white overflow-auto">
  //         <div className="w-full flex justify-start">
  //           <div className="w-[1280px] ml-[32px] py-8">
  //             {/* Column Headers */}
  //             <div className="grid grid-cols-[320px_200px_160px_300px_180px_40px] text-[14px] text-[#6C6E70] mb-4 px-6">
  //               <p>Client</p>
  //               <p>Job description</p>
  //               <p>Budget</p>
  //               <p>Profile</p>
  //               <p>Duration</p>
  //             </div>
  //             {/* 🔄 Loader (forced 1 second) */}
  //             {loading && (
  //               <div className="flex justify-center items-center h-[300px]">
  //                 <div className="h-8 w-8 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
  //               </div>
  //             )}
  //             {/* ❌ Error
  //             {!loading && error && (
  //               <div className="text-center text-red-500 py-20">{error}</div>
  //             )} */}
  //             {/* 📭 Empty State */}
  //             {loading === false && !error && resources.length === 0 && (
  //               <div className="text-center text-[#6C6E70] py-20">
  //                 No resources found
  //               </div>
  //             )}
  //             {/* ✅ Data */}
  //             {loading === false &&
  //               resources.map((resource, index) => {
  //                 console.log("resource.map executed ", resource);
  //                 const showClientId =
  //                   index === 0 ||
  //                   resource.clientId !== resources[index - 1]?.clientId;
  //                 return (
  //                   <ResouceComponents
  //                     key={index}
  //                     index={index}
  //                     clientId={resource.clientId}
  //                     showClientId={showClientId}
  //                     resource={resource}
  //                   />
  //                 );
  //               })}
  //           </div>
  //         </div>
  //       </div>
  //       {/* </div> */}
  //     </>
  //   );
  // }
}
