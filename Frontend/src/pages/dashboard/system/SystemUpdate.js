import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Card, Stack, TextField, Button, Container, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import { useFormik, FormikProvider } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from '../../../utils/DataTable'
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import { UpdateSystemDetails, getSystemDetails } from '../../../services';
import AlertMessages from '../../../utils/AlertMessages';
import * as Common from '../../../utils/CommonMessage';

const SystemUpdate = () => {

    const location = useLocation()


    // console.log("location", location.state);


    // const [companyName, setCompanyName] = useState(location.state[1]);
    // const [companyShortName, setCompanyShortName] = useState(location.state[2]);
    // const [companyLogo, setCompanyLogo] = useState(`/companylogo/e_sign-${location.state[3]}`);
    const [companyLogo, setCompanyLogo] = useState('');
    // const [companyfavicon, setCompanyfavicon] = useState("");
    const [companyEmail, setCompanyEmail] = useState(location.state[1]);
    const [companyCCEmail, setCompanyCCEmail] = useState(location.state[2]);
    const [companyBCCEmail, setCompanyBCCEmail] = useState(location.state[3]);
    const [companyPassword, setCompanyEmailPassword] = useState(location.state[4]);
    const [companyHost, setCompanyHost] = useState(location.state[5]);
    const [companyport, setCompanyport] = useState(location.state[6]);

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const [companyEmailErr, setCompanyEmailErr] = useState("")
    const [companyCcErr, setCompanyCcErr] = useState("")
    const [companyBccErr, setCompanyBccErr] = useState("")
    const [emailPasswordErr, setEmailPasswordErr] = useState("")
    const [smtpHostErr, setSmtpHostErr] = useState("")
    const [smtpPortErr, setSmtpPortErr] = useState("")


    const [alertMsg, setAlertMsg] = useState(false);
    const [alertColor, setAlertColor] = useState("");
    const [textAlert, setTextAlert] = useState("");
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);


    const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
    const adminid = JSON.parse(localStorage.getItem('admin')).id;

    const navigate = useNavigate();




    // LOGO UPLOAD 

    // get Company Info 



    // const getPackages = async () => {


    //     // const response = await getSystemDetails(AdminToken, adminid)
    //     console.log("respo", response);
    //     // if (response) {
    //     //     navigate(response);
    //     //     setRefresh(!refresh)

    //     //     }
    //     }


    //     useEffect(() => {
    //         getPackages();
    //     }, [refresh]);



    // Form Validation

    const upDateComapny = async (e) => {
        e.preventDefault();


        if (companyEmail == "") {
            setCompanyEmailErr("Please Enter Company Email")
            return
        }
        if (companyCCEmail == "") {
            setCompanyCcErr("Please Enter Company CC Email")
            return
        }
        if (companyBCCEmail == "") {
            setCompanyBccErr("Please Enter Company BCC Email")
            return
        }
        if (companyPassword == "") {
            setEmailPasswordErr("Please Enter Email Password")
            return
        }
        if (companyHost == "") {
            setSmtpHostErr("Please Enter SMTP Host")
            return
        }
        if (companyport == "") {
            setSmtpPortErr("Please Enter SMTP Port")
            return
        }

        // const formData = new FormData()

        const data = {
            'company_email': companyEmail,
            'company_cc': companyCCEmail,
            'company_bcc': companyBCCEmail,
            'email_password': companyPassword,
            'smtp_host': companyHost,
            'smtp_port': companyport,
            "admin_id": adminid
        }

        const response = await UpdateSystemDetails(adminid, data, AdminToken);
        // console.log("ddd", response);

        if (response) {
            // navigate('system')
            // setLoderShow(false)
            setAlertMsg(true);
            setAlertColor("success");
            setTextAlert(response.message);
            navigate('/admin/system')
            setRefresh(!refresh)

        }


    }





    return (
        <Page title="User">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        System Update
                    </Typography>
                    <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/admin/system" startIcon={<Iconify icon="line-md:arrow-left" />}>
                        Back
                    </Button>
                </Stack>
                <Card>
                    <Form className='mx-5 my-5'>

                        {/* <Row className="mb-3  mt-5"> */}
                        {/* <Typography variant="h5" className="mb-3" >Company Logo</Typography> */}
                        {/* <div className='col-md-6'> */}
                        {/* <div className="form-group file-area w-75"> */}
                        <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                        {/* <label htmlFor="images">Select Company Logo</label> */}
                        {/* <input type="file" name="images" id="images" required="required" height="20" width="20" accept="image/*"
                                        onChange={(e) => setCompanyLogo(e.target.files[0])}
                                        onChange={(e) => imageChange(e)}
                                        onChange={
                                            (e) => onSelectFile(e)}
                                    /> */}



                        {/* <div className="file-dummy"> */}
                        {/* {companyLogo.length > 0 ? */}
                        {/* {companyLogo ? <img src={URL.createObjectURL(companyLogo)} alt='hello' /> : ''} */}
                        {/* {companyLogo ? <img src={(companyLogo)} alt='hello' /> :  <img src={URL.createObjectURL(companyLogo)} alt='hello' />} */}
                        {/* : ''} */}


                        {/* <div className="success">
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8SLh8GOim2szf-nANkrOU-C-WjufBbkSSmgD1utGBaTDZcKJPAQKfjttB0WstiNI4R4&usqp=CAU' alt=".." />
                                    </div> */}
                        {/* <div className="default">Please select some files</div>
                                    </div> */}
                        {/* {documentErr ? <p style={{ color: 'red' }}>{documentErr}</p> : " "} */}

                        {/* </div></div> */}
                        {/* <div className='col-md-6'><div className="form-group file-area"> */}
                        <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                        {/* <label htmlFor="images">Select Company Favicon</label>
                                    <input type="file" name="images" id="images" required="required" accept="image/jpeg, image/png," */}

                        {/* // onChange={(e) => setCompanyLogo(e.target.files[0])}
                                    // value={location.state[4]}

                                    />

                                    <div className="file-dummy">
                                        <div className="success">
                                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8SLh8GOim2szf-nANkrOU-C-WjufBbkSSmgD1utGBaTDZcKJPAQKfjttB0WstiNI4R4&usqp=CAU' alt=".." />
                                        </div>
                                        <div className="default">Please select some files</div>
                                    </div> */}
                        {/* {documentErr ? <p style={{ color: 'red' }}>{documentErr}</p> : " "} */}

                        {/* </div></div> */}
                        {/* <Form.Group as={Col} controlId="formGridCompanyLogo">
                                <TextField style={{ width: 400 }} label="Company Logo" type='file' color="secondary"
                                />
                            </Form.Group> */}


                        {/* <Form.Group as={Col} controlId="formGridCompanyFavicon">
                                <TextField style={{ width: 400 }} label="Company Favicon" type='text' color="secondary"
                                />
                            </Form.Group> */}
                        {/* </Row> */}
                        {/* <hr /> */}
                        {/* <Row className="mb-3 ms-3 my-3 ">
                            <Typography variant="h5" className="mb-4 " >Company Details</Typography>
                            <Form.Group as={Col} controlId="formGridCompanyName">
                                <TextField style={{ width: 400 }} label="Company Name" type='text' color="secondary"
                                    onChange={(e) => setCompanyName(e.target.value)}

                                    value={companyName}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCompanyShortName">
                                <TextField style={{ width: 400 }} label="Company Short Name" type='text' color="secondary"
                                    onChange={(e) => setCompanyShortName(e.target.value)}
                                    // value={location.state[2]}
                                    value={companyShortName}
                                />
                            </Form.Group>
                        </Row> */}

                        <Row className="mb-3 ms-3">
                            <Form.Group as={Col} controlId="formGridCompanyEmail">
                                <TextField style={{ width: 400 }} label="Company Email" type='email' color="secondary"
                                    onChange={(e) => { setCompanyEmail(e.target.value); setCompanyEmailErr("") }}
                                    value={companyEmail}
                                />
                                <p className='text-danger'> {companyEmailErr}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCompany_CC">
                                <TextField style={{ width: 400 }} label="Company CC" type='text' color="secondary"
                                    onChange={(e) => { setCompanyCCEmail(e.target.value); setCompanyCcErr("") }}
                                    value={companyCCEmail}
                                />

                                <p className='text-danger'> {companyCcErr}</p>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3 ms-3">
                            <Form.Group as={Col} controlId="formGridCompany_BCC">
                                <TextField style={{ width: 400 }} label="Company BCC" type='text' color="secondary"
                                    onChange={(e) => { setCompanyBCCEmail(e.target.value); setCompanyBccErr("") }}
                                    value={companyBCCEmail}
                                />
                                <p className='text-danger'> {companyBccErr}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridEmail_Password">
                                <TextField style={{ width: 400 }} label="Email Password" type='text' color="secondary"
                                    onChange={(e) => { setCompanyEmailPassword(e.target.value); setEmailPasswordErr("") }}
                                    value={companyPassword}
                                />
                                <p className='text-danger'> {emailPasswordErr}</p>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3 ms-3">
                            <Form.Group as={Col} controlId="formGridSMTP_Host">
                                <TextField style={{ width: 400 }} label="SMTP Host" type='text' color="secondary"
                                    onChange={(e) => { setCompanyHost(e.target.value); setSmtpHostErr("") }}
                                    value={companyHost}
                                />
                                <p className='text-danger'> {smtpHostErr}</p>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSMTP_Port">
                                <TextField style={{ width: 400 }} label="SMTP Port" type='text' color="secondary"
                                    onChange={(e) => { setCompanyport(e.target.value); setSmtpPortErr("") }}
                                    value={companyport}
                                />
                                <p className='text-danger'> {smtpPortErr}</p>
                            </Form.Group>

                        </Row>

                        <Button variant="outlined" className='btn-lg ms-4 my-2' type="submit" onClick={(e) => upDateComapny(e)}>
                            Submit
                        </Button>
                    </Form>
                </Card>
            </Container>
            {alertMsg &&
                <AlertMessages
                    // hideAlert={hideClose}
                    showAlert={alertMsg}
                    message={textAlert}
                    alertColor={alertColor}
                />
            }
        </Page>
    )
}

export default SystemUpdate