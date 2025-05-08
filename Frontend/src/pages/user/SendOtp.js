import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Base64 } from "js-base64";
import { Typography } from '@mui/material';
import AlertMessages from "../../utils/AlertMessages";

import { getUsersById, SendOtpToClient, SaveOtp } from "../../services";

const SendOtp = () => {

    const location = useLocation();
    const userid = location.pathname.split("/")[2];
    const SuperAdminToken = JSON.parse(localStorage.getItem("admin")).accessToken;
    const parendId = JSON.parse(localStorage.getItem("admin")).id;
    const routId = Base64.decode(userid)




    const [otpReceiveErr, setOtpReceiveErr] = useState("");
    const [otpReceive, setOtpReceive] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [mobileNoErr, setMobileNoErr] = useState("");
    const [clientOtp, setClientOtp] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [showResults, setShowResults] = useState(false)

    const navigate = useNavigate();

    // alert states
    const [alertMsg, setAlertMsg] = useState(false);
    const [alertColor, setAlertColor] = useState("");
    const [textAlert, setTextAlert] = useState("");

    const hideClose = () => {
        setAlertMsg(false);
    };




    // const getParticularClient = async () => {

    // };

    // useEffect(() => {
    //     getParticularClient();
    // }, []);



    const submitVarify = async (e) => {
        // setDisabled(true);

        e.preventDefault();

        if (mobileNo === "") {
            setMobileNoErr(" Enter A Valid No")
            return
        }
        if (mobileNo.length !== 10) {
            setMobileNoErr(" mobile No. Length Should Be 10 Digits Only")
            return
        }
        // setTimeout(() => {




        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i += 1) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        const sendotp = {
            "mobileno": mobileNo,
            "otp": OTP
        }
        const response1 = await SendOtpToClient(sendotp, SuperAdminToken)
        if (response1.status === 'success') {
            const data = {
                "id": routId,
                "otp": OTP
            }
            const response2 = await SaveOtp(data, SuperAdminToken)
            console.log("response2 ", response2);
            setMobileNo(" ")
            setAlertMsg(true);
            setAlertColor("success");
            setTextAlert("Otp Send Successfully please Check Your Whatsapp");
            setShowResults(true)

            const response = await getUsersById(routId, SuperAdminToken);
            if (response) {
                setClientOtp(response.data.otp);
                console.log(response.data.otp);

            }

        }
        //     setDisabled(false);
        // }, 20000)
    };




    const VarifyOtp = (e) => {
        e.preventDefault();
        if (otpReceive === "") {
            setOtpReceiveErr(" *  Please Enter The Otp ")
            return
        }

        // alert(clientOtp)
        if (otpReceive === clientOtp) {
            setAlertMsg(true);
            setAlertColor("success");
            setTextAlert("Otp Verification  Successully");
            setOtpReceive("")
        }
        else {
            setAlertMsg(true);
            setAlertColor("warning");
            setTextAlert("Please  Enter Valid  Otp ");
        }





    }


    return (
        <form>
            <div className="row">
                <div className="col-md-6">
                    <input
                        onChange={(e) => {
                            setMobileNo(e.target.value);
                            setMobileNoErr("");
                            if (!e.target.value.length > 10) {
                                setMobileNoErr("error");
                            }
                        }}
                        value={mobileNo}
                        type="number"
                        className="form-control"
                        placeholder="Enter Contact No."
                        // InputProps={{ inputProps: { min: 0, max: 10 } }}
                        max="5"

                    />

                    <p style={{ color: "red" }}>{mobileNoErr}</p>

                </div>

                <div className="col-md-3 float-lg-right">
                    <button
                        type="submit"
                        onClick={(e) => submitVarify(e)}
                        className="default-button"
                    // disabled
                    >
                        Send OTP
                    </button>
                </div>

                <div className="col-md-3 float-lg-right">
                    <button
                        type="submit"
                        // onClick={(e) => ubmitVarify(e)}
                        className="default-button"
                    >
                        Resend OTP
                    </button>
                </div>
            </div>
            {/* We Will Send You One Time Password(Otp) On Your Mobile No.. */}
            {/* Didn't Receive Otp ? 1:22  */}

            <Typography varient="h6" className="mt-3 ms-1"><b>Time: </b>2:30</Typography>

            {showResults ? <>
                <div className="d-flex">

                    <div className="col-6">
                        <div className="mb-3 mt-3 ">
                            <input
                                onChange={(e) => {
                                    setOtpReceive(e.target.value);
                                    setOtpReceiveErr("")
                                }}
                                type="text"
                                className="form-control"
                                placeholder="Enter OTP"
                                value={otpReceive}
                            />
                        </div>
                        <p style={{ color: "red" }}>{otpReceiveErr}</p>

                    </div>
                    <div className="col-6">
                        <div className="col-md-3 float-lg-right">
                            <button
                                type="submit"
                                onClick={(e) => VarifyOtp(e)}
                                className="default-button"
                            >
                                Submit OTP
                            </button>
                        </div>
                    </div>

                </div>
            </> : " "}

            {alertMsg && (
                <AlertMessages
                    hideAlert={hideClose}
                    showAlert={alertMsg}
                    message={textAlert}
                    alertColor={alertColor}
                />
            )}
        </form>
    );
};

export default SendOtp;
