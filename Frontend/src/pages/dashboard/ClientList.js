import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link as RouterLink, NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { Card, Stack, Container, Typography, TextField, Switch, } from '@mui/material';
import axios from "axios";
import Papa from 'papaparse';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import { Col, Form, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';
import Iconify from '../../components/Iconify';
import AlertMessages from "../../utils/AlertMessages";
import DataTable from "../../utils/DataTable";
// import { fDateTime } from '../../utils/formatTime';

import { fDateTimeSuffix, fDateTime } from '../../utils/formatTime';
import ExportToExcel from "../../utils/ExportToExport";
// import "../../dashboard.css"

import { deleteUsers, getSignedDocument, getSignedDocument123, GetCurrentDate, getUsersById, RecentVerifyLink, getUsers, GetAllTemplates, SendBulkMail, ForBulkDownload, CheckTemplateToUser, forBulkClientAdd } from '../../services'


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
    const [ClientIdCheck, setClientIdCheck] = useState([]);
    const [TemplateData, setTemplateData] = useState([]);
    const [documentErr, setDocumentErr] = useState('');
    const [TemplateDataID, setTemplateDataID] = useState("all");
    const [time, setTime] = useState("")
    const [text, setText] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [dataForFilter, setDataForFilter] = useState([]);
    const [ClientIdsmtp_status, setClientIdDatasmtp_status] = useState([]);
    const [ForRemoveDuplcate, setForRemoveDuplcate] = useState([]);

    const [dataClient, setDataClient] = useState([]);
    const [flterClientname, setClientName] = useState('');
    const [flternactiveInactive, setActiveInactive] = useState('all');

    const [emailfilter, setEmailFilter] = useState('');


    // for add Bulk Client Add
    const [show2, setShow2] = useState(false);
    const [getCSVdata, setGetCSVdata] = useState('');
    const [csvFile, setcsvFile] = useState("");

    // bulk mail model
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);



    const hideClose = () => {
        setAlertMsg(false)
    }

    // Get API For Get Packages Data
    var setDataArr = []
    const getPackages = async () => {
        const res = await getUsersById(id);
        setClientIdDatasmtp_status(res.data.smtp_status)
        const response = await getUsers(AdminToken)
        setDataForFilter(response)
        response.map((item, index) => {

            setDataArr.push({
                "id": index + 1,
                "fullname": item.fullname,
                "email": item.email,
                "personal_contact": item.personal_contact
            })
        })

        setForRemoveDuplcate(setDataArr)
        const arr = response.filter((item) => {

            if (item.sign_status === 1) {
                return item.sign_status === parseInt(location.search.split('=')[1])
            } else {
                setData([]);
            }
            if (new Date(item.linkexpires) > new Date() && item.sign_status === 0) {
                return item.sign_status === parseInt(location.search.split('=')[1])
            } else {
                setData([]);
            }

            if (parseInt(location.search.split('=')[1]) === 2 && item.sign_status === 0) {
                return new Date(item.linkexpires) < new Date() && item.sign_status === 0
            } else {
                setData([]);
            }
        })

        if (location.search.split('=')[1] === "nan" || location.search === "") {
            setData(response);
        } else {
            setData(arr)
        }


        // response.map()




        const csv = []
        response.map((x, index) => {
            return csv.push({
                "Id": index + 1,
                "Full_Name": x.fullname,
                "Personal_Email": x.email,
                "personal_contact": x.personal_contact,
                // "sign_status": new Date(x.linkexpires) < new Date() && x.sign_status == 0 ? "Link Expired" : x.sign_status == 1 ? "Sign Done" : "Sign Pending",
                // "otpbased": x.otpbased === 1 ? 'Verify by Mobile' : 'Verify By Addhaar',
                // "Kyc Status"  
            })
        })
        setChecked(csv)


    }


    useEffect(() => {
        getPackages();
    }, [refresh]);



    const ResendLink = async (e) => {

        const datee = new Date()
        const data1 = {
            "id": dataClient.id,
            "linkexpiry": fDateTimeSuffix(new Date(new Date(new Date(datee)).getTime() + 60 * 60 * 24 * 1000).toString())
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

    //  Copy Link



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
            label: 'Mobile No.',
            name: "personal_contact",
            sortable: true,
            width: '230px !important',
            options: {
                // display: false,
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
                display: false,

                width: 200,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (

                        <p>{
                            tableMeta.rowData[8] == 1 ? "Sign Done" : "Sign Pending"

                            // console.log("expiry ", tableMeta.rowData[14])
                            // new Date(tableMeta.rowData[15]) < new Date() && tableMeta.rowData[8] == 0 ? "Link Expired" : //tableMeta.rowData[8] == 1 ? "Sign Done" : "Sign Pending"
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

            // 13
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
            // 14
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
            // 15
            label: 'LinkExpired ',
            name: "linkexpires",
            sortable: true,
            width: '150px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {/* {console.log("kyc document ", tableMeta.rowData)} */}
                        </>)
                }
            }
        },
        {
            // 16
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
            // 17
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
            // 18
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
            // 19
            label: 'otp',
            name: "otp",
            sortable: true,
            width: '150px !important',
            options: {
                display: false,
            },
        },
        {
            // 20
            label: 'otp',
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
            // 21
            label: 'template_id',
            name: "id",
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




    const Resetfilter = (e) => {
        e.preventDefault();
        setEmailFilter("")
        setClientName("")
        setTemplateDataID("all")
        setrefresh(!refresh)
        setData(data)

    }

    const abc = () => {

        const filteredData = dataForFilter && dataForFilter.filter(item => {
            return item.fullname.toString().toLowerCase().includes(flterClientname.toString().toLowerCase())
        }).filter(x => {
            return x.email.toString().toLowerCase().includes(emailfilter.toString().toLowerCase())
        })
        setData(filteredData)

    }


    useEffect(() => {
        abc()
    }, [flterClientname, emailfilter])




    const navlinkFunction = () => {
        if (ClientIdsmtp_status == "0") {
            alert("please check your SMTP details")
            return
        } else {
            navigate("/admin/addclient")
        }
    }
    // to={"/admin/addclient"} 







    const getTime = async () => {
        const res = await GetCurrentDate()
        // console.log("new Date(new Date(datee).getTime()", new Date(new Date(datee).getTime()))
        let a = new Date(new Date(res.data.datetime.replace("T", " ").split(".")[0])).getTime()
        setTime(fDateTimeSuffix(a + 60 * 60 * 24 * 1000))
    }

    useEffect(() => {

        getTime()
    }, [])



    // --------------------------------------For Add Bulk Client ---------------------------------

    var csvdataarr = []


    const abcedf = (event) => {

        //console.log("ForRemoveDuplcate", ForRemoveDuplcate);
        if (event.type === "text/csv") {
            Papa.parse(event, {
                header: true,
                // download: true,
                complete: (results) => {

                    console.log("result sss", results.data);





                    // -------------------------------
                    let arr1 = results.data.slice(0, results.data.length - 1)
                    let arr2 = ForRemoveDuplcate
                    // const combined = arr1.concat(arr2);
                    // const unique = [...new Set(combined)]; // create a new Set to remove duplicates, then convert back to an array using the spread operator

                    // console.log("combined ", combined);

                    // var exis_object = [];
                    // var uniqueArr = [];
                    // // console.log("unique ", unique);



                    // unique.forEach(element => {
                    //     if (!exis_object.includes(element.email)) {
                    //         exis_object.push(element.email);
                    //         uniqueArr.push(element)
                    //     }
                    // });

                    const uniqueArr = arr1.filter((item1) => {
                        if (item1.fullname != "" || item1.email != "" || item1.personal_contact != "") {
                            return !ForRemoveDuplcate.find((item2) => {
                                return (item1.email.includes(item2.email)) && (item1.personal_contact.includes(item2.personal_contact))
                            });
                        }
                    })
                    setGetCSVdata(uniqueArr)
                }
            })
        }
        else if (event.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            ExcelRenderer(event, async (err, resp) => {
                csvdataarr = []
                await resp.rows.slice(1).map((item) => {

                    // if ((item.fullname !== 'undefined' || "" || undefined) || (item.email !== "" || 'undefined' || undefined) || (item.personal_contact !== "" || 'undefined' || undefined)) {

                    return csvdataarr.push({
                        "fullname": item[1],
                        "email": item[2],
                        "personal_contact": item[3],
                    })
                    // }
                })


                let excalarr = csvdataarr.filter(item1 => {
                    if (item1.fullname !== undefined || item1.email !== undefined) {
                        return !ForRemoveDuplcate.map(item2 => item2.personal_contact).includes(item1.personal_contact) &&
                            //    !ForRemoveDuplcate.map(item2 => item2.fullname).includes(item1.fullname)
                            //      &&
                            !ForRemoveDuplcate.map(item2 => item2.email).includes(item1.email)
                    }
                })

                setGetCSVdata(excalarr)
            });
        }
    }
    // Add Bulk Client Add

    const SubmitBulkClients = async (e) => {

        if (csvFile == "") {
            setDocumentErr("please select csv/excel file")
            return
        }

        e.preventDefault()
        if (getCSVdata.length > 0) {
            const req = {
                "userdata": getCSVdata,
                "parent_admin_id": id
            }
            const res = forBulkClientAdd(req, AdminToken)
            // console.log("res", res)
            if (res) {
                setAlertMsg(true);
                setAlertColor("success");
                setTextAlert("Add CSV Succesfully");
                setShow2(false)
                setrefresh(!refresh)
            }
        } else {
            alert("No Data Found In Excel And CSV  File")
        }

    }

    // --------------------------------------For Add Bulk Client ---------------------------------
    // --------------------------------------For Send  Bulk Email ---------------------------------




    const templates = async () => {
        const ress = await GetAllTemplates(AdminToken)
        //  console.log("setTemplateDatasetTemplateData", ress)
        if (ress) {
            setTemplateData(ress)
        }

    }
    useEffect(() => {
        templates()
    }, [])







    // console.log("dataaaaa", data);

    const SendBulkEmail = async () => {

        if (actualData.length == 0) {
            alert("please Select Template First after Select Client")
        } else {


            console.log("uniqueDeVals1", actualData)
            const uniqueDeVals1 = [...new Set(actualData.map(item => item[1]))];

            const request = {
                "parent_admin_id": id,
                "linkexpires": time,
                "template_id": TemplateDataID,
                "userids": uniqueDeVals1,


            }
            //  console.log("hellloooo ", request);
            // return
            const ressBulk = await SendBulkMail(request, AdminToken)
            if (ressBulk.message == "Link Sended successfully") {
                setAlertMsg(true);
                setAlertColor("success");
                setShow1(false)
                setrefresh(!refresh)
                setTextAlert(ressBulk.message);

            }
        }




    }
    // --------------------------------------For SEnd Bulk Email ---------------------------------


    var actualData = [];

    const options = {
        // selectableRows: true,
        selectToolbarPlacement: 'none',
        selectableRowsOnClick: false,
        selectableRowsHeader: true,
        selectableRows: TemplateDataID != 'all' || "" ? 'multiple' : "none",
        // selectableRows: 'multiple',
        disableSelectionOnClick: true,


        onTableChange: (action, dataObj) => {


            actualData = []
            if (dataObj.selectedRows && dataObj?.selectedRows?.data?.length > 0) {
                var selectedRowIndices = Object.keys(dataObj.selectedRows.lookup);
                // console.log("dataObj.selectedRows.lookup", selectedRowIndices);
                if (dataObj.selectedRows.lookup) {
                    if ([selectedRowIndices].length >= 1) {
                        selectedRowIndices?.map(value => {
                            if (dataObj.data[value] != undefined) {
                                actualData.push(dataObj.data[value].data);
                            }
                        });
                    } else {
                        //actualData.push([]);
                        alert("plese Select Template First")
                    }
                } else {
                    //      console.log("hhh");
                }


            }
            else {

                // alert("select template first")
            }
        }
    }




    const checkUserWithTemplate = async (tempId) => {
        actualData = []

        let rew = {
            "template_id": tempId
        }
        const res = await CheckTemplateToUser(rew)
        if (res) {
            //   console.log("res", res);
            setData(res)
            actualData = []
        } else {
            setData(data)

        }
    }


    const DownloadSampleCSV = () => {
        const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let csvarrr = []
        const apiData = {
            "id": "1",
            "fullname": "fullname",
            "email": "example@gamail.com",
            "personal_contact": "0000000000"

        }
        csvarrr.push(apiData)

        //  console.log("csvarrr", csvarrr);
        const ws = XLSX.utils.json_to_sheet(csvarrr);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "csv", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, 'SampleCSV.csv');

    }


    return (
        // <ThemeProvider theme={theme} >

        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h4" gutterBottom>
                    Client List
                </Typography>
                <div className="d-flex">
                    <button className="MuiButton-contained navv border-0 me-1" style={{ color: '#fff', border: 'none !important' }} onClick={() => DownloadSampleCSV()} variant="contained" disabled={TemplateDataID != "all"}>
                        <Iconify icon="line-md:plus" /> Sample CSV
                        {/* {ClientIdsmtp_status == "0" ? alert('please check your SMTP details') : "ClientIdsmtp_status" */}
                    </button>

                    <button className="MuiButton-contained navv border-0 mx-3" style={{ color: '#fff', border: 'none !important' }} onClick={() => setShow2(true)} variant="contained" disabled={TemplateDataID != "all"}>
                        <Iconify icon="line-md:plus" /> Bulk Client Add
                        {/* {ClientIdsmtp_status == "0" ? alert('please check your SMTP details') : "ClientIdsmtp_status" */}
                    </button>
                </div>

            </Stack>
            <Card>
                <div className='row'>
                    <div className='my-3 d-flex ms-3'>
                        <input type='text'
                            className="form-control ms-2"
                            placeholder='Client Name '
                            name="fullname"
                            style={{
                                width: '200px',
                            }}
                            onChange={(e) => { setClientName(e.target.value) }}
                        value={flterClientname}
                        />

                        <input type='text'
                            className="form-control ms-2"
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
                        <select aria-label="Default select example" style={{
                            // left: '27.7em'
                        }} className='filter-dropdown ms-1' name="status"
                            onChange={(e) => { setTemplateDataID(e.target.value); checkUserWithTemplate(e.target.value) }}
                        >
                            <option value="all" >All Templete Clients</option>
                            {TemplateData && TemplateData.map((item, index) => {
                                return <option key={index} value={item.id}>{item.name}</option>

                            })}
                        </select>
                        {
                            (TemplateDataID == "all") && (emailfilter == "") && (flterClientname == "") ?
                                "" :
                                <>


                                    <Button className='MuiButton-contained border-0 mt-0 text-light ms-1' style={{
                                        // left: '41.6rem',
                                        // top: '-2.6rem',
                                        // zIndex: 999,
                                    }}
                                        onClick={(e) => Resetfilter(e)}
                                    >Reset</Button>
                                </>
                        }


                        {data.length > 0 && TemplateDataID !== "all" ? <>
                            <Button className='MuiButton-contained border-0 mt-0 text-light ms-1' style={{
                                // left: '41.6rem',
                                // top: '-2.6rem',
                                // zIndex: 999,
                            }}
                                onClick={(e) => SendBulkEmail()}
                            >BulkEmail</Button>
                        </> : ''
                        }

                        <ExportToExcel
                            style={{
                                position: 'aboslute',
                                right: '9px',
                                top: '1em',
                                zIndex: 9999,
                            }}
                            className="btn text-light export"
                            apiData={checked && checked}
                            fileName='Client List'
                        />
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    options123={options}
                />
            </Card>


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
                                    <Typography variant="h6" gutterBottom>
                                        Document
                                    </Typography>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <iframe
                                                src={`/images/${dataClient.id}e_sign-${document}`}
                                                title="myFrame"
                                                height="400"
                                            />
                                        </div>
                                    </div>
                                </div>
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


            {/* Bulk Client Add  */}

            <Modal
                show={show2}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton onHide={() => setShow2(false)} >
                    <Modal.Title>Upload CSV </Modal.Title>
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
                                onChange={(event) => { abcedf(event.target.files[0]); setcsvFile(event.target.files[0]); setDocumentErr("") }} />
                            <div className="file-dummy">
                                <div className="success">
                                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8SLh8GOim2szf-nANkrOU-C-WjufBbkSSmgD1utGBaTDZcKJPAQKfjttB0WstiNI4R4&usqp=CAU' alt=".." />

                                </div>
                                <div className="default">Please select The CSV/XLSX File</div>
                            </div>
                            <p className='text-center'>{csvFile.name}</p>

                            {documentErr ? <p style={{ color: 'red' }}>{documentErr}</p> : " "}

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
                        Add CSV
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Send Bulk Email  */}
            {/* 
            <Modal
                show={show1}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton onHide={() => setShow1(false)} >
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    // left: '27.7em'
                    width: "100% !important"
                }}>
                    <select aria-label="Default select example" style={{
                        // left: '27.7em'
                        width: "100% !important"
                    }} className='filter-dropdown1 ms-2' name="status"
                        onChange={(e) => { setTemplateDataID(e.target.value) }}
                    >
                        <option value="all" >All</option>
                        {TemplateData && TemplateData.map((item, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>

                        })}
                    </select>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary"
                        onClick={(e) => SendBulkEmail(e)}
                    >
                        Send Mail
                    </Button>
                </Modal.Footer>
            </Modal> */}




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


