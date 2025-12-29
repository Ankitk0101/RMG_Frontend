import data from "../../data.json";
import { useEffect, useState } from "react";
import { getByCategoryAndBudgetAndDemandTypeAndRegionTableData } from "../../services/dashboardAnalyticsService";

const ByCategoryAndBudgetTable = () => {
  const [byCategoryAndBudgetTableData, setByCategoryAndBudgetTableData] =
    useState([]);
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response =
          await getByCategoryAndBudgetAndDemandTypeAndRegionTableData();
        console.log("data for ByCategoryAndBudgetTable -> ", response);
        console.log(
          "data for ByCategoryAndBudgetTable -> ",
          data.DashboardByCategoryAndBudgetAndDemandTypeAndRegionData
        );
        setByCategoryAndBudgetTableData(
          data.DashboardByCategoryAndBudgetAndDemandTypeAndRegionData
        );
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
        By Category & Budget & Demand Type & Region{" "}
        <span className="text-[#7A7A7A] text-[16px] font-normal">
          (Based on created on)
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
              className="border border-[#E5E5E5] py-3 text-center"
            >
              Category
            </th>
            <th
              colSpan={5}
              className="border border-[#E5E5E5] py-3 text-center"
            >
              Budget
            </th>
            <th
              colSpan={3}
              className="border border-[#E5E5E5] py-3 text-center"
            >
              Demand Type
            </th>
          </tr>

          {/* HEADER ROW 2 */}
          <tr className="bg-[#FAFAFA]">
            {/* Category */}
            <th className="border border-[#E5E5E5] py-2 text-center">
              Standard
            </th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Premium
            </th>
            <th className="border border-[#E5E5E5] py-2 text-center">Niche</th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Super Niche
            </th>

            {/* Budget */}
            <th className="border border-[#E5E5E5] py-2 text-center">
              Below B1
            </th>
            <th className="border border-[#E5E5E5] py-2 text-center">B1</th>
            <th className="border border-[#E5E5E5] py-2 text-center">B2</th>
            <th className="border border-[#E5E5E5] py-2 text-center">B3</th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Above B3
            </th>

            {/* Demand Type */}
            <th className="border border-[#E5E5E5] py-2 text-center">Client</th>
            <th className="border border-[#E5E5E5] py-2 text-center">Lead</th>
            <th className="border border-[#E5E5E5] py-2 text-center">
              Package
            </th>
          </tr>
        </thead>

        <tbody>
          {byCategoryAndBudgetTableData.map((item, index) => (
            <tr>
              <td className="border border-[#E5E5E5] px-3 py-3">{index + 1}</td>
              <td className="border border-[#E5E5E5] px-3 py-3">
                {item.month}
              </td>
              <td className="border border-[#E5E5E5] px-3 py-3">
                {item.demandUpdated}
              </td>

              {/* Category */}
              <td className="border border-[#E5E5E5] text-center">
                {item.category.standard}
              </td>
              <td className="border border-[#E5E5E5] text-center">
                {item.category.premium}
              </td>
              <td className="border border-[#E5E5E5] text-center">
                {item.category.niche}
              </td>
              <td className="border border-[#E5E5E5] text-center">
                {item.category.superNiche}
              </td>

              {/* Budget */}
              <td className="border border-[#E5E5E5] text-center">
                {item.budget.belowB1}
              </td>
              <td className="border border-[#E5E5E5] text-center">
                {item.budget.b1}
              </td>
              <td className="border border-[#E5E5E5] text-center">
                {item.budget.b2}
              </td>
              <td className="border border-[#E5E5E5] text-center">
                {item.budget.b3}
              </td>
              <td className="border border-[#E5E5E5] text-center">
                {item.budget.aboveB3}
              </td>

              {/* Demand Type */}
              <td className="border border-[#E5E5E5] text-center">
                {item.demandType.client}
              </td>
              <td className="border border-[#E5E5E5] text-center">
                {item.demandType.lead}
              </td>
              <td className="border border-[#E5E5E5] text-center">
                {item.demandType.package}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ByCategoryAndBudgetTable;
