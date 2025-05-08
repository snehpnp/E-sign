import React, { useState } from 'react'
import axios from "axios";
import Loder from "../utils/Loder";


// import Files
import * as Config from "../utils/Config";

import {
    header
} from "../utils/ApiHeader";

const url = "https://kyc-api.aadhaarkyc.io/api/v1/";

const apitoken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY2MTMyMDQ2MywianRpIjoiMDE2NjgwNzEtYTAwZi00MDEyLTk0YzgtYjZlYTA3NTdiMTA4IiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2LnBhbmRwaW5mb3RlY2hAc3VyZXBhc3MuaW8iLCJuYmYiOjE2NjEzMjA0NjMsImV4cCI6MTk3NjY4MDQ2MywidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbIndhbGxldCJdfX0.8VpdEIu_YZQpUqSmm1hHw2Sh3Qor16nk32saNc7Flz4";


// Admin ForGet Password Email  Link


export function ForgetPasswordLink(data) {

    return axios.post(`${Config.baseUrl}api/auth/forgotepassword`, data, {
        // headers: header(token),
        data: {},
    })
        .then(res => {
            return res;
        })
        .catch(error => {
            return error.response
        })
}

export function ForgetPassword(data) {
    return axios.post(`${Config.baseUrl}api/auth/resetpassword`, data, {
        data: {},
    })
        .then(res => {
            return res;
        })
        .catch(error => {
            return error.response
        })
}




//  Admin Dahsboard


export function AdminDashboardCount(data, token) {

    return axios.post(`${Config.baseUrl}api/admin/counts`, data, { headers: header(token) })
        .then(res => {
            return res.data;
        });
}


// Change Password  API

export function ChangePassword(token, data) {
    return axios.post(`${Config.baseUrl}api/auth/changepassword`, data, {
        headers: header(token),
        data: {},
    })
        .then(res => {
            return res;
        })
        .catch(error => {
            return error.response
        })
}



// Get All Clients

export function GetPackage(token, id) {

    // const adminParentId = JSON.parse(localStorage.getItem("admin")).id;
    return axios
        .post(`${Config.baseUrl}api/packagedetails`, id, {
            headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });
}




// Get All Clients

export function getUsers(token) {

    const adminParentId = JSON.parse(localStorage.getItem("admin")).id;
    return axios
        .get(`${Config.baseUrl}api/users?parent_admin_id=${adminParentId}`, {
            headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });
}

// Client Add

export function addUsers(data, token) {
    // console.log("consolhgde",token)
    return axios
        .post(`${Config.baseUrl}api/users/add`, data, {
            headers: header(token)


        })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            return res.response.data
        });
}
// Client Add Url

export function addUrlToUsers(data, token) {
    return axios
        .post(`${Config.baseUrl}api/users/updateurl`, data, {
            headers: header(token)
        })
        .then((res) => {
            return res.data;
        });
}

// Get Client By ID

export function getUsersById(id) {
    return axios
        .get(`${Config.baseUrl}api/users/${id}`, {
            // headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });
}

// Client Update

export function updateUsers(data, id, token) {
    // console.log("consolhgde",data)
    return axios
        .put(`${Config.baseUrl}api/users/${id}`, data, {
            headers: header(token)
        })
        .then((res) => {
            return res.data;
        });
}

// Delete Client API

export function deleteUsers(token, id) {
    // console.log("delete",token)
    return axios
        .delete(`${Config.baseUrl}api/users/${id}`, {
            headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });
}

//    Get System Details

export function getSystemDetails(token, id) {
    return axios
        .get(`${Config.baseUrl}api/system/${id}`, {
            headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });
}

//    Get System Details

export function UpdateSystemDetails(id, data, token) {
    return axios
        .put(`${Config.baseUrl}api/system/${id}`, data, {
            headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });
}






// Admin Fund History API

export function AdminfundHistory(data, token) {

    return axios.post(`${Config.baseUrl}api/admin/fundhistory`, data, { headers: header(token), data: {} })
        .then(res => {
            return res.data;
        });
}





// Admin Transection  History API

export function AdminTrasnectionHistory(data, token) {

    return axios.post(`${Config.baseUrl}api/admin/transictionhistory`, data, { headers: header(token), data: {} })
        .then(res => {
            return res.data;
        });
}



//  -------------------------------------------------- varify Pan --------------------------------------------------------------------



export function panVerifigation(data) {
    return axios
        .post(`https://kyc-api.aadhaarkyc.io/api/v1/pan/pan`, data, {
            headers: {
                'Authorization': apitoken,
                'Content-Type': 'application/json'
            },
            data: {},
        })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            return res.response
        });
}



// http: //192.168.0.116:8080/api/transiction

//    Transection History

