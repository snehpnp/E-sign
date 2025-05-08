import React, { useEffect, useState } from 'react';
import { Card, Stack, TextField, Button, Container, Typography } from '@mui/material';
import Page from '../../../components/Page';
import { getUsersById, getAdminById, GetPackage } from '../../../services';


import { dateFormate } from '../../../utils/formatTime';

const PackageDetails = () => {
  const AdminId = JSON.parse(localStorage.getItem('admin')).id;
  const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;

  const [adminDeatils, setAdminDetails] = useState('');

  const getAdminByIdData = async () => {
    const response = await getAdminById(AdminToken, AdminId)
    // if (response) {
    const data = {
      'id': response.package_id,
      'admin_id': AdminId
    }

    const respons1 = await GetPackage(AdminToken, data)
    setAdminDetails(respons1[0]);
  }
  
  console.log("admin package",  adminDeatils && adminDeatils.start_service);




  useEffect(() => {
    getAdminByIdData()
  }, [])



  return (

    <div>
      <Page title="User">
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Package Information
            </Typography>
          </Stack>
          <Card>

            <div className='container'>
              <div className='MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular tss-tlx3x1-MUIDataTableToolbar-root css-hyum1k-MuiToolbar-root '>
                <div className='col-md-11 mx-auto py-5'>
                  <h4>Package Details</h4>
                  <table className='table table-bordered text-center  '>
                    <thead>
                      <tr>
                        <th>Package Name</th>
                        <th>Recharge</th>
                        <th>Package Validity</th>
                        <th>Plan Started </th>
                        <th>Plan Expiry</th>
                      </tr>

                    </thead>
                    <tbody className='text-center'>
                      <tr>
                        <td>
                          {adminDeatils && adminDeatils.packagedetails.name}
                        </td>
                        <td>
                          {adminDeatils && adminDeatils.packagedetails.price}
                        </td>
                        <td>
                          {adminDeatils && adminDeatils.packagedetails.package_validity} {adminDeatils && adminDeatils.packagedetails.package_day_month}
                        </td>
                        <td>
                          {dateFormate(adminDeatils && adminDeatils.start_service)}
                        </td>
                        <td>
                          {dateFormate(adminDeatils && adminDeatils.end_service)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h4 className='mt-4'>Price</h4>
                  <table className='table table-bordered text-center ' >
                    <thead >
                      <tr>
                        <th>Aadhar E-Sign</th>
                        <th>Aadhar verification</th>
                        <th>Pan Verification</th>

                      </tr>

                    </thead>
                    <tbody className='text-center'>
                      <tr>
                        <td>
                          {adminDeatils && adminDeatils.packagedetails.adhar_sign_price}
                        </td>
                        <td>
                          {adminDeatils && adminDeatils.packagedetails.adhar_verify_price}
                        </td>
                        <td>
                          {adminDeatils && adminDeatils.packagedetails.pan_verify_price}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <h4>Package Validity</h4>
            <table className='table table-bordered '>
            <thead>
            <tr>
            <th>Created Date</th>
            <th>Expired Data</th>
            <th>Pan Verification</th>
            </tr>

            </thead>
            <tbody>
            <tr>
            <td>
            {adminDeatils.createdAt}
            </td>
            <td>
            {adminDeatils.adhar_verify_price}
            </td>
            <td>
            {adminDeatils.pan_verify_price}</td>
            </tr>
              </tbody>
            </table> */}
                </div>

              </div>
            </div>
          </Card>
        </Container >
      </Page >
    </div>
  )
}

export default PackageDetails