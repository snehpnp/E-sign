



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
import { AllPackageUpdateList } from '../../../services';
import AlertMessages from '../../../utils/AlertMessages';
import ExportToExcel from "../../../utils/ExportToExport";


const AllPackageHistory = () => {
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


    const getTransactionHistory = async () => {
        const response = await AllPackageUpdateList(SuperAdminToken)
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

    }, [refresh]);




    const columns = [

        {
            label: 'Package Name',
            name: "packagedetails.name",
            width: '150px !important',
            textAlign: "center"
        },
        {
            label: 'Company Name',
            name: `admindata.username`,
            width: '240px !important',

        },
        {
            label: 'Plan Started',
            name: "start_service",
            width: '150px !important',
            textAlign: "center",
            options: {
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <p>
                            {fDateTime(tableMeta.rowData[3])}
                        </p>
                    )
                }
            },
        },
        {
            label: 'Plan Expiry',
            name: "end_service",
            width: '150px !important',
            textAlign: "center",
            options: {
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <p>
                            {fDateTime(tableMeta.rowData[4])}
                        </p>
                    )
                }
            },
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

console.log("plan " , plan);

    const handleFilterSubmit = (event) => {
        event.preventDefault();

        // filter the data based on the selected date range
        const filtered = data.filter(item => {
            const itemDate = new Date(item.start_service);
            const itemDate1 = new Date(item.end_service);
            console.log("itemDate", item);
            return (
                (!startDate || itemDate >= startDate) &&
                (!endDate || itemDate1 <= endDate)
            )
        }).filter((item) => {
            if (item.admindata && item.admindata.username.includes(fullname)) {
                return (item)
            }
        }).filter((item) => {
            if (item.packagedetails.name.toUpperCase() .includes(plan.toUpperCase())) {
                return (item)
            }
        })

        // set the filtered data and the filter status
        console.log("filtered", filtered);
        setData(filtered);
        // setIsFiltered(true);
    };



    const handleResetClick = () => {
        // reset the filter and the filtered data
        setrefresh(!refresh)
        setData(data);
        setStartDate('');
        setfullname('');
        setEndDate('');
        // setIsFiltered(false);
    };



    return (

        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        All Package History
                    </Typography>
                </Stack>
                <Card>
                    <div className='row'>
                        <div className='my-3 d-flex ms-3'>
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
                                value={fullname}
                            />
                            <input type='text'
                                className="form-control ms-2"
                                placeholder='Plan'

                                name="fullname"
                                style={{
                                    width: '200px',
                                }}

                                onChange={(e) => { setplan(e.target.value); }}
                            //    value={plan}
                            />
                            <input type='text'
                                className="form-control ms-2"
                                name="date"
                                ref={ref}
                                onFocus={() => (ref.current.type = "date")}
                                onBlur={() => (ref.current.type = "text")}
                                placeholder="from date"
                                style={{
                                    width: '200px',
                                }}
                                onChange={(e) => handleStartDateChange(e)}
                            //  value={startDate}
                            />
                            <input type='text'
                                className="form-control ms-2"
                                placeholder='End Date '
                                ref={ref1}
                                onFocus={() => (ref1.current.type = "date")}
                                onBlur={() => (ref1.current.type = "text")}
                                name="date"
                                style={{
                                    width: '200px',
                                }}
                                onChange={(e) => handleEndDateChange(e)}
                            //  value={endDate}
                            />

                            <Button className='MuiButton-contained mt-0 text-light ms-2' style={{
                            }}
                                onClick={(e) => handleFilterSubmit(e)}
                            >Submit</Button>
                            <Button className='MuiButton-contained mt-0 text-light ms-2' style={{
                            }}
                                onClick={() => handleResetClick()}
                            >Reset</Button>

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

                    {/* <div className=' d-flex ms-3' style={{ marginBottom: '4rem' }}>

                        <ExportToExcel
                            style={{
                                position: 'aboslute',
                                right: '9px',
                                top: '1em',
                                zIndex: 9999,
                            }}
                            className="btn text-light export"
                            apiData={csvData && csvData}
                            fileName='Transection list'
                        />
                    </div> */}
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

export default AllPackageHistory



