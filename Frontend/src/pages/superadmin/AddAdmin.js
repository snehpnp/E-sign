import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Card, Stack, TextField, Button, Container, Typography, } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import Tabs from '@mui/material/Tabs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AlertMessages from '../../utils/AlertMessages';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import { register, getAllPackages } from '../../services';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // console.log("valuevalue", value);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [nameErr, setNameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [contactErr, setContactErr] = useState("");
    const [addressErr, setAddressErr] = useState("");

    // company Details
    const [comapnyname, setComapnyname] = useState("");
    const [comapnyEmail, setComapnyEmail] = useState("");
    const [comapnyContact, setComapnyContact] = useState("");
    const [comapnyDomain, setComapnyDomain] = useState("");
    const [comapnyFund, setComapnyFund] = useState("");
    const [packageId, setPackageId] = useState("");
    const [packageIdErr, setPackageIdErr] = useState("");
    const [comapnynameErr, setComapnynameErr] = useState("");
    const [comapnyEmailErr, setComapnyEmailErr] = useState("");
    const [comapnyContactErr, setComapnyContactErr] = useState("");
    const [comapnyDomainErr, setComapnyDomainErr] = useState("");
    const [comapnyFundErr, setComapnyFundErr] = useState("");
    const [pan, setPan] = useState(false);
    const [adhaar, setAdhar] = useState(false);
    const [adharSign, setAdharSign] = useState(false);
    const [alertMsg, setAlertMsg] = useState(false);
    const [alertColor, setAlertColor] = useState("");
    const [textAlert, setTextAlert] = useState("");
    const [eStampValues, setEStampValues] = useState([]);


    const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

    const hideClose = () => {
        setAlertMsg(false)
    }


    // Etc 
    const [data, setData] = useState([]);

    // console.log("comapnyname" ,comapnyname);

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

    const personalInfoSubmit = (e) => {
        if (name === "") {
            setNameErr("* Enter a Valid Name  ")
            return
        }
        if (email === "") {
            setEmailErr("* Enter a Valid Email ")
            return
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setEmailErr("Invalid email address")
            return
        }
        if (contact === "") {
            setContactErr("* Enter a Valid Contact")
            return
        }
        if (contact.length !== 10) {
            setContactErr("* Enter a 10 Digits Contact")
            return
        }
        if (address === "") {
            setAddressErr(" * Enter a Valid Address ")
            return
        }

        setValue(+1)
    }

    const getPackages = async () => {
        const response = await getAllPackages(SuperAdminToken)
        if (response) {
            console.log("dddd", response);
            setData(response);
            // response && response.map((item) => {
            //     // {
            //     if (500 <= parseInt(item && item.price)) {
            //         // setData(item)
            //         setData(' KIKA')
            //     }
            //     else if (comapnyFund <= parseInt(item && item.price)) {
            //         setData('GANPAT')
            //     }
            //     // }

            // })
        }

    }


    useEffect(() => {
        getPackages();
    }, []);

    // console.log("dataaaaaa", data);

    // console.log("comapnyFund", comapnyFund);
    // console.log("comapnyFund", typeof comapnyFund);

    const checkBoxEvent = (e) => {
        // console.log("evalue", e.value)
        if (e.checked) {
            setEStampValues([...eStampValues, e.value])
        } else {
            setEStampValues(eStampValues.filter((tag, index) => tag !== e.value));
        }
    }


    const FinalSubmit = async (e) => {
        // console.log("data.package_id " ,data.package_id);

        if (comapnyname === "") {
            setComapnynameErr("* Enter a Valid Company  Name  ")
            return
        }

        // if (!comapnyEmail.match("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/")) {
        //     setComapnyEmailErr("* Enter a Valid Company Email Errrrrrrrrrrrrr ")
        //     return
        // }
        if (comapnyEmail === "") {

            setComapnyEmailErr("* Enter a Valid Company Email ")
            return
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(comapnyEmail)) {
            setComapnyEmailErr("Invalid Company email address")
            return
        }
        if (comapnyContact === "") {
            setComapnyContactErr("* Enter a Valid Company Contact")
            return
        }
        if (comapnyContact.length !== 10) {
            setComapnyContactErr("* Enter a 10 Digits Contact")
            return
        }
        if (comapnyDomain === "") {
            setComapnyDomainErr(" * Enter a Company Valid Address ")
            return
        }
        if (comapnyFund === "") {
            setComapnyFundErr(" * Enter a Company Valid Fund ")
            return
        }
        if (packageId === "") {
            setPackageIdErr(" * Select A Package")
            return
        }


        const submitdata = {
            "username": comapnyname,
            "fullname": name,
            "company_domain": comapnyDomain,
            'email': email,
            "company_email": comapnyEmail,
            "personal_contact": contact,
            "company_contact": comapnyContact,
            "address": address,
            "package_id": packageId,
            "fund": comapnyFund,
            "pan": 1,
            "adhaar": 1,
            "adhaar_sign": 1,
            "e_stamp": eStampValues,
            // "password": "admin@987",
            "parent_admin_id": "1",
            "roles": ["admin"],
        }

        const response = await register(submitdata);
        if (response.status === 200) {
            setAlertMsg(true)
            setAlertColor("success")
            setTextAlert(response.data.message)
            setTimeout(() => navigate('/superadmin/adminlist'), 1000)
        }
        else {
            setAlertMsg(true)
            setAlertColor("error")
            setTextAlert(response.data.message)
        }
        // console.log("response ", response);
        // alert('')
        // console.log("XZC" ,e);
        // setValue(+1)
    }


    return (
        <Page title="AddPackage">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Add Company
                    </Typography>
                    <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/adminlist" startIcon={<Iconify icon="line-md:arrow-left" />}>
                        Back
                    </Button>
                </Stack>
                <Card>
                    {/* <FormikProvider value={formik}>
                        <Form noValidate onSubmit={handleSubmit}> */}

                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Personal Details" {...a11yProps(0)} />
                                <Tab label="Company Details" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Row>
                                <Col col={6}>
                                    <Form.Group as={Col} controlId="formGridCompanyName" className="mb-3 ms-3 my-3">
                                        <TextField style={{ width: 400 }} label="Full Name" type='text' color="secondary" value={name} onChange={(e) => { setName(e.target.value); setNameErr("") }} />
                                    </Form.Group>
                                    {nameErr ? <p style={{ color: 'red' }}>{nameErr}</p> : " "}

                                    <Form.Group as={Col} controlId="formGridCompanyName" className="mb-3 ms-3 my-3">
                                        <TextField style={{ width: 400 }} label="Email Address" type='text' color="secondary" value={email} onChange={(e) => { setEmail(e.target.value); setEmailErr("") }} />
                                    </Form.Group>
                                    {emailErr ? <p style={{ color: 'red' }}>{emailErr}</p> : " "}
                                    <Form.Group as={Col} controlId="formGridFullName" className="mb-3 ms-3 my-3">
                                        <TextField style={{ width: 400 }} label="Contact" type='text' color="secondary"
                                            value={contact}
                                            onChange={(e) => { setContact(e.target.value.replace(/\D/g, "")); setContactErr("") }}
                                        />
                                    </Form.Group>
                                    {contactErr ? <p style={{ color: 'red' }}>{contactErr}</p> : " "}
                                </Col>
                                <Col col={6}>
                                    <TextField style={{ width: 400 }} label="Address" multiline rows={4} type='text' color="secondary" className="mb-3 ms-3 my-3"
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value); setAddressErr("") }}
                                    />
                                    {addressErr ? <p style={{ color: 'red' }}>{addressErr}</p> : " "}
                                </Col>
                            </Row>





                            {/* <Row className="mb-3 ms-3 my-3">


                            </Row> */}

                            <Button style={{ color: '#fff' }} variant="contained" onClick={(e) => personalInfoSubmit(e)} className="ms-3">
                                Save And Next     </Button>
                        </TabPanel>
                        <TabPanel value={value} index={1}  >

                            <Row>
                                <Col col={6}>
                                    <Form.Group as={Col} controlId="formGridCompanyName" className="mb-3 ms-3 my-3">
                                        <TextField style={{ width: 400 }} label="Company Name" type='text'
                                            color="secondary" onChange={(e) => { setComapnyname(e.target.value); setComapnynameErr("") }} value={comapnyname} />
                                    </Form.Group>
                                    {comapnynameErr ? <p style={{ color: 'red' }}>{comapnynameErr}</p> : " "}

                                    <Form.Group as={Col} controlId="formGridFullName" className="mb-3 ms-3 my-3">
                                        <TextField style={{ width: 400 }} label="Company Contact" type='number' color="secondary"
                                            onChange={(e) => { setComapnyContact(e.target.value.replace(/\D/g, "")); setComapnyContactErr("") }}
                                            value={comapnyContact}

                                        />
                                    </Form.Group>

                                    {comapnyContactErr ? <p style={{ color: 'red' }}>{comapnyContactErr}</p> : " "}

                                    <Form.Group as={Col} controlId="formGridFullName" className="mb-3 ms-3 my-3">
                                        <TextField style={{ width: 400 }} label="Funds" type='number' color="secondary"
                                            onChange={(e) => { setComapnyFund(e.target.value); setComapnyFundErr("") }}
                                            value={comapnyFund}
                                        />
                                    </Form.Group>

                                    {/* {parseInt(comapnyFund) <= 500 ? "silver" : "not have any package fot these price"} */}

                                    {comapnyFundErr ? <p style={{ color: 'red' }}>{comapnyFundErr}</p> : " "}
                                    <Form.Group as={Col} controlId="formGridCompanyName" className=" w-100 mb-3 ms-3 my-3">
                                        <FormControl style={{ width: 400 }}>
                                            <InputLabel id="demo-simple-select-helper-label">Packages</InputLabel>
                                            <Select label="Packages" onChange={(e) => { setPackageId(e.target.value); setPackageIdErr("") }}>



                                                {data && data.map((item) => {

console.log("kika" , item);
                                                    return <MenuItem value={item.id}    >{item.name}</MenuItem>
                                                }
                                                )}

                                            </Select>
                                            {packageIdErr ? <p style={{ color: 'red' }}>{packageIdErr}</p> : " "}

                                        </FormControl>
                                    </Form.Group>
                                </Col>
                                <Col col={6}>
                                    <Form.Group as={Col} controlId="formGridCompanyName" className="mb-3 ms-3 my-3">
                                        <TextField style={{ width: 400 }} label="Company Email" type='text' color="secondary" onChange={(e) => { setComapnyEmail(e.target.value); setComapnyEmailErr("") }} value={comapnyEmail} />
                                    </Form.Group>
                                    {comapnyEmailErr ? <p style={{ color: 'red' }}>{comapnyEmailErr}</p> : " "}

                                    <Form.Group as={Col} controlId="formGridFullName" className="mb-3 ms-3 my-3">
                                        <TextField style={{ width: 400 }} label="Company Domain" type='text' color="secondary"
                                            onChange={(e) => { setComapnyDomain(e.target.value); setComapnyDomainErr("") }}
                                            value={comapnyDomain}
                                        />
                                    </Form.Group>
                                    {comapnyDomainErr ? <p style={{ color: 'red' }}>{comapnyDomainErr}</p> : " "}

                                    <FormGroup className="my-3 ms-3">

                                        <InputLabel id="demo-simple-select-helper-label">Verification</InputLabel>
                                        <Row>
                                            <Col col={3}> <FormControlLabel className="w-100" value="1" control={<Checkbox />} label="Aadhaar Verify" onChange={(e) => setAdhar(e.target.checked)} checked />
                                            </Col>
                                            <Col col={3}>
                                                <FormControlLabel className="w-100" value="1" control={<Checkbox />} label="Pan Verify" onChange={(e) => setPan(e.target.checked)} checked /></Col>
                                            <Col col={3}><FormControlLabel className="w-100" value="1" control={<Checkbox />} checked label="Aadhaar Sign"
                                            // onChange={(e) => setAdharSign(e.target.checked)} 
                                            />
                                            </Col>

                                        </Row>



                                        {/* <Form.Group as={Col} controlId="formGridSelect"> */}
                                        {/* <Typography sx={{ fontWeight: 'bold', m: 1 }}>Verification</Typography> */}
                                        {/* <FormControlLabel value="1" control={<Checkbox />} label="Aadhar Verify" labelPlacement="Start" onChange={(e) => setPan(e.target.checked)} />

                                        <FormControlLabel value="1" control={<Checkbox />} label="Pan Verify" labelPlacement="Start" onChange={(e) => setAdhar(e.target.checked)} />
                                        <br />
                                        <FormControlLabel value="1" control={<Checkbox />} label="Aadhar Sign" labelPlacement="Start" onChange={(e) => setAdharSign(e.target.checked)} /> */}
                                        {/* <FormGroup className="my-3 ms-3"> */}
                                    </FormGroup>
                                    <FormGroup>

                                        <InputLabel id="demo-simple-select-helper-label">Stamp</InputLabel>
                                        <Row>

                                            {
                                                StampsArray.map((item) => (
                                                    <>
                                                        <Col col={3}>
                                                            <FormControlLabel control={<Checkbox />} label={item.stampLogo} labelPlacement="Start" value={item.stampLogo} onChange={(e) => checkBoxEvent(e.target)} />

                                                            <br />
                                                        </Col>
                                                    </>
                                                ))
                                            }
                                        </Row>


                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button style={{ color: '#fff' }} variant="contained" onClick={(e) => FinalSubmit(e)} className=" ms-3 ">
                                Submit
                            </Button>
                        </TabPanel>

                    </Box>
                </Card>

                {alertMsg &&
                    <AlertMessages
                        hideAlert={hideClose}
                        showAlert={alertMsg}
                        message={textAlert}
                        alertColor={alertColor}
                    />
                }
            </Container>
        </Page>
    );
}















