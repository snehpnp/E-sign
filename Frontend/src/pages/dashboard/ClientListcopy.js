// import React, { useEffect, useState } from 'react'
// import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
// import { Card, Table, Stack, Avatar, Button, Checkbox, TableRow, Alert, TableBody, TableCell, Container, Typography, Tooltip, TableContainer, TablePagination, } from '@mui/material';

// import { Icon } from '@iconify/react';
// import DataTable from '../../utils/DataTable'
// import Iconify from '../../components/Iconify';
// import Page from '../../components/Page';
// import AlertMessages from '../../utils/AlertMessages';
// import { getUsers, deleteUsers } from '../../services'

// const ClientList = () => {

//     const [data, setData] = useState([]);
//     const [refresh, setRefresh] = useState(true)
//     const [alertMsg, setAlertMsg] = useState(false)
//     const [alertColor, setAlertColor] = useState("")
//     const [textAlert, setTextAlert] = useState("")

//     const { id } = useParams()

//     const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;

//     const columns = [
//         {
//             name: 'FullName',
//             selector: row => row.fullname,
//             sortable: true,
//         },
//         {
//             name: 'UserName',
//             selector: row => row.username,
//             sortable: true,
//         },
//         {
//             name: 'Email',
//             selector: row => row.email,
//             sortable: true,
//         },
//         {
//             name: 'Mobile',
//             selector: row => row.personal_contact,
//             sortable: true,
//         },
//         // {
//         //     label: 'No',
//         //     name: "id",
//         //     sortable: true,
//         // },
//         // {
//         //     label: 'FullName',
//         //     name: "fullname",
//         //     sortable: true,
//         // },
//         // {
//         //     label: 'UserName',
//         //     name: "username",
//         //     sortable: true,
//         // },
//         // {
//         //     label: 'Email',
//         //     name: "email",
//         //     sortable: true,
//         // },
//         // {
//         //     label: 'Mobile',
//         //     name: "personal_contact",
//         //     sortable: true,
//         // },
//         {
//             // label: "actions",
//             width: '150px !important',
//             name: "actions",
//             selector: (row) => (
//                 <>
//                          <Tooltip title="Get Signed Document">
//                             <Icon icon="akar-icons:download"
//                                 color="#E43F47"
//                                 className='mx-2'
//                                 width="22"
//                                 variant="primary"
//                                 data-toggle="tooltip"
//                                 data-placement="top"
//                                 // title="Edit Client"
//                                 onClick={()=>getSignedDocument(row)}
//                             />
//                         </Tooltip>
//                     <NavLink
//                         to={`/admin/editclient/${row.id}`}
//                         state={row}
//                     >
//                         <Tooltip title="View Details">
//                             <Icon icon="clarity:grid-view-line"
//                                 color="#E43F47"
//                                 className='mx-2'
//                                 width="22"
//                                 variant="primary"
//                                 data-toggle="tooltip"
//                                 data-placement="top"
//                                 // title="Edit Client"
//                             />
//                         </Tooltip>
//                     </NavLink>

//                     <Tooltip title="Delete">
//                         <Icon icon="ant-design:delete-outlined"
//                             color="CD2B2E"
//                             width="22"
//                             data-toggle="tooltip"
//                             data-placement="top"
//                             cursor="pointer"
//                             // title="Delete"
//                             onClick={() => deletePerticularUsers(row.id)}
//                         />
//                     </Tooltip>
//                 </>
//             )
//         }
//     ];

//     const data1 = [];

//     const getAllUsers = async () => {
//         const response = await getUsers(AdminToken)
//         if (response) {

//             response.forEach((item) => {
//                 data1.push({
//                     id: item.id,
//                     fullname: item.fullname,
//                     username: item.username,
//                     email: item.email,
//                     personal_contact: item.personal_contact,
//                     signeddocument: item.signeddocument
//                     // actions: <Link  className= 'btn btn-primary' > Edit </Link > & nbsp <a>delete </a>
//                 })
//             })
//             console.log("ffffff", data1);
//             setData(data1);
//         }
//     }

//     const getSignedDocument=(data)=>{
//        //     }

//     useEffect(() => {
//         getAllUsers();
//     }, [refresh]);


//     // Delete Users

//     const deletePerticularUsers = async (id) => {

