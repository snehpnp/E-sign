import React, { useEffect, useState } from 'react'
import "./app.css";
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { Base64 } from "js-base64";
import { ForgetPassword } from '../services';
import AlertMessages from '../utils/AlertMessages';

const ForgretResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const userid = location.pathname.split("/")[2];

  const clientid = JSON.parse(Base64.decode(userid))

  const [newPassword, setnewPassword] = useState('');
  const [newPasswordErr, setnewPasswordErr] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [ConfirmPasswordErr, setConfirmPasswordErr] = useState('');

  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")

  const hideClose = () => {
    setAlertMsg(false)
  }




  const SetPassword = async (e) => {


    if (newPassword === "") {
      setnewPasswordErr("* Please Enter The Valid Password")
      return
    }
    if (ConfirmPassword === "") {
      setConfirmPasswordErr("* Please Enter The Valid Confirm Password")
      return
    }
    if (newPassword !== ConfirmPassword) {
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert("* New Password and Confirm Password Are Not Match");
      return
    }

    e.preventDefault();
    const data = {
      "id": clientid,
      "password": newPassword
    }
    const response = await ForgetPassword(data)
    // console.log("response", response);
    if (response.status === 200) {
      setAlertMsg(true);
      setAlertColor("success");
      setTextAlert("Reset Password Link Send Successfully , please Chack Your Email");
      setTimeout(() => navigate('/login'), 1000);
    }
    else if (response.status === 404) {
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert(response.data.message);
    }
  }
















  return (
    <section style={{ overflowX: 'hidden' }}>

      <div className='row d-flex align-items-center'>
        <div className='col-md-5 d-none d-md-block' style={{ background: '#000', height: '100vh' }}>
          <a href="#"><img src="/images/e-sign-aadhaar.png" className="w-50 m-auto logo-img" alt="e-sign" style={{ position: 'relative', top: '40%' }} /></a>
          {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography> */}

        </div>
        <div className='col-md-7 col-sm-12 restpassword'>
        <a href="#"><img src="/images/e-sign-aadhaar.png" className="w-50 m-auto logo-img d-block d-md-none" alt="e-sign"  /></a>

          <div className='w-100 d-flex justify-content-center align-items-center form-div'>
          <form className='w-100'>
              <h2 className='d-flex justify-content-center'>Reset Password</h2>

              <div className='row mt-3 '>
                <div className='col-md-12 d-flex justify-content-center'>
                  <TextField id="outlined-basic" label="New Password" variant="outlined" className="mx-auto" style={{width:'70%'}} onChange={(e) => { setnewPassword(e.target.value); setnewPasswordErr('') }} /></div>

                {newPasswordErr ? <p style={{ color: 'red' }}>{newPasswordErr}</p> : " "}
              </div>
              <div className='row mt-3'>
                <div className='col-md-12 d-flex justify-content-center'>
                  <TextField id="outlined-basic" label="Confirm Password" variant="outlined" className="mx-auto" style={{width:'70%'}} onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordErr('') }} />
                </div>
                {ConfirmPasswordErr ? <p style={{ color: 'red' }}>{ConfirmPasswordErr}</p> : " "}
              </div>
              <div className='row mt-3'>
                <div className='col-md-12  d-flex justify-content-center'>
                  <button className="" type="submit" id="mui-3" style={{ width:'70%' , padding: '15px 25px', borderRadius: '5px', background: '#0cc730', border: '0', color: '#fff' }} onClick={(e) => SetPassword(e)}>Login</button></div>

              </div>
            </form>
          </div>
        </div>
      </div>
      {alertMsg &&
        <AlertMessages
          hideAlert={hideClose}
          showAlert={alertMsg}
          message={textAlert}
          alertColor={alertColor}
        />}
    </section>
  )
}

export default ForgretResetPassword