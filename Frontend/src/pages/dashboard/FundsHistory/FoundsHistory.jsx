
// /* eslint no-var: 0 */
// import React, { useEffect, useState } from 'react'
// import { Link as RouterLink, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
// import { Card, Stack, Button, Container, Typography, TextField } from '@mui/material';
// import { Col, Form, Row, Modal } from 'react-bootstrap';
// import { Icon } from '@iconify/react';
// // Common DATA Table
// import DataTable from '../../../utils/DataTable'
// // import DataTable from '../../../utils'
// import Iconify from '../../../components/Iconify';
// import Page from '../../../components/Page';
// // API Function
// import { AdminfundHistory } from '../../../services';
// // Date Format
// import { fDate } from '../../../utils/formatTime';
// import AlertMessages from '../../../utils/AlertMessages';

// const FoundsHistory = () => {


//     const [fundData, setFundData] = useState([]);
//     // console.log("admin fund", fundData);

//     const SuperAdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
//     const AdminID = JSON.parse(localStorage.getItem('admin')).id;


//     const columns = [
//         {
//             name: 'User Details',
//             selector: row => row.userdetails,
//             sortable: true,
//             width: '230px !important',
//         },
//         {
//             name: 'Available Fund',
//             selector: row => row.available_fund,
//             sortable: true,
//             width: '170px !important',
//         },
//         {
//             name: 'Fund Added',
//             selector: row => row.fund_added,
//             sortable: true,
//             width: '230px !important',
//         },
//         {
//             name: 'Required Fund',
//             selector: row => row.required_fund,
//             sortable: true,
//             width: '230px !important',
//         },
//         {
//             name: 'Activities',
//             selector: row => row.action,
//             sortable: true,
//             width: '150px !important',
//         },
//         {
//             name: 'Actions',
//             // selector: row => ,
//             sortable: true,
//             width: '150px !important',
//         },
//     ];

//     const dataFund = [];
//     const getFundHistory = async () => {
//         const data = {
//             "adminid": AdminID
//         }
//         const response = await AdminfundHistory(data, SuperAdminToken)
//         if (response) {
//             response.forEach((fund) => {
//                 dataFund.push({
//                     action: fund.action,
//                     available_fund: fund.available_fund,
//                     fund_added: fund.fund_added,
//                     required_fund: fund.required_fund,
//                     userdetails: fund.userdetails.username
//                 })
//                 setFundData(dataFund)
//             })

//             // console.log("fundhistory", fundData);
//         }
//     }

//     useEffect(() => {
//         getFundHistory();
//     }, []);


//     return (
//         <>
//             <Page title="User">
//                 <Container>
//                     <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//                         <Typography variant="h4" gutterBottom>
//                             Fund History
//                         </Typography>
//                     </Stack>
//                     <Card>
//                         <DataTable columns={columns} data={fundData} />
//                     </Card>
//                 </Container>
//             </Page>
//         </>
//     )
// }

// export default FoundsHistory




import React, { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
import { Card, Stack, Button, Container, Typography, TextField, Switch, } from '@mui/material';
// import MUIDataTable from 'mui-datatables';

import { fDateTime, fDate, f_time } from '../../../utils/formatTime';

import Iconify from '../../../components/Iconify';
import AlertMessages from "../../../utils/AlertMessages";
import DataTable from "../../../utils/DataTable";
// import { getAdmins, deleteAdminById, getAdminById, getStatus } from '../../../services';
import ExportToExcel from "../../../utils/ExportToExport";

import { AdminfundHistory } from '../../../services'




const FoundsHistory = () => {

    const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
    const AdminID = JSON.parse(localStorage.getItem('admin')).id;

    const [data, setData] = useState([]);

    const [refresh, setrefresh] = useState(true)
    const [alertMsg, setAlertMsg] = useState(false)
    const [alertColor, setAlertColor] = useState("")
    const [textAlert, setTextAlert] = useState("")
    const [show, setShow] = useState('');
    const [csvData, setcsvData] = useState('');
    const [filters, setFilters] = useState(null);
    console.log("filters", filters);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredData, setFilteredData] = useState(data);
    const [isFiltered, setIsFiltered] = useState(false);
    // const [fund, setFund] = useState("")
    // const [rowId, setRowId] = useState("")
    // const [checked, setChecked] = useState(false);
    console.log("startDate", startDate);

    const handleClose = () => setShow(false);


    const hideClose = () => {
        setAlertMsg(false)
    }

    // Get API For Get Packages Data
    const getPackages = async () => {
        const data = {
            "adminid": AdminID
        }

        const response = await AdminfundHistory(data, AdminToken)
        if (response) {
            console.log("respo", f_time(response[0].createdAt));
            setData(response);
        }



        const csv = []
        response.map((x, index) => {

            return csv.push({
                "Id": index + 1,
                "Date And Time": fDateTime(x.createdAt),
                "Credit-Fund": x.fund_added,
                "Available-Fund": x.available_fund,
            })
        })
        setcsvData(csv)


    }



    // Admin Status API

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
            );
        });

        // set the filtered data and the filter status
        console.log("filtered", filtered);  
        setData(filtered);
        // setIsFiltered(true);
    };



    const handleResetClick = () => {
        // reset the filter and the filtered data
        setrefresh(!refresh)
        setFilteredData(data);
        setStartDate(null);
        setEndDate(null);
        // setIsFiltered(false);
    };


    useEffect(() => {
        getPackages();

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
            label: 'Date And Time',
            name: `createdAt`,
            width: '150px !important',
            options: {
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return (
                        <p>
                            {fDateTime(tableMeta.rowData[2])}
                        </p>
                    )
                }
            },
        },
        {
            label: 'Credit',
            name: "fund_added",
            sortable: true,
            width: '230px !important',
        },
        {
            label: 'Available Balance',
            name: "available_fund",
            sortable: true,
            width: '150px !important',
        },

    ]


    return (
        // <ThemeProvider theme={theme} >


        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Fund History
                </Typography>
            </Stack>
            <Card>

                <div className='row'>
                    <div className='my-3 d-flex ms-3'>
                        <input type='date'
                            className="form-control ms-2"
                            name="date"
                            style={{
                                width: '200px',
                            }}
                            onChange={(e) => handleStartDateChange(e)}
                            // value={startDate}
                        />
                        <input type='date'
                            className="form-control ms-2"
                            placeholder='Client Name '
                            name="date"
                            style={{
                                width: '200px',
                            }}
                            onChange={(e) => handleEndDateChange(e)}
                            // value={endDate}
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
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    options={{
                        search: false,
                    }}
                />
            </Card>
            {/* <div></div> */}



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
    )
}

export default FoundsHistory


