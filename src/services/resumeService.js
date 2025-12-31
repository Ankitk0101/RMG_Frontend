const API_BASE_URL = 'http://localhost:5000/api/resource/'; 

// const getAuthHeaders = () => {
//   console.log('getAuthHeaders called');
//   const token = localStorage.getItem('token');
//   console.log('token in getAuthHeaders', token);
//   const headers = {
//     'Content-Type': 'application/json',
//   };
  
//   if (token) {
//     headers['authorization'] = token;
//   } else {
//     console.warn('No token found in localStorage');
//   }
  
//   return headers;
// };

const handleResponse = async (response) => {
  console.log('handleResponse called');
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
  console.log('response in handleResponse', response);
  
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

// export const uploadResume = async (formData) => {
//   console.log("formData in uploadResume ", formData);
//   try {
//     const token = localStorage.getItem('token');
//     const headers = {};

//     if (token) {
//       headers['authorization'] = token;
//     }

//     // // Check if formData is an instance of FormData
//     // const isFormData = formData instanceof FormData;
//     // console.log("isFormData in uploadResume ", isFormData);


//     // Note: Don't set Content-Type for FormData - browser will set it automatically with boundary
//     const response = await fetch(`http://localhost:5000/upload-conformation`, {
//       method: "POST",
//       body: {formData}
//     });
    

//     console.log('response in uploadResume', response); 
//     const responseData = await handleResponse(response); 
//     console.log('responseData in uploadResume', responseData); 
    
//     return {
//       success: true,
//       data: responseData,
//       message: 'File uploaded successfully'
//     };
//   } catch (error) {
//     console.log("error in uploadResume", error);
//     return handleApiError(error);
//   }
// };

export const uploadResumeToS3 = async (formData) => {
  console.log("formData in uploadResume", formData);
  try {
    const token = localStorage.getItem("token");

    const headers = {};
    if (token) {
      headers["authorization"] = token;
    }

    const response = await fetch(
      "http://localhost:5000/api/upload/upload-conformation",
      {
        method: "POST",
        headers,        
        body: formData  
      }
    );

    const responseData = await handleResponse(response);

    return {
      success: true,
      data: responseData,
      message: "File uploaded successfully",
    };
  } catch (error) {
    console.error("error in uploadResume", error);
    return handleApiError(error);
  }
};

// export const uploadResumeToDb = async (formData) => {
//   console.log("formData in uploadResumeToDb",formData);
//   try {
//     const token = localStorage.getItem("token");
//     const headers = {};
//     if (token) {
//       headers["authorization"] = token;
//     }
//     const response = await fetch(
//       "http://localhost:5000/api/resume/add-candidate-resume",
//       {
//         method: "POST",
//         headers,
//         body: formData
//       }
//     );
//     const responseData = await handleResponse(response);
//     return {
//       success: true,
//       data: responseData,
//       message: "File uploaded successfully",
//     };
//   } catch (error) {
//     console.error("error in uploadResume", error);
//     return handleApiError(error);
//   }
// };
export const uploadResumeToDb = async (data) => {
  console.log("data in uploadResumeToDb", data);

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/resume/add-candidate-resume",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ REQUIRED
          authorization: token,
        },
        body: JSON.stringify(data), // ✅ REQUIRED
      }
    );

    const responseData = await handleResponse(response);
    return {
      success: true,
      data: responseData,
      message: "Resume data saved successfully",
    };
  } catch (error) {
    console.error("error in uploadResumeToDb", error);
    return handleApiError(error);
  }
};

export const getResumeFile = async (key) => {
  console.log("key in getResumeFile", key);
  try {
    
    const encodedKey = encodeURIComponent(key);
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/upload/getKeyWiseData/${encodedKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    if (!response.ok) {
       throw new Error("Failed to fetch resume");
    }

    // ✅ Convert stream → Blob
    const blob = await response.blob();

    console.log("Blob type:", blob.type);
    console.log("Blob size:", blob.size);

    return {
      success: true,
      data: blob,
      message: "Resume file retrieved successfully",
    };
  } catch (error) {
    console.error("error in getResumeFile", error);
    return handleApiError(error);
  }
};

export const updateResumeStatus = async (resumeId, updatedCandidateStatusTimeline) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/resume/update-candidate-resume/${resumeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ candidateStatusTimeline: updatedCandidateStatusTimeline }),
    });
    console.log('response in updateResumeStatus', response);
    const responseData = await handleResponse(response);
    return {
      success: true,
      data: responseData,
      message: "Status updated successfully",
    };
  } catch (error) {
    console.error("error in updateResumeStatus", error);
    return handleApiError(error);
  }
};
