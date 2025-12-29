const API_BASE_URL = 'http://localhost:5000/api/analytics/';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['authorization'] = token;
  } else {
    console.warn('No token found in localStorage');
  }
  
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  
  return response.json();
};

const handleApiError = (error) => {
  console.error('API Error:', {
    status: error.status,
    message: error.message,
    data: error.data
  });
  
  // Handle 401 specifically without auto-logout
  if (error.status === 401) {
    return {
      success: false,
      message: 'Session expired. Please login again.',
      status: 401
    };
  }
  
  return {
    success: false,
    message: error.data?.message || error.message || 'API request failed',
    status: error.status
  };
};

const getDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}dashboard-stats`, {
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
    const response = await fetch(`${API_BASE_URL}flow-chart-data`, {
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
    const response = await fetch(`${API_BASE_URL}created-on-status-table-data`, {
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
    const response = await fetch(`${API_BASE_URL}updated-on-status-table-data`, {
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
    const response = await fetch(`${API_BASE_URL}category-budget-demand-type-region-table-data`, {
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
    const response = await fetch(`${API_BASE_URL}in-and-out-house-table-data/:${resourceType}`, {
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