import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Card, Stack, TextField, Button, Container, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Col, Form, Row } from 'react-bootstrap';
import { useFormik, FormikProvider } from 'formik';
import * as Common from '../../utils/CommonMessage';


const StampsArray = [
  {
    stampLogo: "100",
    stampValue: "100"
  },
  {
    stampLogo: "200",
    stampValue: "200"
  },
  {
    stampLogo: "500",
    stampValue: "500"
  },
  {
    stampLogo: "1000",
    stampValue: "1000"
  }
]

export default () => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [pan, setPan] = useState(false);
  const [adhaar, setAdhar] = useState(false);
  const [adharSign, setAdharSign] = useState(false);
  const [eStampValues, setEStampValues] = useState([]);

  const registerForm = Yup.object().shape({
    fund: Yup.string().required(Common.FUNDS),
    companyEmail: Yup.string().email(Common.EMAIL_VALIDATION).required(Common.COMPANY_EMAIL),
  });

  const formik = useFormik({
    initialValues: {
      fund: '',
      personalContact: '',
    },
    validationSchema: registerForm,
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  const checkBoxEvent = (e) => {
    // console.log("evalue", e.value)
    if (e.checked) {
      setEStampValues([...eStampValues, e.value])
    } else {
      setEStampValues(eStampValues.filter((tag, index) => tag !== e.value));
    }
  }

  return (
    <div>

      <Typography variant="h4" className="ms-4" gutterBottom>
        Funds And Verification Details
      </Typography>

      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>

          <Row className="mb-3 ms-3 my-3">

            <Form.Group as={Col} controlId="formGridCompanyContact">
              <TextField style={{ width: 400 }} label="Funds" type='number' color="secondary"
                {...getFieldProps('fund')}
                error={Boolean(touched.fund && errors.fund)}
                helperText={touched.fund && errors.fund} />
            </Form.Group>


            <Form.Group as={Col} controlId="formGridSelect">
              <Typography sx={{ fontWeight: 'bold', m: 1 }}>Verification</Typography>
              <FormControlLabel value="1" control={<Checkbox />} label="Aadhar Verify" labelPlacement="Start" onChange={(e) => setPan(e.target.checked)} />

              <FormControlLabel value="1" control={<Checkbox />} label="Pan Verify" labelPlacement="Start" onChange={(e) => setAdhar(e.target.checked)} />
              <br />
              <FormControlLabel value="1" control={<Checkbox />} label="Aadhar Sign" labelPlacement="Start" onChange={(e) => setAdharSign(e.target.checked)} />

              {/* not to uncomment */}

              {/* <FormControlLabel onChange={(e) => setEStamp(e.target.checked)} value="top" control={<Checkbox />} label="E-Stamp" labelPlacement="Start" /> */}
              <br />

              <>
                <Typography sx={{ fontWeight: 'bold', m: 1 }}>Stamps</Typography>
                <div className='ms-auto d-flex'>
                  {
                    StampsArray.map((item) => (
                      <>
                        <FormControlLabel control={<Checkbox />} label={item.stampLogo} labelPlacement="Start" value={item.stampLogo} onChange={(e) => checkBoxEvent(e.target)} />
                        <br />
                      </>
                    ))
                  }
                </div>
              </>
            </Form.Group>

          </Row>

        </Form>
      </FormikProvider>



      {/* <div className='row'>
        <div className='six columns'>
        
          <input
            className='u-full-width required'
            placeholder='Password'
            type='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
          
          />
        </div>
      </div>
      <div className='row'>
        <div className='six columns'>
          
          <input
            className='u-full-width'
            placeholder='Confirm Password'
            type='password'
            onChange={e => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
          />
        </div>
      </div> */}
    </div>
  )
}
