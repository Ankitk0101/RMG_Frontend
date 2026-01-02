
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

export { getAuthHeaders, handleResponse, handleApiError };