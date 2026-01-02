import {API_ANALYTICS_BASE_URL} from "./mainBaseURLs"
import { getAuthHeaders, handleApiError, handleResponse } from "./apiHandleService"

const getDashboardStats = async () => {
  try {
    const response = await fetch(`${API_ANALYTICS_BASE_URL}dashboard-stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const responseData = await handleResponse(response);
    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    return handleApiError(error);
  }
};

const getFlowChartData = async () => {
  try {
    const response = await fetch(`${API_ANALYTICS_BASE_URL}flow-chart-data`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const responseData = await handleResponse(response);
    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    return handleApiError(error);
  }
};

const getByStatusCreatedOnTableData = async () => {
  console.log("getCreatedOnStatusTableData called");
  try {
    const response = await fetch(`${API_ANALYTICS_BASE_URL}created-on-status-table-data`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const responseData = await handleResponse(response);
    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    return handleApiError(error);
  }
};  

const getByStatusUpdatedOnTableData = async () => {
  try {
    const response = await fetch(`${API_ANALYTICS_BASE_URL}updated-on-status-table-data`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const responseData = await handleResponse(response);
    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    return handleApiError(error);
  }
};

const getByCategoryAndBudgetAndDemandTypeAndRegionTableData = async () => {
  try {
    const response = await fetch(`${API_ANALYTICS_BASE_URL}category-budget-demand-type-region-table-data`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const responseData = await handleResponse(response);
    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    return handleApiError(error);
  }
};

const getInAndOutHouseTableData = async (resourceType) => {
  try {
    const response = await fetch(`${API_ANALYTICS_BASE_URL}in-and-out-house-table-data/:${resourceType}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const responseData = await handleResponse(response);
    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export { getDashboardStats, getFlowChartData, getByStatusCreatedOnTableData, getByStatusUpdatedOnTableData , getByCategoryAndBudgetAndDemandTypeAndRegionTableData, getInAndOutHouseTableData};