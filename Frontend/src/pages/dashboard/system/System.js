// /* eslint no-var: 0 */
// import React, { useEffect, useState } from 'react'
// import * as Yup from 'yup';
// import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
// import { Card, Stack, Button, Container, Typography, } from '@mui/material';
// import { Modal } from 'react-bootstrap';
// import { useFormik, FormikProvider } from 'formik';
// import { Icon } from '@iconify/react';
// import Tooltip from '@mui/material/Tooltip';
// import * as Common from '../../../utils/CommonMessage';
// // Common DATA Table
// import DataTable from '../../../utils/DataTable'
// import Iconify from '../../../components/Iconify';
// import Page from '../../../components/Page';
// import { getSystemDetails } from '../../../services'

// const System = () => {

//   const [data, setData] = useState([]);
//   const [refresh, setrefresh] = useState(true)
//   const [alertMsg, setAlertMsg] = useState(false)
//   const [alertColor, setAlertColor] = useState("")
//   const [textAlert, setTextAlert] = useState("")
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const { id } = useParams()
//   const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
//   const AdminId = JSON.parse(localStorage.getItem('admin')).id;

//   // console.log("SuperAdminToken",SuperAdminToken)

//   // Form Validation

//   const registerForm = Yup.object().shape({
//     company_name: Yup.string().required(Common.COMPANY_NAME),
//     comapny_sort_name: Yup.string().required(Common.FULL_NAME),
//     company_logo: Yup.string().required(Common.COMPANY_DOMAIN),
//     company_favicon: Yup.string().email(Common.EMAIL_VALIDATION).required(Common.EMAIL_REQUIRE),
//     company_email: Yup.string().email(Common.EMAIL_VALIDATION).required(Common.COMPANY_EMAIL),
//     company_cc: Yup.string().max(10).required(Common.PERSONAL_CONTACT),
//     company_bcc: Yup.string().max(10).required(Common.COMPANY_CONTACT),
//     email_password: Yup.string().required(Common.SELECT_PACKAGES),
//     smtp_host: Yup.string().required(Common.ADDRESS),
//     smtp_port: Yup.string().required(Common.ADDRESS)
//   });

//   const formik = useFormik({
//     initialValues: {
//       company_name: '',
//       comapny_sort_name: '',
//       company_logo: '',
//       company_favicon: '',
//       company_email: '',
//       company_cc: '',
//       company_bcc: '',
//       email_password: '',
//       smtp_host: '',
//       smtp_port: ''
//     },
//     validationSchema: registerForm,
//   })



//   const columns = [
//     {
//       name: 'Company Name',
//       selector: row => row.company_name,
//       sortable: true,
//       width: '150px !important',
//     },
//     {
//       name: 'Company Short Name',
//       selector: row => row.comapny_sort_name,
//       sortable: true,
//       width: '180px !important',
//     },
//     {
//       name: 'Image',
//       selector: row => row.company_logo,
//       sortable: true,
//       width: '100px !important',
//     },
//     {
//       name: 'Favicon',
//       selector: row => row.company_favicon,
//       sortable: true,
//       width: '100px !important',
//     },
//     {
//       name: 'Email',
//       selector: row => row.company_email,
//       sortable: true,
//       width: '180px !important',
//     },
//     {
//       name: 'CC Mail',
//       selector: row => row.company_cc,
//       sortable: true,
//       width: '150px !important',
//     },
//     {
//       name: 'BCC Mail',
//       selector: row => row.company_bcc,
//       sortable: true,
//       width: '150px !important',
//     },
//     {
//       name: 'Password',
//       selector: row => row.email_password,
//       sortable: true,
//       width: '150px !important',
//     },
//     {
//       name: 'SMTP Host',
//       selector: row => row.smtp_host,
//       sortable: true,
//       width: '150px !important',
//     },
//     {
//       name: 'SMTP Port',
//       selector: row => row.smtp_port,
//       sortable: true,
//       width: '150px !important',
//     },
//     {
//       name: "Actions",
//       width: '100px !important',
//       selector: (row) => (
//         <>
//           {/* {console.log("data",row)} */}
//           <NavLink
//             to={""}
//             state={row}
//           >
//             <Tooltip title="Edit">
//               <Icon icon="akar-icons:edit"
//                 color="#6BAA2C"
//                 className='mx-2'
//                 width="22"
//                 variant="primary"
//                 data-toggle="tooltip"
//                 data-placement="top"
//                 title="Edit Client"
//               // onClick={handleShow}
//               />
//             </Tooltip>
//           </NavLink>
//         </>
//       ),
//     },
//   ];

//   const data1 = []
//   const getSystem = async () => {
//     const response = await getSystemDetails(AdminToken, AdminId)
//     if (response) {
//       response.forEach((item) => {
//         // console.log("respo", response)
//         data1.push({
//           id: item.id,
//           company_name: item.company_name,
//           comapny_sort_name: item.comapny_sort_name,
//           company_logo: item.company_logo,
//           company_favicon: item.company_favicon,
//           company_email: item.company_email,
//           company_cc: item.company_cc,
//           company_bcc: item.company_bcc,
//           email_password: item.email_password,
//           smtp_host: item.smtp_host,
//           smtp_port: item.smtp_port,
//         })
//         setData(data1);
//       })
//     }
//   }

