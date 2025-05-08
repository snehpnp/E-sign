// import React, { useEffect, useState } from 'react'
// import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
// import { Card, Stack, Button, Container, Typography ,Avatar } from '@muAvatari/material';
// import { Icon } from '@iconify/react';
// // Common DATA Table
// import DataTable from '../../../utils/DataTable'
// import Iconify from '../../../components/Iconify';
// import Page from '../../../components/Page';
// import Pricing from '../../web-landing-page/Pricing';
// import AlertMessages from '../../../utils/AlertMessages';
// // API Function
// import { ActiveCompanyList  } from '../../../services';

// function ActiveCompany() {
//   const [data, setData] = useState([]);
//   const [refresh, setrefresh] = useState(true)
//   const [alertMsg, setAlertMsg] = useState(false)
//   const [alertColor, setAlertColor] = useState("")
//   const [textAlert, setTextAlert] = useState("")


//   const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

//   const SuperAdminId = JSON.parse(localStorage.getItem('superadmin')).id;

// //   fullname
// //   
// //   company_domain
// //   
// //   
// //   
// //   
// //   
// //   
// //   
// //   
// //   
// //   
// //   email

//   const columns = [
//     {
//       name: 'Name',
//       selector: row => row.fullname,
//       sortable: true,
//       width: '200px !important',
//     },
//     {
//       name: 'Username',
//       selector: row => row.username,
//       sortable: true,
//       width: '200px !important',
//     },
//     {
//       name: 'Company Email',
//       selector: row => row.company_email,
//       sortable: true,
//       width: '200px !important',
//     },
//     // {
//     //   name: 'Company Domain',
//     //   selector: row => row.company_domain,
//     //   sortable: true,
//     //   width: '200px !important',
//     // },

//     // {
//     //   name: 'Personal Contact',
//     //   selector: row => row.personal_contact,
//     //   sortable: true,
//     //   width: '200px !important',
//     // },

//     {
//       name: 'Company Contact',
//       selector: row => row.company_contact,
//       sortable: true,
//       width: '200px !important',
//     },
//     // {
//     //   name: 'Address',
//     //   selector: row => row.address,
//     //   sortable: true,
//     //   width: '200px !important',
//     // },
//     // {
//     //   name: 'package id',
//     //   selector: row => row.package_id,
//     //   sortable: true,
//     //   width: '100px !important',
//     // },
//     {
//         name: 'Fund',
//         selector: row => row.fund,
//         sortable: true,
//         width: '100px !important',
//     },
//     // {
//     //   name: 'Adhaar',
//     //   selector: row => row.adhaar,
//     //   sortable: true,
//     //   width: '100px !important',
//     // },
//     // {
//     //   name: 'pan',
//     //   selector: row => row.pan,
//     //   sortable: true,
//     //   width: '100px !important',
//     // },

//     // {
//     //   name: 'Adhaar Sign',
//     //   selector: row => row.adhaar_sign,
//     //   sortable: true,
//     //   width: '100px !important',
//     // },

//     // {
//     //   name: 'Client Stamp',
//     //   selector: row => row.client_stamp,
//     //   sortable: true,
//     //   width: '100px !important',
//     // },

//     {
//       name: "ACTIONS",
//       width: '100px !important',
//       selector: (row) => (
//         <>
//           {/* {console.log("data",row)} */}
//           {/* <NavLink
//             to={`/superadmin/editpackages/${row.id}`}
//             state={row}
//           >
//             <Icon icon="ant-design:edit-filled"
//               className='mx-2'
//               width="22"
//               variant="primary"
//               data-toggle="tooltip"
//               data-placement="top"
//               title="Edit"
//             />
//           </NavLink> */}

//           {/* <Icon icon="ic:baseline-delete"
//             width="22"
//             data-toggle="tooltip"
//             data-placement="top"
//             title="Delete"
//             onClick={() => deleteItem(row.id)}
//           /> */}
//         </>
//       ),
//     },
//   ];


//   // Get API For Get Packages Data

//   const getPackages = async () => {

//     const data ={
//         "superadminid":1
//       }
//     const response = await ActiveCompanyList( data , SuperAdminToken)
//     if (response) {
//        console.log("respo",response);
//       setData(response);
//     }
//   }



// //   const deleteItem = async (id) => {
// //     if (window.confirm("Do you want to delete this Client ?")) {
// //     //   const response = await deletePackage(id, SuperAdminToken)
// //       setrefresh(!refresh)

// //       if (response.message) {
// //         setAlertMsg(true)
// //         setAlertColor("success")
// //         setTextAlert(response.message)
// //       }
// //     }

// //   }

//   useEffect(() => {
//     getPackages();
//   }, [refresh]);

//   const hideClose = () => {
//     setAlertMsg(false)
//   }


