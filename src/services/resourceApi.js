// Base URL configuration
const API_BASE_URL = 'http://localhost:5000/api/resource/';


// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     'Content-Type': 'application/json',
//     authorization: token,
//   };
// };

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  console.log(token)
  return {
    'Content-Type': 'application/json',
    authorization: token,
  };
};


 
const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    let errorData = {};

    if (contentType && contentType.includes("application/json")) {
      errorData = await response.json();
    }

    const error = new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );

    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  // If NO CONTENT (204)
  if (response.status === 204) {
    return null;
  }

  // If response has JSON
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  // Fallback (text response)
  return null;
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



export const addResources = async (formData, l2File) => {
  const isL2 = formData.demandBudgetInfo.paymentConformation === "L2";

  let paymentDocumentUrl = "";

  // 🔹 Upload ONLY if L2
  if (isL2) {
    if (!l2File) {
      throw new Error("L2 requires payment confirmation document");
    }

    const fd = new FormData();
    fd.append("file", l2File);

    const uploadRes = await fetch(
      "http://localhost:5000/upload-conformation",
      {
        method: "POST",
        body: fd,
      }
    );

    if (!uploadRes.ok) {
      throw new Error("File upload failed");
    }

    const uploadData = await uploadRes.json();
    paymentDocumentUrl = uploadData.path;
  }

  // 🔹 Final payload (clean)
  const payload = {
  ...formData,
  demandBudgetInfo: {
    ...formData.demandBudgetInfo,
    paymentConformationDocumentPath:
      formData.demandBudgetInfo.paymentConformation === "L2"
        ? paymentDocumentUrl
        : "",
  },
};

  const res = await fetch(API_BASE_URL + "add-resource", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Add resource failed");
  }

  return res.json();
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
}

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

export const getDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}get-dashboard-stats`, {
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
      