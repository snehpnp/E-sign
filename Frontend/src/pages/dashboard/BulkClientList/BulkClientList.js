import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link as RouterLink, NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { Card, Stack, Container, Typography, TextField, Switch, } from '@mui/material';
import axios from "axios";
import { Col, Form, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';
import Iconify from '../../../components/Iconify';
import AlertMessages from "../../../utils/AlertMessages";
import DataTable from "../../../utils/DataTable";
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import Papa from 'papaparse';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Buffer } from 'buffer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { fDateTimeSuffix, fDateTime } from '../../../utils/formatTime';
import ExportToExcel from "../../../utils/ExportToExport";
// import "../../dashboard.css"

import { deleteUsers, getSignedDocument, getSignedDocument123, GetCurrentDate, getUsersById, RecentVerifyLink, getUsers, GetAllTemplates, SendBulkMail, GetUserDataWithTemplateDetails, forBulkClientAdd, usertemplates, FindByOneTemplates, CheckTemplateToUser, GetUserSignStatus, BulkResendLink } from '../../../services'

const GetKycDocument = (doc, name) => {
    //  console.log("name", name);
    if (doc !== '0') {
        const a = document.createElement("a");
        a.setAttribute("download", `kyc-${name}.pdf`);
        a.setAttribute("href", doc);
        document.body.appendChild(a);
        a.click()
    }
    else {
        alert('please Wait For Kyc')

    }
}


// Get Signed Document
const SignedDocument = async (ClientID, otpbased, signstatus, name, id, signdoc) => {

    const response = await getUsers()

    if (signstatus === 1) {
        if (otpbased === 1) {
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = `/signeddocument/${id}e_sign-${signdoc}`;
            alink.download = `e_sign-${name}.pdf`;
            alink.click();
        }
        else {
            const response = await getSignedDocument(ClientID)
            // console.log("response", response.status_code);
            if (response.status_code) {
                const downloadLink = document.createElement("a")
                const fileName = `${name}-Signed_document.pdf`;
                downloadLink.href = response.data.url;
                downloadLink.download = fileName;
                downloadLink.target = '_blank'
                downloadLink.click();
            }
            else if (response.response.data.status_code === 422) {
                alert(response.response.data.message)
            }
            else if (response.response.data.status_code == 404) {
                return response.response.data.message
            }
        }


    }
    else {
        alert('please Wait For Sign')
    }

}



const CopyLink = (data) => {

    var textField = document.createElement('textarea')
    textField.innerText = data
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    alert('Verification Link copied');


}





