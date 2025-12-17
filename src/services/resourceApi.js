import axios from 'axios';

// Base URL configuration - Update this to match your actual API URL
const API_BASE_URL = 'http://localhost:5000/api/resource/';


export const addResources = async (data) =>{
    try {
        const response = await axios.post(API_BASE_URL+'add-resource',data)
        console.log(response.data)
        return "add succesfully"

    } catch (error) {
        return error.message
    }
}


export const getAllResource= async () =>{
    try {
        const response = await axios.get(API_BASE_URL+"get-all-resource")
        console.log(response.data)
        return response.data

    } catch (error) {
        return error.message
    }
}

// getAllResource()

export const getSingalResource = async (id) =>{
    try {
        const response = await axios.post(API_BASE_URL+"get-single-resource/"+id)
        return response.data


    } catch (error) {
        return error.message
    }
}
export const deleteSingalRource = async (id) =>{
    try {
        const response = await axios.post(API_BASE_URL+"delete-single-resource/"+id)
        console.log(response.data)
        return response.data

    } catch (error) {
        return error.message
    }
}

 