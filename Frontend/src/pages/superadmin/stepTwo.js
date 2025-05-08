import React, { useEffect, useState } from 'react'
import { Card, Stack, TextField, Button, Container, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, FormikProvider } from 'formik';
import * as Common from '../../utils/CommonMessage';

export default () => {
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')

  const registerForm = Yup.object().shape({
    companyName: Yup.string().required(Common.COMPANY_NAME),
    companyEmail: Yup.string().email(Common.EMAIL_VALIDATION).required(Common.COMPANY_EMAIL),
    companyContact: Yup.string().max(10).required(Common.COMPANY_CONTACT),
    companyDomain: Yup.string().required(Common.COMPANY_DOMAIN),
    companyAddress: Yup.string().required(Common.ADDRESS),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      personalContact: '',
      email: '',
      companyAddress: '',
    },
    validationSchema: registerForm,
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <div>

      <Typography variant="h4" className="ms-4" gutterBottom>
        Company Details
      </Typography>

      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>

          <Row className="mb-3 ms-3 my-3">
            <Form.Group as={Col} controlId="formGridCompanyName">
              <TextField style={{ width: 400 }} label="Company Name" type='text' color="secondary" {...getFieldProps('companyName')}
                error={Boolean(touched.companyName && errors.companyName)}
                helperText={touched.companyName && errors.companyName} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCompanyEmail">
              <TextField style={{ width: 400 }} label="Company Email" type='email' color="secondary"
                {...getFieldProps('companyEmail')}
                error={Boolean(touched.companyEmail && errors.companyEmail)}
                helperText={touched.companyEmail && errors.companyEmail} />
            </Form.Group>

          </Row>

          <Row className="mb-3 ms-3">

            <Form.Group as={Col} controlId="formGridCompanyContact">
              <TextField style={{ width: 400 }} label="Company Contact" type='number' color="secondary"
                {...getFieldProps('companyContact')}
                error={Boolean(touched.companyContact && errors.companyContact)}
                helperText={touched.companyContact && errors.companyContact} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCompanyDomain">
              <TextField style={{ width: 400 }} label="Company Domain" type='text' color="secondary"
                {...getFieldProps('companyDomain')}
                error={Boolean(touched.companyDomain && errors.companyDomain)}
                helperText={touched.companyDomain && errors.companyDomain}
              />
            </Form.Group>

          </Row>

          <Row className="mb-3 ms-3">

            <Form.Group as={Col} controlId="formGridCompanyEmail">
              <TextField label="Company Address" multiline rows={4} style={{ width: 400 }} color="secondary"
                {...getFieldProps('companyAddress')}
                error={Boolean(touched.companyAddress && errors.companyAddress)}
                helperText={touched.companyAddress && errors.companyAddress}
              />
            </Form.Group>

          </Row>

        </Form>
      </FormikProvider>



      {/* <div className='row'>
        <div className='six columns'>

          <input
            className='u-full-width required'
            placeholder='test@mailbox.com'
            type='email'
            onChange={e => setEmail(e.target.value)}
            value={email}

          />
        </div>
      </div>
      <div className='row'>
        <div className='six columns'>

          <input
            className='u-full-width'
            placeholder='Confirm email'
            type='email'
            onChange={e => setEmailConfirm(e.target.value)}
            value={emailConfirm}
          />
        </div>
      </div> */}
    </div>
  )
}
