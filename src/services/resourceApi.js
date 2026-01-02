import {API_RESOURCE_BASE_URL} from "./mainBaseURLs"
import { getAuthHeaders, handleApiError, handleResponse } from "./apiHandleService"

export const addResources = async (formData, l2File) => {
  const isL2 = formData.demandBudgetInfo.paymentConformation === "L2";
  let paymentDocumentUrl = "";

  if (isL2) {
    if (!l2File) {
      throw new Error("L2 requires payment confirmation document");
    }

    const fd = new FormData();

    const customFileName = `payments_${Date.now()}_${l2File.name}`;

    fd.append("file", l2File, customFileName);
    fd.append("type", "payments");  

    const uploadRes = await fetch(
      "http://localhost:5000/api/upload/upload-conformation",
      {
        method: "POST",
        body: fd,  
      }
    );

    if (!uploadRes.ok) {
      throw new Error("File upload failed");
    }

    const uploadData = await uploadRes.json();
    console.log("this file upload ",uploadData)
    paymentDocumentUrl = uploadData.path;
  }

  
  const payload = {
    ...formData,
    demandBudgetInfo: {
      ...formData.demandBudgetInfo,
      paymentConformationDocumentPath: isL2 ? paymentDocumentUrl : "",
    },
  };

  const res = await fetch(`${API_RESOURCE_BASE_URL}add-resource`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
     const errorData = await res.json();
       const errorMessage = errorData.errors[0].message|| "Add resource failed";

       alert(errorMessage);
      console.error("Error details:", errorData);

       // 3. Throw the error to stop further execution
       throw new Error(errorMessage);
  }

  return res.json();
};

export const getAllResource = async () => {
  console.log("Get all resource called")
  try {
    const response = await fetch(`${API_RESOURCE_BASE_URL}get-all-resource`, {
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
    const response = await fetch(`${API_RESOURCE_BASE_URL}get-single-resource/${id}`, {
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
    const response = await fetch(`${API_RESOURCE_BASE_URL}delete-single-resource/${id}`, {
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

export const updateResource = async (id, data) => {
  try {
    const response = await fetch(`${API_RESOURCE_BASE_URL}update-resource/${id}`, {
      method: 'PUT', 
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

export const uploadFile = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    
    if (token) {
      headers['authorization'] = token;
    }
    
    const response = await fetch(`${API_RESOURCE_BASE_URL}upload-file`, {
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
    const response = await fetch(`${API_RESOURCE_BASE_URL}get-dashboard-stats`, {
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
      