export function PostTransectionHistory(data) {
    return axios
        .post(`${Config.baseUrl}api/transiction`, data, {
            // headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });
}



// https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-validation/aadhaar-validation




//  -------------------------------------------------- Addhar Verify  --------------------------------------------------------------------

export function AdharAndPanVerifigation(data) {

    // const [loderShow, setLoderShow] = useState('')

    // setLoderShow(<Loder />);
    return axios
        .post(`https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-validation/aadhaar-validation`, data, {
            headers: {
                'Authorization': apitoken,
                'Content-Type': 'application/json'
            },
            data: {},
        })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            return res.response

            // console.log("ssssssssssss" ,res.response);
        });
}
//  -------------------------------------------------- Addhar Verify  With OTP --------------------------------------------------------------------

export function verifyAdharWithOtp(data) {

    return axios
        .post(`https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-v2/generate-otp`, data, {
            headers: {
                'Authorization': apitoken,
                'Content-Type': 'application/json'
            },
            data: {},
        })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            // if()
            // return res
            // console.log("res" , res);

            if (res) {
                // The client was given an error response (5xx, 4xx)
                return res
            } else if (res) {
                // The client never received a response, and the request was never left
                return res
            }

        });
}



export function verifyAdharWithSubmitOtp(data) {
    return axios
        .post(`https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-v2/submit-otp`, data, {
            headers: {
                'Authorization': apitoken,
                'Content-Type': 'application/json'
            },
            data: {},
        })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            return res
        });
}



//  sAVE kYC dOCUMENT


export function SaveKycDoc(data) {
    // console.log("consolhgde",data)
    return axios
        .post(`${Config.baseUrl}api/users/kycdocument`, data, {
            // headers: header(token)
        })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            return res.response.data
        });
}






//  --------------------------------------------------   save otp --------------------------------------------------------------------

export function SaveOtp(data) {
    return axios
        .post(`${Config.baseUrl}api/users/saveotp`, data, {
            // headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });
}




//  --------------------------------------------------   Send OTp --------------------------------------------------------------------

export function SendOtpToClient(data) {

    return axios
        .post(`${Config.baseUrl}api/users/sendotp`, data, {
            // headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });

}

//  --------------------------------------------------   save otp --------------------------------------------------------------------

export function SaveOtpVerifyMobileNo(data) {
    return axios
        .post(`${Config.baseUrl}api/users/updatenumber`, data, {
            // headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });
}



//  -------------------------------------------------- e-sign  Verify  --------------------------------------------------------------------


export function EsignVerifigationInitilize(data) {
    return axios
        .post(`https://kyc-api.aadhaarkyc.io/api/v1/esign/initialize`, data, {
            headers: {
                'Authorization': apitoken,
                'Content-Type': 'application/json'
            },
            data: {},
        })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            return res.response
        });
}


export function EsignVerifigationDocumentUpload(data) {
    return axios
        .post(`https://kyc-api.aadhaarkyc.io/api/v1/esign/get-upload-link`, data, {
            headers: {
                'Authorization': apitoken,
                'Content-Type': 'application/json'
            },
            data: {},
        })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            return res.response
        });
}




export function DocumentUpload(data) {
    return axios
        .post(`https://surepass-esign.s3.amazonaws.com`, data, {
            headers: {
                //     'Authorization': apitoken,
                'Content-Type': 'multipart/form-data'
            },
            data: {},
        })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            return res.response

        });
}








//  -------------------------------------------------- get Signed Docuement(Not Registred No)  --------------------------------------------------------------------



