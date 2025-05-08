import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';


import { styled } from '@mui/material/styles';
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { login, ForgetPasswordLink } from '../services';
import * as Common from '../utils/CommonMessage';
import AlertMessages from '../utils/AlertMessages';
import Loder from "../utils/Loder";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPassword() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [sent, setSent] = useState(false);
    // alert
    const [alertMsg, setAlertMsg] = useState(false)
    const [alertColor, setAlertColor] = useState("")
    const [textAlert, setTextAlert] = useState("")
    // Loder

    const [loderShow, setLoderShow] = useState(false)

    const hideClose = () => {
        setAlertMsg(false)
    }




    const SendPasswordLink = async (e) => {

        if (email === "") {
            setEmailErr("* Please Enter The Valid Email")
            return
        }

        e.preventDefault();
        const data = {
            "email": email
        }
        const response = await ForgetPasswordLink(data, setLoderShow(true))
        // console.log("response", response);
        if (response.status === 200) {
            setLoderShow(false)
            setAlertMsg(true);
            setAlertColor("success");
            setTextAlert("Reset Password Link Send Successfully , please Chack Your Email");
            // setTimeout(() => navigate('/login'), 1000);
        }
        else if (response.status === 404) {
            setLoderShow(false)
            setAlertMsg(true);
            setAlertColor("error");
            setTextAlert(response.data.message);
        }
    }







    return (
        <Page title="Reset Password" sx={{ height: 1 }}>
                  {loderShow ?
                            <Loder />
                            : ""}
            <RootStyle>
                {/* <LogoOnlyLayout /> */}

                <Container>

                    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                  
                        <>
                            <Typography variant="h3" paragraph>
                                Forgot your password?
                            </Typography>

                            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                                Please enter the email address associated with your account and We will email you a link to reset your
                                password.
                            </Typography>

                            <form autoComplete="off" >
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        autoComplete="username"
                                        type="email"
                                        label="Email address"
                                        onChange={(e) => { setEmail(e.target.value); setEmailErr('') }}
                                    />
                                </Stack>
                                {emailErr ? <p style={{ color: 'red' }}>{emailErr}</p> : " "}

                            </form>
                            <Button className="mt-4" fullWidth size="large" variant="contained" onClick={(e) => SendPasswordLink(e)} >
                                Reset Password Link
                            </Button>

                            <Button fullWidth size="large" component={RouterLink} to={"/login"} sx={{ mt: 1 }}>
                                Back
                            </Button>
                        </>

                    </Box>
                </Container>
            </RootStyle>
            {alertMsg &&
                <AlertMessages
                    hideAlert={hideClose}
                    showAlert={alertMsg}
                    message={textAlert}
                    alertColor={alertColor}
                />}
        </Page>
    );
}
