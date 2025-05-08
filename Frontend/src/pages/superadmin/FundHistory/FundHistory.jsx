// // /* eslint no-var: 0 */
// // import React, { useEffect, useState } from 'react'
// // import { Link as RouterLink, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
// // import { Card, Stack, Button, Container, Typography, TextField } from '@mui/material';
// // import { Col, Form, Row, Modal } from 'react-bootstrap';
// // import { Icon } from '@iconify/react';
// // // Common DATA Table
// // import DataTable from '../../../utils/DataTable'
// // import Iconify from '../../../components/Iconify';
// // import Page from '../../../components/Page';
// // // API Function
// // import { fundHistoryAdmin } from '../../../services';
// // // Date Format
// // import { fDate } from '../../../utils/formatTime';
// // import AlertMessages from '../../../utils/AlertMessages';

// // const FundHistory = () => {


// //     const [fundData, setFundData] = useState([]);
// //     const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;


// //     const columns = [
// //         {
// //             name: 'User Name',
// //             selector: row => row.userdetails,
// //             // sortable: true,
// //             width: '230px !important',
// //         },
// //         {
// //             name: 'Available Fund',
// //             selector: row => row.available_fund,
// //             // sortable: true,
// //             width: '170px !important',
// //         },
// //         {
// //             name: 'Fund Added',
// //             selector: row => row.fund_added,
// //             // sortable: true,
// //             width: '230px !important',
// //         },
// //         {
// //             name: 'Required Fund',
// //             selector: row => row.required_fund,
// //             // sortable: true,
// //             width: '230px !important',
// //         },
// //         {
// //             name: 'Action',
// //             selector: row => row.action,
// //             // sortable: true,
// //             width: '150px !important',
// //         },
// //     ];

// //     const dataFund = [];
// //     const getFundHistory = async () => {
// //         const response = await fundHistoryAdmin(SuperAdminToken)
// //         if (response) {
// //             response.forEach((fund) => {
// //                 dataFund.push({
// //                     action: fund.action,
// //                     available_fund: fund.available_fund,
// //                     fund_added: fund.fund_added,
// //                     required_fund: fund.required_fund,
// //                     userdetails: fund.userdetails.username
// //                 })
// //                 setFundData(dataFund)
// //             })

// //             // console.log("fundhistory", fundData);
// //         }

// //     }

// //     useEffect(() => {
// //         getFundHistory();
// //     }, []);


// //     return (
// //         <>
// //             <Page title="User">
// //                 <Container>
// //                     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
// //                         <Typography variant="h4" gutterBottom>
// //                             Fund History
// //                         </Typography>
// //                     </Stack>
// //                     <Card>
// //                         <DataTable columns={columns} data={fundData} />
// //                     </Card>
// //                 </Container>


// //             </Page>
// //         </>
// //     )
// // }

// // export default FundHistory







// import React, { useEffect, useState } from 'react'
// import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
// import { Card, Stack, Button, Container, Typography } from '@mui/material';
// import { Icon } from '@iconify/react';
// // Common DATA Table
// import DataTable from '../../../utils/DataTable'
// import Iconify from '../../../components/Iconify';
// import Page from '../../../components/Page';
// import Pricing from '../../web-landing-page/Pricing';
// import AlertMessages from '../../../utils/AlertMessages';
// // API Function
// import { FundHistoryAdmin } from '../../../services';

// function ActiveCompany() {
//   const [data, setData] = useState([]);
//   const [refresh, setrefresh] = useState(true)
//   const [alertMsg, setAlertMsg] = useState(false)
//   const [alertColor, setAlertColor] = useState("")
//   const [textAlert, setTextAlert] = useState("")

//   console.log("{data ", data);

//   const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

//   const SuperAdminId = JSON.parse(localStorage.getItem('superadmin')).id;

//   const columns = [
//     {
//       label: 'User Name',
//       name:"userdetails",
//       // sortable: true,
//       width: '230px !important',
//     },
//     {
//       label: 'Available Fund',
//       name:"available_fund",
//       // sortable: true,
//       width: '170px !important',
//     },
//     {
//       label: 'Fund Added',
//       name: "fund_added",
//       // sortable: true,
//       width: '230px !important',
//     },
//     {
//       label: 'Required Fund',
//       name:"required_fund",
//       // sortable: true,
//       width: '230px !important',
//     },
//     {
//       label: 'Action',
//       name: "action",
//       // sortable: true,
//       width: '150px !important',
//     },
//   ];



//   // Get API For Get Packages Data

//   const getPackages = async () => {


