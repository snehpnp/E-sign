import React, { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { Card, Table, Stack, Avatar, Button, Container, Typography, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';
// dialog Box

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ExportToExcel from "../../../utils/ExportToExport";


import DataTable from "../../../utils/DataTable";
import Iconify from '../../../components/Iconify';
import { getAllPackages, deletePackage, editPackage } from '../../../services';
import AlertMessages from '../../../utils/AlertMessages';

const Packages = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [dialogData, setDialogData] = useState([]);
  // const [dialogData, setDialogData] = useState("");
  const [refresh, setrefresh] = useState(true)
  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")
  const [csvData, setcsvData] = useState('');


  const SuperAdminId = JSON.parse(localStorage.getItem('superadmin')).id;
  const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

  // dialogbox

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  console.log("dialogData", dialogData);

  const handleClickOpen = async (data) => {
    setOpen(true);
    setDialogData(data)
  }



  const handleClose = () => {
    setOpen(false);
  };

  // dialogbox

  const hideClose = () => {
    setAlertMsg(false)
  }


  const getPackagess = async () => {
    const response = await getAllPackages(SuperAdminToken)
    // console.log("response", response.currently_assigne);
    if (response) {
      setData(response);
      // setNoDelate(response.currently_assigne);
    }


    const csv = []
    response.map((x, index) => {
      console.log("x", x);
      return csv.push({
        "Id": index + 1,
        "name": x.name,
        "price": x.price,
        "Package-validity": `${x.package_validity} ${x.package_day_month}`,
        "aadhaar-verify": x.adhar_verify_price,
        "pan-verify-price": x.pan_verify_price,
        "aadhaar-sign-price": x.adhar_sign_price,
        "package-details": x.package_details,

     
      })
    })
    setcsvData(csv)

  }



  const deleteItem = async (id) => {

    if (window.confirm("Do you want to delete this Package ?")) {
      const response = await deletePackage(id, SuperAdminToken)
      setrefresh(!refresh)

      if (response.message) {
        setAlertMsg(true)
        setAlertColor("success")
        setTextAlert(response.message)
      }
    }

  }


  useEffect(() => {
    getPackagess();

  }, [refresh]);




  const columns = [
    {
      label: 'Sr .No',
      name: "id",
      width: '150px !important',
      options: {
        display: false,
      }
    },

    {
      label: 'Name',
      name: "name",
      width: '150px !important',
    },
    {
      label: 'Recharge Limit',
      name: "price",
      width: '150px !important',
      textAlign: "center"
    },
    {
      label: 'Package Validity',
      name: "package_validity",
      width: '170px !important',
      textAlign: "center",
      options: {
        filter: false,
        sort: false,
        width: 200,
        customBodyRender: (value, tableMeta, rowData, updateValue) => {
          return (
            <>
              {value} {tableMeta.rowData[5]}
            </>
          )
        }
      },
    },
    {
      label: 'Package D/M/Y',
      name: "package_day_month",
      width: '160px !important',
      options: {
        display: false,
      }
    },
    {
      label: 'Aadhar Sign Price',
      name: "adhar_sign_price",
      width: '180px !important',
      options: {
        display: false,
      }
    },
    {
      label: 'Aadhar verify price',
      name: "adhar_verify_price",
      width: '190px !important',
      options: {
        display: false,
      }
    },
    {
      label: 'PAN Verify Price',
      name: "pan_verify_price",
      width: '370px !important',
      options: {
        display: false,
      }
    },
    {
      label: 'Package Details',
      name: "package_details",
      width: '160px !important',
    },

    {
      label: 'Package Details',
      name: "currently_assigne",
      width: '160px !important',
      options: {
        display: false
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
              {console.log("id", tableMeta.rowData)}
              <div className='d-flex'>

                <NavLink to={`/superadmin/companypackage/${tableMeta.rowData[1]}`} state={tableMeta.rowData}>
                  <Tooltip title="Company Package List" className='mx-2' onClick={() => console.log(tableMeta.rowIndex + 1)}>
                    <Icon icon="icon-park-outline:transaction-order" height="25" />
                  </Tooltip>
                </NavLink>
                <Tooltip title="View Details" >
                  <Icon icon="akar-icons:eye" height="25" onClick={() => handleClickOpen(tableMeta.rowData)} />
                </Tooltip>
                <NavLink to={`/superadmin/editpackages/${tableMeta.rowData[1]}`} state={tableMeta.rowData}>
                  <Tooltip title="Edit" className='mx-2' onClick={() => console.log(tableMeta.rowIndex + 1)}>
                    <Icon icon="ant-design:edit-filled" height="25" />
                  </Tooltip>
                </NavLink>
                <Tooltip title="Delete" className={tableMeta.rowData[10] === 1 ? "d-none" : "d-block"}>
                  <Icon icon="ant-design:delete-filled" height="25" onClick={() => deleteItem(tableMeta.rowData[1])} />
                </Tooltip>
              </div>
            </>
          );
        }
      }
    },




  ];



  return (

    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Packages
          </Typography>
          <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/addpackages" startIcon={<Iconify icon="line-md:plus" />}>
            Add Package
          </Button>

        </Stack>

        <Card>
          {/* <div> */}


          <div className=' d-flex ms-3' style={{ marginBottom: ' 4rem' }}>

            <ExportToExcel
              style={{
                position: 'relative !important',
                right: '9px',
                top: '1em',
                zIndex: 9999,
              }}
              className="btn text-light export"
              apiData={csvData && csvData}
              fileName='Company List'
            />
            {/* </div> */}
          </div>
          <DataTable
            columns={columns}
            data={data}

          />
        </Card>

        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          maxWidth='xl'
        >

          <DialogContent>
            <DialogContentText>
              <h4 className="text-center" style={{ color: "#212B36 ", fontWeight: "bolder", fontSize: "36px" }}>
                Package Details
              </h4>
              <div className="w-100 row mb-4 mt-5 mx-auto">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Package Name</th>
                      <th>Recharge</th>
                      <th>Package Validity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{dialogData[2]} </td>
                      <td>{dialogData[3]} </td>
                      <td>{dialogData[4]} {dialogData[5]} </td>
                    </tr>

                  </tbody>
                </table>
                {/* <div className="col-md-4">
                  <Typography variant="h6" gutterBottom>
                    Package Name
                  </Typography>
                  <p>{dialogData[2]} </p>
                </div>
                <div className="col-md-4">
                  <Typography variant="h6" gutterBottom>
                    Recharge 
                  </Typography>
                  <p>{dialogData[3]} </p>
                </div>
                {/* <div className="col-md-4">
                    <Typography variant="h6" gutterBottom>
                   Package Days/Month/year
                    </Typography>
                    <p>hello</p>
                  </div> */}
                {/* <div className="col-md-3">
                  <Typography variant="h6" gutterBottom>
                    Package Validity
                  </Typography>
                  <p>{dialogData[4]} {dialogData[5]} </p>
                </div> */}
              </div>
              <h4 className="text-center" style={{ color: "#212B36", fontWeight: "bolder", fontSize: "36px" }}>
                Price
              </h4>
              <div className="row mb-3 mt-4">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Aadhaar E-Sign </th>
                      <th> Aadhaar  verification</th>
                      <th> Pan Verification</th>
                      <th> Package Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{dialogData[6]} </td>
                      <td>{dialogData[7]} </td>
                      <td>{dialogData[8]}</td>
                      <td> {dialogData[9]} </td>
                    </tr>

                  </tbody>
                </table>
              </div>
              {/*   <div className="row mb-3 mt-4">
                <div className="col-4">
                  <Typography variant="h6" gutterBottom>
                    Aadhaar Verification
                  </Typography>
                  <p>{dialogData[6] } </p>
                </div>
                <div className="col-4">
                  <Typography variant="h6" gutterBottom>
                    Pan verification
                  </Typography>
                  <p>{dialogData[7] } </p>
                </div>
                <div className="col-4">
                  <Typography variant="h6" gutterBottom>
                    E-sign
                  </Typography>
                  <p>{dialogData[8] } </p>
                </div>
                <div className="col-md-3">
                  <Typography variant="h6" gutterBottom>
                    Package Details
                  </Typography>
                  <p>{dialogData[9] }</p>
                </div>
                </div> */}

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

export default Packages