//   useEffect(() => {
//     getSystem();
//   }, []);


//   return (
//     <>
//       {/* <Alert severity="success" className={alertMsg ? "d-block": "d-none"}>{alertMsg}</Alert> */}
//       <Page title="User">
//         <Container>
//           <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//             <Typography variant="h4" gutterBottom>
//               System
//             </Typography>
//             {/* <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/admin/system" startIcon={<Iconify icon="line-md:plus" />}>
//               System Update
//             </Button> */}
//           </Stack>
//           <Card>
//             <DataTable columns={columns} data={data} />
//           </Card>
//         </Container>
//       </Page>
//     </>

//   )
// }

// export default System




import React, { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
import { Card, Stack, Button, Container, Typography, TextField, Switch, } from '@mui/material';
import { Icon } from '@iconify/react';
import Avatar from '@mui/material/Avatar';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
// import MUIDataTable from 'mui-datatables';
import Tooltip from '@mui/material/Tooltip';
import { fDateTime } from '../../../utils/formatTime';
import AlertMessages from "../../../utils/AlertMessages";
import DataTable from "../../../utils/DataTable";
import { getSystemDetails } from '../../../services'




const System = () => {

  const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
  const AdminID = JSON.parse(localStorage.getItem('admin')).id;

  const [data, setData] = useState([]);

  const [refresh, setrefresh] = useState(true)
  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")
  const [show, setShow] = useState('');


  const [fund, setFund] = useState("")
  const [rowId, setRowId] = useState("")
  // const [checked, setChecked] = useState(false);
  const [checked, setChecked] = useState(false);


  const handleClose = () => setShow(false);

  const hideClose = () => {
    setAlertMsg(false)
  }

  // Get API For Get Packages Data
  const getPackages = async () => {

    // const data = {
    //   "adminid": AdminID
    // }

    const response = await getSystemDetails(AdminToken, AdminID)
    if (response) {
      console.log("respo", response);
      setData(response);
      setChecked(response[0].company_logo)
    }
  }


  // const changeFavicon = () => {
  //   let icon = document.getElementById('favicon').href
  //   // console.log("changeFavicon" ,icon);
  //   icon = `/image/${checked}`


  // }


  useEffect(() => {
    getPackages();
    // changeFavicon();


  }, [refresh]);








  const columns = [
    
    // {
    //   label: 'Company Name',
    //   name: 'company_name',
    //   sortable: true,
    //   width: '150px !important',
    // },
    // {
    //   label: 'Company Short Name',
    //   name: 'comapny_sort_name',
    //   sortable: true,
    //   width: '180px !important',
    // },
    // {
    //   label: 'Image',
    //   name: 'company_logo',
    //   sortable: true,
    //   width: '100px !important',
    //   options: {
    //     filter: false,
    //     sort: false,
    //     width: 200,
    //     customBodyRender: (value, tableMeta, rowData, updateValue) => {
    //       return (
    //         <>
    //           {/* <img src={"/companylogo/e_sign-Screenshot.png"} height={50} width={50} alt="profile"  className='d-flex justify-content-center' /> */}

    //           <img src={`/companylogo/e_sign-${tableMeta.rowData[3]}`} height={50} width={50} alt="profile" className='d-flex justify-content-center' />
    //         </>
    //       )
    //     }
    //   }
    // },
    // {
    //   label: 'Favicon',
    //   name: 'company_favicon',
    //   sortable: true,
    //   width: '100px !important',
    // },
    {
      label: 'Email',
      name: 'company_email',
      sortable: true,
      width: '180px !important',
    },
    {
      label: 'CC Mail',
      name: 'company_cc',
      sortable: true,
      width: '150px !important',
    },
    {
      label: 'BCC Mail',
      name: 'company_bcc',
      sortable: true,
      width: '150px !important',
    },
    {
      label: 'Password',
      name: 'email_password',
      sortable: true,
      width: '150px !important',
    },
    {
      label: 'SMTP Host',
      name: 'smtp_host',
      sortable: true,
      width: '150px !important',
    },
    {
      label: 'SMTP Port',
      name: 'smtp_port',
      sortable: true,
      width: '150px !important',
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
              {/* {console.log("rowData" ,tableMeta.rowData)} */}
              <NavLink
                to={`/admin/systemupdate`}
                state={tableMeta.rowData}
              >
                <Tooltip title="View Details">
                  <Icon icon="clarity:grid-view-line"
                    color="#6BAA2C"
                    className='mx-2'
                    width="22"
                    variant="primary"
                    data-toggle="tooltip"
                    data-placement="top"
                  />
                </Tooltip>
              </NavLink>
            </>)
        }
      }
    }
  ];


  return (
    < Container >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Company System
        </Typography>

      </Stack>
      <DataTable
        columns={columns}
        data={data}
      />




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

export default System