//   return (
//     <>
//       <Page title="ActiveCompany">
//         <Container>
//           <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//             <Typography variant="h4" gutterBottom>
//             Active Company
//             </Typography>
//             {/* <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/addpackages" startIcon={<Iconify icon="line-md:plus" />}>
//               Add Package
//             </Button> */}
//           </Stack>
//           <Card>
//             <DataTable columns={columns} data={data} />
//           </Card>
//         </Container>
//       </Page>
//       {alertMsg &&
//         <AlertMessages
//           hideAlert={hideClose}
//           showAlert={alertMsg}
//           message={textAlert}
//           alertColor={alertColor}
//         />
//       }
//     </>
//   )
// }

// export default ActiveCompany


// import React, { useEffect, useState } from 'react'
// import MUIDataTable from "mui-datatables";
// import { Icon } from '@iconify/react';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import { Card, Stack, Button, Container, Typography, TextField } from '@mui/material';


// import { ActiveCompanyList } from '../../../services';

// const ActiveCompany = () => {

//   const [data, setData] = useState([]);
//   const [id, setId] = useState([]);


//   const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;
//   const SuperAdminId = JSON.parse(localStorage.getItem('superadmin')).id;

//   // Get API For Get Packages Data

//   const getPackages = async () => {

//     const data1 = {
//       "superadminid": 1
//     }
//     const response = await ActiveCompanyList(data1, SuperAdminToken)
//     if (response) {
//       // console.log("respo", response);
//       setData(response);
//     }
//   }

//   const a = () => {
//     data.map((a, id) => 
//     columns.push(id)
//     // setId(id)
// )
//     console.log("id", id);


//   }

//   useEffect(() => {
//     getPackages();
//     a()
//   }, [id]);

//   // const columns = [
//   //  {
//   //   name: "name",
//   //   label: "Name",
//   //   options: {
//   //    filter: true,
//   //    sort: true,
//   //   }
//   //  },
//   //  {
//   //   name: "company",
//   //   label: "Company",
//   //   options: {
//   //    filter: true,
//   //    sort: false,
//   //   }
//   //  },
//   //  {
//   //   name: "city",
//   //   label: "City",
//   //   options: {
//   //    filter: true,
//   //    sort: false,
//   //   }
//   //  },
//   //  {
//   //   name: "state",
//   //   label: "State",
//   //   options: {
//   //    filter: true,
//   //    sort: false,
//   //   }
//   //  },
//   // ];




//   const columns = [
//     {
//       label: 'Sr. No',
//       name: `${id}`,
//       // sortable: true,
//       width: '200px !important',
//     },
//     {
//       label: 'Name',
//       name: 'fullname',
//       // sortable: true,
//       width: '200px !important',
//     },
//     {
//       label: 'Username',
//       name: "username",
//       // sortable: true,
//       width: '200px !important',
//     },
//     {
//       label: 'Company Email',
//       name: "company_email",
//       // sortable: true,
//       width: '200px !important',
//     },
//     // {
//     //   name: 'Company Domain',
//     //   selector: row => row.company_domain,
//     //   sortable: true,
//     //   width: '200px !important',
//     // },

//     // {
//     //   name: 'Personal Contact',
//     //   selector: row => row.personal_contact,
//     //   sortable: true,
//     //   width: '200px !important',
//     // },

//     {
//       label: 'Company Contact',
//       name: "company_contact",
//       // sortable: true,
//       width: '200px !important',
//     },
//     // {
//     //   name: 'Address',
//     //   selector: row => row.address,
//     //   sortable: true,
//     //   width: '200px !important',
//     // },
//     // {
//     //   name: 'package id',
//     //   selector: row => row.package_id,
//     //   sortable: true,
//     //   width: '100px !important',
//     // },
//     {
//       label: 'Fund',
//       name: "fund",
//       // sortable: true,
//       width: '100px !important',
//     },
//     {
//       name: "Delete",
//       options: {
//         filter: false,
//         sort: false,
//         empty: true,
//         customBodyRenderLite: dataIndex => {
//           return (
//             <button
//               onClick={() => {
//                 // const { data } = this.state;
//                 // data.shift();
//                 // this.setState({ data });
//               }}
//             >
//               Delete
//             </button>
//           );
//         }
//       }
//     },
//     {
//       name: "Edit",
//       options: {
//         filter: false,
//         sort: false,
//         empty: true,
//         customBodyRenderLite: (dataIndex, rowIndex) => {
//           return (
//             <button
//               onClick={() =>
//                 window.alert(
//                   `Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`
//                 )
//               }
//             >
//               Edit
//             </button>
//           );
//         }
//       }
//     },
//     {
//       name: "Action",
//       options: {
//         filter: false,
//         customBodyRender: (value, tableMeta, updateValue) => (
//           <div>
//             {/* {console.log("tableMeta ", tableMeta)} */}

