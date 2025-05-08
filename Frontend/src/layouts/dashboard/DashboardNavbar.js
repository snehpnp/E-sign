
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
//
import AccountPopover from './AccountPopover';
import { getAdminById } from "../../services";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

// const adminid = JSON.parse(localStorage.getItem('admin')).id;


DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {

  const AdminId = JSON.parse(localStorage.getItem('admin')).id;
  const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
  const [adminDeatils, setAdminDetails] = useState("");
  const [refresh, setrefresh] = useState(true)


  const getAdminByIdData = async () => {
    const response = await getAdminById(AdminToken, AdminId)
  //  console.log("details ", response.fund);
    if (response) {
      setAdminDetails(response.fund);
      setrefresh(true)
    }
  }

  useEffect(() => {
    getAdminByIdData()
  }, [refresh])


  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}
          <Typography variant="h6" noWrap >
            <p className="text-white  funds"><b> Balance : <span className='ps-1'> ₹ { adminDeatils && adminDeatils}</span></b></p>
          </Typography>

          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
