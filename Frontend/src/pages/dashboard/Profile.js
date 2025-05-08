import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useHistory } from 'react-router-dom';
import { Card, Stack, TextField, Button, Container, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import Iconify from '../../components/Iconify';
import AlertMessages from "../../utils/AlertMessages";
import { getUsersById, getAdminById, ChangePassword } from '../../services';





const Profile = () => {

  const navigate = useNavigate()
  const AdminId = JSON.parse(localStorage.getItem('admin')).id;
  const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
  const [adminDeatils, setAdminDetails] = useState("");

  // alert 
  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")

  const hideClose = () => {
    setAlertMsg(false)
  }

  // console.log("adminDeatils", adminDeatils);

  const [refresh, setrefresh] = useState(true)

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [oldPasswordErr, setOldPasswordErr] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState();



  const getAdminByIdData = async () => {
    const response = await getAdminById(AdminToken, AdminId)
    // console.log("details ", response);
    if (response) {
      setAdminDetails(response);
    }
  }

  useEffect(() => {
    getAdminByIdData()
  }, [refresh])



  //  Change Password 


  const ResetPassword = async (e) => {

    e.preventDefault();

    if (oldPassword === "") {
      setOldPasswordErr("Please Enter Old Password")
      return
    }
    if (newPassword === "") {
      setNewPasswordErr("Please Enter New Password")
      return
    }
    if (confirmPassword === "") {
      setConfirmPasswordErr("Please Enter Old Password")
      return
    }
    // if (oldPassword !== newPassword) {
    //   setAlertMsg(true);
    //   setAlertColor("success");
    //   setTextAlert("Old Password And New Password Are Not Match ");
    //   // setConfirmPasswordErr("Old Password And New Password Are Not Match ")
    //   return
    // }s
    if (newPassword !== confirmPassword) {
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert("New  Password And Old  Password Are Not Match  ");
      return
    }





    const data = {
      "id": AdminId,
      "password": newPassword,
      "old_password": oldPassword
    }




    const response = await ChangePassword(AdminToken, data)

    if (response) {
      setAlertMsg(true);
      setAlertColor("success");
      setTextAlert(response.data.message);

      setrefresh(!refresh)
      // setInterval(() =>
        navigate('/admin/dashboard')
        // , 2000)
      // setOldPassword("")
      // setNewPassword("")
      // setConfirmPassword("")

    }
    else {
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert("succsadfsdfsfgsess");
    }
  }








  return (
    <div>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
          <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/admin/dashboard" startIcon={<Iconify icon="line-md:arrow-left" />}>
            Back
          </Button>
        </Stack>
        <div className='container'>


          <div className='row d-flex justify-content-evenly '>

            <div className="col-md-5 text-center py-5" style={{ background: '#fff', borderRadius: '20px' }}>
              <img className='mx-auto' src='https://cdn-icons-png.flaticon.com/128/1177/1177568.png' alt="..." />

              <h4 className='pt-3'>{adminDeatils.username}</h4>
              <p className='my-0'>Email :-  {adminDeatils.company_email}</p>
              <p className='my-0'>Contact :-{adminDeatils.company_contact}</p>
              {/* <p className='my-0'>:{adminDeatils.fund}</p> */}
            </div>
            <div className="col-md-6 p-4" style={{ background: '#fff', borderRadius: '20px' }}>
              <h4 className='mb-4'>Change Password</h4>
              <Form.Group className="mb-3" as={Col} controlId="formGridFullName">
                <TextField className="mb-4" style={{ width: 465 }} label="Old Password" type='Password' color="secondary" onChange={(e) => { setOldPassword(e.target.value); setOldPasswordErr('') }} />
                {oldPasswordErr ? <p style={{ color: 'red' }}>{oldPasswordErr}</p> : ""}
                <TextField className="mb-4" style={{ width: 465 }} label="New Password" type='Password' color="secondary" onChange={(e) => { setNewPassword(e.target.value); setNewPasswordErr("") }} />
                {newPasswordErr ? <p style={{ color: 'red' }}>{newPasswordErr}</p> : ""}
                <TextField className="mb-4" style={{ width: 465 }} label="Confirm Password" type='Password' color="secondary" onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordErr("") }} />

                {confirmPasswordErr ? <p style={{ color: 'red' }}>{confirmPasswordErr}</p> : ""}
              </Form.Group>

              <Button style={{ color: '#fff' }} variant="contained" onClick={(e) => ResetPassword(e)}>
                Submit
              </Button>
            </div>

          </div>
        </div>
      </Container>


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
    </div>
  )
}

export default Profile