//     const response = await FundHistoryAdmin(SuperAdminToken)
//     // console.log("respo",response);
//     const dataFund = []
//     if (response) {
//       response.forEach((fund) => {
//         dataFund.push({
//           action: fund?.action,
//           available_fund: fund?.available_fund,
//           fund_added: fund?.fund_added,
//           required_fund: fund?.required_fund,
//           userdetails: fund?.userdetails.username
//         })
//         setData(dataFund)
//       })
//     }
//   }



//   //   const deleteItem = async (id) => {
//   //     if (window.confirm("Do you want to delete this Client ?")) {
//   //     //   const response = await deletePackage(id, SuperAdminToken)
//   //       setrefresh(!refresh)

//   //       if (response.message) {
//   //         setAlertMsg(true)
//   //         setAlertColor("success")
//   //         setTextAlert(response.message)
//   //       }
//   //     }

//   //   }

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
//               Active Company
//             </Typography>
//             {/* <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/addpackages" startIcon={<Iconify icon="line-md:plus" />}>
//               Add Package
//             </Button> */}
//           </Stack>
//           <Card>
//             <DataTable columns={columns} data={data && data} />
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
// import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
// import { Card, Stack, Button, Container, Typography } from '@mui/material';
// import { Icon } from '@iconify/react';
// // Common DATA Table
// import Tooltip from '@mui/material/Tooltip';
// import DataTable from '../../../utils/DataTable'
// import Iconify from '../../../components/Iconify';
// import Page from '../../../components/Page';
// import Pricing from '../../web-landing-page/Pricing';
// import AlertMessages from '../../../utils/AlertMessages';
// // API Function
// import { getAllPackages, deletePackage } from '../../../services';

// function Packages() {
//   const [data, setData] = useState([]);
//   const [refresh, setrefresh] = useState(true)
//   const [alertMsg, setAlertMsg] = useState(false)
//   const [alertColor, setAlertColor] = useState("")
//   const [textAlert, setTextAlert] = useState("")


//   const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

//   const columns = [
//     {
//       name: 'Name',
//       selector: row => row.name,
//       sortable: true,
//       // width: '150px !important',
//     },
//     {
//       name: 'Price',
//       selector: row => row.price,
//       sortable: true,
//       // width: '150px !important',
//     },
//     {
//       name: 'Package Validity',
//       selector: row => row.package_validity,
//       sortable: true,
//       width: '170px !important',
//     },
//     {
//       name: 'Package D/M/Y',
//       selector: row => row.package_day_month,
//       sortable: true,
//       width: '160px !important',
//     },
//     {
//       name: 'Aadhar Sign Price',
//       selector: row => row.adhar_sign_price,
//       sortable: true,
//       width: '180px !important',
//     },
//     {
//       name: 'Aadhar verify price',
//       selector: row => row.adhar_verify_price,
//       sortable: true,
//       width: '190px !important',
//     },
//     {
//       name: 'PAN Verify Price',
//       selector: row => row.pan_verify_price,
//       sortable: true,
//       width: '170px !important',
//     },
//     {
//       name: 'Package Details',
//       selector: row => row.package_details,
//       sortable: true,
//       width: '160px !important',
//     },
//     {
//       name: "ACTIONS",
//       width: '100px !important',
//       selector: (row) => (
//         <>
//           {/* {console.log("data",row)} */}
//           <NavLink
//             to={`/superadmin/editpackages/${row.id}`}
//             state={row}
//           >
//             <Tooltip title="Edit">
//               <Icon icon="akar-icons:edit"
//                 color="#6BAA2C"
//                 className='mx-2'
//                 width="22"
//                 variant="primary"
//               />
//             </Tooltip>
//           </NavLink>

//           <Tooltip title="Delete">
//             <Icon icon="ant-design:delete-outlined"
//               color="CD2B2E"
//               width="22"
//               data-toggle="tooltip"
//               data-placement="top"
//               title="Delete"
//               cursor="pointer"
//               onClick={() => deleteItem(row.id)}
//             />
//           </Tooltip>
//         </>
//       ),
//     },
//   ];


//   // Get API For Get Packages Data

//   const getPackages = async () => {
//     const response = await getAllPackages(SuperAdminToken)
//     if (response) {
//       //  console.log("respo",response);
//       setData(response);
//     }
//   }



//   const deleteItem = async (id) => {
//     if (window.confirm("Do you want to delete this Client ?")) {
//       const response = await deletePackage(id, SuperAdminToken)
//       setrefresh(!refresh)

//       if (response.message) {
//         setAlertMsg(true)
//         setAlertColor("success")
//         setTextAlert(response.message)
//       }
//     }

//   }

//   useEffect(() => {
//     getPackages();
//   }, [refresh]);

