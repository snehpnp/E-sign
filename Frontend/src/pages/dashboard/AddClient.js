import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate, useHistory } from 'react-router-dom';
// import { ,  } from 'react-router';
import { Card, Stack, TextField, Button, Container, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import { useFormik, FormikProvider } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { Base64 } from "js-base64";
import { useForm } from "react-hook-form";
import DataTable from '../../utils/DataTable'

import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import AlertMessages from '../../utils/AlertMessages';
import { addUsers, getStampsById, getAdminById, EsignVerifigationInitilize, EsignVerifigationDocumentUpload, DocumentUpload, getUsers, addUrlToUsers, GetCurrentDate, PostTransectionHistory } from '../../services';
import * as Common from '../../utils/CommonMessage';
import { fDateTimeSuffix } from '../../utils/formatTime';
import Loder from "../../utils/Loder";
import './dashboard.css'

const AddClient = () => {

    const [pan, setPan] = useState("");
    const [adhaar, setAdhar] = useState("");
    const [adharSign, setAdharSign] = useState("");
    const [clientStamp, setclientStamp] = useState("");
    const [AadharVerifyWithOtp, setAadharVerifyWithOtp] = useState("");
    const [eStamps, setEStamps] = useState([]);
    const [adminDeatils, setAdminDetails] = useState("");
    const [document, setDocumnet] = useState("");

    const [otpVerify, SetOtpVerify] = useState(false);
    const [dataObject, setDataObject] = useState("");
    const [loderShow, setLoderShow] = useState(false)


    const [name, setName] = useState("");
    // const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");

    const [nameErr, setNameErr] = useState("");
    // const [usernameErr, setUsernameErr] = useState("");
    const [contactErr, setContactErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [documentErr, setDocumentErr] = useState("");
    const [leastErr, setLeastError] = useState("");

    const [alertMsg, setAlertMsg] = useState(false)
    const [alertColor, setAlertColor] = useState("")
    const [textAlert, setTextAlert] = useState("")
    const [url, setUrl] = useState("")
    const [time, setTime] = useState("")
    const [abc, setAbc] = useState(false)


    const AdminId = JSON.parse(localStorage.getItem('admin')).id;
    const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;



    const navigate = useNavigate()


    const getTime = async () => {
        const res = await GetCurrentDate()
        // console.log("new Date(new Date(datee).getTime()", new Date(new Date(datee).getTime()))
        let a = new Date(new Date(res.data.datetime.replace("T", " ").split(".")[0])).getTime()
        setTime(fDateTimeSuffix(a + 60 * 60 * 24 * 1000))
    }



    // const datee = new Date()//

    const AddClientSubmit = async (e) => {

        // if (document === "") {
        //     setDocumentErr("Please Enter The Document")
        //     return
        // }

        if (name === "") {
            setNameErr("* Please Enter The Valid Name")
            return
        }
        // if (username === "") {
        //     setUsernameErr("Please Enter The UserName ")
        //     return
        // }

        if (email === "") {
            setEmailErr("Please Enter The Email ")
            return
        }
        // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        //     setEmailErr("Invalid email address")
        //     return
        // }

        if (contact === "") {
            setContactErr("* Please Enter The Valid No.")
            return
        }
        if (contact.length < 10 || contact.length > 10) {
            setContactErr("* Please Check Your No.")
            return
        }



        // if (!otpVerify && !adhaar && !pan) {
        //     setLeastError('Please check atleat one From Aadhaar & Pan')
        //     return
        // }
        // if (otpVerify && adhaar && pan) {
        //     alert('hello owrd')
        // }

        // if(otpVerify)



        e.preventDefault();
        const formData = new FormData();

        formData.append('username', "0");
        formData.append('fullname', name);
        formData.append('email', email);
        formData.append('personal_contact', contact);
        formData.append('pan', 1);
        formData.append('aadhar_verify_with_otp', 1);
        formData.append('adhaar_sign', 1);
        formData.append('client_stamp', clientStamp);
        formData.append('password', "admin@987");
        formData.append('otpbased', 0);
        formData.append('parent_admin_id', AdminId);
        formData.append('roles', '["user"]');

        // const response1 = await addUsers(formData, AdminToken);


        const req = {
            'username': "0",
            'fullname': name,
            'email': email,
            'personal_contact': contact,
            'pan': 1,
            'aadhar_verify_with_otp': 1,
            'adhaar_sign': 1,
            'client_stamp': clientStamp,
            'password': "admin@987",
            'otpbased': 0,
            'parent_admin_id': AdminId,
            'roles': ["user"]

        }

        const response1 = await addUsers(req, AdminToken,
            setLoderShow(true)
        );
        // console.log("response1" ,response1);
        if (response1) {
            setLoderShow(false)
            setAlertMsg(true);
            setAlertColor("success");
            setTextAlert(response1.message);
                setTimeout(() => navigate('/admin/clientlist'), 1000);

            // ----------------------------------------

            // if (response1.otpbased === "0") {

            //     const transData = {
            //         "pdf_pre_uploaded": true,
            //         "config": {
            //             "auth_mode": "1",
            //             "reason": "Agreement",
            //             "positions": {
            //                 "1": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "2": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "3": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "4": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "5": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "6": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "7": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "8": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "9": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "10": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "11": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "12": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "13": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "14": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "15": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "16": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "17": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "18": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "19": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //                 "20": [
            //                     {
            //                         "x": 450,
            //                         "y": 13
            //                     }
            //                 ],
            //             }
            //         },
            //         "prefill_options": {
            //             "full_name": name,
            //             "mobile_number": contact,
            //             "user_email": email
            //         }
            //     }
            //     const res = await EsignVerifigationInitilize(transData);

            //     if (res.success === true) {
            //         const clientId = res.data.client_id
            //         const data = {
            //             "client_id": clientId
            //         }
            //         const response2 = await EsignVerifigationDocumentUpload(data);
            //         if (response2.success) {
            //             const data = {
            //                 "key": response2.data.fields.key,
            //                 "x-amz-algorithm": response2.data.fields['x-amz-algorithm'],
            //                 "x-amz-credential": response2.data.fields['x-amz-credential'],
            //                 "x-amz-date": response2.data.fields['x-amz-date'],
            //                 "policy": response2.data.fields.policy,
            //                 "x-amz-signature": response2.data.fields["x-amz-signature"],
            //                 "file": document
            //             }
            //             const response3 = await DocumentUpload(data);
            //         }

            //         const data1 = {
            //             "id": response1.user_id,
            //             "data": res.data.url,
            //             "client_id": clientId
            //         }


            //         const response = await addUrlToUsers(data1, AdminToken)
            //         setTimeout(() => navigate('/admin/clientlist'), 1000);
            //     }
            // }


            // if (response1.otpbased === "1") {
            //     // if (response1.otpbased === "1") {
            //     setTimeout(() => navigate('/admin/clientlist'), 1000);
            // }

        }
        else {
            setAlertMsg(true);
            setAlertColor("error");
            setTextAlert(response1.message);
        }

        // }



        // }

        // else if (response1.status === 400 || response1.status === 500) {
        //     setAlertMsg(true);
        //     setAlertColor("error");
        //     setTextAlert(response1.data.message);
        // }

    }


    const hideClose = () => {
        setAlertMsg(false)
    }

    // Get API For Get Admin Stamps Data

    const getStampsData = async () => {
        const response = await getStampsById(AdminToken, AdminId)
        if (response) {
            setEStamps(response);

        }
    }

    // Get API For Get Admin  Data By id

    const getAdminByIdData = async () => {
        const response = await getAdminById(AdminToken, AdminId)

        //  console.log("response ", response)
        if (response) {
            setAdminDetails(response);
        }
    }

    useEffect(() => {
        getStampsData();
        getAdminByIdData()
        getTime()
    }, [])








    return (
        <div>
            <Page title="User">

                {loderShow ?
                    // <div className='background-overlay'>
                    //       <img src="/images/loading.gif" alt="test" />
                    // </div>

                    <Loder />
                    : ""}
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Add Client
                        </Typography>


                        <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/admin/clientlist" startIcon={<Iconify icon="line-md:arrow-left" />}>
                            Back
                        </Button>
                    </Stack>
                    <Card>

                        <form>

                            <div className='row px-5 pt-4'>
                                <div className='col-md-6 '>


                                    {/* ------------------------ */}
                                    {/* <input type="file" name="images" id="images" required="required" accept="application/pdf" onChange={(e) => setDataObject(e.target.files[0])} /> */}

                                    {/* ------------------------ */}
                                    <div className='row ps-3'>
                                        {/* adhar Verify With Otp */}

                                        {otpVerify ? "" :
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input mb-3" type="checkbox" id="inlineCheckbox1"
                                                    name='aadharwithotp'
                                                    onChange={(e) => { setAdhar(e.target.checked); setLeastError(""); }}
                                                    checked
                                                />
                                                <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                                                <label className="form-check-label" htmlFor="inlineCheckbox1">Aadhaar Verify With OTP
                                                </label>
                                            </div>

                                        }

                                        {
                                            adminDeatils && adminDeatils.pan === 1 &&
                                            <div className="form-check form-check-inline">
                                                {otpVerify ? <input className="form-check-input mb-3 pancard_check" type="checkbox" id="inlineCheckbox2"
                                                    name='pan'
                                                    onChange={(e) => { setPan(e.target.checked); setLeastError(''); }}
                                                    checked
                                                /> :

                                                    <input className="form-check-input mb-3 pancard_check" type="checkbox" id="inlineCheckbox2"
                                                        name='pan'
                                                        onChange={(e) => { setPan(e.target.checked); setLeastError(''); }}
                                                        // checked={otpVerify }
                                                        checked
                                                    />
                                                }
                                                {/* <input className="form-check-input mb-3 pancard_check" type="checkbox" id="inlineCheckbox2"
                                                    name='pan'
                                                    onChange={(e) => { setPan(e.target.checked); setLeastError(''); chackPan(e.target) }}
                                                    // checked={otpVerify }
                                                /> */}
                                                <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                                                <label className="form-check-label" htmlFor="inlineCheckbox2">Pan Verify
                                                </label>
                                            </div>}


                                        {adminDeatils && adminDeatils.adhaar_sign === 1 &&
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input mb-3" type="checkbox" id="inlineCheckbox3"
                                                    onChange={(e) => setAdharSign(e.target.checked)}
                                                    checked
                                                />
                                                <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                                                <label className="form-check-label" htmlFor="inlineCheckbox3" >Aadhaar Sign
                                                </label>
                                            </div>}
                                        {leastErr ? <p style={{ color: 'red' }}>{leastErr}</p> : ""}

                                        {eStamps.length > 0 && <>
                                            <Typography sx={{ fontWeight: 'bold', m: 1 }}>Stamps</Typography>
                                            <select className="form-select" id="inputGroupSelect01"
                                                onChange={(e) => setclientStamp(e.target.value)}

                                            >
                                                <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                                                <label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>

                                                <option selected disabled>Stamp</option>
                                                {eStamps.map((item) => (
                                                    <option key={item.id} value={item.stamp}>{item.stamp}</option>

                                                ))
                                                }
                                            </select>
                                        </>
                                        }
                                    </div>

                                </div>
                                <div className='col-md-6'>
                                    <Typography variant="h6" gutterBottom>
                                        Client Details
                                    </Typography>
                                    <Form.Group className="mb-3" as={Col} controlId="formGridFullName">
                                        <TextField style={{ width: 400 }} label="Full Name" type='text' color="secondary"

                                            onChange={(e) => { setName(e.target.value); setNameErr("") }}
                                        />
                                        {nameErr ? <p style={{ color: 'red' }}>{nameErr}</p> : " "}
                                    </Form.Group>
                                    <Row className="mb-3">
                                        <Form.Group className="mb-3" as={Col} controlId="formGridEmail">
                                            <TextField style={{ width: 400 }} label="Email" type='email' color="secondary"
                                                onChange={(e) => { setEmail(e.target.value); setEmailErr("") }}
                                            />
                                        </Form.Group>
                                        {emailErr ? <p style={{ color: 'red' }}>{emailErr}</p> : " "}

                                        <Form.Group as={Col} controlId="formGridNumer">
                                            <TextField style={{ width: 400 }} label="Mobile Number" type='text' color="secondary"
                                                onChange={(e) => {

                                                    setContact(e.target.value.replace(/\D/g, "")); setContactErr("")
                                                }
                                                }
                                                value={contact}
                                            />
                                        </Form.Group>
                                        {contactErr ? <p style={{ color: 'red' }}>{contactErr}</p> : " "}


                                    </Row>

                                    {/* <div className="form-check form-check-inline">
                                        <input className="form-check-input mb-3 check_mobile" type="checkbox" id="inlineCheckbox4"
                                            onChange={(e) => { SetOtpVerify(e.target.checked); setLeastError(''); checkmobile(e.target.checked) }}
                                            chacked={true}
                                        />
                                        <label className="form-check-label fw-bold" htmlFor="inlineCheckbox4">if Your Mobile No. Not Registered With Aadhaar
                                        </label>
                                    </div> */}
                                </div>
                            </div>

                        </form>

                        <Button variant="outlined" className='btn-lg ms-5 my-2' onClick={(e) => AddClientSubmit(e)}>
                            Submit
                        </Button>

                    </Card>

                </Container >
                {alertMsg &&
                    <AlertMessages
                        hideAlert={hideClose}
                        showAlert={alertMsg}
                        message={textAlert}
                        alertColor={alertColor}
                    />
                }
            </Page >
        </div>
    )
}

export default AddClient