const ClientList = () => {

    // const handleShow = () => setShow(true);
    const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
    const id = JSON.parse(localStorage.getItem('admin')).id;

    const [data, setData] = useState([]);
    const [ClientID, setClientId] = useState();
    const [ClientIDArr, setClientIdArr] = useState();
    const location = useLocation()
    const navigate = useNavigate()
    const [refresh, setrefresh] = useState(true)
    const [alertMsg, setAlertMsg] = useState(false)
    const [alertColor, setAlertColor] = useState("")
    const [textAlert, setTextAlert] = useState("")
    const [show, setShow] = useState('');
    const [checked, setChecked] = useState([]);

    const [TemplateData, setTemplateData] = useState([]);
    const [TemplateDataID, setTemplateDataID] = useState("");
    const [showtempresend, setshowtempresend] = useState("");

    const [time, setTime] = useState("")
    const [dataForFilter, setDataForFilter] = useState([]);
    const [dataForCSV, setDataForCSV] = useState([]);
    const [ClientIdsmtp_status, setClientIdDatasmtp_status] = useState([]);
    const [UserData, setUserData] = useState([]);
    const [dataClient, setDataClient] = useState([]);
    const [flterClientname, setClientName] = useState('');
    const [flternactiveInactive, setActiveInactive] = useState('all');
    const [emailfilter, setEmailFilter] = useState('');
    const [csvFile, setcsvFile] = useState("");
    const [getCSVdata, setGetCSVdata] = useState([]);
    const [FilterFromColorShades, setFilterFromColorShades] = useState(null);
    const [FilterFromColors, setFilterFromColors] = useState(null);



    // For Date Range
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleClose = () => setShow(false);

    // bulk mail model
    const [show1, setShow1] = useState(false);

    // bulk Client Add  model
    const [show2, setShow2] = useState(false);

    // For Bulk Doc Download
    const [show3, setShow3] = useState(false);



    const handleClickOpen = async (id, tempid) => {

        // console.log("resressssss", res)


        const response = await getUsersById(id);

        if (response) {
            setDataClient(response.data);
            const res = await FindByOneTemplates({ "id": tempid })
            setshowtempresend(res)
            setShow(true);
        }

    };


    const hideClose = () => {
        setAlertMsg(false)
    }




    // Const GetBulkClients
    var clientArr = []
    const GetClientData = async () => {
        const resClient = await GetUserDataWithTemplateDetails();
        if (resClient) {
            resClient.map(async (item, index) => {
                clientArr.push({
                    "index": index + 1,
                    "client_id": item.client_id,
                    "template_id": item.template_id,
                    "templatename": item.templatedata.name,
                    "aadhaar_status": item.userdata.aadhaar_status,
                    "adhaar": item.userdata.adhaar,
                    "adhaar_sign": item.userdata.adhaar_sign,
                    "adhaar_verify_with_otp": item.userdata.adhaar_verify_with_otp,
                    "alternate_number": item.userdata.alternate_number,
                    "createdAt": item.userdata.updatedAt,
                    "documentstatus": item.userdata.documentstatus,
                    "email": item.userdata.email,
                    "expiry_date": item.userdata.expiry_date,
                    "fullname": item.userdata.fullname,
                    "fund": item.userdata.fund,
                    "id": item.userdata.id,
                    "kycdocument": item.userdata.kycdocument,
                    "linkexpires": item.linkexpires,
                    "maillink": item.maillink,
                    "otp": item.userdata.otp,
                    "otpbased": item.userdata.otpbased,
                    "package_id": item.userdata.package_id,
                    "pan": item.userdata.pan,
                    "pan_status": item.userdata.pan_status,
                    "parent_admin_id": item.userdata.parent_admin_id,
                    "personal_contact": item.userdata.personal_contact,
                    "sign_status": item.sign_status,
                    "smtp_status": item.userdata.smtp_status,
                    "status": item.userdata.status,
                    "generate_sign_status": item.generate_sign,
                })

                if (item.client_id !== null) {
                    const resC = await GetUserSignStatus({ "client_id": item.client_id });
                }
                //  console.log("dddd", resC);

            })
        }

        setData(clientArr && clientArr)
        setDataForFilter(clientArr && clientArr)
        setUserData(clientArr && clientArr)
        setUserData(clientArr && clientArr)
        setDataForCSV(clientArr && clientArr)


        //  Filter From Dashboard

        console.log("parseInt(location.search.split('=')[1]", parseInt(location.search.split('=')[1]))

        let dashhboardFilter = clientArr.filter((b) => {

            if (parseInt(location.search.split('=')[1]) === 1) {
                return b.sign_status == 1 && b.generate_sign_status == 1
            }
            else if (parseInt(location.search.split('=')[1]) === 3) {
                return new Date(b.linkexpires) < new Date() && b.sign_status == 3
            }
            else if (parseInt(location.search.split('=')[1]) === 2) {
                return new Date(b.linkexpires) > new Date() && b.sign_status == 3
            }
            else if (parseInt(location.search.split('=')[1]) === 4) {
                return b.generate_sign_status == 2 && b.sign_status == 1
            } else {
                return b
            }
        })

        setData(dashhboardFilter && dashhboardFilter)









    }








    useEffect(() => {
        // getPackages();
        GetClientData()
    }, [refresh]);




    //   // Delete Admin API

    const deleteItem = async (id) => {
        if (window.confirm("Do you want to delete this Client ?")) {
            const response = await deleteUsers(AdminToken, id)
            setrefresh(!refresh)

            if (response.message) {
                setAlertMsg(true)
                setAlertColor("success")
                setTextAlert(response.message)
            }
        }
    }


    const ResendLink = async (e) => {

        const datee = new Date()
        const data1 = {
            "id": dataClient.id,
            "linkexpiry": fDateTimeSuffix(new Date(new Date(new Date(datee)).getTime() + 60 * 60 * 24 * 1000).toString()),
            "template_id": showtempresend.id
        }
        const response3 = await RecentVerifyLink(data1);
        if (response3) {
            setAlertMsg(true);
            setAlertColor("success");
            setTextAlert("Resend Verification Link Send Success");
            setrefresh(!refresh)
            setShow(false)

        }
    }

    const columns = [
        {
            // 1
            label: 'Sr .No',
            name: "id",
            width: '150px !important',
            // display: false,
            options: {
                selectableRows: 'multiple',
                selectableRowsHeader: true,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return tableMeta.rowIndex + 1
                },
                display: false,
            }
        },
        {
            // 2
            label: 'Date and Time',
            name: "createdAt",
            sortable: true,
            width: '150px !important',
            options: {
                // display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            <p>{fDateTimeSuffix(tableMeta.rowData[2])}</p>
                        </>)
                }
            }
        },
        {
            // 3
            label: 'Name',
            name: "fullname",
            sortable: true,
            width: '150px !important',
        },
        {
            // 4
            label: 'Email',
            name: "email",
            sortable: true,
            width: '230px !important',
        },
        {
            // 5
            label: 'mobile No.',
            name: "personal_contact",
            sortable: true,
            width: '230px !important',
            options: {
                display: false,
            }
        },
        {
            // 6
            label: 'signedDocument.',
            name: "signeddocument",
            sortable: true,
            width: '230px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {/* {console.log("signeddocument", tableMeta.rowData)} */}
                        </>
                    )
                }
            }
        },
        {
            // 7
            label: 'otpbsed',
            name: "otpbased",
            sortable: true,
            width: '230px !important',
            options: {
                display: false,

            }
        },
        {
            // 8
            label: 'Sign Status',
            name: "sign_status",
            sortable: true,
            width: '150px !important',
            options: {
                filter: false,
                sort: false,
                alignItems: 'center',
                width: 250,
                // display: false,

                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (

                        <p>{
                            // generate_sign_status




                            //  console.log("expiry ", tableMeta)
                            new Date(tableMeta.rowData[16]) < new Date() && tableMeta.rowData[8] == 3 ? "Link Expired" : tableMeta.rowData[8] == 1 ? tableMeta.rowData[23] == 1 ? "Sign Done" : "Sign Not Generated" : "Sign Pending"

                            // tableMeta.rowData[8] == 1 ? "Sign Done" : "Sign Pending"
                        }
                        </p>
                    )
                }
            }

        },
        {
            // 9
            label: 'client_id',
            name: "client_id",
            sortable: true,
            width: '150px !important',
            options: {
                display: false
            }
        },
        {
            // 10
            label: 'KYC Status ',
            name: "linkesxpiress",
            sortable: true,
            width: '150px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            <p> {tableMeta.rowData[16] == 2 ? "Aadhaar , " : ''}  {tableMeta.rowData[17] == 2 ? " Pan ," : ''} {tableMeta.rowData[18] == 2 ? "E-Sign" : ''}</p>

                        </>)
                }
            }
        },
        {
            // 11
            label: 'Doc Status ',
            name: "linkesxpiress2",
            // sortable: true,
            width: '150px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    //   return <p> {kika(data, tableMeta.rowData[9], tableMeta.rowData[7], tableMeta.rowData[8])}</p>
                }
            }
        },
        {
            // 12
            label: 'Template Name',
            name: "templatename",
            display: true,
            options: {
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <p> {tableMeta.rowData[12]}</p>

                    )
                },

            }
        },

        {

            // 13
            label: 'Actions',
            name: 'action',
            options: {
                filter: false,
                sort: false,
                width: 200,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {(new Date(tableMeta.rowData[16]) < new Date() && tableMeta.rowData[8] === 3 || tableMeta.rowData[8] == 1 && tableMeta.rowData[23] == 2) ?
                                <Tooltip title="Resend Verification Link">
                                    <Icon icon="mdi:email-resend-outline"
                                        color="#E43F47"
                                        className='mx-1'
                                        width="22"
                                        variant="primary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        // onClick={handleShow}
                                        onClick={() => handleClickOpen(tableMeta.rowData[1], tableMeta.rowData[22])
                                        }
                                    />
                                </Tooltip>
                                : ''}

                            {(new Date(tableMeta.rowData[15]) < new Date() && tableMeta.rowData[8] === 0 || tableMeta.rowData[8] !== 1 && tableMeta.rowData[23] !== 1) ? "" :
                                <>
                                    <Tooltip title="Get Kyc Document">
                                        <Icon icon="ant-design:cloud-download-outlined"
                                            color="#E43F47"
                                            className='mx-1'
                                            width="22"
                                            variant="primary"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            onClick={() => GetKycDocument(tableMeta.rowData[14], tableMeta.rowData[3])}
                                        />
                                    </Tooltip>
                                </>}
                            {(new Date(tableMeta.rowData[15]) < new Date() && tableMeta.rowData[8] === 0 || tableMeta.rowData[8] !== 1 && tableMeta.rowData[23] !== 1 || tableMeta.rowData[8] == 1 && tableMeta.rowData[23] == 2) ? "" :
                                <>
                                    <Tooltip title="Get Signed Document">
                                        <Icon icon={tableMeta.rowData[8] === 1 ? 'akar-icons:download' : "noto-v1:hourglass-not-done"}

                                            color="#E43F47"
                                            className='mx-1'
                                            width="22"
                                            variant="primary"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            onClick={() => SignedDocument(tableMeta.rowData[9], tableMeta.rowData[7], tableMeta.rowData[8], tableMeta.rowData[3], tableMeta.rowData[1], tableMeta.rowData[[14]])}
                                        />
                                    </Tooltip>

                                </>}

                            <NavLink
                                to={`/admin/editclient/${tableMeta.rowData[1]}`}
                                state={tableMeta.rowData}
                            >

                                <Tooltip title="View Details">
                                    <Icon icon="clarity:grid-view-line"
                                        color="#6BAA2C"
                                        className='mx-1'
                                        width="22"
                                        variant="primary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                    />
                                </Tooltip>
                            </NavLink>

                            {(new Date(tableMeta.rowData[16]) < new Date() && tableMeta.rowData[8] === 3) ?
                                <>
                                    <Tooltip title="Delete">
                                        <Icon icon="ant-design:delete-outlined"
                                            color="CD2B2E"
                                            width="22"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            cursor="pointer"
                                            onClick={() => deleteItem(tableMeta.rowData[1])}
                                        />
                                    </Tooltip>
                                </>
                                : ''}

                            {(new Date(tableMeta.rowData[16]) > new Date() && tableMeta.rowData[8] === 3) ?
                                <>
                                    <Tooltip title="Copy Verification Link">
                                        <Icon icon="carbon:copy-link"
                                            color="#E43F47"
                                            className='mx-1'
                                            width="22"
                                            variant="primary"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            onClick={() => { CopyLink(tableMeta.rowData[21]) }}
                                        />
                                    </Tooltip>
                                </>
                                : ''}

                        </>
                    )
                }
            }
        },
        {

            // 14
            label: 'kycDocument',
            name: "kycdocument",
            sortable: true,
            width: '150px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {/* //       {console.lozg("kyc document ", tableMeta.rowData)} */}
                        </>)
                }
                // }
            }
        },
        {
            // 15
            label: 'document',
            name: "document",
            sortable: true,
            width: '150px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {/* //       {console.log("kyc document ", tableMeta.rowData)} */}
                        </>)
                }
                // }
            }
        },
        {
            // 16
            label: 'LinkExpired ',
            name: "linkexpires",
            sortable: true,
            width: '150px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {/* //  {console.log("Link Expiry ", tableMeta.rowData)} */}
                        </>)
                }
            }
        },
        {
            // 17
            label: 'addharstatus ',
            name: "adhaar_verify_with_otp",
            sortable: true,
            width: '150px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {/* {console.log("addharstatus ", tableMeta.rowData)} */}
                        </>)
                }
            }
        },
        {
            // 18
            label: "pan",
            name: "pan",
            sortable: true,
            width: '150px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {/* {console.log("kyc document ", tableMeta.rowData[13])} */}
                        </>)
                }
            }
        },
        {
            // 19
            label: 'esign',
            name: "adhaar_sign",
            sortable: true,
            width: '150px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {/* {console.log("kyc document ", tableMeta.rowData[13])} */}
                        </>)
                }
            }
        },
        {
            // 20
            label: 'otp',
            name: "otp",
            sortable: true,
            width: '150px !important',
            options: {
                display: false,
            },
        },
        {
            // 21
            label: 'maillink',
            name: "maillink",
            sortable: true,
            width: '150px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {

                }
            }
        },

        {
            // 22
            label: 'template_id',
            name: "template_id",
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {/* //   {console.log("kyc document ", tableMeta)} */}
                        </>)
                }
            }
        },
        {
            // 23
            label: 'generate_sign_status',
            name: "generate_sign_status",
            options: {
                display: false,
                // customBodyRender: (value, tableMeta, rowData, updateValue) => {
                //     return (
                //         <>
                //         {/* {console.log("kyc document ", tableMeta)} */}
                //         <p>{tableMeta.rowData[23]}</p>
                //         </>)
                // }
            }
        },

    ]


    const {
        // username,
        fullname,
        email,
        personal_contact,
        client_stamp,
        adhaar,
        adhaar_sign,
        pan,
        // data,
        document,
        adhaar_verify_with_otp


    } = dataClient;


    const [first, setfirst] = useState('')
    const abc = () => {
        const filteredData = dataForFilter && dataForFilter.filter(item => {
            return item.fullname.toString().toLowerCase().includes(flterClientname.toString().toLowerCase())
        }).filter(x => {
            return x.email.toString().toLowerCase().includes(emailfilter.toString().toLowerCase())
        }).filter(z => {
            if (flternactiveInactive !== "all") {
                return parseInt(z.template_id) === (parseInt(flternactiveInactive))
            } else {
                return z
            }
        }).filter((b) => {
            if (FilterFromColorShades == "1") {
                return b.sign_status == 1 && b.generate_sign_status == 1
            }
            else if (FilterFromColorShades == "2") {
                return new Date(b.linkexpires) < new Date() && b.sign_status == 3
            }
            else if (FilterFromColorShades == "3") {
                return new Date(b.linkexpires) > new Date() && b.sign_status == 3
            }
            else if (FilterFromColorShades == "4") {
                return b.generate_sign_status == 2 && b.sign_status == 1
            } else {
                return b
            }
        })


        setData(filteredData)
        setfirst(filteredData)
    }

    useEffect(() => {
        abc()
    }, [flterClientname, emailfilter, flternactiveInactive, startDate, endDate, FilterFromColorShades])


    const ResetFilters = (e) => {
        e.preventDefault()
        setActiveInactive("all")
        setEmailFilter("")
        setClientName("")
        setFilterFromColorShades("")
        setFilterFromColors(null)
        setData(dataForFilter)


    }




    const navlinkFunction = () => {
        if (ClientIdsmtp_status == "0") {
            alert("please check your SMTP details")
            return
        } else {
            navigate("/admin/addclient")
        }
    }
    // to={"/admin/addclient"}


    var actualData = [];
    var mySelectedRows
    const options = {
        selectableRows: true,
        selectableRowsOnClick: false,
        selectToolbarPlacement: 'none',
        selectableRowsHeader: true,
        // selectableRows:  FilterFromColors == 1 || 4 && flternactiveInactive != 'all' || "" ? 'multiple' : "none",

        selectableRows: FilterFromColors == 1 || FilterFromColors == 4 || FilterFromColors == 2 && flternactiveInactive === 'all' || flternactiveInactive != 'all' || "" ? 'multiple' : "none",
        selectableRowsSelectedAll: true,
        selectableRowsOnClick: true,
        rowsSelected: FilterFromColors == 1 || FilterFromColors == 4 && flternactiveInactive === 'all' ? [...Array(first.length).keys()] : "",

        // -------------------

        setRowProps: (row, dataIndex, rowIndex) => {

            return {
                style: {
                    background: row[8].props.children == "Sign Not Generated" ? "#cce6ff" : row[8].props.children == "Link Expired" ? "#ebccd1" : row[8].props.children == "Sign Pending" ? "#faebcc" : "#d1f6e1"
                },
            };
        },
        onTableChange: (action, dataObj) => {
            actualData = []

            if (dataObj.selectedRows && dataObj?.selectedRows?.data?.length > 0) {
                var selectedRowIndices = Object.keys(dataObj.selectedRows.lookup);
                if (dataObj.selectedRows.lookup) {
                    if ([selectedRowIndices].length >= 1) {
                        selectedRowIndices?.map(value => {
                            if (dataObj.data[value] != undefined) {
                                actualData.push(dataObj.data[value].data);
                            }
                        });
                    } else {
                        actualData.push([]);
                    }
                }
            }
            else {

                //    console.log("No rows selected");
            }
        }
    }



    const templates = async () => {
        const ress = await GetAllTemplates(AdminToken)
        if (ress) {
            setTemplateData(ress)
        }

    }



    // Bulk Kyc Download

    const BulkKycDownload = async (e) => {

        // if (actualData.length == 0) {
        //   //  alert("Please Select Templete Name First And And Select Users For KYC Download ")

        // } else {

        let KycArr = []
        for (let index = 0; index < actualData.length; index++) {
            if (actualData[index][14] != "0") {
                let clientid = actualData[index][9]
                let fullname = actualData[index][3]
                let url = actualData[index][14]
                KycArr.push({ "name": fullname, "clientid": clientid, "url": url })
            }
        }

        // console.log("dataaaa", KycArr[2]);



        if (KycArr.length >= 0) {
            if (KycArr.length !== 1) {
                const zip = new JSZip();


                KycArr.forEach((item, index) => {

                    const pdfData = Buffer.from(item.url.split(",")[1], 'base64');
                    zip.file(`KYC_${item.name}_${item.clientid}.pdf`, pdfData);

                    // const pdfData = atob(item.url.split(",")[1]);
                    // const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
                    // zip.file(`KYC_${item.name}_${item.clientid}.pdf`, pdfBlob);
                });

                zip.generateAsync({ type: 'blob' })
                    .then(function (content) {
                        saveAs(content, 'Clients_KYC.zip');
                    });

            } else {
                window.open(KycArr[0].url, '_blank')
            }
        }
        else {
            alert("No Records Found")
        }
        // }
    }


    // Bulk Resend Link



    const BulkResendEmail = async (e) => {
        console.log("actualData", actualData)

        if (actualData.length == 0) {
            alert("please Select user")

        } else {
            let arr = []
            actualData.map((item) => {

                arr.push({
                    "userid": item[1],
                    "template_id": item[22]
                })

            })

            const datee = new Date()
            const userreq = {
                "perent_admin_id": id,
                "linkexpiry": fDateTimeSuffix(new Date(new Date(new Date(datee)).getTime() + 60 * 60 * 24 * 1000).toString()),
                'users_array': arr
            }

            const res = await BulkResendLink(userreq, AdminToken)
            if (res.status) {
                setAlertMsg(true);
                setAlertColor("success");
                setTextAlert(res.msg);
                setrefresh(!refresh)
            }

        }






    }




    const csvDownload = () => {
        const signdone = []
        const signNotdone = []
        const expired = []
        const signnotgenerated = []
        const allData = []
        const csv = []

        dataForCSV.filter((b, i) => {
            if (FilterFromColors == 1) {
                if (b.sign_status == 1 && b.generate_sign_status == 1) {
                    signdone.push({
                        "Id": i + 1,
                        "Full_Name": b.fullname,
                        "Personal_Email": b.email,
                        "personal_contact": b.personal_contact,
                        "sign_status": "Sign Done",
                        "Verify_By": 'Addhaar',
                    })

                    return setChecked(signdone)
                }
            } else if (FilterFromColors == 2) {
                if (new Date(b.linkexpires) < new Date() && b.sign_status == 3) {
                    signNotdone.push({
                        "Id": i + 1,
                        "Full_Name": b.fullname,
                        "Personal_Email": b.email,
                        "personal_contact": b.personal_contact,
                        "sign_status": "Sign Pending",
                        "Verify_By ": 'Addhaar',
                    })
                    return setChecked(signNotdone)
                }
            }
            else if (FilterFromColors == 3) {
                if (new Date(b.linkexpires) > new Date() && b.sign_status == 3) {
                    expired.push({
                        "Id": i + 1,
                        "Full_Name": b.fullname,
                        "Personal_Email": b.email,
                        "personal_contact": b.personal_contact,
                        "sign_status": "Link Expired",
                        "Verify_By": ' - ',
                    })
                    return setChecked(expired)
                }
            }
            else if (FilterFromColors == 4) {
                if (b.generate_sign_status == 2 && b.sign_status == 1) {
                    signnotgenerated.push({
                        "Id": i + 1,
                        "Full_Name": b.fullname,
                        "Personal_Email": b.email,
                        "personal_contact": b.personal_contact,
                        "sign_status": "Pdf Not Generated",
                        "Verify_By": 'Addhaar',
                    })
                    return setChecked(signnotgenerated)
                }
            }
            else if(FilterFromColors === null || "null" ||  "") {
                allData.push({
                    "Id": i + 1,
                    "Full_Name": b.fullname,
                    "Personal_Email": b.email,
                    "personal_contact": b.personal_contact,
                    "sign_status": b.sign_status == 1 && b.generate_sign_status == 1 ? "Sign Done" : new Date(b.linkexpires) < new Date() && b.sign_status == 3 ? "Link Expired" : new Date(b.linkexpires) > new Date() && b.sign_status == 3 ? "Sign Pending" : b.generate_sign_status == 2 && b.sign_status == 1 ? "Pdf Not Generated" : "",
                    "Verify_By": 'Addhaar',
                })
                return setChecked(allData)
            }

        })

    }
    useEffect(() => {
        csvDownload()
    }, [FilterFromColors])




    const getTime = async () => {
        const res = await GetCurrentDate()
        // console.log("new Date(new Date(datee).getTime()", new Date(new Date(datee).getTime()))
        let a = new Date(new Date(res.data.datetime.replace("T", " ").split(".")[0])).getTime()
        setTime(fDateTimeSuffix(a + 60 * 60 * 24 * 1000))
    }

    useEffect(() => {
        templates()
        getTime()
    }, [refresh])



    //  FOr Bulk Document Downlaod  Model Show

    const BulkDownloadFunction = async (e) => {
        if (actualData.length == 0) {
            alert("Please Select  User For  Download Document")
        } else {
            let signparr = []
            let notasignrr = []
            for (let index = 0; index < actualData.length; index++) {
                let useIds = actualData[index][9]
                let fullname = actualData[index][3]
                let client_id = actualData[index][1]
                if (useIds !== "0") {
                    const res1 = await getSignedDocument(useIds)
                    if (res1.status_code == 200) {
                        signparr.push({ "name": fullname, "clientid": client_id, "url": res1.data.url, "useIds": useIds })
                    } else if (res1.response.data.status_code == 422) {
                        notasignrr.push({ "name": fullname, "clientid": client_id, "url": res1.response.data.message, "useIds": useIds })
                    }
                }
            }
            if (signparr.length > 0) {
                if (signparr.length != 1) {
                    const zip = new JSZip();

                    const pdfRequests = signparr.map(async (item) => {
                        const response = await axios.get(item.url, { responseType: 'blob' });
                        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                        zip.file(`${item.name}_${item.useIds}.pdf`, pdfBlob);
                    });

                    await Promise.all(pdfRequests);
                    zip.generateAsync({ type: 'blob' }).then((blob) => {
                        saveAs(blob, 'Bulk_Signed_Documents.zip');
                    });
                }
                else {
                    window.open(signparr[0].url, '_blank')
                }
            }
            if (notasignrr.length > 0) {
                const pdfDoc = await PDFDocument.create();
                const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
                const pageWidth = 612;
                const pageHeight = 792;
                const lineHeight = 40;
                const margin = 76;
                const availableHeight = pageHeight - 6.1 * margin;
                const content = notasignrr

                let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                let textStart = margin;
                let textEnd = pageHeight - margin;
                let textX = margin;
                let textY = textEnd - lineHeight;
                let numLines = 0;


                var i = 1

                currentPage.drawText('Sign Not Generated ClientList   ', {
                    x: 150,
                    y: 750,
                    // y: height - 4 * fontSize,
                    size: 22,
                    font: helveticaFont,
                    color: rgb(0, 0.53, 0.71),
                })

                currentPage.drawText('             Id         User Name                     User Id                                       Resson', {
                    x: 25,
                    y: 700,
                    // y: height - 4 * fontSize,
                    size: 13,
                    font: helveticaFont,
                    color: rgb(0, 0.53, 0.71),
                })

                for (let j = 0; j < content.length; j++) {

                    const line = `${i++}        ${content[j].name}  , ${content[j].clientid} ,  ${content[j].url}`

                    const height = helveticaFont.heightAtSize(12) * (line.length / 45);

                    if (numLines + height > availableHeight) {
                        currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
                        textStart = margin;
                        textEnd = pageHeight - margin;
                        textX = margin;
                        textY = textEnd - lineHeight;
                        numLines = 0;
                    }

                    currentPage.drawText(line, {
                        x: textX,
                        y: textY,
                        size: 12,
                        font: helveticaFont,
                        color: rgb(0, 0, 0),
                    });

                    textY -= lineHeight;
                    numLines += height;
                }

                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);

                // console.log("urlurlurlurlurlurl", pdfBytes);
                window.open(url, '_blank');

            }


        }

        // }
    }








    var csvdataarr = []

    const abcedf = (event) => {
        if (event.type === "text/csv") {

            Papa.parse(event, {
                header: true,
                // download: true,
                complete: (results) => {
                    setGetCSVdata(results.data.slice(1, results.data.length - 1))
                }
            })
        }
        else if (csvFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            ExcelRenderer(event, async (err, resp) => {
                csvdataarr = []
                resp.rows.slice(1).map((item) => {
                    return csvdataarr.push({
                        "fullname": item[1],
                        "email": item[2],
                        "personal_contact": item[3],
                    })
                })
                setGetCSVdata(csvdataarr)

            });
        }
    }



    const SubmitBulkClients = async (e) => {
        e.preventDefault()
        if (getCSVdata.length > 0) {
            const req = {
                "userdata": getCSVdata,
                "parent_admin_id": id
            }
            const res = forBulkClientAdd(req, AdminToken)
            if (res) {
                setAlertMsg(true);
                setAlertColor("success");
                setTextAlert(res.message);
                setShow2(false)
            }
        } else {
            alert("No Data Found Inside the Excel / CSV  File")
        }

    }







    return (
        // <ThemeProvider theme={theme} >

        <Container>


            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h4" gutterBottom>
                    Sign Status
                </Typography>


                {/* <div className="d-flex">


                    <button className="MuiButton-contained navv border-0" style={{ color: '#fff', border: 'none !important' }} onClick={navlinkFunction} variant="contained"> */}
                {/* //<Iconify icon="line-md:plus" />  Add Client */}
                {/* {ClientIdsmtp_status == "0" ? alert('please check your SMTP details') : "ClientIdsmtp_status" */}
                {/* </button>
                </div> */}
                <div  className=" sign-status-export">
<ExportToExcel style={{position:'unset',marginTop:'auto '}}
                            className="  btn text-light export sign-status-export"
                            apiData={checked && checked}
                            fileName={FilterFromColors == 1 ? "SignDoneUsers" : FilterFromColors == 2 ? "LinkExpired Users" : FilterFromColors == 3 ? "SignPendingUsers" : FilterFromColors == 4 ? "SignNotGeneratedUsers" : "allClientsList"}
                        />
                        </div>
            </Stack>

            <Card className="my-2">
                <div className="d-flex pt-2 px-3  justify-content-between">
                    {/* <div>
                        <label for="date" className="ms-2">Start Date</label>
                        <input type="date" id="date" className="form-control ms-1 mb-1" name="date" placeholder="YYYY-MM-DD" onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div>

                        <label for="date" className="ms-2" >End Date</label>
                        <input type="date" id="date" className="form-control ms-1 mb-1" name="date" placeholder="YYYY-MM-DD" onChange={(e) => setEndDate(e.target.value)} />
                    </div> */}
                    <div >
                        <label for="fullname" className="ms-2">Filter  Name</label>

                        <input type='text'
                            className="form-control ms-1 "
                            placeholder='Client Name '
                            name="fullname"
                            style={{
                                width: '200px',
                            }}
                            onChange={(e) => { setClientName(e.target.value) }}
                            value={flterClientname}
                        />
                    </div>
                    <div >
                        <label for="email" className="ms-2">Filter Email</label>

                        <input type='text'
                            className="form-control ms-1 mb-1"
                            placeholder='Email'
                            name="email"

                            style={{
                                // left: '14.7rem',
                                // position: 'absolute',
                                // top: '1rem',
                                width: '200px',
                                // background: 'gray',

                                // zIndex: 10,

                            }}
                            onChange={(e) => { setEmailFilter(e.target.value) }}
                            value={emailfilter}

                        />
                    </div>
                    <div className='flex-column'>
                        <label for="status" className="ms-2">Filter Template</label>
                        <select aria-label="Default select example" style={{
                            // left: '27.7em'
                        }} className='filter-dropdown ms-1 w-75' name="status"
                            onChange={(e) => { setActiveInactive(e.target.value); }}
                            value={flternactiveInactive}
                        >
                            <option value="all" >All Templete Clients</option>
                            {TemplateData && TemplateData.map((item, index) => {
                                return <option key={index} value={item.id}>{item.name}</option>

                            })}
                        </select>

                        {
                            // flternactiveInactive !== "all" || emailfilter == "" ||

                            (emailfilter === "") && (flterClientname === "") && (flternactiveInactive == "all") && (FilterFromColors == null) ? "" :
                                <>

                                    <Button className='MuiButton-contained mt-0 text-light ms-1 border-0' style={{
                                        // left: '41.6rem',
                                        // top: '-2.6rem',
                                        // zIndex: 999,
                                    }}
                                        onClick={(e) => ResetFilters(e)}

                                    >Reset</Button>
                                </>

                        }
                    </div>
                    <div className="row">
                        <div className="">
                        <li className="d-flex justify-content-between mb-2">

                             <span><button className="FilterColorShades border-0" value={1} onClick={(e) => { setFilterFromColorShades(e.target.value); setFilterFromColors(1) }} style={{ background: "#90EE90" }}></button>
                             </span>
                             <label for="fullname" className="ms-2 FilterColorShadesLabel">Sign Done</label>
                             </li>
                             <li className="d-flex justify-content-between  mb-2">

                             <span>  <button className="FilterColorShades border-0" value={3} onClick={(e) => { setFilterFromColorShades(e.target.value); setFilterFromColors(3) }} style={{ background: "#FDFD96" }}></button>
                             </span>
                             <label for="fullname" className="ms-2 FilterColorShadesLabel">Sign Pending</label>
                             </li>
                             <li className="d-flex justify-content-between  mb-2">

                             <span>  <button className="FilterColorShades border-0" value={2} onClick={(e) => { setFilterFromColorShades(e.target.value); setFilterFromColors(2) }} style={{ background: "#FFCCCB" }}></button>
                             </span>
                             <label for="fullname" className="ms-2 FilterColorShadesLabel">Link Expired</label>
                             </li>
                             <li className="d-flex justify-content-between  mb-2">

                             <span> <button className="FilterColorShades border-0" value={4} onClick={(e) => { setFilterFromColorShades(e.target.value); setFilterFromColors(4) }} style={{ background: "#FFD580" }}></button>
                             </span>
                             <label for="fullname" className="ms-2 FilterColorShadesLabel" >Pdf Not Genrated</label>
                             </li>
                        </div>
                    {/* <div className="col-md-2">
                        <label for="fullname" className="ms-2 FilterColorShadesLabel">Sign Done</label>
                    </div> */}
                    {/* <div className="col-md-2">
                        <label for="fullname" className="ms-2 FilterColorShadesLabel">Sign Pending</label>
                        <button className="FilterColorShades border-0" value={3} onClick={(e) => { setFilterFromColorShades(e.target.value); setFilterFromColors(3) }} style={{ background: "#FDFD96" }}></button>

                    </div>
                    <div className="col-md-2">
                        <label for="fullname" className="ms-2 FilterColorShadesLabel">Link Expired</label>
                        <button className="FilterColorShades border-0" value={2} onClick={(e) => { setFilterFromColorShades(e.target.value); setFilterFromColors(2) }} style={{ background: "#FFCCCB" }}></button>

                    </div>
                    <div className="col-md-2">
                        <label for="fullname" className="ms-2 FilterColorShadesLabel" >Pdf Not Genrated</label>
                        <button className="FilterColorShades border-0" value={4} onClick={(e) => { setFilterFromColorShades(e.target.value); setFilterFromColors(4) }} style={{ background: "#FFD580" }}></button>

                    </div> */}
                </div>

                        </div>


                <div className='row'>
                    {/* <div className='   d-flex ms-1 '> */}
                    <div className="ms-3 mb-5 d-flex">

                        <div className="">
                            {
                                FilterFromColors === 1 ?

                                    <Button className='MuiButton-contained my-3 text-light ms-1 border-0' style={{
                                        // left: '41.6rem',
                                        // top: '-2.6rem',
                                        // zIndex: 999,
                                    }}
                                        onClick={(e) => BulkDownloadFunction(e)}
                                    // onClick={(e) => setShow3(true)}
                                    >BulkDownload</Button>
                                    : ""}
                            {FilterFromColors == 4 || FilterFromColors === 1 ?
                                <Button className='MuiButton-contained border-0 mt-0 text-light ms-1' style={{
                                    // left: '41.6rem',
                                    // top: '-2.6rem',
                                    // zIndex: 999,
                                }}
                                    onClick={(e) => BulkKycDownload(e)}
                                >BulkKYC</Button>

                                : ""}
                            {FilterFromColors == 2 ?
                                <Button className='MuiButton-contained border-0 mt-0 text-light ms-1' style={{
                                    // left: '41.6rem',
                                    // top: '-2.6rem',
                                    // zIndex: 999,
                                }}
                                    onClick={(e) => BulkResendEmail(e)}
                                >BulkResendLink</Button>

                                : ""}

                        </div>


                    </div>

                </div>
                {/* </div> */}
            </Card>
            <Card>

                <DataTable
                    columns={columns}
                    data={data}
                    options123={options}
                />
            </Card>

            {/* Resend Verification Link */}
            <Modal show={show} onHide={handleClose} animation={false} size="lg" className='p-0'>
                <Modal.Header closeButton>
                    <Modal.Title>Resend Verification Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="detail-view mx-5 ">
                            <div className="row mb-3">
                                {/* <Typography variant="h4" gutterBottom className="mb-4 mt-0"> </Typography> */}
                                <div className="col-md-6">

                                    <Typography variant="h4" gutterBottom className="mt-1" >
                                        User
                                    </Typography>

                                    <Typography variant="h6" gutterBottom>
                                        Full Name
                                    </Typography>
                                    <p>{fullname}</p>

                                    <Typography variant="h6" gutterBottom>
                                        Email
                                    </Typography>
                                    <p>{email}</p>
                                    <Typography variant="h6" gutterBottom>
                                        Mobile Number
                                    </Typography>
                                    <p>{personal_contact}</p>

                                    <Typography variant="h6" gutterBottom>
                                        Verification
                                    </Typography>
                                    <ul>
                                        {adhaar_verify_with_otp !== 0 && <li>Aaddhar Varify</li>}
                                        {pan !== 0 && <li>Pan Varify</li>}
                                        {adhaar_sign !== 0 && <li>Aadhaar Sign</li>}
                                    </ul>
                                    {client_stamp && (
                                        <>
                                            <Typography variant="h6" gutterBottom>
                                                Stamp
                                            </Typography>
                                            <ul>
                                                <li>{client_stamp}</li>
                                            </ul>
                                        </>
                                    )}

                                </div>
                                <Typography variant="h6" gutterBottom>
                                    Template
                                </Typography>
                                <div className="col-md-12" style={{ height: '80vh', overflowY: "scroll" }}>

                                    <div className='row'>

                                        <div className='col-md-12' dangerouslySetInnerHTML={{ __html: showtempresend.html && showtempresend.html }}>
                                            {/* <iframe
                                                // src={`/images/${dataClient.id}e_sign-${document}`}
                                                title="myFrame"
                                                height="400"
                                            /> */}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row mb-3 mt-5">
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                </div>
                                <div className="col-md-6">

                                </div>
                            </div>
                        </div>
                    </Form></Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={(e) => ResendLink(e)}>
                        Resend Link
                    </Button>
                </Modal.Footer>
            </Modal>










            {/* For Bulk Doc Download  */}

            <Modal
                show={show3}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton onHide={() => setShow3(false)} >
                    <Modal.Title>Add Bulk Clients</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    // left: '27.7em'
                    width: "100% !important"
                }}>
                    <div className='mb-3'>
                        <div className="form-group file-area">
                            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                            <label htmlFor="images">Select Document</label>
                            <input
                                type="file"
                                accept=".xlsx, .xls, .csv"
                                // value={text}
                                placeholder="Type some text here"
                                // onChange={(event) => setcsvFile(event.target.files[0])} />
                                onChange={(event) => { abcedf(event.target.files[0]); setcsvFile(event.target.files[0]) }} />

                            {/* <input type="file" name="images" id="images" required="required"
                                accept=".xlsx, .xls, .csv"

                                onChange={(e) => {
                                    setcsvFile(e.target.files[0]); setDocumentErr('')
                                }}
                            /> */}

                            <div className="file-dummy">
                                <div className="success">
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8SLh8GOim2szf-nANkrOU-C-WjufBbkSSmgD1utGBaTDZcKJPAQKfjttB0WstiNI4R4&usqp=CAU' alt=".." />

                                    {/* {document ? <img  title='abc' src={URL.createObjectURL(document)} alt=".." /> : '' */}
                                    {/* } */}
                                </div>
                                <div className="default">Please select The CSV/XLSX File</div>
                            </div>
                            <p className='text-center'>{csvFile.name}</p>

                            {/* //   {documentErr ? <p style={{ color: 'red' }}>{documentErr}</p> : " "} */}

                        </div>

                        <div className="form-group d-none">
                            <button type="submit " className='btn btn-primary'>Upload Files</button>
                        </div>

                    </div>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary"
                        onClick={(e) => SubmitBulkClients(e)}
                    >
                        Send Mail
                    </Button>
                </Modal.Footer>
            </Modal>




            {
                alertMsg && (
                    <AlertMessages
                        hideAlert={hideClose}
                        showAlert={alertMsg}
                        message={textAlert}
                        alertColor={alertColor}
                    />
                )
            }
        </Container >
    )
}

export default ClientList


