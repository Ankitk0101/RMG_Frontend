// Base URL configuration
const API_BASE_URL = 'http://localhost:5000/api/resource/';


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

// Helper function to handle API responses
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

// Helper function to handle API errors
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

export const addResources = async (data) => {
  try {
    const tokenBeforeRequest = localStorage.getItem('token');
    console.log("this main toaken ",tokenBeforeRequest)
    const payload = { ...data, authorization: tokenBeforeRequest };
    
    console.log('Sending data:', payload);

    console.log("this auth header function",getAuthHeaders())

    const response = await fetch(`${API_BASE_URL}add-resource`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    const responseData = await handleResponse(response);
    
    return {
      success: true,
      data: responseData,
      message: 'Resource added successfully'
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAllResource = async () => {
  console.log("Get all resource called")
  try {
    const response = await fetch(`${API_BASE_URL}get-all-resource`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    console.log("Get all resource response",response)
    const responseData = await handleResponse(response);
    
    return {
      success: true,
      data: responseData
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getSingalResource = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}get-single-resource/${id}`, {
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

export const deleteSingalResource = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}delete-single-resource/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    const responseData = await handleResponse(response);
    
    return {
      success: true,
      data: responseData,
      message: 'Resource deleted successfully'
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Optional: Add a function for PATCH/PUT requests if needed
export const updateResource = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}update-resource/${id}`, {
      method: 'PATCH', // or 'PUT' depending on your API
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    const responseData = await handleResponse(response);
    
    return {
      success: true,
      data: responseData,
      message: 'Resource updated successfully'
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Optional: Add file upload support if needed
export const uploadFile = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    
    if (token) {
      headers['authorization'] = token;
    }
    
    // Note: Don't set Content-Type for FormData - browser will set it automatically with boundary
    const response = await fetch(`${API_BASE_URL}upload-file`, {
      method: 'POST',
      headers: headers,
      body: formData,
    });

    const responseData = await handleResponse(response);
    
    return {
      success: true,
      data: responseData,
      message: 'File uploaded successfully'
    };
  } catch (error) {
    return handleApiError(error);
  }
};