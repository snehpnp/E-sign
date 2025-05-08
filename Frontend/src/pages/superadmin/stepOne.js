import React, { useEffect, useState } from 'react'
import { Card, Stack, TextField, Button, Container, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, FormikProvider } from 'formik';
import * as Common from '../../utils/CommonMessage';

export default () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const registerForm = Yup.object().shape({
    fullName: Yup.string().required(Common.FULL_NAME),
    personalContact: Yup.string().max(10).required(Common.PERSONAL_CONTACT),
    email: Yup.string().email(Common.EMAIL_VALIDATION).required(Common.EMAIL_REQUIRE),
    address: Yup.string().required(Common.ADDRESS)
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      personalContact: '',
      email: '',
      address: '',
    },
    validationSchema: registerForm,
  })


  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  return (
    <div>

      <Typography variant="h4" className="ms-4" gutterBottom>
        Personal Details
      </Typography>

      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>

          <Row className="mb-3 ms-3 my-3">
            <Form.Group as={Col} controlId="formGridFullName">
              <TextField style={{ width: 400 }} label="Last Name" type='text' color="secondary"
                {...getFieldProps('fullName')}
                error={Boolean(touched.fullName && errors.fullName)}
                helperText={touched.fullName && errors.fullName} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPersonalContact">
              <TextField style={{ width: 400 }} label="Personal Contact" type='number' color="secondary"
                {...getFieldProps('personalContact')}
                error={Boolean(touched.personalContact && errors.personalContact)}
                helperText={touched.personalContact && errors.personalContact} />
            </Form.Group>

          </Row>

          <Row className="mb-3 ms-3">

            <Form.Group as={Col} controlId="formGridEmail">
              <TextField style={{ width: 400 }} label="Email" type='email' color="secondary"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCompanyEmail">
              <TextField label="Address" multiline rows={4} style={{ width: 400 }} color="secondary"
                {...getFieldProps('address')}
                error={Boolean(touched.address && errors.address)}
                helperText={touched.address && errors.address}
              />
            </Form.Group>

          </Row>

        </Form>
      </FormikProvider>
      {/* </div> */}

      {/* <div className='row mb-3 d-flex'>
        <div className='col-md-6'> */}

      {/* <input
            className='form-control'
            placeholder='First Name'
            type='text'
            onChange={e => setFirstName(e.target.value)}
            value={firstName}

          /> */}

      {/* <div className='col-md-6'>

          <input
            className='form-control'
            placeholder='Last Name'
            type='text'
            onChange={e => setLastName(e.target.value)}
            value={lastName}
          />
        </div> */}
      {/* </div> */}
    </div>
  )
}