//   const hideClose = () => {
//     setAlertMsg(false)
//   }


//   return (
//     <>
//       <Page title="Packages">
//         <Container>
//           <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//             <Typography variant="h4" gutterBottom>
//               Packages
//             </Typography>
//             <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/addpackages" startIcon={<Iconify icon="line-md:plus" />}>
//               Add Package
//             </Button>
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

// export default Packages


import React, { useEffect, useState ,useRef} from 'react'
import { Card, Table, Stack, Button,Container, Typography, Tooltip, TableContainer, TablePagination, } from '@mui/material';
import { Icon } from '@iconify/react';
import DataTable from "../../../utils/DataTable";
import Iconify from '../../../components/Iconify';
import { fDateTime } from '../../../utils/formatTime';
import AlertMessages from '../../../utils/AlertMessages';
import { FundHistoryAdmin } from '../../../services';
import ExportToExcel from "../../../utils/ExportToExport";


const ActiveCompany = () => {
  const ref = useRef();
  const ref1 = useRef();
  const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

  //   const SuperAdminId = JSON.parse(localStorage.getItem('superadmin')).id;

  const [data, setData] = useState([]);
  const [refresh, setrefresh] = useState(true)
  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")
  const [csvData, setcsvData] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fullname, setfullname] = useState('');


  // Get API For Get Packages Data


  const getPackagess = async () => {

    const response = await FundHistoryAdmin(SuperAdminToken)
    console.log("Fund History", response.userdetails);
    if (response) {
      setData(response);

    }


    const csv = []
    response.map((x, index) => {

      return csv.push({
        "Id": index + 1,
        "User-Name": x.userdetails.username,
        "Company-Contact": x.userdetails.company_contact,
        "Company-Email": x.userdetails.company_email,
        "Date And Time": fDateTime(x.createdAt),
        "Credit": x.fund_added,
        "Fund_Added": x.fund_added,
        "Available_Fund": x.available_fund,
      })
    })
    setcsvData(csv)

  }

  const hideClose = () => {
    setAlertMsg(false)
  }




  useEffect(() => {
    getPackagess();

  }, [refresh]);




  const columns = [
    {
      label: 'Date And Time',
      name: `createdAt`,
      width: '150px !important',
      options: {
        customBodyRender: (value, tableMeta, rowData, updateValue) => {
          return (
            <p>
              {fDateTime(tableMeta.rowData[1])}
              {/* {console.log("ddddd" , tableMeta)} */}
            </p>
          )
        }
      },
    },
    {
      label: 'Company Name',
      name: 'userdetails.username',
      // sortable: true,
      sortDescFirst: true,
      width: '230px !important',

    },
    {
      label: 'Contact No.',
      name: "userdetails.company_contact",
      // sortable: true,
      width: '230px !important',
    },
    {
      label: 'Email',
      name: "userdetails.company_email",
      // sortable: true,
      width: '230px !important',
    },
    {
      label: 'Added Fund ',
      name: "fund_added",
      // sortable: true,
      width: '230px !important',
    },
    {
      label: 'Available Fund',
      name: "available_fund",
      // sortable: true,
      width: '170px !important',
    },

    // {
    //   label: 'Required Fund',
    //   name: "required_fund",
    //   // sortable: true,
    //   width: '230px !important',
    // },
    // {
    //   label: 'Action',
    //   name: "action",
    //   // sortable: true,
    //   width: '150px !important',
    // },
  ];



  const handleStartDateChange = (event) => {
    const date = new Date(event.target.value);
    setStartDate(date);
};

const handleEndDateChange = (event) => {
    const date = new Date(event.target.value);
    setEndDate(date);
};



const handleFilterSubmit = (event) => {
    event.preventDefault();

    // filter the data based on the selected date range
    const filtered = data.filter(item => {
        const itemDate = new Date(item.createdAt);
        console.log("itemDate", itemDate);
        return (
            (!startDate || itemDate >= startDate) &&
            (!endDate || itemDate <= endDate)
        )
    }).filter((item) => {
        if (item.userdetails.username.includes(fullname)) {
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
            Fund History
          </Typography>

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

                                onChange={(e) => { setfullname(e.target.value); }}
                            value={fullname}
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
                // position: 'aboslute',
                right: '9px',
                // top: '1em',
                zIndex: 999,
              }}
              className="btn text-light export"
              apiData={csvData && csvData}
              fileName='Fund History'
            />
          </div> */}
          {/* </div> */}
          <DataTable
            columns={columns}
            data={data}
            options={{
              search: false,
            }}
          />
        </Card>



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

export default ActiveCompany