// const AddAdmin = () => {

//     const [alertMsg, setAlertMsg] = useState(false);
//     const [alertColor, setAlertColor] = useState("");
//     const [textAlert, setTextAlert] = useState("");
//     const [data, setData] = useState([]);
//     const [pan, setPan] = useState(false);
//     const [adhaar, setAdhar] = useState(false);
//     const [adharSign, setAdharSign] = useState(false);
//     const [eStamp, setEStamp] = useState("");
//     const [eStampValues, setEStampValues] = useState([]);

//     const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;

//     const navigate = useNavigate();

//     // Form Validation

//     const registerForm = Yup.object().shape({
//         companyName: Yup.string().required(Common.COMPANY_NAME),
//         fullName: Yup.string().required(Common.FULL_NAME),
//         companyDomain: Yup.string().required(Common.COMPANY_DOMAIN),
//         email: Yup.string().email(Common.EMAIL_VALIDATION).required(Common.EMAIL_REQUIRE),
//         companyEmail: Yup.string().email(Common.EMAIL_VALIDATION).required(Common.COMPANY_EMAIL),
//         personalContact: Yup.string().max(10).required(Common.PERSONAL_CONTACT),
//         companyContact: Yup.string().max(10).required(Common.COMPANY_CONTACT),
//         fund: Yup.string().required(Common.FUNDS),
//         package_id: Yup.string().required(Common.SELECT_PACKAGES),
//         address: Yup.string().required(Common.ADDRESS)
//     });