export function SignDocWithNotRegistredNo(data) {

    return axios
        .post(`${Config.baseUrl}api/users/signeddocumentotp`, data, {
            // headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });

}



export function SignDocWithNotRegistred(data) {

    return axios
        .post(`${Config.baseUrl}api/users/signeddocument`, data, {
            // headers: header(token),
            data: {},
        })
        .then((res) => {
            return res.data;
        });

}






//  Download  Signed  Document  With Third Party Api


export function getSignedDocument(ClientId) {
    return axios
        .get(`https://kyc-api.aadhaarkyc.io/api/v1/esign/get-signed-document/${ClientId}`, {
            headers: {
                'Authorization': apitoken,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            return res
        })
}


export function getSignedDocument123(ClientId) {
    return axios
        .get(`https://kyc-api.aadhaarkyc.io/api/v1/esign/get-signed-document/${ClientId}`, {
            headers: {
                'Authorization': apitoken,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        }).catch((res) => {
            return res
        })
}




export function getKycDocument(ClientId) {
    return axios
        .post(`${Config.baseUrl}api/users/kycdata`, ClientId, {
            headers: {
                'Authorization': apitoken,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

// { loderShow ?  : "" }

// Resend Verification Link
export function RecentVerifyLink(ClientId) {
    return axios
        .post(`${Config.baseUrl}api/users/resendlink`, ClientId, {
            headers: {
                'Authorization': apitoken,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

//  for create fund 0 if client is expired

export function ForCompanyFundZero(ClientId) {
    return axios
        .post(`${Config.baseUrl}api/removefund`, ClientId, {
            headers: {
                'Authorization': apitoken,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}




export function GetCurrentDate() {
    return axios
        .get(`https://worldtimeapi.org/api/ip`, {

        })
        .then((res) => {
            return res;
        }).catch((res) => { return res })
}



//  Add New Template

export function AddNewTemplate(data, token) {
    return axios
        .post(`${Config.baseUrl}api/add/template`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
                'maxContentLength': 'Infinity',
                'maxBodyLength': 'Infinity'
            }
        })
        .then((res) => {
            return res.data;
        });
}


// All Template

export function GetAllTemplates(token) {
    return axios
        .get(`${Config.baseUrl}api/alltemplate`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

// Delete Template

export function DeleteTemplates(data, token) {
    return axios
        .post(`${Config.baseUrl}api/delete/template`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

// Update Template

export function UpdateTemplates(data, token) {
    return axios
        .post(`${Config.baseUrl}api/update/template`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

// Find By One Template

export function FindByOneTemplates(data, token) {
    return axios
        .post(`${Config.baseUrl}api/edit/template`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}


// Get User According to Template Id

export function GetUsersViaTemplateId(data, token) {
    return axios
        .post(`${Config.baseUrl}api/templates/users`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}



// Bulk Mail Send

export function SendBulkMail(data, token) {
    return axios
        .post(`${Config.baseUrl}api/users/sendlink`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

// Bulk Mail Send

export function ForSetDynamicDataOnPDF(data, token) {
    return axios
        .post(`${Config.baseUrl}api/createpdf`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

export function GenrateESign(data, token) {
    return axios
        .post(`${Config.baseUrl}api/user/esign`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

export function ForBulkDownload(data, token) {
    return axios
        .post(`${Config.baseUrl}api/user/client_id`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}


export function forBulkClientAdd(data, token) {
    return axios
        .post(`${Config.baseUrl}api/users/addbulk`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}
export function usertemplates(data, token) {
    return axios
        .post(`${Config.baseUrl}api/user_templates`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}


// Get All Data With Template

export function GetUserDataWithTemplateDetails(data, token) {
    return axios
        .get(`${Config.baseUrl}api/templates/allusers`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

// Get All Data With Template

export function CheckTemplateToUser(data, token) {
    return axios
        .post(`${Config.baseUrl}api/usertemplatecheck`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

// Get All Data With Template

export function CheckTemplateForNextUser(data, token) {
    return axios
        .post(`${Config.baseUrl}api/template/sign_status`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

// Get All Data With Template

export function GetUserSignStatus(data, token) {
    return axios
        .post(`${Config.baseUrl}api/user/generatesignstatus`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}


// Get All Data With Template

export function BulkResendLink(data, token) {
    return axios
        .post(`${Config.baseUrl}api/users/bulkresendlink`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}


// Add New Additional Variables

export function AddNewVariables(data, token) {
    return axios
        .post(`${Config.baseUrl}api/add/variable`, data, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.data;
        });
}

// Get All Variables

export function GetAllVariables() {
    return axios
        .get(`${Config.baseUrl}api/all/variable`, {
            // headers: {
            //     // 'Authorization': token,
            //     'Content-Type': 'application/json'
            // }
        })
        .then((res) => {
            return res.data;
        });
}


// Get  Variables By Tempalate Id

export function Get_Variables_By_Template_ID(data, token) {
    return axios.post(`${Config.baseUrl}api/get/variable`, data, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.data;
        });
}
// Get  Variables By Tempalate Id

export function Add_Variable_Columns_To_DataBase(data, token) {
    return axios.post(`${Config.baseUrl}api/add/details`, data, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.data;
        });
}
// Get  Variables By Tempalate Id

export function Update_Variable_Values_Columns_To_DataBase(data, token) {
    return axios.post(`${Config.baseUrl}api/add/values`, data, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.data;
        });
}


// Get  Variables By Tempalate Id

export function For_Update_Variable_Data_To_PDF(data, token) {
    return axios.post(`${Config.baseUrl}api/editpdf1`, data, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.data;
        });
}



//  Delete  Variables

export function Remove_Variables(data, token) {
    return axios.post(`${Config.baseUrl}api/detete/variable`, data, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.data;
        });
}



//  Delete  Variables

export function Update_Variables(data, token) {
    return axios.post(`${Config.baseUrl}api/update/variable`, data, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.data;
        });
}



