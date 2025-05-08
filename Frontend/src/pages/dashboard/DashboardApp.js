import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
// components
import Page from '../../components/Page';

import Iconify from '../../components/Iconify';
import { AdminDashboardCount, getUsers, GetAllTemplates, GetUserDataWithTemplateDetails } from '../../services';
import { AppWidgetSummary } from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {





  const theme = useTheme();

  const [showCount, setShowCount] = useState("");
  const [showCoun1t, setShowCount1] = useState("");
  const [showTempCount, setShowTempCount] = useState("");


  const adminID = JSON.parse(localStorage.getItem('admin')).id;
  const SuperAdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;


  const countDashboard = async () => {

    const data = {
      "adminid": adminID,
    }

    const response = AdminDashboardCount(data, SuperAdminToken)
    const alltempRes = await GetAllTemplates(SuperAdminToken)
    setShowTempCount(alltempRes.length)

    response.then((val) => {
      if (val) {
        setShowCount(val)
      }
    })




  }

  let clientArr = []
  const GetClients = async () => {

    const response = await GetUserDataWithTemplateDetails(SuperAdminToken);

    if (response) {
      response.map((x) => {

        clientArr.push({
          "generate_sign": x.generate_sign,
          "linkexpires": x.linkexpires,
          "template_id": x.template_id,
          "sign_status": x.sign_status,
        })

      })
    }
    let signdonecount = []
    let SignNotDoneCount = []
    let LinkExpired = []
    let pdfnotgenerate = []

    clientArr.filter((item) => {
      if (item.sign_status == 1 && item.generate_sign == 1) {
        // signdone
        return signdonecount.push(item)
      }
      else if (new Date(item.linkexpires) > new Date() && item.sign_status == 3) {
        // signpending
        return SignNotDoneCount.push(item)
      }
      else if (new Date(item.linkexpires) < new Date() && item.sign_status == 3) {
        // linkexpired
        return LinkExpired.push(item)
      }
      else if (item.generate_sign == 2 && item.sign_status == 1) {
        // pdf not generate
        return pdfnotgenerate.push(item)
      }



    })


    const count = {
      'SignNotDoneCount': SignNotDoneCount.length,
      "LinkExpired": LinkExpired.length,
      "signdonecount": signdonecount.length,
      "all": signdonecount.length,
      "pdfnotgenerate": pdfnotgenerate.length
    }
    setShowCount1(count)
  }

  // -----------------------

  // -----------------------









  useEffect(() => {
    countDashboard();
    GetClients();
    GetAllTemplates();
  }, [])




  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <div className='d-flex mb-5'>
          <Typography variant="h4" className='flex-grow-1'  >
            Admin Dashboard
          </Typography>
          <Button className="mx-1" style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/admin/addclient" startIcon={<Iconify icon="line-md:plus" />}>
            Add Client
          </Button>

        </div>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} >
            <NavLink
              to={"/admin/clientlist?cl=nan"}
              style={{ textDecoration: 'none' }}
            >
              <AppWidgetSummary className="icon-img" title="All Users" total={showCount.alluser} icon={'fa-solid:users'} />
            </NavLink>
          </Grid>
          <Grid item xs={12} sm={6} md={4} >
            <NavLink
              to={"/admin/templetelist"}
              style={{ textDecoration: 'none' }}
            >
              <AppWidgetSummary className="icon-img" title="All Templates" total={showTempCount} color="info" icon={'mdi:email-resend-outline'} />
            </NavLink>
          </Grid>

          <Grid item xs={12} sm={6} md={4}  >
            <NavLink
              to={"/admin/BulkClientList?done=1"}
              style={{ textDecoration: 'none' }}
            >
              <AppWidgetSummary className="icon-img" title="E-Sign Done" total={showCoun1t.signdonecount} color="info" icon={'fa6-solid:user-large'} />
            </NavLink>
          </Grid>

          <Grid item xs={12} sm={6} md={4} >
            <NavLink
              to={"/admin/BulkClientList?pending=2"}
              style={{ textDecoration: 'none' }}
            >
              <AppWidgetSummary className="icon-img" title="E-Sign Pending" total={showCoun1t.SignNotDoneCount} color="info" icon={'fa6-solid:user-large-slash'} />
            </NavLink>
          </Grid>
          <Grid item xs={12} sm={6} md={4} >
            <NavLink
              to={"/admin/BulkClientList?linkexpiry=3"}
              style={{ textDecoration: 'none' }}
            >
              <AppWidgetSummary className="icon-img" title="Link Expired" total={showCoun1t.LinkExpired} color="info" icon={'mdi:email-resend-outline'} />
            </NavLink>
          </Grid>
          <Grid item xs={12} sm={6} md={4} >
            <NavLink
              to={"/admin/BulkClientList?notgenderate=4"}
              style={{ textDecoration: 'none' }}
            >
              <AppWidgetSummary className="icon-img" title="Pdf Not Generated" total={showCoun1t.pdfnotgenerate} color="info" icon={'mdi:email-resend-outline'} />
            </NavLink>
          </Grid>

          {/* 
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

        </Grid>
      </Container>
    </Page>
  );
}
