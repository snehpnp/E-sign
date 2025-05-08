import React, { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, Stack, Button, Container, Typography, TextField, Switch, } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import { fDateTime } from '../../utils/formatTime';
import Iconify from '../../components/Iconify';
import AlertMessages from "../../utils/AlertMessages";
import DataTable from "../../utils/DataTable";
import Box from '@mui/material/Box';
import Dropdown from 'react-bootstrap/Dropdown';
import { getAdmins, deleteAdminById, getStatus, adminUpdate, GoToDashboardFuncTion } from '../../services';
import "../dashboard/dashboard.css"
import { CSVLink, CSVDownload } from "react-csv";
import ExportToExcel from "../../utils/ExportToExport";

import Form from 'react-bootstrap/Form';



const AdminList = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;
  const SuperAdminId = JSON.parse(localStorage.getItem('superadmin')).id;

  const [data, setData] = useState([]);
  const [dataForFilter, setDataForFilter] = useState([]);
  // console.log("dataForFilter", dataForFilter);

  const [refresh, setrefresh] = useState(true)
  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")
  const [show, setShow] = useState('');
  const [fltercomapnyname, setCompanyName] = useState('');
  const [flternactiveInactive, setActiveInactive] = useState('all');
  const [emailfilter, setEmailFilter] = useState('');

  const [fund, setFund] = useState("")
  const [rowId, setRowId] = useState("")
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({ status: 'all', company_email: '', username: '' })

  const theme = useTheme();


  // console.log("filters", filters);

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  // const handleClose = () => setShow(false);


  const handleClickOpen = (id) => {
    setRowId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const hideClose = () => {
    setAlertMsg(false)
  }

  // Get API For Get Packages Data



  const getPackages = async () => {
    const response = await getAdmins(SuperAdminToken)
    setDataForFilter(response)

    const arr = response.filter((item) => {
      // console.log("dataaaa", item.status);
      if (item.status === 1) {
        return item.status === parseInt(location.search.split('=')[1])
      }
      else {
        setData([]);
      }

      if (item.status === 0) {
        return item.status === parseInt(location.search.split('=')[1])
      }
      else {
        setData([]);
      }
      if (parseInt(location.search.split('=')[1]) === 2) {
        return new Date(item.expiry_date) < new Date()
      }
      else {
        setData([]);
      }


      // setChecked(kika)



    })

    if (location.search.split('=')[1] === "nan" || location.search === "") {
      setData(response);
    } else {
      setData(arr)
    }

    // if (location.search.split('=')[1] === "nan") {
    // }
    // else {
    //   setData(response);
    // }
    // // }
    // setData(arr)



    const csv = []
    response.map((x, index) => {

      return csv.push({
        "Id": index + 1,
        "Full_Name": x.fullname,
        "Personal_Email": x.email,
        "username": x.username,
        "company_email": x.company_email,
        "personal_contact": x.personal_contact,
        "company_contact": x.company_contact,
        "address": x.address,
        "fund": x.fund,
        "status": x.status === 1 ? "Active" : 'Inactive',
        "start_date": fDateTime(x.start_date),
        "expiry_date": fDateTime(x.expiry_date),

      })
    })
    setChecked(csv)

    // console.log("kikaa", csv);
  }



  // Admin Status API

  const adminStatus = async (e, adminid) => {
    let status = '';
    if (e) {
      status = 1;
      setrefresh(!refresh)

    } else {
      status = 0;
      setrefresh(!refresh)
    }

    const data = {
      "admin_id": adminid,
      "status": status
    }
    const response = await getStatus(SuperAdminToken, data)
  }

  useEffect(() => {
    getPackages();


  }, [refresh]);



  //   // Delete Admin API

  const deleteItem = async (id) => {
    if (window.confirm("Do you want to delete this Company ?")) {
      const response = await deleteAdminById(SuperAdminToken, id)
      setrefresh(!refresh)

      if (response.message) {
        setAlertMsg(true)
        setAlertColor("success")
        setTextAlert(response.message)
      }
    }
  }


  //  add Fund 

  // console.log("data", data);


  const updateFund = async () => {
    const data1 = {
      "add_fund": fund,
    }
    const response = await adminUpdate(data1, rowId, SuperAdminToken);
    setrefresh(!refresh)
    if (response.message) {
      setAlertMsg(true)
      setAlertColor("success")
      setTextAlert("Fund Add Successfully")
      setOpen(false);
    }
  }



  //  Reset Filter Table
  const Resetfilter = (e) => {
    e.preventDefault();
    setrefresh(!refresh)
    setActiveInactive('');
    setCompanyName('')
    setEmailFilter('')
  }





  const GoToDashboard = async (userid) => {
    // alert(userid)
    const response = await GoToDashboardFuncTion({ "id": userid })
    if (response) {
      // console.log("response", response.roles);
      if (response.roles[0] === "ROLE_ADMIN") {
        localStorage.setItem('admin', JSON.stringify(response));
        // navigate('/admin/dashboard', { replace: true });
        window.open('/#/admin/dashboard')
      }
    }
  }







  const columns = [
    // {
    //   label: 'Sr .No',
    //   name: "srno",
    //   width: '150px !important',
    //   options: {
    //     customBodyRender: (value, tableMeta, rowData, updateValue) => {
    //       return tableMeta.rowIndex + 1

    //     },
    //   }
    // },



    {
      // 1
      label: 'Sr .No',
      name: "id",
      width: '150px !important',
      options: {
        display: false,
      }
    },

    {
      // 2
      label: 'FullName',
      name: "fullname",
      // sortable: true,
      width: '150px !important',
      options: {
        display: false,

      }
    },
    {
      // 3
      label: 'Company Email',
      name: "company_email",
      sortable: true,
      width: '230px !important',
      options: {
        display: false,

      }
    },
    {
      // 4
      label: ' Contact No.',
      name: 'personal_contact',
      sortable: true,
      width: '150px !important',
      options: {
        display: false,
      }
    },
    {
      // 5
      label: 'Company Contact',
      name: "company_contact",
      sortable: true,
      width: '150px !important',
      options: {
        display: false,
      }
    },
    {
      // 6
      label: 'Domain',
      name: "company_domain",
      sortable: true,
      width: '140px !important',
      options: {
        display: false,
      }
    },

    {
      // 7
      label: 'Pan Verify',
      name: "pan",
      sortable: true,
      width: '140px !important',
      options: {
        display: false,
      }
    },
    {
      // 8
      label: 'Adhar  Verify',
      name: "adhaar",
      sortable: true,
      width: '140px !important',
      options: {
        display: false,
      }
    },
    {
      // 9
      label: 'Adhar Sign',
      name: "adhaar_sign",
      sortable: true,
      width: '140px !important',
      options: {
        display: false,
      }
    },

    {
      // 10
      label: 'Address',
      name: "address",
      sortable: true,
      width: '140px !important',
      options: {
        display: false,
      }
    },
    {
      // 11
      label: 'E Stamp',
      name: "client_stamp",
      sortable: true,
      width: '140px !important',
      options: {
        display: false,
      }
    },


    // ----------------------------------------
    {
      // 12
      label: 'Create At (Date & Time)',
      name: `createdAt`,
      width: '150px !important',
      options: {
        customBodyRender: (value, tableMeta, rowData, updateValue) => {
          return (
            <p>
              {fDateTime(tableMeta.rowData[12])}
              {/* {  console.log("dddd" ,tableMeta.rowData[1] )} */}
            </p>
          )
        }
      },
    },
    {
      // 13
      label: 'Company  Name',
      name: "username",
      // sortable: true,
      width: '140px !important',
    },

    {
      // 14
      label: 'Email',
      name: "email",
      // sortable: true,
      width: '100px !important',
    },
    {
      // 15
      label: 'Available Balance',
      name: "fund",
      // sortable: true,
      width: '140px !important',
    },
    {
      // 16
      label: 'Package ID',
      name: "package_id",
      width: '150px !important',
      options: {
        display: false,
      }
    },

    {
      // 17
      label: 'Status',
      name: "status",
      // sortable: true,
      className: 'action-data',
      width: '300px !important',
      options: {
        customBodyRender: (value, tableMeta, rowData, updateValue) => {
          return (
            <>
              <FormGroup>
                <FormControlLabel control={<Switch checked={tableMeta.rowData[17] === 1 ? 1 : 0} onChange={(e) => adminStatus(e.target.checked, tableMeta.rowData[1])} />} />
                {/* {console.log("tableMeta", tableMeta.rowData)} */}

              </FormGroup>

            </>
          )
        }
      }
    },
    {
      // 18
      label: 'Actions',
      name: 'action',
      options: {
        filter: false,
        width: '280px',
        customBodyRender: (value, tableMeta, rowData, updateValue) => {
          return (
            <>

              <Tooltip title="Go To Dashboard">
                <Icon icon="mdi:social-distance-2-meters"
                  color="#E43F47"
                  // className='mx-2'
                  width="22"
                  variant="primary"
                  data-toggle="tooltip"
                  data-placement="top"
                  onClick={() => GoToDashboard(tableMeta.rowData[1])}
                />
              </Tooltip>
              <NavLink
                to={`/superadmin/transactionhistory/${tableMeta.rowData[1]} `}
                state={tableMeta.rowData}

              >
                <Tooltip title="Transaction History">
                  <Icon icon="icon-park-outline:transaction-order"
                    color="#A8006D"
                    className=''
                    width="22"
                    variant="primary"
                    data-toggle="tooltip"
                    data-placement="top"
                  />
                </Tooltip>
              </NavLink>

              <NavLink
                to={`/superadmin/viewdetails/${tableMeta.rowData[1]} `}
                state={tableMeta.rowData}
              >
                <Tooltip title="View Details">
                  <Icon icon="clarity:grid-view-line"
                    color="#E43F47"
                    className=''
                    width="22"
                    variant="primary"
                    data-toggle="tooltip"
                    data-placement="top"
                  />
                </Tooltip>
              </NavLink>

              <Tooltip title="Add Funds">
                <Icon icon="bx:money-withdraw"
                  color="#FF822F"
                  className=''
                  width="22"
                  variant="primary"
                  data-toggle="tooltip"
                  data-placement="top"
                  cursor="pointer"
                  onClick={() => handleClickOpen(tableMeta.rowData[1])}
                />
              </Tooltip>


              <NavLink
                to={`/superadmin/editadmin/${tableMeta.rowData[1]} `}
                state={tableMeta.rowData}
              >
                <Tooltip title="Edit">
                  <Icon icon="akar-icons:edit"
                    color="#6BAA2C"
                    className=''
                    width="22"
                    variant="primary"
                    data-toggle="tooltip"
                    data-placement="top"
                  />
                </Tooltip>
              </NavLink>

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
          )
        }
      }
    }
  ]



  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  }

  // const abc = () => {
  //   const filteredData = data.filter(item => {
  //     return item.username.includes(fltercomapnyname)
  //   }).filter(x => {
  //     return x.email.includes(emailfilter)
  //   }).filter(y => {
  //     return (parseInt(y.status)) == (parseInt(flternactiveInactive))
  //   })

  //   console.log("filteredData", filteredData)
  //   setData(filteredData)
  // }


  const abc = (status) => {

    const filteredData = dataForFilter.filter(item => {
      return item.username.toString().toLowerCase().includes(fltercomapnyname.toString().toLowerCase())
    }).filter(x => {
      return x.email.toString().toLowerCase().includes(emailfilter.toString().toLowerCase())
    }).filter(y => {
      if(flternactiveInactive !== "all"){
        return y.status == flternactiveInactive && y.parent_admin_id === 1
      }else if (flternactiveInactive == "all" || ""){ 
        return y   
  }})
  setData(filteredData)

  }


  useEffect(() => {
    abc()
  }, [filters])






  return (

    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Company List
        </Typography>



        <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/addadmin" startIcon={<Iconify icon="line-md:plus" />}>
          Add Company
        </Button>
      </Stack>



      <Card>
        <div>


          <div className='my-3 d-flex ms-3'>


            <input type='text'
              className="form-control ms-2"
              name="username"
              placeholder='Company Name '
              style={{
                // left: '1.6rem',
                // position: 'absolute',
                // top: '1rem',
                width: '200px',
                // background: 'gray',

                zIndex: 10,

              }}
              onChange={(e) => { handleFilterChange(e); setCompanyName(e.target.value) }}
              value={fltercomapnyname}
            />

            <input type='text'
              className="form-control ms-2"
              name="company_email"
              placeholder='Email'
              style={{
                width: '200px',
                zIndex: 10,

              }}
              onChange={(e) => { setEmailFilter(e.target.value); handleFilterChange(e); }}
              value={emailfilter}
            />



            <select aria-label="Default select example" style={{
              // left: '27.7em'
            }} className='filter-dropdown ms-2' name="status" onChange={(e) => { handleFilterChange(e);  setActiveInactive(e.target.value) }} value={flternactiveInactive}>
              <option value="all" >All</option>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
           <Button className='MuiButton-contained mt-0 text-light ms-2' style={{
              // left: '41.6rem',
              // top: '-2.6rem',
              // zIndex: 999,
            }} onClick={(e) => Resetfilter(e)}>Reset</Button>


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
          options={
            {
              download: false,
              filter: false,

            }
          }

        />

      </Card>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="addfund"
        >
          <DialogTitle id="alert-dialog-title">
            Add Fund To Comapny
          </DialogTitle>
          <DialogContent>
            <Form.Group as={Col} controlId="formGridPersonalContact">
              <TextField style={{ width: 400 }} label="Add Fund" type='number' color="secondary" onChange={(e) => setFund(e.target.value.replace(/\+|-/gi, ""))} value={fund} />
            </Form.Group>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => updateFund()}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>


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

export default AdminList