//     const formik = useFormik({
//         initialValues: {
//             companyName: '',
//             fullName: '',
//             email: '',
//             companyEmail: '',
//             personalContact: '',
//             companyContact: '',
//             companyDomain: '',
//             fund: '',
//             package_id: '',
//             address: '',
//         },
//         validationSchema: registerForm,

//         onSubmit: async () => {
//             const data = {
//                 "username": values.companyName,
//                 "fullname": values.fullName,
//                 "company_domain": values.companyDomain,
//                 'email': values.email,
//                 "company_email": values.companyEmail,
//                 "personal_contact": values.personalContact,
//                 "company_contact": values.companyContact,
//                 "address": values.address,
//                 "package_id": values.package_id,
//                 "fund": values.fund,
//                 "pan": pan === true ? 1 : 0,
//                 "adhaar": adhaar === true ? 1 : 0,
//                 "adhaar_sign": adharSign === true ? 1 : 0,
//                 "e_stamp": eStampValues,
//                 // "password": "admin@987",
//                 "parent_admin_id": "1",
//                 "roles": ["admin"],
//             }
//             const response = await register(data);
//             // console.log("datares", response);
//             if (response.status === 200) {
//                 setAlertMsg(true)
//                 setAlertColor("success")
//                 setTextAlert(response.data.message)
//                 setTimeout(() => navigate('/superadmin/adminlist'), 1000)
//             }
//             else {
//                 setAlertMsg(true)
//                 setAlertColor("error")
//                 setTextAlert(response.data.message)

