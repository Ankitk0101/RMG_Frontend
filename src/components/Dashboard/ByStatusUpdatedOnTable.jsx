import data from "../../data.json";
import { useEffect, useState } from "react";
import { getByStatusUpdatedOnTableData } from "../../services/dashboardAnalyticsService";
// const rowData = {
//   srNo: 1,
//   month: "Oct-25",
//   demandUpdated: 682,
//   keepOnHold: 0,
//   inactiveClosed: 682,
//   couldNotFulfill: 2,
//   fulfilled: 170,
// };

const ByStatusUpdatedOnTable = () => {
  const [byStatusUpdatedOnTableData, setByStatusUpdatedOnTableData] = useState(
    []
  );
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await getByStatusUpdatedOnTableData();
        console.log("data for ByStatusUpdatedOnTable -> ", response);
        console.log(
          "data for ByStatusUpdatedOnTable -> ",
          data.DashboardByStatusUpdatedOnData
        );
        setByStatusUpdatedOnTableData(data.DashboardByStatusUpdatedOnData);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };
    fetchTableData();
  }, []);
  return (
    <div className="w-[1136px] bg-white border border-[#D9D9D9] rounded-[8px] overflow-hidden">
      {/* Title */}
      <div className="text-center text-[20px] font-medium text-[#585858] py-3 border-b border-[#E5E5E5]">
        By Status{" "}
        <span className="text-[#585858] font-normal text-[16px]">
          (Based on updated on)
        </span>
      </div>

      <table className="w-full border-collapse text-[13px] text-[#1C1C1C]">
        <thead>
          {/* HEADER ROW 1 */}
          <tr className="bg-[#FAFAFA]">
            <th
              rowSpan={2}
              className="border border-[#E5E5E5] px-3 py-3 text-left"
            >
              Sr. No
            </th>
            <th
              rowSpan={2}
              className="border border-[#E5E5E5] px-3 py-3 text-left"
            >
              Month
            </th>
            <th
              rowSpan={2}
              className="border border-[#E5E5E5] px-3 py-3 text-left"
            >
              Demand Updated
            </th>
            <th
              colSpan={4}
              className="border border-[#E5E5E5] px-3 py-3 text-center"
            >
              Current Status of Demand
            </th>
          </tr>

          {/* HEADER ROW 2 */}
          <tr className="bg-[#FAFAFA]">
            <th className="border border-[#E5E5E5] py-2 text-center">
              Keep on hold
            </th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Inactive / Closed
            </th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Could not fulfill
            </th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Fulfilled
            </th>
          </tr>
        </thead>

        <tbody>
          {byStatusUpdatedOnTableData.map((item) => (
            <tr key={item.id}>
              <td className="border border-[#E5E5E5] px-3 py-3">{item.srNo}</td>
              <td className="border border-[#E5E5E5] px-3 py-3">
                {item.month}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3">
                {item.demandUpdated}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {item.currentStatusOfDemand.keepOnHold}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {item.currentStatusOfDemand.inactiveClosed}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {item.currentStatusOfDemand.couldNotFulfill}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3 text-center">
                {item.currentStatusOfDemand.fulfilled}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ByStatusUpdatedOnTable;
