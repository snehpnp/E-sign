import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Card, Stack, TextField, Button, Container, Typography, } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import MenuItem from '@mui/material/MenuItem';
import { useFormik, FormikProvider } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import AlertMessages from '../../../utils/AlertMessages';
import { addPackage } from '../../../services';
import * as Common from '../../../utils/CommonMessage';


function AddPackage() {

    const [alertMsg, setAlertMsg] = useState(false)
    const [alertColor, setAlertColor] = useState("")
    const [textAlert, setTextAlert] = useState("")

    const navigate = useNavigate()
    const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;


    const registerForm = Yup.object().shape({
        name: Yup.string().required(Common.PACKAGE_NAME),
        price: Yup.string().required(Common.PRICE),
        package_validity: Yup.string().when("package_day_month", {
            is: (packageDayMonth) => packageDayMonth !== 'UNLTD',
            then: Yup.string().required(Common.PACKAGE_VALIDITY),
            otherwise: Yup.string(),
        }),
        // Yup.string().required('Package Validity Required'),
        package_day_month: Yup.string().required(Common.PACKAGE_DAY_MONTH),
        adhar_sign_price: Yup.string().required(Common.AADHAR_SIGNATURE),
        adhar_verify_price: Yup.string().required(Common.AADHAR_VERIFICATION),
        pan_verify_price: Yup.string().required(Common.PAN_VERIFICATION),
        package_details: Yup.string().required(Common.PACKAGE_DETAILS)
    });


    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            package_validity: '',
            package_day_month: '',
            adhar_sign_price: '',
            adhar_verify_price: '',
            pan_verify_price: '',
            package_details: '',

        },
        validationSchema: registerForm,

        onSubmit: async () => {
            const response = await addPackage(values, SuperAdminToken);
            if (response) {
                // console.log("response", response.message)
            }
            if (response.message) {
                setAlertMsg(true)
                setAlertColor("success")
                setTextAlert(response.message)
                setTimeout(() => navigate('/superadmin/packages'), 1000)
            }
        },
    })

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    const hideClose = () => {
        setAlertMsg(false)
    }

    return (
        <>
            <Page title="AddPackage">
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Add Package
                        </Typography>
                        <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/packages" startIcon={<Iconify icon="line-md:arrow-left" />}>
                            Back
                        </Button>
                    </Stack>
                    <Card>
                        <FormikProvider value={formik}>
                            <Form noValidate onSubmit={handleSubmit}>
                                <Typography variant="h6" >
                                 Package Fields
                                </Typography>
                                <Row className="mb-3 ms-3 my-3">
                                    <Form.Group as={Col} controlId="formGridCompanyName">
                                        <TextField style={{ width: 400 }} label=" Name" type='text' color="secondary" {...getFieldProps('name')}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridFullName">
                                        <TextField style={{ width: 400 }} label="Recharge" type='number' color="secondary"
                                            {...getFieldProps('price')}
                                            error={Boolean(touched.price && errors.price)}
                                            helperText={touched.price && errors.price} />
                                    </Form.Group>
                                </Row>


                                <Row className="mb-3 ms-3">
                                    <Form.Group as={Col} controlId="formGridSelect">
                                        <TextField
                                            select
                                            label="Package Day/Month"
                                            style={{ width: 400 }}
                                            {...getFieldProps('package_day_month')}
                                            error={Boolean(touched.package_day_month && errors.package_day_month)}
                                            helperText={touched.package_day_month && errors.package_day_month}
                                        >
                                            <MenuItem value='Day' >Day</MenuItem>
                                            <MenuItem value='Month' >Month</MenuItem>
                                            <MenuItem value='Year' >Year</MenuItem>
                                            <MenuItem value='UNLTD' >UNLTD</MenuItem>

                                        </TextField>
                                    </Form.Group>

                                    {values.package_day_month === "UNLTD" ? "" : <Form.Group as={Col} controlId="formGridCompanyDomain">
                                        <TextField style={{ width: 400 }} label="Package Validity" type='number' color="secondary"
                                            {...getFieldProps('package_validity')}
                                            error={Boolean(touched.package_validity && errors.package_validity)}
                                            helperText={touched.package_validity && errors.package_validity}
                                        />
                                    </Form.Group>}
                                </Row>

                                <Typography variant="h6" >
                                    Verification Types And Price
                                </Typography>
                                {/* <Row className="mb-3 ms-3">
                                    <Form.Group as={Col} controlId="formGridSelect">
                                        <TextField
                                            select
                                            label="Signature Validity"
                                            style={{ width: 400 }}
                                            {...getFieldProps('signature_validity')}
                                            error={Boolean(touched.signature_validity && errors.signature_validity)}
                                            helperText={touched.signature_validity && errors.signature_validity}
                                        >
                                            <MenuItem value='Validity' >Validity</MenuItem>
                                            <MenuItem value='UNLTD' >UNLTD</MenuItem>
                                        </TextField>
                                    </Form.Group>
                                    {values.signature_validity === "UNLTD" ? " " : <Form.Group as={Col} controlId="formGridCompanyEmail">
                                        <TextField style={{ width: 400 }} label="Signature Count" type='number' color="secondary"
                                            {...getFieldProps('signature_count')}
                                            error={Boolean(touched.signature_count && errors.signature_count)}
                                            helperText={touched.signature_count && errors.signature_count} />
                                    </Form.Group>}

                                </Row> */}

                                <Row className="mb-3 ms-3 my-3">
                                    <Form.Group as={Col} controlId="adhar_sign_price">
                                        <TextField style={{ width: 400 }} label="Aadhaar Signature Price" type='number' color="secondary"
                                            {...getFieldProps('adhar_sign_price')}
                                            error={Boolean(touched.adhar_sign_price && errors.adhar_sign_price)}
                                            helperText={touched.adhar_sign_price && errors.adhar_sign_price}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="adhar_verify_price">
                                        <TextField style={{ width: 400 }} label="Aadhaar Verification Price" type='number' color="secondary"
                                            {...getFieldProps('adhar_verify_price')}
                                            error={Boolean(touched.adhar_verify_price && errors.adhar_verify_price)}
                                            helperText={touched.adhar_verify_price && errors.adhar_verify_price}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3 ms-3">

                                    <Form.Group as={Col} controlId="pan_verify_price">
                                        <TextField style={{ width: 400 }} label="PAN Verification Price" type='number' color="secondary"
                                            {...getFieldProps('pan_verify_price')}
                                            error={Boolean(touched.pan_verify_price && errors.pan_verify_price)}
                                            helperText={touched.pan_verify_price && errors.pan_verify_price}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridCompanyEmail">
                                        <TextField label="Package Details" multiline rows={4} style={{ width: 400 }} color="secondary"
                                            {...getFieldProps('package_details')}
                                            error={Boolean(touched.package_details && errors.package_details)}
                                            helperText={touched.package_details && errors.package_details}
                                        />
                                    </Form.Group>
                                </Row>


                                <Button variant="outlined" className='btn-lg ms-4 my-2' type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </FormikProvider>
                    </Card>
                </Container>
            </Page>
            {alertMsg &&
                <AlertMessages
                    hideAlert={hideClose}
                    showAlert={alertMsg}
                    message={textAlert}
                    alertColor={alertColor}
                />
            }
        </>
    )
}

export default AddPackage