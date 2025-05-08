import axios from 'axios';
import * as Config from "../utils/Config";


// Login Functionality 

export function login(data) {
    const user = {
        email: data.email,
        password: data.password
    }

    return axios.post(`${Config.baseUrl}api/auth/signin`, user)
        .then(res => {
            // console.log("msglogin",res);
            return res;
        })
        .catch(error => {
            // console.log('Login Error: ', error);
            return error.response
        })
}

// -----------------Register For All --------------


export function register(data) {
    return axios.post(`${Config.baseUrl}api/auth/signup`, data)
        .then(res => {
            return res;
        })
        .catch(error => {
            // console.log('Register Error: ', error);
            return error.response
        })
}


// Header API

export function callOnHeader() {
    return axios.post(`${Config.baseUrl}api/makeinactive`)
        .then(res => {
            return res;
        })
        .catch(error => {
            // console.log('Register Error: ', error);
            return error.response
        })
}

