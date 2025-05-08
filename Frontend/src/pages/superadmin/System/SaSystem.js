import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
import { Card, Stack, Button, Container, Typography, } from '@mui/material';
import { Modal } from 'react-bootstrap';
import { useFormik, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import Tooltip from '@mui/material/Tooltip';
import * as Common from '../../../utils/CommonMessage';
// Common DATA Table
import DataTable from '../../../utils/DataTable'
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import { getSystemDetails } from '../../../services'

const SaSystem = () => {

  const [data, setData] = useState([]);
  const [refresh, setrefresh] = useState(true)
  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams()
  const AdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;
  const AdminId = JSON.parse(localStorage.getItem('superadmin')).id;

  // console.log("SuperAdminToken",SuperAdminToken)

  // Form Validation

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



  const columns = [
    {
      name: 'Company Name',
      selector: row => row.company_name,
      sortable: true,
      width: '150px !important',
    },
    {
      name: 'Company Short Name',
      selector: row => row.comapny_sort_name,
      sortable: true,
      width: '180px !important',
    },
    {
      name: 'Image',
      selector: row => row.company_logo,
      sortable: true,
      width: '100px !important',
    },
    {
      name: 'Favicon',
      selector: row => row.company_favicon,
      sortable: true,
      width: '100px !important',
    },
    {
      name: 'Email',
      selector: row => row.company_email,
      sortable: true,
      width: '180px !important',
    },
    {
      name: 'CC Mail',
      selector: row => row.company_cc,
      sortable: true,
      width: '150px !important',
    },
    {
      name: 'BCC Mail',
      selector: row => row.company_bcc,
      sortable: true,
      width: '150px !important',
    },
    {
      name: 'Password',
      selector: row => row.email_password,
      sortable: true,
      width: '150px !important',
    },
    {
      name: 'SMTP Host',
      selector: row => row.smtp_host,
      sortable: true,
      width: '150px !important',
    },
    {
      name: 'SMTP Port',
      selector: row => row.smtp_port,
      sortable: true,
      width: '150px !important',
    },
    {
      name: "Actions",
      width: '100px !important',
      selector: (row) => (
        <>
          {/* {console.log("data",row)} */}
          <NavLink
            to={""}
            state={row}
          >
            <Tooltip title="Edit">
              <Icon icon="akar-icons:edit"
                className='mx-2'
                width="22"
                variant="primary"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit Client"
              //   onClick={handleShow}
              />
            </Tooltip>
          </NavLink>
        </>
      ),
    },
  ];


  return (
    <>
      <Page title="User">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              System
            </Typography>
            {/* <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/admin/system" startIcon={<Iconify icon="line-md:plus" />}>
              System Update
            </Button> */}
          </Stack>
          <Card>
            <DataTable columns={columns} data={data} />
          </Card>
        </Container>
      </Page>
    </>

  )
}

export default SaSystem