//                 // console.log("resp", response);
//             }
//         },
//     })

//     const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

//     const hideClose = () => {
//         setAlertMsg(false)
//     }

//     // Get API For Get Packages Data

//     const getPackages = async () => {
//         const response = await getAllPackages(SuperAdminToken)
//         if (response) {
//             //  console.log("respo",response);
//             setData(response);
//         }
//     }
//     useEffect(() => {
//         getPackages();
//     }, []);

//     const checkBoxEvent = (e) => {
//         // console.log("evalue", e.value)
//         if (e.checked) {
//             setEStampValues([...eStampValues, e.value])
//         } else {
//             setEStampValues(eStampValues.filter((tag, index) => tag !== e.value));
//         }
//     }
//     // console.log("vsluees", eStampValues);

//     return (
//         <Page title="User">
//             <Container>
//                 <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
//                     <Typography variant="h4" gutterBottom>
//                         Add Admin
//                     </Typography>
//                     <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/superadmin/adminlist"
//                     startIcon={<Iconify icon="line-md:arrow-left" />}>
//                         Back
//                     </Button>
//                 </Stack>
//                 <Card>


//                     {/* <MultiStep activeStep={0} steps={steps} /> */}
//                     <FormikProvider value={formik}>
//                         <Form noValidate onSubmit={handleSubmit}>

