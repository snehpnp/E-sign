// // import React from 'react';
// // import DataTable from "react-data-table-component";
// // import DataTableExtensions from "react-data-table-component-extensions";


// // export default (props) => {
// //     const { columns, data, progressPending } = props
// //     // console.log("hello",props);
// //     const paginationComponentOptions = {
// //         selectAllRowsItem: true,
// //         selectAllRowsItemText: 'ALL',
// //     };

// //     const customStyles = {
// //         headCells: {
// //             style: {
// //                 width: '30px',
// //                 background: '#000',
// //                 color: '#fff',
// //                 justifyContent: 'center',
// //             },
// //         },
// //         cells: {
// //             style: {
// //                 justifyContent: 'center',
// //                 minWidth: 'auto !important',
// //             },
// //         },
// //     };

// //     return (
// //         <>
// //             <DataTableExtensions
// //                 columns={columns}
// //                 data={data}
// //                 export={false}
// //                 print={false}
// //             >
// //                 <DataTable
// //                     // noHeader
// //                     defaultSortField="id"
// //                     defaultSortAsc={false}
// //                     progressPending={progressPending}
// //                     pagination
// //                     highlightOnHover
// //                     // fixedHeader={true}
// //                     fixedHeaderScrollHeight={'550px'}
// //                     paginationComponentOptions={paginationComponentOptions}
// //                     paginationRowsPerPageOptions={[10, 50, 100]}
// //                     customStyles={customStyles}

// //                 />
// //             </DataTableExtensions>

// //         </>
// //     )
// // }




import React, { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Card, Table, Stack, Avatar, Button, Checkbox, TableRow, Alert, TableBody, TableCell, Container, Typography, Tooltip, TableContainer, TablePagination, } from '@mui/material';
// import DataTableExtensions from "react-data-table-component-extensions";/
import Chip from '@mui/material/Chip';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import MUIDataTable, { TableFilterList } from 'mui-datatables';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AlertMessages from "./AlertMessages";

// import { ActiveCompanyList } from '../../../services';

const theme = createTheme({
    overrides: {
        MuiTable: {
            root: {
                border: [[1, 'solid', '#d3d3d3']],
                alignItems: 'center',

            },
        },
        MuiTableCell: {
            root: {
                borderColor: '#d3d3d3',
                alignItems: 'center',
            },
            head: {
                background: 'lightgrey',
                '&:not(:last-child)': {
                    borderRight: [[1, 'solid', '#c0c0c0']],
                    width: "270px"
                },

            },
        },
        MuiTableSortLabel: {
            root: {
                alignItems: 'center',
            },
        },
        MuiTableFooter: {
            root: {
                background: 'lightgrey',
            },
        },

        // MUIDataTable
        MUIDataTableHeadCell: {
            sortLabelRoot: {
                // height: undefined,
                alignItems: 'center',
            },
        },
    },
});





const DataTable = (props) => {
    const { columns, data, url, id, deleteFunc, headerNames, options123 } = props

    const [show, setShow] = useState(false);

    const [alertMsg, setAlertMsg] = useState(false);
    const [alertColor, setAlertColor] = useState("");
    const [textAlert, setTextAlert] = useState("");

    // const handleClose = () => {
    //   setShow(false);
    // };
    const hideClose = () => {
        setAlertMsg(false)
    }
    // const confirmDelete = async (e) => {
    //     e.preventDefault();
    //     const response = await deleteFunc(id);

    //     if (response) {
    //         console.log("response", response);
    //         setAlertMsg(true);
    //         setAlertColor("success");
    //         setTextAlert(response.message);
    //         // setShow(false);
    //         // setTimeout(() => {
    //         //     reloadPage();
    //         // }, 1000)

    //     }


    // };

    const CustomChip = ({ label, onDelete }) => {
        return (
            <Chip
                variant="outlined"
                color="secondary"
                label={label}
                onDelete={onDelete}
            />
        );
    };

    // const CustomFilterList = (props) => {
    //     return <TableFilterList {...props} ItemComponent={CustomChip} />;
    // };

    columns.unshift(
        {
            label: 'Sr .No',
            name: "ids",
            width: '350px !important',
            options: {
                customBodyRender: (value, tableMeta, rowData, updateValue) => {
                    return tableMeta.rowIndex + 1

                },
            }
        }
    )



    return (

        <>
            <ThemeProvider theme={theme}>

                {/* <input type='text'
            className="form-control"
            placeholder='kika'
            style={{
              left: '3rem',
              position: 'absolute',
              top: '1rem',
              width: '200px',
              // background: 'gray',

              zIndex: 10,
            }} />
          <input type='text'
            className="form-control "
            placeholder='ganpat'
            style={{
              left: '16rem',
              position: 'absolute',
              top: '1rem',
              // background: 'gray',
              width: '200px',
              zIndex: 10,
            }} />
             <input type='text'
            className="form-control "
            placeholder='ganpat'
            style={{
              left: '29rem',
              position: 'absolute',
              top: '1rem',
              // background: 'gray',
              width: '200px',
              zIndex: 10,
            }} /> */}

                <MUIDataTable
                    columns={columns}
                    data={data}
                    // components={{
                    //     TableFilterList: CustomFilterList,
                    // }}
                    options={{

                        fixedHeader: true,
                        tableBodyHeight: 'stacked',
                        scrollMaxHeight:"stacked",
                        responsive: 'standard',
                        filterType: 'textField',
                        filter: false,
                        download: false,
                        selectableRows: 'none',
                           elevation: 0,
                         search: false,
                        scrollbars: true,
                        sort: false,
                        // sortDescFirst: true,
                        width: '150px',
                        // responsive: "standard ",
                        print: false,
                        enableNestedDataAccess: ".",
                        viewColumns: false,
                        textLabels: {
                            body: {
                                noMatch:
                                    <div>
                                        <img src='/public/NoData.svg' className='mx-auto d-flex justify-content-center' alt="No Data Avilable" />
                                        <h6> No Record Found </h6>
                                    </div>
                            },


                        },

                        // onDownload: (buildHead, buildBody, columns, data) =>
                        //     buildHead(headerNames) +
                        //     buildBody(
                        //         data.concat({
                        //             index: data.length,
                        //             // data: footerNames,
                        //         }),
                        //     ),
                        ...options123
                    }}
                />


                {/* {alertMsg && (
                <AlertMessages
                    hideAlert={hideClose}
                    showAlert={alertMsg}
                    message={textAlert}
                    alertColor={alertColor}
                />
            )} */}
            </ThemeProvider>
        </>


    )
}

export default DataTable