//         if (window.confirm("Do you want to delete this Client ?")) {
//             const response = await deleteUsers(AdminToken, id)
//             setRefresh(!refresh)
//             if (response.message) {
//                 setAlertMsg(true)
//                 setAlertColor("success")
//                 setTextAlert(response.message)
//             }
//         }
//     }
//     // setTimeout(() => {
//     //     setAlertMsg(alertMsg)
//     // }, 10000);

//     const hideClose = () => {
//         setAlertMsg(false)
//     }

//     return (
//         <>
//             <Page title="User">
//                 <Container>
//                     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//                         <Typography variant="h4" gutterBottom>
//                             Client List
//                         </Typography>
//                         <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/admin/addclient" startIcon={<Iconify icon="line-md:plus" />}>
//                             Add Client
//                         </Button>
//                     </Stack>
//                     <Card>
//                         <DataTable columns={columns} data={data} />
//                     </Card>
//                 </Container>
//             </Page>
//             {alertMsg &&
//                 <AlertMessages
//                     hideAlert={hideClose}
//                     showAlert={alertMsg}
//                     message={textAlert}
//                     alertColor={alertColor}
//                 />
//             }
//         </>
//     )
// }

// export default ClientList



import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link as RouterLink, NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { Card, Stack, Container, Typography, TextField, Switch, } from '@mui/material';
import axios from "axios";

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

import { deleteUsers, getSignedDocument, getSignedDocument123, getUsersById, RecentVerifyLink, getUsers } from '../../services'











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
        alert('please Wait For Sign')
        // setAlertMsg(true);
        // setAlertColor("error");
        // setTextAlert(" Please Wait For Sign  ");
    }
}



// Get Signed Document