//             {/* <NavLink to={"client/edit/"} className="btn btn-primary">
//               Edit
//             </NavLink> */}
//             <button onClick={() => console.log("row data", tableMeta.rowIndex)} className="btn btn-primary">
//               Edit
//             </button>
//           </div>


//           // <Tooltip title="Delete">
//           //   <IconButton>
//           //     <DeleteIcon />
//           //   </IconButton>
//           // </Tooltip>
//         )
//       },
//       customBodyRender: (value, tableMeta, updateValue) => (
//         <button onClick={() => console.log(tableMeta)}> s</button>
//       )

//     },




//     // {
//     //   name: 'Adhaar',
//     //   selector: row => row.adhaar,
//     //   sortable: true,
//     //   width: '100px !important',
//     // },
//     // {
//     //   name: 'pan',
//     //   selector: row => row.pan,
//     //   sortable: true,
//     //   width: '100px !important',
//     // },

//     // {
//     //   name: 'Adhaar Sign',
//     //   selector: row => row.adhaar_sign,
//     //   sortable: true,
//     //   width: '100px !important',
//     // },

//     // {
//     //   name: 'Client Stamp',
//     //   selector: row => row.client_stamp,
//     //   sortable: true,
//     //   width: '100px !important',
//     // },

//   ]
//   // const data = [
//   //  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
//   //  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
//   //  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
//   //  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
//   // ];

//   // const options = {
//   //   filterType: 'checkbox',
//   //   // confirmFilters:"fa"
//   //   confirmFilters: true, 
//   // };


//   // columns.push({
//   //   label: 'Sr. No',
//   //   name: `${id}` ,
//   //   // sortable: true,
//   //   width: '200px !important',
//   // })
//   const options = {
//     filterType: "dropdown",
//     responsive: "stacked",
//     filter: false,
//     download: true,
//     print: false,
//     focusable: true,
//     fixedHeader: true,
//     selectableRows: 'none',
//     // selectableRowsOnClick: true,
//     displayRowCheckbox: false,
//     // onRowClick:this.getRow,


//   }




//   return (
//     <Card>
//     <MUIDataTable
//       data={data}
//       columns={columns}
//       options={options}
//       filterArrayFullMatch='true'
//       />
//       </Card>
//   )
// }

// export default ActiveCompany



import React, { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
import { Stack, Button, Card, Container, Typography, Tooltip, } from '@mui/material';

import ExportToExcel from "../../../utils/ExportToExport";
import { fDateTime } from '../../../utils/formatTime';
import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../../components/Iconify';
import DataTable from "../../../utils/DataTable";
import AlertMessages from "../../../utils/AlertMessages";

import { ActiveCompanyList } from '../../../services';



const ActiveCompany = () => {

  const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;
  const SuperAdminId = JSON.parse(localStorage.getItem('superadmin')).id;
  const [csvdata, setCSVdata] = useState([]);

  const [data, setData] = useState([]);


  // Get API For Get Packages Data
  const getPackages = async () => {

    const data1 = {
      "superadminid": SuperAdminId
    }


    const response = await ActiveCompanyList(data1, SuperAdminToken)
    if (response) {
      // console.log("respo", response);
      setData(response);
    }


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
        // "status": x.status === 1 ? "Active" : 'Inactive',
        "start_date": fDateTime(x.start_date),
        "expiry_date": fDateTime(x.expiry_date),

      })
    })
    setCSVdata(csv)
  }


  useEffect(() => {
    getPackages();
    // a()

  }, []);

  const columns = [
    {
      label: 'Name',
      name: 'fullname',
      // sortable: true,
      width: '200px !important',
    },
    {
      label: 'Company Name',
      name: "username",
      // sortable: true,
      width: '200px !important',
    },
    {
      label: 'Company Email',
      name: "company_email",
      // sortable: true,
      width: '200px !important',
    },
    {
      label: 'Company Contact',
      name: "company_contact",
      // sortable: true,
      width: '200px !important',
    },
    {
      label: 'Company Domain',
      name: "company_domain",
      // sortable: true,
      width: '200px !important',
    },
    {
      label: ' Available Fund ',
      name: "fund",
      // sortable: true,
      width: '200px !important',
    },
  ]





  return (

    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Active Company
        </Typography>
        {/* <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/adminlist"
            startIcon={<Iconify icon="line-md:arrow-left" />}>
            Back
        </Button> */}

      </Stack>
      <Card>
        <div className='3 d-flex ms-3' style={{ marginBottom: '4rem' }}>
          <ExportToExcel
            style={{
              position: 'relative !important',
              right: '9px',
              top: '1em',
              zIndex: 9999,
            }}
            className="btn text-light export"
            apiData={csvdata && csvdata}
            fileName='Active Company'
          />
        </div>
        <DataTable columns={columns} data={data} />
      </Card>
    </Container >

  )
}

export default ActiveCompany
