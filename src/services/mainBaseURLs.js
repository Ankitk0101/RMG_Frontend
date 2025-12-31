const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const resourceBaseURL =API_BASE_URL+'/api/resource/'
export const authBaseURl = API_BASE_URL+'/api/authUser'
export const analyticsBaseURl = API_BASE_URL+'/api/analytics/'


console.log("this base for data",API_BASE_URL)
