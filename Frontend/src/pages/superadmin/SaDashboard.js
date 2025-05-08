// import React, { useEffect, useState } from 'react'
// import { Link as RouterLink, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
// // @mui
// import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography } from '@mui/material';
// // components
// import Page from '../../components/Page';
// import Iconify from '../../components/Iconify';
// import { dashboardCount } from '../../services';

// // sections
// import { AppWidgetSummary } from '../../sections/@dashboard/app';

// // ----------------------------------------------------------------------

// export default function SaDashboard() {

//   const [showCount, setShowCount] = useState("");
//   // console.log("countda", countdata);
// //  const navigate = useNavigate()


//   const SuperAdminID = JSON.parse(localStorage.getItem('superadmin')).id;
//   const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

//   // console.log("token", SuperAdminToken);


//   const countDashboard = () => {
//     const data = {
//       "superadminid": SuperAdminID,
//     }
//     const response = dashboardCount(data, SuperAdminToken)
//     response.then((val) => {
//       if (val) {

//         setShowCount(val)
//       }
//     })
//   }
//   // console.log("count", showCount);
//   // console.log("countda", companyCount);


//   useEffect(() => {
//     countDashboard();
//   }, [])

//   const { activecompany, companycount, inactivecompany, packagecount } = showCount


//   return (
//     <Page title="Dashboard">
//       <Container maxWidth="xl">
//         <Typography variant="h4" sx={{ mb: 5 }}>
//           Hi, Welcome back
//         </Typography>
//         {/* component={RouterLink} to="/superadmin/activecompany" */}

//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary  total={activecompany} title="Company Count" component={RouterLink} to="/superadmin/activecompany"  icon={'akar-icons:people-group'} />
//           {/* <NavLink component={RouterLink} to="/superadmin/activecompany"  className="text-center">Active Company</NavLink> */}
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Company Count" total={companycount} color="info" icon={'mingcute:counter-line'} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Inactive Company" total={inactivecompany} color="warning" icon={'carbon:screen-off'} />
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <AppWidgetSummary title="Package Count" total={packagecount} color="error" icon={'lucide:package'} />
//           </Grid>

//         </Grid>
//       </Container>
//     </Page>
//   );
// }



import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate, useParams, useLocation, NavLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { dashboardCount, getAdmins , ExpireCompanyList} from '../../services';

// sections
import { AppWidgetSummary } from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function SaDashboard() {
  var active = []
  var inactive = []
  var expired = []
  var allcpany = []

  const [showCount, setShowCount] = useState("");
  const [showCount1, setShowCount1] = useState("");

  // console.log("countda", countdata);
  //  const navigate = useNavigate()


  const SuperAdminID = JSON.parse(localStorage.getItem('superadmin')).id;
  const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

  // console.log("token", SuperAdminToken);


  const countDashboard = () => {
    const data = {
      "superadminid": SuperAdminID,
    }
    const response = dashboardCount(data, SuperAdminToken)
    response.then((val) => {
      if (val) {

        setShowCount(val)
      }
    })
  }
  // console.log("count", showCount);
  // console.log("countda", companyCount);


  const GetClients = async () => {

    const data = {
      "superadminid": SuperAdminID
    }

    const response = await getAdmins(SuperAdminToken);
    //   console.log("hellowordl", response);

    if (response) {
      setShowCount(response)
      response.filter((item) => {
        if (item.status === 1) {
          return active.push(item);

        }
        else if (item.status === 0) {
          return inactive.push(item);
          //  console.log("0" , item);

          // return item.status === parseInt(location.search.split('=')[1])
        }

        else if (new Date(item.expiry_date) < new Date() && item.status === 1) {
          return expired.push(item);
          // console.log("2" , item);

        }

        else if (item.status === 1 && item.status === 0) {
          return allcpany.push(item);
        }

      }
      )


      // }
      const respo = await ExpireCompanyList(data, SuperAdminToken)

      // if (response) {
      //   setData(respo);
      // }


      const count = {
        'active': active.length,
        "inactive": inactive.length,
        "expired": expired.length,
        "allcpany": active.length + inactive.length,
        "expired": respo.length
      }
      console.log("count", count);

      setShowCount1(count)

    }
  }
  // console.log("arr", showCoun1t);


  useEffect(() => {
    countDashboard();
    GetClients();
  }, [])

  const { activecompany, companycount, inactivecompany, packagecount } = showCount

  // const {  inactive, expired, allcpany } = showCount1


  console.log("allcpany", showCount1);




  return (

    <Page title="Dashboard">


      <Container maxWidth="xl">
        <div className='d-flex mb-5'>
          <Typography variant="h4" className='flex-grow-1'  >
            Dashboard
          </Typography>
          <Button className="mx-1" style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/addadmin" startIcon={<Iconify icon="line-md:plus" />}>
            Add Company
          </Button>
          <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/addpackages" startIcon={<Iconify icon="line-md:plus" />}>
            Add Package
          </Button>

        </div>


        {/* component={RouterLink} to="/superadmin/activecompany" */}

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <NavLink
              to={"/superadmin/adminlist/?cl=nan"}
              style={{ textDecoration: 'none' }}
            >
              {/* <AppWidgetSummary title="Company Count" total={companycount} color="info" icon={'mingcute:counter-line'} /> */}
              <AppWidgetSummary title="Company Count" total={showCount1.allcpany} color="info" icon={'mingcute:counter-line'} />
            </NavLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <NavLink
              to={"/superadmin/adminlist?active=1"}
              style={{ textDecoration: 'none' }}
            >
              {/* <AppWidgetSummary total={activecompany} title="Active Company" icon={'akar-icons:people-group'} /> */}
              <AppWidgetSummary total={showCount1.active} title="Active Company" icon={'akar-icons:people-group'} />
            </NavLink>
          </Grid>



          <Grid item xs={12} sm={6} md={3}>
            <NavLink
              to={"/superadmin/adminlist?inactive=0"}
              style={{ textDecoration: 'none' }}
            >
              {/* <AppWidgetSummary title="Inactive Company" total={'d'} color="warning" icon={'carbon:screen-off'} /> */}
              <AppWidgetSummary title="Inactive Company" total={showCount1.inactive} color="warning" icon={'carbon:screen-off'} />
            </NavLink>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <NavLink
              to={"/superadmin/expirecomapny"}
              style={{ textDecoration: 'none' }}
            >
              {/* <AppWidgetSummary title="Expired Company" total={inactivecompany} color="error" icon={'lucide:package'} /> */}
              <AppWidgetSummary title="Expired Company" total={showCount1.expired} color="error" icon={'lucide:package'} />
            </NavLink>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <NavLink
              to={"/superadmin/packages"}
              style={{ textDecoration: 'none' }}
            >
              <AppWidgetSummary title="Package Count" total={packagecount} color="error" icon={'lucide:package'} />
            </NavLink>
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