//                             <Row classNameName="mb-3 ms-3 my-3">
//                                 <Form.Group as={Col} controlId="formGridCompanyName">
//                                     <TextField style={{ width: 400 }} label="Company Name" type='text' color="secondary" {...getFieldProps('companyName')}
//                                         error={Boolean(touched.companyName && errors.companyName)}
//                                         helperText={touched.companyName && errors.companyName} />
//                                 </Form.Group>

//                                 <Form.Group as={Col} controlId="formGridFullName">
//                                     <TextField style={{ width: 400 }} label="Full Name" type='text' color="secondary"
//                                         {...getFieldProps('fullName')}
//                                         error={Boolean(touched.fullName && errors.fullName)}
//                                         helperText={touched.fullName && errors.fullName} />
//                                 </Form.Group>
//                             </Row>


//                             <Row classNameName="mb-3 ms-3">

//                                 <Form.Group as={Col} controlId="formGridEmail">
//                                     <TextField style={{ width: 400 }} label="Email" type='email' color="secondary"
//                                         {...getFieldProps('email')}
//                                         error={Boolean(touched.email && errors.email)}
//                                         helperText={touched.email && errors.email} />
//                                 </Form.Group>

//                                 <Form.Group as={Col} controlId="formGridCompanyEmail">
//                                     <TextField style={{ width: 400 }} label="Company Email" type='email' color="secondary"
//                                         {...getFieldProps('companyEmail')}
//                                         error={Boolean(touched.companyEmail && errors.companyEmail)}
//                                         helperText={touched.companyEmail && errors.companyEmail} />
//                                 </Form.Group>

//                             </Row>

//                             <Row classNameName="mb-3 ms-3">

//                                 <Form.Group as={Col} controlId="formGridPersonalContact">
//                                     <TextField style={{ width: 400 }} label="Personal Contact" type='number' color="secondary"
//                                         {...getFieldProps('personalContact')}
//                                         error={Boolean(touched.personalContact && errors.personalContact)}
//                                         helperText={touched.personalContact && errors.personalContact} />
//                                 </Form.Group>

//                                 <Form.Group as={Col} controlId="formGridCompanyContact">
//                                     <TextField style={{ width: 400 }} label="Company Contact" type='number' color="secondary"
//                                         {...getFieldProps('companyContact')}
//                                         error={Boolean(touched.companyContact && errors.companyContact)}
//                                         helperText={touched.companyContact && errors.companyContact} />
//                                 </Form.Group>

//                             </Row>

//                             <Row classNameName="mb-3 ms-3">
//                                 <Form.Group as={Col} controlId="formGridCompanyDomain">
//                                     <TextField style={{ width: 400 }} label="Company Domain" type='text' color="secondary"
//                                         {...getFieldProps('companyDomain')}
//                                         error={Boolean(touched.companyDomain && errors.companyDomain)}
//                                         helperText={touched.companyDomain && errors.companyDomain}
//                                     />
//                                 </Form.Group>

