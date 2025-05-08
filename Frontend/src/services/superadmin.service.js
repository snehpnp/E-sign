import { useSearchParams } from "react-router-dom";
import axios from 'axios';
// import Files
import * as Config from "../utils/Config";
import { header } from "../utils/ApiHeader"


// Get All Admins 

export function getAdmins(token) {

    return axios.get(`${Config.baseUrl}api/admins?parent_admin_id=1`, { headers: header(token), data: {} })
        .then(res => {
            return res.data;
        });
}


// Get Admin BY ID , deatils get a particular .

export function getAdminById(token, id) {

    return axios.get(`${Config.baseUrl}api/admins/${id}`, { headers: header(token), data: {} })
        .then(res => {
            return res.data;
        });
}

// Update Admin Details 

export function adminUpdate(data, id, token) {

    return axios.put(`${Config.baseUrl}api/admins/${id}`, data, { headers: header(token) })
        .then(res => {
            return res.data;
        });
}

// Delete Admin API

export function deleteAdminById(token, id) {

    return axios.delete(`${Config.baseUrl}api/admins/${id}`, { headers: header(token), data: {} })
        .then(res => {
            return res.data;
        });
}


// Get Admin Stamps by ID , deatils get a particular admin.

export function getStampsById(token, id) {

    return axios.get(`${Config.baseUrl}api/adminstamp/${id}`, { headers: header(token), data: {} })
        .then(res => {
            return res.data;
        });
}


// Admin Status API


export function getStatus(token, data) {

    return axios.post(`${Config.baseUrl}api/changestatus`, data, { headers: header(token), data: {} })
        .then(res => {
            return res.data
        })
}


// Dashboard Count API

export function dashboardCount(data ,token) {

    return axios.post(`${Config.baseUrl}api/counts`, data, { headers: header(token) })
        .then(res => {
            return res.data;
        });
}


// Fund History API

export function FundHistoryAdmin(token) {

    return axios.get(`${Config.baseUrl}api/fundhistory`, { headers: header(token), data: {} })
        .then(res => {
            return res.data;
        });
}


// Transaction History API

export function transactionHistory(token) {

    return axios.get(`${Config.baseUrl}api/transictionhistory`, { headers: header(token) })
        .then(res => {
            return res.data;
        });
}

// Transaction History API By Id

export function transactionHistoryById(data, token) {

    return axios.post(`${Config.baseUrl}api/single/transictionhistory`, data, { headers: header(token) })
        .then(res => {
            return res.data;
        });
}





// Active Comapny   API

export function ActiveCompanyList(data ,token) {

    return axios.post(`${Config.baseUrl}api/activecompany`, data ,{ headers: header(token), data: {} })
        .then(res => {
            return res.data;
        });
}


// Expire  Comapny   API

export function ExpireCompanyList(data ,token) {

    return axios.post(`${Config.baseUrl}api/expirecompany`, data, { headers: header(token), data: {} })
        .then(res => {
            return res.data;
        });
}



// Go-To-Dashboard

export function GoToDashboardFuncTion(id) {
    return axios
        .post(`${Config.baseUrl}api/auth/gotodashboard`, id ,  {
            headers: {
                // 'Authorization': apitoken,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        }).catch((res) => { return res }
        )
}



// Company PACKAGE lIST ACCORDING TO ID


export function  CompanyPackageList(id) {
    return axios
        .post(`${Config.baseUrl}api/packagewise/list`, id ,  {
            headers: {
                // 'Authorization': apitoken,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        }).catch((res) => { return res }
        )
}



// All  Company PACKAGE Update History


export function  AllPackageUpdateList() {
    return axios
        .get(`${Config.baseUrl}api/packageupdate/history`,  {
            headers: {
                // 'Authorization': apitoken,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        }).catch((res) => { return res }
        )
}
