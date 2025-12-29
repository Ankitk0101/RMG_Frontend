import React, { useEffect, useState } from "react";
import { getInAndOutHouseTableData } from "../../services/dashboardAnalyticsService";
import data from "../../data.json";

const InAndOutHouseTable = ({ resourceType }) => {
  const [inAndOutHouseTableData, setInAndOutHouseTableData] = useState([]);
  const resource =
    resourceType === "Internal" ? "Inhouse Resources" : "Outside Resources";
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await getInAndOutHouseTableData(resourceType);
        console.log("data for inAndOutHouseTable -> ", response);
        console.log(
          "data for inAndOutHouseTable -> ",
          data.DashboardInHouseResourceData
        );
        setInAndOutHouseTableData(data.DashboardInHouseResourceData);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };
    fetchTableData();
  }, []);

  return (
    <div className="w-[1136px] bg-white border border-[#D9D9D9] rounded-[8px] overflow-hidden">
      <div className="text-center text-[20px] font-medium text-[#585858] py-3 border-b border-[#E5E5E5]">
        By Profile ({resource}){" "}
        <span className="text-[#585858] font-normal text-[16px]">
          (Based on created on)
        </span>
      </div>
      <table className="w-full border-collapse text-[13px] text-[#1C1C1C]">
        <thead>
          {/* ROW 1 */}
          <tr className="bg-[#FAFAFA]">
            <th
              rowSpan={3}
              className="border border-[#E5E5E5] px-3 py-3 text-left"
            >
              Sr. No
            </th>
            <th
              rowSpan={3}
              className="border border-[#E5E5E5] px-3 py-3 text-left"
            >
              Month
            </th>
            <th
              rowSpan={3}
              className="border border-[#E5E5E5] px-3 py-3 text-left"
            >
              CV Shared
            </th>
            <th
              colSpan={4}
              className="border border-[#E5E5E5] px-3 py-3 text-center"
            >
              CV Status
            </th>
            <th
              colSpan={5}
              className="border border-[#E5E5E5] px-3 py-3 text-center"
            >
              Interview Status
            </th>
          </tr>

          {/* ROW 2 */}
          <tr className="bg-[#FAFAFA]">
            <th colSpan={4} className="border border-[#E5E5E5] py-2"></th>
            <th
              colSpan={3}
              className="border border-[#E5E5E5] py-2 text-center"
            >
              Schedule Pending
            </th>
            <th
              rowSpan={2}
              className="border border-[#E5E5E5] py-2 text-center"
            >
              Scheduled
            </th>
            <th
              rowSpan={2}
              className="border border-[#E5E5E5] py-2 text-center"
            >
              Awaiting
            </th>
          </tr>

          {/* ROW 3 */}
          <tr className="bg-[#FAFAFA]">
            <th className="border border-[#E5E5E5] py-2 text-center">
              Awaiting
            </th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Selected
            </th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Rejected
            </th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Ignored
            </th>

            <th className="border border-[#E5E5E5] py-2 text-center">
              Pending
            </th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Written Test Pending
            </th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Written Test Rejected
            </th>
          </tr>
        </thead>

        <tbody>
          {inAndOutHouseTableData.map((rowData) => (
            <tr>
              <td className="border border-[#E5E5E5] px-3 py-3">
                {rowData.serialNo}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3">
                {rowData.month}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3">
                {rowData.totalCVs}
              </td>

              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {rowData.cvStatus.awaiting}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {rowData.cvStatus.selected}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {rowData.cvStatus.rejected}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {rowData.cvStatus.ignored}
              </td>

              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {rowData.interviewStatus.pending}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {rowData.interviewStatus.writtenTestPending}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {rowData.interviewStatus.writtenTestRejected}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {rowData.interviewStatus.scheduled}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {rowData.interviewStatus.awaiting}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InAndOutHouseTable;