//                                 <Form.Group as={Col} controlId="formGridSelect">
//                                     <TextField
//                                         select
//                                         label="Packages"
//                                         style={{ width: 400 }}
//                                         {...getFieldProps('package_id')}
//                                         error={Boolean(touched.package_id && errors.package_id)}
//                                         helperText={touched.package_id && errors.package_id}
//                                     >
//                                         {data && data.map((item) => (
//                                             <MenuItem value={item.id} >{item.name}</MenuItem>
//                                         ))}

//                                     </TextField>
//                                 </Form.Group>

//                             </Row>

//                             <Row classNameName="mb-3 ms-3">
//                                 <Form.Group as={Col} controlId="formGridCompanyContact">
//                                     <TextField style={{ width: 400 }} label="Funds" type='number' color="secondary"
//                                         {...getFieldProps('fund')}
//                                         error={Boolean(touched.fund && errors.fund)}
//                                         helperText={touched.fund && errors.fund} />
//                                 </Form.Group>

//                                 {/* not to uncomment */}

//                                 {/* <Form.Group as={Col} controlId="formGridSelect">
//                                     <TextField
//                                         select
//                                         label="Packages"
//                                         style={{ width: 400 }}
//                                         {...getFieldProps('package_id')}
//                                         error={Boolean(touched.package_id && errors.package_id)}
//                                         helperText={touched.package_id && errors.package_id}
//                                     >
//                                         {data && data.map((item) => (
//                                             <MenuItem value={item.id} >{item.name}</MenuItem>
//                                         ))}

//                                     </TextField>
//                                 </Form.Group> */}
//                             </Row>

//                             <Row classNameName="mb-3 ms-3">
//                                 <Form.Group as={Col} controlId="formGridCompanyEmail">
//                                     <TextField label="Address" multiline rows={4} style={{ width: 400 }} color="secondary"
//                                         {...getFieldProps('address')}
//                                         error={Boolean(touched.address && errors.address)}
//                                         helperText={touched.address && errors.address}
//                                     />
//                                 </Form.Group>

//                                 <Form.Group as={Col} controlId="formGridSelect">
//                                     <Typography sx={{ fontWeight: 'bold', m: 1 }}>Verification</Typography>
//                                     <FormControlLabel value="1" control={<Checkbox />} label="Aadhar Verify" labelPlacement="Start" onChange={(e) => setPan(e.target.checked)} />

//                                     <FormControlLabel value="1" control={<Checkbox />} label="Pan Verify" labelPlacement="Start" onChange={(e) => setAdhar(e.target.checked)} />
//                                     <br />
//                                     <FormControlLabel value="1" control={<Checkbox />} label="Aadhar Sign" labelPlacement="Start" onChange={(e) => setAdharSign(e.target.checked)} />

//                                     {/* not to uncomment */}

//                                     {/* <FormControlLabel onChange={(e) => setEStamp(e.target.checked)} value="top" control={<Checkbox />} label="E-Stamp" labelPlacement="Start" /> */}
//                                     <br />

//                                     <>
//                                         <Typography sx={{ fontWeight: 'bold', m: 1 }}>Stamps</Typography>
//                                         <div classNameName='ms-auto d-flex'>
//                                             {
//                                                 StampsArray.map((item) => (
//                                                     <>
//                                                         <FormControlLabel control={<Checkbox />} label={item.stampLogo} labelPlacement="Start" value={item.stampLogo} onChange={(e) => checkBoxEvent(e.target)} />
//                                                         <br />
//                                                     </>
//                                                 ))
//                                             }
//                                         </div>
//                                     </>
//                                 </Form.Group>

//                             </Row>
//                             <Button variant="outlined" classNameName='btn-lg ms-4 my-2' type="submit">
//                                 Submit
//                             </Button>
//                         </Form>
//                     </FormikProvider>
//                 </Card>
//             </Container>
//             {alertMsg &&
//                 <AlertMessages
//                     hideAlert={hideClose}
//                     showAlert={alertMsg}
//                     message={textAlert}
//                     alertColor={alertColor}
//                 />
//             }
//         </Page>
//     )
// }

// export default AddAdmin






