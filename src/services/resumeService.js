import {API_FILE_UPLOAD_BASE_URL, API_RESUME_BASE_URL} from "./mainBaseURLs"
import { getAuthHeaders, handleApiError, handleResponse } from "./apiHandleService"

export const uploadResumeToS3 = async (formData) => {
  console.log("formData in uploadResume", formData);
  try {
    const response = await fetch(
      `${API_FILE_UPLOAD_BASE_URL}upload-conformation`,
      {
        method: "POST",
        headers: getAuthHeaders(),        
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

export const uploadResumeToDb = async (data) => {

  try {
    const response = await fetch(
      `${API_RESUME_BASE_URL}add-candidate-resume`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
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
  try {
    
    const encodedKey = encodeURIComponent(key);
    const response = await fetch(`${API_FILE_UPLOAD_BASE_URL}getKeyWiseData/${encodedKey}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
       throw new Error("Failed to fetch resume");
    }

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
    const response = await fetch(`${API_RESUME_BASE_URL}update-candidate-resume/${resumeId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
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
