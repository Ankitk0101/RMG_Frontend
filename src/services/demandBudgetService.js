import {API_DEMAND_BUDGET_BASE_URL} from "./mainBaseURLs"
import { getAuthHeaders, handleApiError, handleResponse } from "./apiHandleService"

export const updateDemandBudget = async (demandBudgetId, updatedData) => {
  try {
    const response = await fetch(`${API_DEMAND_BUDGET_BASE_URL}update-demand-budget/${demandBudgetId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updatedData)
    });
    return handleResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};