const SignedDocument = async (ClientID, otpbased, signstatus, name, id, signdoc) => {

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

    const [data, setData] = useState([]);
    const [ClientID, setClientId] = useState();
    const location = useLocation()
    // console.log("data.client_id", location);
    const navigate = useNavigate()
    const [refresh, setrefresh] = useState(true)
    const [alertMsg, setAlertMsg] = useState(false)
    const [alertColor, setAlertColor] = useState("")
    const [textAlert, setTextAlert] = useState("")
    const [show, setShow] = useState('');
    const [checked, setChecked] = useState([]);

    const [text, setText] = useState("");
    const [isCopied, setIsCopied] = useState(false);

    // const [open, setOpen] = useState(false);
    // const [fund, setFund] = useState("")
    // const [rowId, setRowId] = useState("")
    // const [checked, setChecked] = useState(false);
    const [dataClient, setDataClient] = useState([]);
    // const [abc, setAbc] = useState('');

    const [flterClientname, setClientName] = useState('');
    const [flternactiveInactive, setActiveInactive] = useState('');
    const [emailfilter, setEmailFilter] = useState('');

    const [filters, setFilters] = useState({ fullname: '', email: '', "status": '' });




    const handleClose = () => setShow(false);

    const handleClickOpen = async (id) => {
        const response = await getUsersById(id);
        if (response) {
            setDataClient(response.data);
            setShow(true);
        }

    };


    const hideClose = () => {
        setAlertMsg(false)
    }

    // Get API For Get Packages Data
    const getPackages = async () => {
        const response = await getUsers(AdminToken)

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







        const csv = []
        response.map((x, index) => {

            return csv.push({
                "Id": index + 1,
                "Full_Name": x.fullname,
                "Personal_Email": x.email,
                "personal_contact": x.personal_contact,
                "sign_status": new Date(x.linkexpires) < new Date() && x.sign_status == 0 ? "Link Expired" : x.sign_status == 1 ? "Sign Done" : "Sign Pending",
                "otpbased": x.otpbased === 1 ? 'Verify by Mobile' : 'Verify By Addhaar',
                // "Kyc Status"  
            })
        })
        setChecked(csv)


    }


    useEffect(() => {
        getPackages();
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


    //  
    //  Filter Table
    // const filterData = (e) => {
    //     // console.log("flternactiveInactive", flterclientname);
    //     const filterTable = data && data
    //         .filter((item) => {
    //             // console.log("item", parseInt(flternactiveInactive));
    //             // console.log("parseInt(flternactiveInactive)", typeof parseInt(flternactiveInactive));
    //             if (item.sign_status === parseInt(flternactiveInactive)) {
    //                 return item
    //             } else {
    //                 setData([]);
    //             }
    //             if ((new Date(item.linkexpires) > new Date() && item.sign_status === 0)) {
    //                 return new Date(item.linkexpires) > new Date() && parseInt(flternactiveInactive) === 0
    //             } else {
    //                 setData([]);
    //             }

    //             if (parseInt(flternactiveInactive) === 2 && item.sign_status === 0) {
    //                 return new Date(item.linkexpires) < new Date() && parseInt(flternactiveInactive) === 2
    //             } else {
    //                 setData([]);
    //             }

    //         })

    //     // .filter((x) => {
    //     //     console.log("x", x);
    //     //     if (x.sign_status.toString().includes(flternactiveInactive) && x.parent_admin_id === 1) {
    //     //         return x
    //     //     } else {
    //     //         return setData(data)
    //     //     }
    //     // })
    //     // .filter((y) => {
    //     //     // console.log("y" , y);

    //     //     return y.fullname && y.fullname.toLowerCase().includes(flterClientname.toLowerCase())
    //     // })
    //     // .filter((z) => { return z.company_email && z.company_email.toLowerCase().includes(emailfilter.toLowerCase()) })

    //     // console.log("filterTable", filterTable);
    //     if (filterTable.length >= 0) {
    //         setData(filterTable)
    //         // setrefresh(!refresh)
    //     }
    //     else
    //         return setData(data)
    // }

    //  Reset Filter Table





    //  Resend Verification Link

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
        // {
        //     label: 'Sr .No',
        //     name: "srno",
        //     width: '150px !important',
        //     options: {
        //         customBodyRender: (value, tableMeta, rowData, updateValue) => {
        //             return tableMeta.rowIndex + 1

        //         },
        //     }
        // },
        {
            // 1
            label: 'Sr .No',
            name: "id",
            width: '150px !important',
            // display: false,
            options: {
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
                width: 200,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (

                        <p>{

                            // console.log("expiry ", tableMeta.rowData[14])
                            new Date(tableMeta.rowData[15]) < new Date() && tableMeta.rowData[8] == 0 ? "Link Expired" : tableMeta.rowData[8] == 1 ? "Sign Done" : "Sign Pending"
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
                // display: false,
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
                //    display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return <p> {kika(data, tableMeta.rowData[9], tableMeta.rowData[7], tableMeta.rowData[8])}</p>
                }
            }
        },
        {

            // 12
            label: 'Actions',
            name: 'action',
            options: {
                filter: false,
                sort: false,
                width: 200,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {(new Date(tableMeta.rowData[15]) < new Date() && tableMeta.rowData[8] === 0) ?
                                <Tooltip title="Resend Verification Link">
                                    <Icon icon="mdi:email-resend-outline"
                                        color="#E43F47"
                                        className='mx-1'
                                        width="22"
                                        variant="primary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        // onClick={handleShow}
                                        onClick={() => handleClickOpen(tableMeta.rowData[1])
                                        }
                                    />
                                </Tooltip>
                                : ''}

                            {(new Date(tableMeta.rowData[15]) < new Date() && tableMeta.rowData[8] === 0) ? "" :
                                <>
                                    <Tooltip title="Get Kyc Document">
                                        <Icon icon="ant-design:cloud-download-outlined"
                                            color="#E43F47"
                                            className='mx-1'
                                            width="22"
                                            variant="primary"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            onClick={() => GetKycDocument(tableMeta.rowData[13], tableMeta.rowData[3])}
                                        />
                                    </Tooltip>

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

                            {(new Date(tableMeta.rowData[15]) < new Date() && tableMeta.rowData[8] === 0) ?
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

                            {(new Date(tableMeta.rowData[15]) > new Date() && tableMeta.rowData[8] === 0) ?
                                <>
                                    <Tooltip title="Copy Verification Link">
                                        <Icon icon="carbon:copy-link"
                                            color="#E43F47"
                                            className='mx-1'
                                            width="22"
                                            variant="primary"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            onClick={() => CopyLink(tableMeta.rowData[20])}
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
                    return (
                        <>
                            {/* // {console.log("kyc document ", tableMeta.rowData[19])} */}
                        </>)
                }
            }
        },

    ]



    const kika = (alldata, ClientID, otpbased, signstatus) => {
        // return "hello"
        // if (signstatus === 1) {
        //     if (otpbased === 0) {
        // const response =   await getSignedDocument123(ClientID)
        // 
        //  console.log("response123", response);
        // if (response.status_code === 200) {
        //     // console.log("hello word");
        //     return "esign link generate"
        // }
        // else if (response.response.data.status_code === 422) {
        //     return response.response.data.message

        // }
        // else if (response.response.data.status_code == 404) {
        //     return response.response.data.message
        // }
        // }
        // }
    }











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


    const handleFilterChange = (event) => {
        // console.log("eee" , event);
        const { name, value } = event.target;
        // if (name == 'status' && value == "1" || "2" || "3" || "0") {
        //     setFilters({ ...filters, [name == 'status']: value == "1" ?  });
        // }
        // else {
        setFilters({ ...filters, [name]: value });

        // }

    };


    // console.log("filters", filters);

    // const Resetfilter = (e) => {
    //     e.preventDefault();
    //     setFilters({});
    // }
    const abc = () => {


        const filteredData = data.filter(item =>
            Object.entries(filters).every(([key, value]) =>
                !value || item[key].toLowerCase().includes(value.toLowerCase())
            )
        );
        console.log("filteredData", filteredData);
        setData(filteredData)
    }


    useEffect(() => {
        abc()
    }, [filters])






    return (
        // <ThemeProvider theme={theme} >


        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h4" gutterBottom>
                    Client List
                </Typography>

                <NavLink className="MuiButton-contained navv" style={{ color: '#fff' }} variant="contained" to="/admin/addclient" >
                    <Iconify icon="line-md:plus" />  Add Client
                </NavLink>

            </Stack>
            <Card>
                <div className='row'>
                    <div className='my-3 d-flex ms-3'>


                        <input type='text'
                            className="form-control ms-2"
                            placeholder='Client Name '
                            name="fullname"
                            style={{
                                // left: '1.6rem',
                                // position: 'absolute',
                                // top: '1rem',
                                width: '200px',
                                // background: 'gray',

                                // zIndex: 10,

                            }}
                            onChange={(e) => { handleFilterChange(e); setClientName(e.target.value) }}
                        // value={flterClientname}
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
                            onChange={(e) => { handleFilterChange(e); setEmailFilter(e.target.value) }}
                        // value={emailfilter}
                        />

                        {/* <Form.Select aria-label="Default select example" style={{
                            // left: '27.7em'
                        }} className='filter-dropdown ms-2'
                            onChange={(e) => { handleFilterChange(e); setActiveInactive(e.target.value) }}
                            // value={flternactiveInactive}
                            name="status"

                            required>
                            <option value="3" >All</option>
                            <option value="1">Sign-Done</option>
                            <option value="0">Sign-Pending</option>
                            <option value="2">link-Expired</option>
                        </Form.Select>

 */}

                        {/* <Button className='MuiButton-contained mt-0 text-light ms-2' style={{
                            // left: '41.2rem',
                            // top: '-2.6rem',
                            // zIndex: 999,
                        }}
                            onClick={() => filterData()}
                        >Submit</Button>

                        <Button className='MuiButton-contained mt-0 text-light ms-2' style={{
                            // left: '41.6rem',
                            // top: '-2.6rem',
                            // zIndex: 999,
                        }}
                            onClick={(e) => Resetfilter(e)}
                        >Reset</Button> */}

                        {/* <Button className='MuiButton-contained mt-0 text-light ms-2' style={{
                            // left: '41.6rem',
                            // top: '-2.6rem',
                            // zIndex: 999,
                        }}
                            onClick={(e) => Resetfilter(e)}
                        >Reset</Button> */}

                        <ExportToExcel
                            style={{
                                position: 'aboslute',
                                right: '9px',
                                top: '1em',
                                zIndex: 9999,
                            }}
                            className="btn text-light export"
                            apiData={checked && checked}
                            fileName='Company List'
                        />
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                />
            </Card>



            <Modal show={show} onHide={handleClose} animation={false} size="lg" className='p-0'>
                <Modal.Header closeButton>
                    <Modal.Title>Resend Varification Link</Modal.Title>
                </Modal.Header>
                <Modal.Body>   <Form>
                    <div className="detail-view mx-5 ">
                        <div className="row mb-3">
                            {/* <Typography variant="h4" gutterBottom className="mb-4 mt-0">                  </Typography> */}
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


