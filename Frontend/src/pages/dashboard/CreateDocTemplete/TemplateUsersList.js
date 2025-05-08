import React, { useEffect, useState, useRef } from 'react'
import { Link as RouterLink, NavLink, useParams, useLocation } from 'react-router-dom';
import { Card, Table, Stack, Avatar, Button, Checkbox, TableRow, Alert, TableBody, TableCell, Container, Typography, Tooltip, TableContainer, TablePagination, } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import SunEditor from "suneditor-react";
import { fDateTimeSuffix, fDateTime } from '../../../utils/formatTime';

import DataTable from "../../../utils/DataTable";
import { Icon } from '@iconify/react';
import AlertMessages from "../../../utils/AlertMessages";
import "suneditor/dist/css/suneditor.min.css";
import { GetUsersViaTemplateId } from '../../../services'
import Iconify from '../../../components/Iconify';
import ExportToExcel from "../../../utils/ExportToExport";


const Templete = () => {
  const getId = useParams()
  console.log("idddd", getId.id);

  const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState('');
  const [refresh, setrefresh] = useState(true)
  const [show, setShow] = useState(false);
  const [forCSV, setforCSV] = useState("");

  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")
  const hideClose = () => {
    setAlertMsg(false)
  }

  //  get All Template

  var arrr = []

  const AllTemplate = async () => {

    const request = {
      "template_id": getId.id
    }
    const res = await GetUsersViaTemplateId(request, AdminToken);

    if (res) {
      res.map((item) => {
        console.log("item", item)

        return arrr.push({
          "id": item.userdata.id,
          "client_id": item.client_id,
          "template_id": item.template_id,
          "userid": item.userdata.id,
          "email": item.userdata.email,
          "fullname": item.userdata.fullname,
          // "fullname": item.userdata.fullname,
          "parent_admin_id": item.userdata.parent_admin_id,
          "kycdocument": item.userdata.kycdocument,
          "createdAt": item.userdata.createdAt,
          // "sign_status": item.sign_status,
          "linkexpires": item.linkexpires,
          "personal_contact": item.userdata.personal_contact,
          "sign_status": new Date(item.linkexpires) < new Date() && item.sign_status == 3 ? "Link Expired" : item.sign_status == 1 ? "Sign Done" : "Sign Pending",

        })

      })

      console.log("rrrr" , arrr);

      setData(arrr)
    }



    const csv = []
    res.map((x, index) => {

      return csv.push({
        "Id": index + 1,
        "Full_Name": x.userdata.fullname,
        "Personal_Email": x.userdata.email,
        "personal_contact": x.userdata.personal_contact,
        "sign_status": new Date(x.linkexpires) < new Date() && x.sign_status == 3 ? "Link Expired" : x.sign_status == 1 ? "Sign Done" : "Sign Pending",
        "otpbased": x.userdata.otpbased === 1 ? 'Verify by Mobile' : 'Verify By Addhaar',
        // "Kyc Status"  
      })
    })
    setforCSV(csv)


  }





  useEffect(() => {
    AllTemplate();
  }, []);

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
      label: 'Date and Time',
      name: "createdAt",
      sortable: true,
      width: '150px !important',
      options: {
        // display: false,
        customBodyRender: (value, tableMeta, rowData, updateValue) => {
          return (
            <>
              <p>{fDateTimeSuffix(tableMeta.rowData[2])}</p>
            </>)
        }
      }
    },
    {
      // 3
      label: 'Name',
      name: "fullname",
      sortable: true,
      width: '150px !important',
    },
    {
      // 4
      label: 'Email',
      name: "email",
      sortable: true,
      width: '230px !important',
    },
    {
      // 5
      label: 'mobile No.',
      name: "personal_contact",
      sortable: true,
      width: '230px !important',
      options: {
        display: false,
      }
    },
    {
      // 8
      label: 'Sign Status',
      name: "sign_status",
      sortable: true,
      width: '150px !important',
      options: {
        filter: false,
        sort: false,
        alignItems: 'center',
        width: 200,
 
      }

    },
    {
      // 8
      label: 'linkexpires',
      name: "linkexpires",
      sortable: true,
      width: '150px !important',
      options: {
        filter: false,
        sort: false,
        alignItems: 'center',
        display: false,
        width: 200,
        customBodyRender: (value, tableMeta, rowData, updateValue) => {
        }
      }

    },

  ]

  return (

    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Template Users List
          </Typography>
          <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/admin/templetelist" startIcon={<Iconify icon="line-md:arrow-left" />}>
            Back
          </Button>
        </Stack>
        <Card >
          <div className='row'>
            <div className=' mt-3 mb-5 d-flex ms-1 ' >
              <ExportToExcel
                style={{
                  position: 'aboslute',
                  right: '9px',
                  top: '.3em !important',
                  zIndex: 9999,
                }}
                className="btn text-light export"
                apiData={forCSV && forCSV}
                fileName='Company List'
              />
            </div>
          </div>

          <div className='row'>
            <DataTable
              columns={columns}
              data={data}
            />
          </div>
        </Card>
        {/* view Template */}



        <Modal show={show} onHide={() => setShow(false)} centered
          size="lg" center
          dialogClassName="modal-80w custom-modal"


        >
          <Modal.Header closeButton>
            <Modal.Title>Template Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div dangerouslySetInnerHTML={{ __html: datas && datas }} />
          </Modal.Body>
        </Modal>

        {/* react boostrap */}








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

