import React, { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink, useParams, useLocation } from 'react-router-dom';
import { Stack, Button, Container, Typography } from '@mui/material';
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
import { CompanyPackageList } from '../../../services';
import AlertMessages from '../../../utils/AlertMessages';

const CompanyPackageDeatails = () => {

    const Paramsid = useParams()
    console.log("id", Paramsid);

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [dialogData, setDialogData] = useState([]);
    const [refresh, setrefresh] = useState(true)
    const [alertMsg, setAlertMsg] = useState(false)
    const [alertColor, setAlertColor] = useState("")
    const [textAlert, setTextAlert] = useState("")

    const adminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

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
        // packagewise/list
        const data = {
            "package_id": Paramsid.id
        }

        const response = await CompanyPackageList(data, adminToken)
        console.log("res", response);
        if (response) {
            setData(response);
        }
    }



    useEffect(() => {
        getTransactionHistory();

    }, [refresh]);




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
            label: '',
            name: `createdAt`,
            width: '240px !important',
            options: {
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <p>

                            {fDateTime(tableMeta.rowData[1])}
                            {/* {          console.log("date" ,tableMeta.rowData[2])} */}

                        </p>
                    )
                }
            },
        },
        // {
        //     label: 'Created Date',
        //     name: "",
        //     width: '150px !important',
        //     textAlign: "center"
        // },
        {
            label: 'Company Name',
            name: "username",
            width: '150px !important',
            textAlign: "center"
        },
        {
            label: 'Company Email',
            name: "company_email",
            width: '170px !important',
            textAlign: "center",
        },
        {
            label: 'Company Contact',
            name: "company_contact",
            width: '170px !important',
            textAlign: "center",
        },

    ];



    return (

        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Company Packages
                    </Typography>
                    <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/packages"
                        startIcon={<Iconify icon="line-md:arrow-left" />}>
                        Back
                    </Button>

                </Stack>

                <DataTable
                    columns={columns}
                    data={data}

                />

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
                                        Aadhar Verification
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

export default CompanyPackageDeatails

