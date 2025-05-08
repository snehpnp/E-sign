import React, { useEffect, useState, useRef } from 'react'
import { Link as RouterLink, NavLink, useParams, useLocation } from 'react-router-dom';
import { Card, Table, Stack, Avatar, Button, Checkbox, TableRow, Alert, TableBody, TableCell, Container, Typography, Tooltip, TableContainer, TablePagination, } from '@mui/material';
import { Icon } from '@iconify/react';
// dialog Box
import DatePicker from "react-datepicker";
import Modal from 'react-bootstrap/Modal';


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
import { AdminTrasnectionHistory, GetAllVariables, AddNewVariables, Remove_Variables, Update_Variables } from '../../../services';
import AlertMessages from '../../../utils/AlertMessages';




const AllTempelates = () => {
    const location = useLocation()
    const ref = useRef();
    const ref1 = useRef();

    const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;


    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [Filterdata, setFilterData] = useState([]);
    const [fullname, setfullname] = useState('');
    const [refresh, setrefresh] = useState(false)
    const [csvData, setcsvData] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // for Add variable

    const [show1, setShow1] = useState(false);
    const [InputVariableName, setInputVariableName] = useState("");
    const [InputVariableNameErr, setInputVariableNameErr] = useState("");

    // for Update variable

    const [show, setShow] = useState(false);
    const [modalData, setModeData] = useState(false);
    const [updateVariableName, setUpdateVariableName] = useState("");
    const [updateVariableNameErr, setUpdateVariableNameErr] = useState("");


    console.log("updateVariableName", updateVariableName);

    // alert toast
    const [alertMsg, setAlertMsg] = useState(false)
    const [alertColor, setAlertColor] = useState("")
    const [textAlert, setTextAlert] = useState("")








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

    const getTransactionHistory = async () => {

        const response = await GetAllVariables(adminToken)
        console.log("response", response);
        if (response) {
            setData(response)

        }



    }





    useEffect(() => {
        getTransactionHistory();
    }, [refresh])




    //   // Delete Admin API

    const deleteItem = async (id) => {

        if (window.confirm("Do you want to delete this Client ?")) {
            const response = await Remove_Variables({ "id": id }, AdminToken)
            setrefresh(!refresh)
            if (response.message) {
                setAlertMsg(true)
                setAlertColor("success")
                setTextAlert(response.message)
            }
        }
    }


    //  Fort Update Varibles


    const ShowUpdateModel = async (data, id) => {
        setShow(true)
        setUpdateVariableName(data)
        setModeData(id)
    }


    const UpdateVariables = async (e) => {
        e.preventDefault()
        let request = {
            "id": modalData,
            "label": updateVariableName
        }


        const response = await Update_Variables(request, AdminToken)

        if (response.status) {
            setAlertMsg(true)
            setAlertColor("success")
            setrefresh(!refresh)
            setTextAlert(response.message)
            setShow(false)
        }



    }



    const columns = [
        {
            label: 'id',
            name: "id",
            width: '150px !important',
            textAlign: "center",
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {

                }
            }
        },
        {
            label: 'Label',
            name: "label",
            width: '150px !important',
            textAlign: "center"
        },
        {
            label: 'Created At',
            name: `createdAt`,
            width: '250px !important',
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
            label: 'Updated At',
            name: `updatedAt`,
            width: '250px !important',
            options: {
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <p>
                            {
                                fDateTime(tableMeta.rowData[4])
                            }
                        </p>
                    )
                }
            },
        },
        {
            label: 'status',
            name: `status`,
            width: '250px !important',
            options: {
                display: false,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {

                }
            }
        },

        {
            label: 'Actions',
            name: 'action',
            options: {
                filter: false,
                sort: false,
                width: 200,
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <>
                            {tableMeta.rowData[5] == 1 ? "" : <>

                                <Tooltip title="Edit">
                                    <Icon icon="material-symbols:edit-square-outline"
                                        color="#E43F47"
                                        className='mx-1'
                                        width="22"
                                        variant="primary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        // onClick={handleShow}
                                        onClick={() => ShowUpdateModel(tableMeta.rowData[2], tableMeta.rowData[1])}
                                    />
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <Icon icon="ant-design:delete-outlined"
                                        color="#E43F47"
                                        className='mx-1'
                                        width="22"
                                        variant="primary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        onClick={() => deleteItem(tableMeta.rowData[1])
                                        }
                                    />
                                </Tooltip>
                            </>}
                        </>)
                }
            }

        }
    ];



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



    const AddNewVariableFunc = async (e) => {
        e.preventDefault();

        if (InputVariableName == "") {
            setInputVariableNameErr("Enter A Variable Name")
            return
        }

        const data = {
            "label": InputVariableName,
        }
        const response = await AddNewVariables(data, AdminToken)
        // console.log("response", response);

        if (response.message == "success.") {
            setAlertMsg(true)
            setAlertColor("success")
            setTextAlert('Variable Add Successfully')
            setShow1(false)
            setrefresh(!refresh)


            // navigate("/admin/templetelist")
        }

    }





    return (

        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        All Variables
                    </Typography>

                </Stack>
                <Card>
                    <div className='row'>
                        <div className='my-3 d-flex ms-3'>
                            <input type='text'
                                className="form-control  ms-2"
                                placeholder='Client Name '
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



                            <button className="btn btn-primary float-end text-light export"
                                // startIcon={<Iconify icon="line-md:plus" />}
                                onClick={() => setShow1(true)}
                            >
                                Add. Variables
                            </button>

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
                    <DataTable
                        columns={columns}
                        data={data}

                    />
                </Card>


                {/* Modal For Add Variable  */}

                <Modal show={show1} onHide={() => setShow1(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Additional Variables</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" placeholder='Enter Variable Name' className='form-control'
                            onChange={(e) => { setInputVariableName(e.target.value.replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:'",.<>/?]/g, '')); setInputVariableNameErr("") }} value={InputVariableName} />
                        <p className='text-danger  fw-bold'>   {InputVariableNameErr ? InputVariableNameErr : ""} </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow1(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e) => AddNewVariableFunc(e)}>
                            Add Variable
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* Modal For Update Variables  */}

                <Modal show={show} onHide={() => setShow(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Additional Variables</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" placeholder='Enter Variable Name'
                            value={updateVariableName}

                            className='form-control' onChange={(e) => { setUpdateVariableName(e.target.value.replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:'",.<>/?]/g, '')); setUpdateVariableNameErr("") }} />
                        <p className='text-danger  fw-bold'>   {InputVariableNameErr ? InputVariableNameErr : ""} </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e) => UpdateVariables(e)}>
                            Update Variable
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
            </Container>

        </>
    )
}

export default AllTempelates

