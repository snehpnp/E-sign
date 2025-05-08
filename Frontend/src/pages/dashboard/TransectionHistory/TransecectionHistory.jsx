import React, { useEffect, useState, useRef } from 'react'
import { Link as RouterLink, NavLink, useParams, useLocation } from 'react-router-dom';
import { Card, Table, Stack, Avatar, Button, Checkbox, TableRow, Alert, TableBody, TableCell, Container, Typography, Tooltip, TableContainer, TablePagination, } from '@mui/material';
import { Icon } from '@iconify/react';
// dialog Box
import DatePicker from "react-datepicker";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ExportToExcel from "../../../utils/ExportToExport";

import DataTable from "../../../utils/DataTable";
import { fDateTime } from '../../../utils/formatTime';
import Iconify from '../../../components/Iconify';
import { AdminTrasnectionHistory } from '../../../services';
import AlertMessages from '../../../utils/AlertMessages';





const TransecectionHistory = () => {
    const location = useLocation()
    const ref = useRef();
    const ref1 = useRef();

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [Filterdata, setFilterData] = useState([]);
    const [fullname, setfullname] = useState('');
    const [refresh, setrefresh] = useState(false)
    const [alertMsg, setAlertMsg] = useState(false)
    const [csvData, setcsvData] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);




    const adminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
    const adminId = JSON.parse(localStorage.getItem('admin')).id;

    // dialogbox

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = async (data) => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    // dialogbox
    const hideClose = () => {
        setAlertMsg(false)
    }

    var arrData = []
    const getTransactionHistory = async () => {
        const data = {
            "adminid": adminId
        }
        const response = await AdminTrasnectionHistory(data, adminToken)

        if (response) {
            let nextArr = []
            var exist_client_tempId = []
            var totalCharges

            // -----------------------

            // -----------------------

            const result = response.reduce((acc, curr) => {
              
                const key = `${curr.userdetails.id}_${curr.templatedetails.id}`
               

                if (acc[key]) {

                    // console.log("acc[key]" ,acc[key]);
                    acc[key].sign_charge += curr.sign_charge;
                    if (acc[key].sign_type == "pan_verify" && curr.sign_type == "aadhar_verify_with_otp") {
                        acc[key].sign_type = "KYC Generated";
                    } else if (acc[key].sign_type == 'aadhaar_sign') {
                        acc[key].sign_type = "Sign Generated";

                    } else if (curr.sign_type == 'aadhaar_sign') {
                        acc[key].sign_type = "Sign Generated";
                    }
                    // acc[key].sign_type = 


                } else {
                    acc[key] = curr;
                    if (curr.sign_type == 'aadhaar_sign') {
                        acc[key].sign_type = "Sign Generated";
                    }

                }
                return acc;
            }, {});



            Object.values(result).map((x, index) => {
                arrData.push({
                    "id": index,
                    "admindetails": x.admindetails.username,
                    "createdAt": x.createdAt,
                    "fund": x.fund,
                    "fundremain": x.fundremain,
                    "sign_charge": x.sign_charge,
                    "sign_type": x.sign_type,
                    "pan_verify": x.sign_type,
                    "fullname": x.userdetails.fullname,
                    "email": x.userdetails.email,
                    "personal_contact": x.userdetails.personal_contact,
                    "templete_name": x.templatedetails.name,
                    "templete_id": x.templatedetails.id,
                    "userid": x.userdetails.id,
                })

            })




            setFilterData(Object.values(arrData))

            setData(Object.values(arrData));
        }


        const csv = []
        Object.values(arrData).map((x, index) => {

            return csv.push({
                "Id": index + 1,
                "Date And Time": fDateTime(x.createdAt),
                "Client-Name": x.fullname,
                "Sign_Status": x.sign_type,
                "Templete_Name": x.templete_name,
                "Sign-Charge": x.sign_charge,
                "Remaining_Fund": x.fundremain,
                "Available_Fund": x.fund,
            })
        })

        setcsvData(csv)

    }





    useEffect(() => {
        getTransactionHistory();



    }, [])






    const columns = [
        // {
        //     label: 'Sr .No',
        //     name: "ids",
        //     width: '150px !important',
        //     options: {
        //         customBodyRender: (value, tableMeta, rowData, updateValue) => {
        //             // return tableMeta.rowIndex + 1

        //         },

        //     }
        // },
        {
            label: 'Created At',
            name: `createdAt`,
            width: '150px !important',
            options: {
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <p>
                            {
                                fDateTime(tableMeta.rowData[1])
                                // console.log("dddd" ,tableMeta.rowData)
                            }
                        </p>
                    )
                }
            },
        },
        {
            label: 'Client Name',
            name: "fullname",
            width: '150px !important',
            textAlign: "center"
        },
        {
            label: 'Template Name',
            name: "templete_name",
            width: '150px !important',
            textAlign: "center"
        },
        {
            label: 'Template Id',
            name: "templete_id",
            width: '150px !important',
            textAlign: "center",
            options: {
                display: false
            }

        },


        {
            label: 'Verification Type',
            name: "sign_type",
            width: '170px !important',
            textAlign: "center",
        },
        {
            label: 'Charges',
            name: "sign_charge",
            width: '150px !important',
            textAlign: "center"
        },
        {
            label: 'Available Balance',
            name: "fundremain",
            width: '170px !important',
            textAlign: "center",

        },
        {
            label: 'Email',
            name: "email",
            width: '170px !important',
            textAlign: "center",
            options: {
                display: false
            }
        },
        {
            label: 'Mobile',
            name: "mobile",
            width: '170px !important',
            textAlign: "center",
            options: {
                display: false
            }
        },

    ];



    const handleStartDateChange = (event) => {
        const date = new Date(event.target.value);
        setStartDate(date);
    };

    const handleEndDateChange = (event) => {
        const date = new Date(event.target.value);
        setEndDate(date);
    };






    const handleResetClick = () => {
        // reset the filter and the filtered data
        setrefresh(!refresh)
        setData(data);
        setStartDate(null);
        setfullname('');
        setEndDate(null);
        // setIsFiltered(false);
    };





    const abc = (status) => {

        const filteredData = Filterdata.filter(x => {
            if (x.fullname.toString().toLowerCase().includes(fullname.toString().toLowerCase())) {
                return x
            }
          else if (x.templete_name.toString().toLowerCase().includes(fullname.toString().toLowerCase())) {
                return x
            }
          else if (x.sign_type.toString().toLowerCase().includes(fullname.toString().toLowerCase())) {
                return x
            }

        })


        setData(filteredData)

    }



    useEffect(() => {
        abc()
    }, [fullname])



    return (

        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Transaction History
                    </Typography>

                </Stack>
                <Card>
                    <div className='row'>
                        <div className='my-3 d-flex ms-3'>
                            <input type='text'
                                className="form-control ms-2"
                                placeholder='Client Name'

                                name="fullname"
                                style={{
                                    width: '200px',
                                }}

                                onChange={(e) => { setfullname(e.target.value); }}
                                value={fullname}
                            />

                            {fullname == "" ? ""
                                :
                                <Button className='MuiButton-contained mt-0 text-light ms-2' style={{
                                }}
                                    onClick={() => handleResetClick()}
                                >Reset</Button>
                            }

                            <ExportToExcel
                                style={{
                                    // position: 'aboslute',
                                    right: '9px',
                                    // top: '1em',
                                    zIndex: 999,
                                }}
                                className="btn text-light export"
                                apiData={csvData && csvData}
                                fileName='Fund History'
                            />
                            {/* <div className='row'>
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

                                onChange={(e) => { handleFilterChange(e); }}
                            // value={flterClientname}
                            />

                            {/* <div className=' d-flex ms-3' style={{ marginBottom: '4rem' }}> */}

                            <ExportToExcel
                                style={{
                                    position: 'aboslute',
                                    right: '9px',
                                    top: '1em',
                                    zIndex: 999,
                                }}
                                className="btn text-light export"
                                apiData={csvData && csvData}
                                fileName='Transaction History'
                            />
                            {/* </div > */}
                        </div >
                    </div>
                    <DataTable
                        columns={columns}
                        data={data}

                    />
                </Card>


            </Container>

        </>
    )
}

export default TransecectionHistory

