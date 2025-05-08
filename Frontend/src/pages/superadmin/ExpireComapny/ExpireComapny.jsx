import React, { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink, useParams } from 'react-router-dom';
import { Card, Stack, Button, Container, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
// Common DATA Table
import DataTable from '../../../utils/DataTable'
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import Pricing from '../../web-landing-page/Pricing';
import AlertMessages from '../../../utils/AlertMessages';
import ExportToExcel from "../../../utils/ExportToExport";
import { fDateTime } from '../../../utils/formatTime';

// API Function
import { ExpireCompanyList } from '../../../services';

function ExpireComapny() {
  const [data, setData] = useState([]);
  const [csvdata, setCSVdata] = useState([]);
  const [refresh, setrefresh] = useState(true)
  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")


  const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;
  const SuperAdminId = JSON.parse(localStorage.getItem('superadmin')).id;

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

  ];


  // Get API For Get Packages Data

  const getPackages = async () => {

    const data = {
      "superadminid": SuperAdminId
    }
    const response = await ExpireCompanyList(data, SuperAdminToken)
    if (response) {
      setData(response);


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
  }


  useEffect(() => {
    getPackages();
  }, [refresh]);

  const hideClose = () => {
    setAlertMsg(false)
  }


  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Expired Company
          </Typography>
          {/* <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/addpackages" startIcon={<Iconify icon="line-md:plus" />}>
              Add Package
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
              fileName='Expired Company'
            />
          </div>
          <DataTable columns={columns} data={data} />
        </Card>
        {alertMsg &&
          <AlertMessages
            hideAlert={hideClose}
            showAlert={alertMsg}
            message={textAlert}
            alertColor={alertColor}
          />
        }
      </Container>
    </>
  )
}

export default ExpireComapny









