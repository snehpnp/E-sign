import React, { useEffect, useState, useRef } from 'react'
import { Link as RouterLink, NavLink, useParams, useLocation } from 'react-router-dom';
import { Card, Table, Stack, Avatar, Button, Checkbox, TableRow, Alert, TableBody, TableCell, Container, Typography, Tooltip, TableContainer, TablePagination, } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import SunEditor from "suneditor-react";
import DataTable from "../../../utils/DataTable";
import { fDateTimeSuffix, fDateTime, fDate } from '../../../utils/formatTime';

import { Icon } from '@iconify/react';
import AlertMessages from "../../../utils/AlertMessages";
import "suneditor/dist/css/suneditor.min.css";
import { GetAllTemplates, DeleteTemplates, UpdateTemplates, FindByOneTemplates } from '../../../services'
import Iconify from '../../../components/Iconify';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';







const Templete = () => {
  const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState('');
  const [refresh, setrefresh] = useState(true)
  const [show, setShow] = useState(false);

  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")
  const hideClose = () => {
    setAlertMsg(false)
  }

  //  get All Template
  const AllTemplate = async () => {
    const res = await GetAllTemplates(AdminToken);
    setData(res)

  }


  // Delete By One Templete

  // const DeleteTemplateById = async (id) => {
  //   const request = {
  //     "id": id
  //   }
  //   if (window.confirm("Do you want to delete this Client ?")) {
  //     const res = await DeleteTemplates(request, AdminToken);
  //     if (res) {
  //       setAlertMsg(true)
  //       setAlertColor("success")
  //       setrefresh(!refresh)
  //       setTextAlert(res.message)
  //     }
  //   }

  // }


  // view Template 

  const ViewTemplate = (htmlabc) => {
    setShow(true)
    setDatas(htmlabc)
    // console.log("hello" , )


  }



  const DownloadTemplate = (htmltemp, name) => {

    const options = {
      margin: .8,
      filename: `${name}-template.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(htmltemp).save();
  }


  // const DownloadTemplate = (htmltemp) => {
  //   console.log("htmltemplate", htmltemp);
  //   const pdf = new jsPDF();

  //   let aaa = `<html>
  //   <head></head>
  //   <body>
  //   ${htmltemp} 
  //   </body>
  //   </html>`


  //   pdf.fromHTML(aaa, 15, 15, { 'width': 170 });
  //   pdf.save('mydocument.pdf');


  // }







  useEffect(() => {
    AllTemplate();
  }, [refresh]);

  const columns = [
    {
      // 1
      label: 'id',
      name: "id",
      sortable: true,
      width: '150px !important',
      options: {
        display: false,
      },
    },
    {
      // 2
      label: 'Create At Date',
      name: "createdAt",
      sortable: true,
      width: '150px !important',
      options: {
        // display: false,
        customBodyRender: (value, tableMeta, rowData, updateValue) => {
          return (
            <>
              <p>{fDate(tableMeta.rowData[2])}</p>
            </>)
        }
      }
    }, {
      // 3
      label: 'Updated Date',
      name: "updatedAt",
      sortable: true,
      width: '150px !important',
      options: {
        // display: false,
        customBodyRender: (value, tableMeta, rowData, updateValue) => {
          return (
            <>
              <p>{fDate(tableMeta.rowData[3])}</p>
            </>)
        }
      }
    },
    {
      // 4
      label: 'Template Name',
      name: "name",
      sortable: true,
      // display: false,

      width: '250px !important',

    },
    {
      // 5
      label: 'Template Main',
      name: "html",
      sortable: true,
      options: {
        display: false,
        customBodyRender: (value, tableMeta, rowData, updateValue) => {
          return (
            <>
              {console.log("kyc document ", tableMeta.rowData)}
            </>)
        }
      }

    },
    {
      label: 'Actions',
      name: 'action',
      options: {
        filter: false,
        sort: false,
        //  width: '250px !important',
        // display: false,

        customBodyRender: (value, tableMeta, rowData, updateValue) => {
          return (

            <>
              <NavLink
                to={`/admin/templateusers/${tableMeta.rowData[1]}`}
                state={tableMeta.rowData}
              >


                <Tooltip title="Template List">
                  <Icon icon="material-symbols:patient-list-outline-rounded"
                    color="#6BAA2C"
                    className='mx-1'
                    width="22"
                    variant="primary"
                    data-toggle="tooltip"
                    data-placement="top"
                  // onClick={() => TemplateById(tableMeta.rowData[1])}
                  />
                </Tooltip>
              </NavLink>
              <NavLink
                to={`/admin/edittemplete/${tableMeta.rowData[1]}`}
                state={tableMeta.rowData}
              >


                <Tooltip title="Edit Template">
                  <Icon icon="material-symbols:edit-square-outline"
                    color="#6BAA2C"
                    className='mx-1'
                    width="22"
                    variant="primary"
                    data-toggle="tooltip"
                    data-placement="top"
                  // onClick={() => TemplateById(tableMeta.rowData[1])}
                  />
                </Tooltip>
              </NavLink>

              <Tooltip title="View Template">
                <Icon icon="clarity:grid-view-line"
                  color="#6BAA2C"
                  className='mx-1'
                  width="22"
                  variant="primary"
                  data-toggle="tooltip"
                  data-placement="top"
                  onClick={() => ViewTemplate(tableMeta.rowData[5])}

                />
              </Tooltip>
              <Tooltip title="Download Template">
                <Icon icon="material-symbols:cloud-download"
                  color="#6BAA2C"
                  className='mx-1'
                  width="22"
                  variant="primary"
                  data-toggle="tooltip"
                  data-placement="top"
                  onClick={() => DownloadTemplate(tableMeta.rowData[5], tableMeta.rowData[4])}

                />
              </Tooltip>

              {/* <Tooltip title="Delete">
                <Icon icon="ant-design:delete-outlined"
                  color="CD2B2E"
                  width="22"
                  data-toggle="tooltip"
                  data-placement="top"
                  cursor="pointer"
                  onClick={() => DeleteTemplateById(tableMeta.rowData[1])}
                />
              </Tooltip> */}


            </>
          )
        }
      }
    }
  ]

  return (

    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            All Template List
          </Typography>
          <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/admin/addtemplete" startIcon={<Iconify icon="line-md:plus" />}>
            Add Template
          </Button>
        </Stack>

        <Card >

          <div className='row'>
            <DataTable
              columns={columns}
              data={data}
            />
          </div>
        </Card>
        {/* view Template */}



        <Modal show={show} onHide={() => setShow(false)} centered
          size="lg"
          dialogClassName="modal-80w"

        >
          <Modal.Header closeButton>
            <Modal.Title>Template Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div dangerouslySetInnerHTML={{ __html: datas && datas }} />
          </Modal.Body>
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

export default Templete

