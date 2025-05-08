


import React, { useEffect, useState, useRef } from 'react'
import { Link as RouterLink, NavLink, useParams, useLocation } from 'react-router-dom';
import { Card, Table, Stack, Avatar, Button, Checkbox, TableRow, Alert, TableBody, TableCell, Container, Typography, Tooltip, TableContainer, TablePagination, } from '@mui/material';
import { Icon } from '@iconify/react';
// dialog Box

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import DataTable from "../../../utils/DataTable";
import { fDateTime } from '../../../utils/formatTime';
import Iconify from '../../../components/Iconify';
import { transactionHistory, getAdmins } from '../../../services';
import AlertMessages from '../../../utils/AlertMessages';
import ExportToExcel from "../../../utils/ExportToExport";


const AllTransections = () => {
    const location = useLocation()
    const ref = useRef();
    const ref1 = useRef()
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [dialogData, setDialogData] = useState([]);
    const [refresh, setrefresh] = useState(true)
    const [alertMsg, setAlertMsg] = useState(false)
    const [alertColor, setAlertColor] = useState("")
    const [textAlert, setTextAlert] = useState("")
    const [csvData, setcsvData] = useState('');

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [fullname, setfullname] = useState('');
    const [plan, setplan] = useState('');

    const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

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

    const getPackages = async () => {
        const response = await getAdmins(SuperAdminToken)
        const arr = response.map((item) => {
            return item.username

        })
        console.log("arr", arr);
    }
    const getTransactionHistory = async () => {
        const response = await transactionHistory(SuperAdminToken)
        //    console.log("response", response);
        if (response) {
            setData(response);
        }



        const csv = []
        response.map((x, index) => {

            return csv.push({
                "Id": index + 1,
                "User_Name": x.admindetails.username,
                "Client_Name": x.userdetails.fullname,
                "Date_And_Time": fDateTime(x.createdAt),
                "Available_Fund": x.fund,
                "Sign_Type": x.sign_type,
                "Sign_Charge": x.sign_charge,
                "Fund_Remaining": x.fundremain,
            })
        })
        setcsvData(csv)


    }



    useEffect(() => {
        getTransactionHistory();
        getPackages()
    }, [refresh]);




    const columns = [
        {
            label: 'Date',
            name: `createdAt`,
            width: '240px !important',
            options: {
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <p>
                            {fDateTime(tableMeta.rowData[1])}
                        </p>
                    )
                }
            },
        },
        {
            label: 'Company Name',
            name: "admindetails.username",
            width: '150px !important',
            textAlign: "center"
        },
        {
            label: 'Client Name',
            name: "userdetails.fullname",
            width: '150px !important',
            textAlign: "center"
        },
        {
            label: 'Charges',
            name: "sign_charge",
            width: '150px !important',
            textAlign: "center"
        },

        {
            label: 'Verification Type',
            name: "sign_type",
            width: '170px !important',
            textAlign: "center",
        },
        {
            label: 'Available Balance',
            name: "fundremain",
            width: '170px !important',
            textAlign: "center",
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

    console.log("plan ", plan);

    const handleFilterSubmit = (event) => {
        //     event.preventDefault();

        //     // filter the data based on the selected date range
        //     const filtered = data.filter(item => {
        //         const itemDate = new Date(item.createdAt);
        //         console.log("itemDate", item);
        //         return (
        //             (!startDate || itemDate >= startDate) &&
        //             (!endDate || itemDate <= endDate)
        //         )
        //     }).filter((item) => {
        //         if (item.admindetails && item.admindetails.username.includes(fullname)) {
        //             return (item)
        //         }
        //     }).filter((item) => {
        //         if (item.userdetails.fullname.includes(plan)) {
        //             return (item)
        //         }
        //     })

        //     // set the filtered data and the filter status
        //     console.log("filtered", filtered);
        //     setData(filtered);
        //     // setIsFiltered(true);
    };



    const handleResetClick = () => {
        // reset the filter and the filtered data
        setrefresh(!refresh)
        setData(data);
        setStartDate('');
        setfullname('');
        setEndDate('');
        setplan('');
        // setIsFiltered(false);
    };



    const abc = (status) => {

        const filteredData = data.filter(item => {
            return item.userdetails.fullname.includes(plan)
        }).filter(x => {
            return x.admindetails && x.admindetails.username.includes(fullname)
        }).filter(item => {
            const itemDate = new Date(item.createdAt);
            // console.log("itemDate", item);
            return (
                (!startDate || itemDate >= startDate) &&
                (!endDate || itemDate <= endDate)
            )
        })

        console.log("dataaa", filteredData);

        setData(filteredData)

    }


    useEffect(() => {
        abc()
    }, [fullname, plan, startDate, endDate])



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
                            <div className="d-flex flex-column">

                                <label htmlFor="fullname" className=' ms-3 ' style={{ fontSize: "10px" }}>Comapny name</label>
                                <input type='text'
                                    className="form-control ms-2"
                                    placeholder='Comapny name'

                                    name="fullname"
                                    style={{
                                        // left: '1.6rem',
                                        // position: 'absolute',
                                        // top: '1rem',
                                        width: '200px',
                                        // background: 'gray',

                                        // zIndex: 10,

                                    }}

                                    onChange={(e) => { setfullname(e.target.value); }}
                                    // value={fullname}
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="plan" className=' ms-3 ' style={{ fontSize: "10px" }}>Client Name</label>
                                <input type='text'
                                    className="form-control ms-2"
                                    placeholder='Client Name'
                                    name="plan"
                                    style={{
                                        width: '200px',
                                    }}

                                    onChange={(e) => { setplan(e.target.value); }}

                                />
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="fromdate" className=' ms-3 ' style={{ fontSize: "10px" }}>From Date</label>
                                <input type='date'
                                    className="form-control ms-2"
                                    name="fromdate"
                                    ref={ref}

                                    placeholder="from date"
                                    style={{
                                        width: '200px',
                                    }}
                                    onChange={(e) => handleStartDateChange(e)}
                                    // value={startDate}

                                />
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="enddate" className=' ms-3 ' style={{ fontSize: "10px" }}>End Date</label>
                                <input type='date'
                                    className="form-control ms-2"
                                    placeholder='End Date '
                                    name='enddate'


                                    style={{
                                        width: '200px',
                                    }}
                                    onChange={(e) => handleEndDateChange(e)}
                                 value={endDate}
                                />
                            </div >
                            <div className="mt-4">     <Button className='MuiButton-contained mt-0 text-light ms-2' style={{
                            }}
                                onClick={(e) => handleFilterSubmit(e)}
                            >Submit</Button>
                                <Button className='MuiButton-contained mt-0 text-light ms-2' style={{
                                }}
                                    onClick={() => handleResetClick()}
                                >Reset</Button>
                            </div>


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

                            {/* </div > */}
                        </div >
                    </div>




                    <DataTable
                        columns={columns}
                        data={data}

                    />
                </Card>

                {/* dialog Box  */}
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth='xl'
                >

                    <DialogContent>
                        <DialogContentText>
                            <h4 style={{ fontWeight: "bolder", fontSize: "36px" }}>
                                Package Details
                            </h4>
                            <div className="w-100 row mb-4 mt-4">
                                <div className="col-md-4">
                                    <Typography variant="h6" gutterBottom>
                                        Package Name
                                    </Typography>
                                    <p>{dialogData[2]} </p>
                                </div>
                                <div className="col-md-4">
                                    <Typography variant="h6" gutterBottom>
                                        Deposit Limit
                                    </Typography>
                                    <p>{dialogData[3]} </p>
                                </div>
                                {/* <div className="col-md-4">
                    <Typography variant="h6" gutterBottom>
                   Package Days/Month/year
                    </Typography>
                    <p>hello</p>
                  </div> */}
                                <div className="col-md-3">
                                    <Typography variant="h6" gutterBottom>
                                        Package Validity
                                    </Typography>
                                    <p>{dialogData[4]} {dialogData[5]} </p>
                                </div>
                            </div>
                            <h4 style={{ fontWeight: "bolder", fontSize: "36px" }}>
                                Price
                            </h4>
                            <div className="row mb-3 mt-4">
                                <div className="col-4">
                                    <Typography variant="h6" gutterBottom>
                                        Aadhaar Verification
                                    </Typography>
                                    <p>{dialogData[6]} </p>
                                </div>
                                <div className="col-4">
                                    <Typography variant="h6" gutterBottom>
                                        Pan verification
                                    </Typography>
                                    <p>{dialogData[7]} </p>
                                </div>
                                <div className="col-4">
                                    <Typography variant="h6" gutterBottom>
                                        E-sign
                                    </Typography>
                                    <p>{dialogData[8]} </p>
                                </div>
                                <div className="col-md-3">
                                    <Typography variant="h6" gutterBottom>
                                        Package Details
                                    </Typography>
                                    <p>{dialogData[9]}</p>
                                </div>
                            </div>

                        </DialogContentText>
                    </DialogContent>
                    {/* <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Disagree
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions> */}
                </Dialog>

                {/* dialog box */}



                {alertMsg && (
                    <AlertMessages
                        hideAlert={hideClose}
                        showAlert={alertMsg}
                        message={textAlert}
                        alertColor={alertColor}
                    />
                )}

            </Container>

        </>
    )
}

export default AllTransections



