import React, { useEffect, useState } from 'react'
import { Card, Stack, TextField, Button, Container, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik, FormikProvider } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import * as Common from '../../utils/CommonMessage';
import { getAllPackages } from '../../services';


export default () => {
  const [checked, setChecked] = useState('')
  const [data, setData] = useState([]);

  const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

  const registerForm = Yup.object().shape({
    fullName: Yup.string().required(Common.FULL_NAME),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
    },
    validationSchema: registerForm,
  })


  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  // Get API For Get Packages Data

  const getPackages = async () => {
    const response = await getAllPackages(SuperAdminToken)
    if (response) {
      //  console.log("respo",response);
      setData(response);
    }
  }
  useEffect(() => {
    getPackages();
  }, []);

  return (
    <div>

      <Typography variant="h4" className="ms-4" gutterBottom>
        Personal Details
      </Typography>

      <FormikProvider value={formik}>
        <Form noValidate onSubmit={handleSubmit}>

          <Row className="mb-3 ms-3 my-3">
            <Form.Group as={Col} controlId="formGridSelect">
              <TextField
                select
                label="Packages"
                style={{ width: 400 }}
                {...getFieldProps('package_id')}
                error={Boolean(touched.package_id && errors.package_id)}
                helperText={touched.package_id && errors.package_id}
              >
                {data && data.map((item) => (
                  <MenuItem value={item.id} >{item.name}</MenuItem>
                ))}
              </TextField>
            </Form.Group>

          </Row>

        </Form>
      </FormikProvider>

      {/* <div className='row'>
        <div className='ten columns terms'>
          <span>By clicking "Accept" I agree that:</span>
          <ul className='docs-terms'>
            <li>
              I have read and accepted the <a href='#'>User Agreement</a>
            </li>
            <li>
              I have read and accepted the <a href='#'>Privacy Policy</a>
            </li>
            <li>I am at least 18 years old</li>
          </ul>
         
            <input
              type='checkbox'
              //   defaultChecked={this.state.checked}
              checked={checked}
              onChange={e => setChecked(e.target.value)}
           
            />
            <span> Accept </span>{' '}
        
        </div>
      </div> */}
    </div>
  )
}
