import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Card, Stack, TextField, Button, Container, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { Col, Form, Row } from 'react-bootstrap';
import { useFormik, FormikProvider } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from '@mui/material/MenuItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from '../../utils/DataTable'
import Iconify from '../../components/Iconify';
import { fDate, dateFormate } from '../../utils/formatTime';
import AlertMessages from '../../utils/AlertMessages';
import * as Common from '../../utils/CommonMessage';
import Page from '../../components/Page';
import { adminUpdate, getAllPackages, getStampsById, getAdminById } from '../../services';

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


const EditAdmin = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();


    // console.log("location", location.states);

    const [data, setData] = useState("")
    const [adminData, setAdminData] = useState("")
    const [alertMsg, setAlertMsg] = useState(false)
    const [alertColor, setAlertColor] = useState("")
    const [textAlert, setTextAlert] = useState("")


    const [packageId, setPackageId] = useState(location.state[16]);
    const [pan, setPan] = useState(location.state[7]);
    const [adhaar, setAdhar] = useState(location.state[8]);
    const [adharSign, setAdharSign] = useState(location.state[9]);

    // const [packageId, setPackageId] = useState();

    // console.log("packageId" ,packageId);

    // const [pan, setPan] = useState();
    // const [adhaar, setAdhar] = useState();
    // const [adharSign, setAdharSign] = useState();
    const [eStamps, setEStamps] = useState([]);
    const [eStampValues, setEStampValues] = useState([]);
    // const [date, setDate] = useState(dateFormate());
    const [startDate, setStartDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [updatePackageChecked, setupdatePackageChecked] = useState(false);
    // console.log("updatePackageChecked" ,updatePackageChecked);
    // console.log("updatePackageChecked" ,updatePackageChecked);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    const handleShow = (e) => {
        // console.log("true", e.target.checked);
        if (e.target.checked === true) {
            setShow(true)
        }
        else {
            setShow(false)
        }
    }

    const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

    // const getAdminById 

    const getAdminUsingId = async () => {
        const response = await getAdminById(SuperAdminToken, id)
        // console.log("respo", response);
        if (response) {
            setAdminData(response);
        }
    }


    // Get API For Get Packages Data

    const getPackages = async () => {
        const response = await getAllPackages(SuperAdminToken)
        //  console.log("respo",response);
        if (response) {
            setData(response);
        }
    }

    // Get API For Get Admin Stamps Data

    const getStampsData = async () => {
        const response = await getStampsById(SuperAdminToken, id)
        if (response) {
            setEStamps(response);
            setEStampValues(response.map((item) => item.stamp));
        }
    }

    useEffect(() => {
        getPackages();
        getStampsData();
        getAdminUsingId();
    }, []);


    const registerForm = Yup.object().shape({
        fullname: Yup.string().required(Common.FULL_NAME),
        username: Yup.string().required(Common.COMPANY_NAME),
        company_domain: Yup.string().required(Common.COMPANY_DOMAIN),
        email: Yup.string().email(Common.EMAIL_VALIDATION).required(Common.EMAIL_REQUIRE),
        company_email: Yup.string().email(Common.EMAIL_VALIDATION).required(Common.COMPANY_EMAIL),
        personal_contact: Yup.string().max(10).required(Common.PERSONAL_CONTACT),
        company_contact: Yup.string().max(10).required(Common.COMPANY_CONTACT),
        fund: Yup.string().required("Fund Require"),
        add_fund: Yup.string().required("Fund Require"),
        package_id: Yup.string().required(Common.SELECT_PACKAGES),
        address: Yup.string().required(Common.ADDRESS),
        expiry_date: Yup.string().required("Error Date")
    });

    const showPackageValue = (id) => {
        // console.log("ddd" ,  id);
        if (id == 3) {
            return "SILVER"
        }
        else if (id == 4) {
            return "GOLD"
        }
        else if (id == 5) {
            return 'PLATINUM'
        }
        else if (id == 6) {
            return "TRIAL PLAN"
        }
    }
    console.log("location", location.state);
    const formik = useFormik({
        initialValues: {
            username: location.state[13],
            fullname: location.state[2],
            company_domain: location.state[6],
            email: location.state[14],
            company_email: location.state[3],
            personal_contact: location.state[4],
            expiry_date: dateFormate(location.state[12]),
            // package_id: showPackageValue(location.state[17]),
            package_id: location.state[16],
            fund: location.state[15],
            add_fund: location.state.add_fund,
            company_contact: location.state[5],
            address: location.state[10],

        },
        validationSchema: registerForm,
    })




    const ClickBtn = async (e) => {
        e.preventDefault();


        // if(values.personal_contact.length != 10){
        //     // alert('hello orld')

        // }




        const data1 = {
            "username": values.username,
            "fullname": values.fullname,
            "company_domain": values.company_domain,
            'email': values.email,
            "company_email": values.company_email,
            "personal_contact": values.personal_contact,
            "company_contact": values.company_contact,
            "expiry_date": dateFormate(values.expiry_date),
            "address": values.address,
            "package_id": updatePackageChecked ? packageId : location.state[16],
            "fund": values.fund,
            "add_fund": values.add_fund,
            "pan": pan,
            "adhaar": adhaar,
            "adhaar_sign": adharSign,
            "e_stamp": eStampValues,
            // "e_stamp": 
        }


        const response = await adminUpdate(data1, id, SuperAdminToken);
        // console.log("date", response);
        if (response.message) {
            setAlertMsg(true)
            setAlertColor("success")
            setTextAlert(response.message)
            setTimeout(() => navigate('/superadmin/adminlist'), 1000)
        }
    }


    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
    // console.log("values",values);
    // console.log("getFieldProps", formik);
    const hideClose = () => {
        setAlertMsg(false)
    }

    const checkBoxEvent = (e) => {

        if (e.checked) {
            setEStampValues([...eStampValues, e.value])
        } else {
            setEStampValues(eStampValues.filter((tag, index) => tag !== e.value));
        }
    }

    const checkStampIsChecked = (value) => {
        return eStampValues.includes(value)
    }

    // const handleChangeDate = (e) => {
    //     setDate(values.expiry_date);
    //  };

    //  console.log("e", date);




    return (
        <Page title="User">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Edit Admin
                    </Typography>
                    <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/adminlist" startIcon={<Iconify icon="line-md:arrow-left" />}>
                        Back
                    </Button>
                </Stack>
                <Card>
                    <FormikProvider value={formik}>
                        <Form noValidate onSubmit={handleSubmit}>

                            <Row className="mb-3 ms-3 my-3">
                                <Form.Group as={Col} controlId="formGridCompanyName">
                                    <TextField style={{ width: 400 }} label="Company Name" type='text' color="secondary"
                                        {...getFieldProps('username')}
                                        error={Boolean(touched.username && errors.username)}
                                        helperText={touched.username && errors.username} />
                                </Form.Group>

                                <Form.Group as={Col} controlId=" formGridFullName">
                                    <TextField style={{ width: 400 }} label="Full Name" type='text' color="secondary"
                                        {...getFieldProps('fullname')}
                                        error={Boolean(touched.fullname && errors.fullname)}
                                        helperText={touched.fullname && errors.fullname}
                                    />
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
                                    <TextField style={{ width: 400 }} label="Company Email" type='email' color="secondary"
                                        {...getFieldProps('company_email')}
                                        error={Boolean(touched.company_email && errors.company_email)}
                                        helperText={touched.company_email && errors.company_email} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3 ms-3">

                                <Form.Group as={Col} controlId="formGridPersonalContact">
                                    <TextField style={{ width: 400 }} label="Personal Contact" type='number' color="secondary"
                                        {...getFieldProps('personal_contact')}
                                        error={Boolean(touched.personal_contact && errors.personal_contact)}
                                        helperText={touched.personal_contact && errors.personal_contact} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCompanyContact">
                                    <TextField style={{ width: 400 }} label="Company Contact" type='number' color="secondary"
                                        {...getFieldProps('company_contact')}
                                        error={Boolean(touched.company_contact && errors.company_contact)}
                                        helperText={touched.company_contact && errors.company_contact} />
                                </Form.Group>

                            </Row>

                            <Row className="mb-3 ms-3">
                                <Form.Group as={Col} controlId="formGridCompanyDomain">
                                    <TextField style={{ width: 400 }} label="Company Domain" type='text' color="secondary"
                                        {...getFieldProps('company_domain')}
                                        error={Boolean(touched.company_domain && errors.company_domain)}
                                        helperText={touched.company_domain && errors.company_domain}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridSelect">
                                    <TextField style={{ width: 400 }}
                                        disabled
                                        label="Packages Name"
                                        value={showPackageValue(location.state[16])}
                                        //  {...getFieldProps('package_id')}

                                        error={Boolean(touched.company_domain && errors.company_domain)}
                                        helperText={touched.company_domain && errors.company_domain}
                                    >

                                    </TextField>

                                    { /*    <select
                                        name=""
                                        id=""
                                        value={packageId}
                                        onChange={(e)=>{setPackageId(e.target.value)}}

                                    >
                                        {data && data.map((item)=>(
                                        <option value={item.id}>{item.name}</option>
                                        ))}


                                    </select> */ }



                                </Form.Group>
                            </Row>

                            <Row className="mb-3 ms-3">
                                <Form.Group as={Col} controlId="formGridCompanyContact">
                                    <TextField style={{ width: 400 }} label="Funds" type='number' color="secondary"
                                        disabled
                                        {...getFieldProps('fund')}
                                        error={Boolean(touched.fund && errors.fund)}
                                        helperText={touched.fund && errors.fund} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCompanyExpiryData">

                                    <TextField
                                        id="date"
                                        // format="dd/MM/yyyy"
                                        label="Expiry Date"
                                        type="date"
                                        value={values.expiry_date}
                                        sx={{ width: 400 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Form.Group>

                            </Row>

                            <Row className="mb-3 ms-3">
                                <Form.Group as={Col} controlId="formGridCompanyEmail">
                                    <TextField label="Address" multiline rows={4} style={{ width: 400 }} color="secondary"
                                        {...getFieldProps('address')}
                                        error={Boolean(touched.address && errors.address)}
                                        helperText={touched.address && errors.address}
                                    />
                                </Form.Group>


                                <Form.Group as={Col} controlId="formGridSelect">
                                    {/* <Form.Group as={Col} controlId="formGridCompanyEmail"> */}
                                    <Typography sx={{ fontWeight: 'bold', m: 1 }}>Verification</Typography>
                                    <div className="d-flex">

                                        <FormControlLabel control={<Checkbox defaultChecked={adhaar === 1} />} label="Aadhar Verify" labelPlacement="Start" onChange={(e) => setPan(e.target.checked ? "1" : "")} chacked />
                                        <FormControlLabel control={<Checkbox defaultChecked={pan === 1} />} label="Pan Verify" labelPlacement="Start" onChange={(e) => setAdhar(e.target.checked ? "1" : "")} chacked />
                                        <br />
                                        <FormControlLabel control={<Checkbox defaultChecked={adharSign === 1} />} label="Aadhar Sign" labelPlacement="Start" onChange={(e) => setAdharSign(e.target.checked ? "1" : "")} chacked />
                                    </div>
                                    {/* </Form.Group> */}

                                    <>
                                        <Typography sx={{ fontWeight: 'bold', m: 1 }}>Stamps</Typography>

                                        <div className='ms-auto d-flex'>
                                            {
                                                StampsArray.map((item, i) => (
                                                    <>
                                                        {/* <FormControlLabel value={item.stampValue} control={<Checkbox defaultChecked={checkStampIsChecked(item.stampValue)}/>} label={item.stampLogo} labelPlacement="Start" /> */}
                                                        <input id={i} type="checkbox" value={item.stampLogo}
                                                            checked={checkStampIsChecked(item.stampLogo)}
                                                            onChange={(e) => checkBoxEvent(e.target)} />
                                                        <label htmlFor={i}>{item.stampLogo}</label>
                                                        <br />
                                                    </>
                                                ))
                                            }
                                        </div>
                                    </>

                                </Form.Group>
                            </Row>


                            <Row className="mb-3 ms-3 my-3">
                                <Form.Group as={Col} controlId="formGridFullName">
                                    <FormControlLabel onClick={(e) => handleShow(e)} control={<Checkbox />} label="Add Funds" />

                                    {show ? <Form.Group onHide={handleClose} as={Col} controlId="formGridCompanyContact">
                                        <TextField style={{ width: 400 }} label="Add Funds" type='number' color="secondary"
                                            defaultValue={0}
                                            {...getFieldProps('add_fund')}
                                        // error={Boolean(touched.add_fund && errors.add_fund)}
                                        // helperText={touched.add_fund && errors.add_fund}
                                        />
                                    </Form.Group> : ""}

                                </Form.Group>

                                <Form.Group as={Col} controlId=" formGridCompanyName">
                                    <FormControlLabel onClick={(e) => { setupdatePackageChecked(e.target.checked); setShow1(!show1) }} control={<Checkbox />} label="Do You Want To Update Package" htmlFor="uncontrolled-native" />

                                    {show1 ? <select className="form-select "
                                        style={{ width: '400px', padding: '0.8rem 2.25rem 0.8rem 0.75rem' }}
                                        name=""
                                        id="uncontrolled-native"
                                        value={packageId}
                                        onChange={(e) => { setPackageId(e.target.value) }}>
                                        <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                                        <label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>
                                        {data && data.map((item) => (
                                            <option value={item.id} selected>{item.name}</option>
                                        ))}
                                    </select> : ""}

                                </Form.Group>
                            </Row>
                            <Button variant="outlined" className='btn-lg ms-4 my-2' type="submit" onClick={(e) => { ClickBtn(e) }}>
                                Update
                            </Button>
                        </Form>
                    </FormikProvider>
                </Card>
            </Container>
            {alertMsg &&
                <AlertMessages
                    hideAlert={hideClose}
                    showAlert={alertMsg}
                    message={textAlert}
                    alertColor={alertColor}
                />
            }
        </Page>
    )
}

export default EditAdmin

