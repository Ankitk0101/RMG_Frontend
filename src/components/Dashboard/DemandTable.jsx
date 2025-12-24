import React, { useEffect, useState } from "react";
import { getCreatedOnStatusTableData } from "../../services/dashboardAnalyticsService";

const DemandTable = () => {
  // const tableData = [
  //   {
  //     month: "Oct-25",
  //     demandAdded: "682",
  //     client: "258",
  //     lead: "359",
  //     status11: "33",
  //     status12: "27",
  //     status13: "5",
  //     na: "447",
  //     pending: "0",
  //     keepOnHold: "154",
  //     inactiveClosed: "0",
  //     couldNotFulfill: "81",
  //     fulfilled: "81",
  //     noAction: "81",
  //   },
  // ];

  const [demandTableData, setDemandTableData] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await getCreatedOnStatusTableData();
        console.log("data for demandTable -> ", response);
        setDemandTableData(response.data.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };
    fetchTableData();
  }, []);

  return (
    <div className="w-[1136px] h-auto border border-[#D9D9D9] rounded-[8px] overflow-hidden bg-white">
      {/* Title */}
      <div className="text-center text-[13px] text-[#1C1C1C] py-3 border-b border-[#E5E5E5]">
        By Status <span className="text-[#6C6E70]">(Based on created on)</span>
      </div>

      <table className="w-full border-collapse text-[12px] text   -[#1C1C1C]">
        <thead>
          <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
            <th rowSpan="2" className="border-r px-2 py-2">
              Sr. No
            </th>
            <th rowSpan="2" className="border-r px-2 py-2">
              Month
            </th>
            <th rowSpan="2" className="border-r px-2 py-2">
              Demand Added
            </th>
            <th rowSpan="2" className="border-r px-2 py-2">
              Client
            </th>
            <th colSpan="4" className="border-r px-2 py-2 text-center">
              Lead
            </th>
            <th colSpan="6" className="px-2 py-2 text-center">
              Current Status of Demand
            </th>
          </tr>

          <tr className="bg-[#FAFAFA] border-b border-[#E5E5E5]">
            <th className="border-r px-2 py-2">11</th>
            <th className="border-r px-2 py-2">12</th>
            <th className="border-r px-2 py-2">13</th>
            <th className="border-r px-2 py-2">NA</th>

            <th className="border-r px-2 py-2">Pending</th>
            <th className="border-r px-2 py-2">Keep on hold</th>
            <th className="border-r px-2 py-2">Inactive/closed</th>
            <th className="border-r px-2 py-2">Could not fulfill</th>
            <th className="border-r px-2 py-2">Fulfilled</th>
            <th className="px-2 py-2">No Action</th>
          </tr>
        </thead>

        <tbody>
          {demandTableData.map((oneRow, index) => (
            <tr
              className="border-b border-[#E5E5E5]"
              key={oneRow.status.couldNotFulfill}
            >
              <td className="border-r px-2 py-2 text-center">{index + 1}</td>
              <td className="border-r px-2 py-2 text-center">{oneRow.month}</td>
              <td className="border-r px-2 py-2 text-center">
                {oneRow.demandAdded}
              </td>
              <td className="border-r px-2 py-2 text-center">
                {oneRow.clientId}
              </td>

              {/* Lead columns (as per Figma – no data available, default 0) */}
              <td className="border-r px-2 py-2 text-center">
                {oneRow.leads[0].demandCount}
              </td>
              <td className="border-r px-2 py-2 text-center">0</td>
              <td className="border-r px-2 py-2 text-center">0</td>
              <td className="border-r px-2 py-2 text-center">0</td>
              <td className="border-r px-2 py-2 text-center">
                {oneRow.status.pending}
              </td>

              {/* Current Status */}
              <td className="border-r px-2 py-2 text-center">
                {oneRow.status.keepOnHold}
              </td>
              <td className="border-r px-2 py-2 text-center">
                {oneRow.status.rejected}
              </td>
              <td className="border-r px-2 py-2 text-center">
                {oneRow.status.couldNotFulfill}
              </td>
              <td className="border-r px-2 py-2 text-center">
                {oneRow.status.fulfilled}
              </td>
              <td className="px-2 py-2 text-center">0</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemandTable;
