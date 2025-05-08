import axios from 'axios';

// import Files
import * as Config from "../utils/Config";
import { header } from "../utils/ApiHeader";


// Get All Packages 

export function getAllPackages(token) {
    return axios.get(`${Config.baseUrl}api/packages`, { headers: header(token), data: {} })
        .then(res => {
            return res.data;
        });
}

// Add Package

export function addPackage(data, token) {

    return axios.post(`${Config.baseUrl}api/package/add`, data, { headers: header(token) })
        .then(res => {
            return res.data;
        });
}

// Edit Package

export function editPackage(data, id, token) {

    return axios.put(`${Config.baseUrl}api/package/${id}`, data, { headers: header(token) })
        .then(res => {
            return res.data;
        });
}

// Delete Package

export function deletePackage(id, token) {

    return axios.delete(`${Config.baseUrl}api/package/${id}`, { headers: header(token) })
        .then(res => {
            return res.data;
        });
}