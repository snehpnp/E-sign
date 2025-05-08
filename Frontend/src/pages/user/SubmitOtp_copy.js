import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Base64 } from "js-base64";
// import createFile from 'create-file';
import PDFMerger from 'pdf-merger-js/browser';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { fDateTimeSuffix } from '../../utils/formatTime';
import SendOtp from "./SendOtp"
import AlertMessages from "../../utils/AlertMessages";
import HideWithStar from "../../utils/HideWithStar";
import Loder from "../../utils/Loder";
import jsPDF from 'jspdf';
import {
  getUsersById,
  AdharAndPanVerifigation,
  PostTransectionHistory, panVerifigation, SendOtpToClient, SaveOtp, SignDocWithNotRegistredNo,
  SignDocWithNotRegistred, getKycDocument,
  SaveOtpVerifyMobileNo, verifyAdharWithSubmitOtp, SaveKycDoc, verifyAdharWithOtp,
  FindByOneTemplates,
  ForSetDynamicDataOnPDF,
  GetUsersViaTemplateId,
  GenrateESign,
  For_Update_Variable_Data_To_PDF,
  CheckTemplateForNextUser,
  Get_Variables_By_Template_ID,
  Add_Variable_Columns_To_DataBase,
  Update_Variable_Values_Columns_To_DataBase
} from "../../services";




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
  const [isDisabled, disableButtons] = React.useState(true);
  const [Tab2Visible] = useState(false);

  const [values, setValues] = React.useState(0);

  //  by  location
  const location = useLocation();
  const navigate = useNavigate();
  const userid = location.pathname.split("/")[2];


  const adminId = JSON.parse(Base64.decode(userid)).admin_id
  const Objecttemplate_id = JSON.parse(Base64.decode(userid)).template_id
  const clientId = JSON.parse(Base64.decode(userid)).user_id

  // pdf merger
  // const [abc, setAbc] = useState('');
  const [viewDocument, setViewDocument] = useState("")


  //  For Adhar verification
  const [adharPan, setAdharPan] = useState("");
  const [counter, setShowcounter] = useState(false);
  const [dataClient, setDataClient] = useState("")
  const [aadharErr, setAadharErr] = useState("");
  const [PanErr, setPanErr] = useState("");
  const [buttondDissabled, setButtonDissabled] = useState(false);
  const [loderShow, setLoderShow] = useState(false)
  const [refresh, setrefresh] = useState(true)

  // For Adhar Verify Wit otp

  const [AdharVerify, setAdharVerify] = useState('')
  const [AdharVerifyErr, setAdharVerifyErr] = useState('')
  const [submitAadharOtp, setsubmitAadharOtp] = useState('')
  const [showOtpResults, setShowOtpResults] = useState(false)
  const [submitAadharOtpErr, setsubmitAadharOtpErr] = useState('')
  const [adharClientID, setadharClientId] = useState('')
  const [adharButtonDissabled, setAdharButtonDissabled] = useState(false)
  const [NextUserStatus, setNextUserStatus] = useState('')


  const [seconds, setSeconds] = React.useState(10);

  const [panNo, setPanNo] = useState("");

  //   For Send Otp

  const [otpReceiveErr, setOtpReceiveErr] = useState("");
  const [otpReceive, setOtpReceive] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [mobileNoErr, setMobileNoErr] = useState("");
  const [clientOtp, setClientOtp] = useState("");
  const [showResults, setShowResults] = useState(false)
  const [otpverify, setOtpverify] = useState(false)

  //  For Esign

  const [value, setValue] = React.useState(0);
  const [alertMsg, setAlertMsg] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [textAlert, setTextAlert] = useState("");

  //    set Adhar Info
  const [adharPanInfo, setAdharPanInfo] = useState("");
  const [PanInfo, setPanInfo] = useState();

  // kyc State

  const [KYC, setKYC] = useState("");

  // For Form  State

  const [storeAddInfo, setStoreAddInfo] = useState([]);
  const [storeFormValue, setStoreFormValue] = useState('');
  const [showForm, setShowForm] = useState('');



  // other
  const [pdfInfo, setPdfInfo] = useState([]);


  // for 1 min. timer

  const [disabledButton, setDisabledButton] = useState(false);
  const [countdown, setCountdown] = useState(0);


  // console.log("adharPanInfo", adharPanInfo);

  const hideClose = () => {
    setAlertMsg(false);
  };



  const handleChange = (event, newValue1) => {
    setValues(newValue1);
  };

  // For E-sign Tab Change
  const handleEsignChange = (event, newValue) => {
    setValue(newValue);
  };



  // main Compoent


  // Get Client Data By Client Id

  const getParticularClient = async () => {

    const reuest = {
      user_id: clientId,
      template_id: Objecttemplate_id
    }
    const res = await CheckTemplateForNextUser(reuest);
    console.log("dddddd", res);
    if (res) {
      if (res[0].admin_id == adminId && res[0].user_id == clientId) {
        if (res[0].template_id == Objecttemplate_id) {
          const datee = new Date()
          if (new Date(datee) < new Date(fDateTimeSuffix(res[0].linkexpires))) {
            setNextUserStatus(res[0].sign_status)
            setShowForm(res[0])
          }
          else {
            navigate("/expiredlink", { replace: true })
          }
          if (res[0].generate_sign == 1 && res[0].sign_status == 1) {
            navigate("/expiredsession", { replace: true })

          }
        }

      }
    }




    const response = await getUsersById(clientId);
    if (response) {
      const datee = new Date()

      // console.log("fDateTimeSuffix(datee)" , fDateTimeSuffix(datee));
      // console.log("typeof" , typeof fDateTimeSuffix(datee));
      // console.log("response.data.linkexpires" ,response.data.linkexpires);
      // console.log("response.data.linkexpires typeof " ,typeof response.data.linkexpires);

      // if (new Date(fDateTimeSuffix(datee)) > new Date(response.data.linkexpires))  {
      //   navigate("/expiredlink", { replace: true })

      // } else {
      setDataClient(response.data);
      // }





    }
  };




  // console.log("dataClient" ,dataClient);


  // timer
  useEffect(async () => {









    // if (seconds > 0) {
    //   // setShowcounter(true)
    //   setTimeout(() => setSeconds(seconds - 1), 1000);
    // } else {
    //   // setShowcounter(false)
    //   setSeconds(0);
    // }


    //  stop Browser reload

    // if (window.performance) {
    //   if (performance.navigation.type === 1) {
    //     // window.confirm( "Please Complete Your Verfication Without Refresh Browser" );
    //     window.confirm("IF You Want To Continue Verification Please Click On Cancel")
    //   }
    //   else {
    //     alert("Don't Refesh the Browser Until Your Process Not Complete");
    //   }
    // }

  }, [seconds, PanInfo, adharPanInfo]);

  // const maskNumber = (num) => {
  //   // const number = '123456789012'
  //   const replaced = num.replace(/.(?=.{4,}$)/g, '*');
  //   // return replaced;
  //   console.log("replaced", replaced);
  // }




  // Adhar Verify With Otp
  const submitAdharVarifyByOtpButton = async (e) => {

    e.preventDefault();

    if (AdharVerify === "") {
      setAdharVerifyErr(" Please Enter  Your Aadhar No.")
      return
    }
    if (AdharVerify.length !== 12) {
      setAdharVerifyErr(" please Enter Valid Aadhar  No.")
      return
    }

    const data = {
      'id_number': AdharVerify,
      'less_info': "true"
    };
    const response = await verifyAdharWithOtp(data, setLoderShow(true),);

    console.log("outside", response);
    if (response.status_code === 200) {
      console.log("Dddd");
      setDisabledButton(true);
      setCountdown(59);

      setAdharButtonDissabled(true)
      setLoderShow(false)

      setadharClientId(response.data.client_id)
      setAlertMsg(true);
      setAlertColor("success");
      setTextAlert(response.message);
      setShowOtpResults(true)
    }
    else if (response.response.status === 422) {
      setLoderShow(false)
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert("Please Enter A Valid Aadhaar No..");
    }
    else if (response.status_code === 500) {
      setLoderShow(false)
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert('Server Connot Response , Please Try After Some Time');
    }
    else if (response.response.data.status_code === 500) {
      setLoderShow(false)
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert(response.response.data.message);
    }

    else {
      setLoderShow(false)
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert(response.message);

    }
  }


  const ResendAadhharOtp = async (e) => {


    if (AdharVerify === "") {
      setAdharVerifyErr(" Please Enter  Your Aadhar No.")
      return
    }
    if (AdharVerify.length !== 12) {
      setAdharVerifyErr(" please Enter Valid Aadhar  No.")
      return
    }
    e.preventDefault();
    const data1 = {
      'id_number': AdharVerify,
      'less_info': "true"
    };

    const response = await verifyAdharWithOtp(data1, setLoderShow(true));

    // console.log("rfsedxcw", response);

    if (response.status_code === 200) {
      setAdharButtonDissabled(true)
      setLoderShow(false)
      setadharClientId(response.data.client_id)
      setAlertMsg(true);
      setAlertColor("success");
      setTextAlert(response.message);
      setShowOtpResults(true)

    }
    else if (response.response.status === 422) {
      // console.log("response.message", response.message);
      setLoderShow(false)
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert("Please Enter A Valid Aadhaar No..");
    }
    else if (response.response.status === 429) {
      setLoderShow(false)
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert("Please Wait For A Min For Resend Link..");
    }
    else if (response.status_code === 500) {
      // console.log("response.message", response.message);
      setLoderShow(false)
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert(response.message);
    }

    else {
      // console.log("response.message" ,response.message);
      setLoderShow(false)
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert(response.message);
      // }

    }
  }


  //  adahr verify otp

  const VarifyAdharOtp = async (e) => {

    e.preventDefault();
    if (submitAadharOtp === "") {
      setsubmitAadharOtpErr(" *  Please Enter The Otp ")
      return
    }

    const data = {
      "client_id": adharClientID,
      "otp": submitAadharOtp
    }
    const response1 = await verifyAdharWithSubmitOtp(data, setLoderShow(true))

    // console.log("response1", response1);



    if (response1.status_code === 200) {
      setLoderShow(false)

      setAlertMsg(true);
      setAlertColor("success");
      setTextAlert("Your Aadhaar  Verification is Successfully ");


      const transData = {
        'sign_type': "aadhar_verify_with_otp",
        'aadhaar_number': response1.data.aadhaar_number,
        'client_id': response1.data.client_id,
        'full_name': response1.data.full_name,
        'dob': response1.data.dob,
        'gender': response1.data.gender,
        'loc': response1.data.address.loc,
        'dist': response1.data.address.dist,
        'state': response1.data.address.state,
        'country': response1.data.address.country,
        'zip': response1.data.zip,
        'care_of': response1.data.care_of,
        'reference_id': response1.data.reference_id,
        'parent_admin_id': adminId,
        'user_id': clientId,
        "template_id": Objecttemplate_id

      };

      const res = await PostTransectionHistory(transData);

      // setrefresh(!refresh)

      setValues(values + 1)
      // disableButtons(false);
    }
    else if (response1.response.status === 422) {
      setLoderShow(false)
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert("Please Enter A Valid OTP..");
    }

    else if (response1.response.status === 500) {
      setLoderShow(false)
      setAlertMsg(true);
      setAlertColor("error");
      setTextAlert("Server Not Response ... Please Try After Some Time");
    }

  }

  //  For Pan Verfication

  const submitPanVarify = async (e) => {

    e.preventDefault();
    if (panNo === "") {
      setPanErr('Enter A Valid Pan No')
      return
    }
    if (panNo.length != 10) {
      setPanErr('PAN Nohould Be 10 Digits Only, Please Currect That ')
      return
    }

    const data = {
      'id_number': panNo,
    };
    const response = await panVerifigation(data, setLoderShow(true));
    console.log("response", response);




    if (response.success === true) {
      setLoderShow(false)
      const transData = {
        'client_id': response.data.client_id,
        'pan_number': response.data.pan_number,
        'full_name': response.data.full_name,
        'category': response.data.category,
        'sign_type': "pan_verify",
        'parent_admin_id': adminId,
        'user_id': clientId,
        "template_id": Objecttemplate_id

      };
      const res = await PostTransectionHistory(transData);
      if (res) {
        setAlertMsg(true);
        setAlertColor("success");
        setTextAlert("Your Pancard Verification is Successfully ");
        //  setrefresh(!refresh)

        setValues(values + 1)
        disableButtons(!isDisabled);
      }

    } else if (response.data.success === false) {

      const transData = {
        'client_id': response.data.data.client_id,
        'pan_number': response.data.data.pan_number,
        'full_name': "failed",
        'category': "failed",
        'sign_type': "pan_verify",
        'parent_admin_id': adminId,
        'user_id': clientId,
        "template_id": Objecttemplate_id
      };
      const res = await PostTransectionHistory(transData);
      setLoderShow(false)
      setTextAlert(response.data.message);
      setAlertMsg(true);
      setAlertColor("error");
      // setValues(values + 1)
    }
  };


  //  Send Otp To Client

  const submitOtpVarify = async (e) => {
    e.preventDefault();
    if (mobileNo === "") {
      setMobileNoErr(" Enter A Valid No")
      return
    }
    if (mobileNo.length !== 10) {
      setMobileNoErr("mobile No. Length Should Be 10 Digits Only")
      return
    }
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i += 1) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }


    const sendotp = {
      "mobileno": mobileNo,
      "otp": OTP
    }



    const response1 = await SendOtpToClient(sendotp, setLoderShow(true))
    if (response1.status === 'OK') {
      setLoderShow(false)

      const data = {
        "id": clientId,
        "otp": OTP
      }

      const resp = await SaveOtp(data)

      const request = {
        "id": clientId,
        "alternate_number": mobileNo
      }

      const response2 = await SaveOtpVerifyMobileNo(request)



      setAlertMsg(true);
      setAlertColor("success");
      setTextAlert("OTP Send Successfully  ");
      setButtonDissabled(true)
      setShowResults(true)
      const response = await getUsersById(clientId);
      if (response) {
        setClientOtp(response.data.otp);
      }

    }

  };


  const VarifyOtp = (e) => {
    e.preventDefault();

    if (otpReceive === "") {
      setOtpReceiveErr(" *  Please Enter The OTP ")
      return
    }

    if (parseInt(otpReceive) === clientOtp) {
      setLoderShow(false)
      setOtpverify(true)
      setAlertMsg(true);
      setAlertColor("success");
      setTextAlert("OTP Verification  Successully");
      setOtpReceive("")
      disableButtons(!isDisabled);
      // setrefresh(!refresh)
      setValues(values + 1)
      // setrefresh(!refresh)
      // setButtonDissabled(false)

    }
    else {
      setLoderShow(false)
      setOtpverify(false)
      setAlertMsg(true);
      setAlertColor("warning");
      setTextAlert("Please  Enter Valid  OTP ");
    }

  }
  // Resend Otp

  const ResendOtp = async (e) => {

    // setButtonDissabled(true)
    e.preventDefault();
    if (mobileNo === "") {
      setMobileNoErr(" Enter A Valid Contact No")
      return
    }
    if (mobileNo.length !== 10) {
      setMobileNoErr(" mobile No. Length Should Be 10 Digits Only")
      return
    }


    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i += 1) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

    const sendotp = {
      "mobileno": mobileNo,
      "otp": OTP
    }
    const response1 = await SendOtpToClient(sendotp)

    if (response1.status === 'OK') {
      const data = {
        "id": clientId,
        "otp": OTP
      }
      const response2 = await SaveOtp(data)
      setLoderShow(false)
      setAlertMsg(true);
      setAlertColor("success");
      setTextAlert(" We Will Send You One Time Password(OTP) On Your Mobile No.. ");
      // setShowResults(true)

      const response = await getUsersById(clientId);
      if (response) {
        setClientOtp(response.data.otp);

      }

    }


  }



  //  Esign Verification

  const [setTemplate, setSetTemplate] = useState("")
  const submitVarifydoc = async (e) => {
    e.preventDefault();



    const response = await getUsersById(clientId);




    // const reqforvar = {
    //   "template_id": Objecttemplate_id,
    //   "user_id": clientId,
    // }

    // const res123 = await For_Update_Variable_Data_To_PDF(reqforvar);



    const req = {
      "template_id": Objecttemplate_id,
      "user_id": clientId
    }
    const req1 = { "id": Objecttemplate_id }

    const req123 = await FindByOneTemplates(req1);
    // console.log("req123" ,req123.html)

    const templateresponse = await ForSetDynamicDataOnPDF(req);

    setViewDocument(templateresponse)

    console.log("templateresponse", templateresponse);

    console.log("templateresponse", templateresponse)
    // setSetTemplate(templateresponse.html)
    setValue(value + 1)

  }





  const submitVarifyDocument = async (e) => {

    e.preventDefault();
    setLoderShow(true)

    const userres = await getUsersById(clientId);

    const reqforEsign = {
      "template_id": userres.data.template_id,
      "user_id": clientId,
      "admin_id": adminId
    }
    const kycreq = {
      'id': clientId,
    };


    const Panresponse = await getKycDocument(kycreq, setLoderShow(true));
    const AadhaarData = Panresponse.adhaardata[0]
    const panData1 = Panresponse.pandata[0]

    const pdfDoc1 = await PDFDocument.create()
    const timesRomanFont = await pdfDoc1.embedFont(StandardFonts.TimesRoman)

    // Add a blank page to the document
    const page1 = pdfDoc1.addPage()

    // Get the width and height of the page
    const { width, height } = page1.getSize()

    // Draw a string of text toward the top of the page

    const fontSize = 30
    page1.drawText('KYC Details  ', {
      x: 220,
      y: 800,
      // y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    })

    if (dataClient.adhaar_verify_with_otp === 1 || (dataClient.adhaar_verify_with_otp === 2) || (dataClient.adhaar_verify_with_otp === 1)) {

      page1.drawText('Aadhaar Details', {
        x: 25,
        y: 700,
        // y: height - 4 * fontSize,
        size: 20,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      })


      page1.drawText(`Aadhaar Number                    -                       ${AadhaarData.adhaar_number}`, {
        x: 25,
        y: 670,
        // y: height - 4 * fontSize,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
      page1.drawText(`Full Name                               -                       ${AadhaarData.full_name} `, {
        x: 25,
        y: 650,
        // y: height - 4 * fontSize,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
      page1.drawText(`DOB                                        -                      ${(AadhaarData.dob)}`, {
        x: 25,
        y: 630,
        // y: height - 4 * fontSize,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
      page1.drawText(`Gender                                   -                       ${AadhaarData.gender}`, {
        x: 25,
        y: 610,
        // y: height - 4 * fontSize,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
      page1.drawText(`Loc                                         -                        ${AadhaarData.address} `, {
        x: 25,
        y: 590,
        // y: height - 4 * fontSize,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
      page1.drawText(`Zip                                          -                        ${AadhaarData.zip} `, {
        x: 25,
        y: 570,
        // y: height - 4 * fontSize,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
      page1.drawText(`Care Of                                    -                        ${AadhaarData.fathername} `, {
        x: 25,
        y: 550,
        // y: height - 4 * fontSize,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
      page1.drawText(`Reference_Id                            -                       ${AadhaarData.reference_id} `, {
        x: 25,
        y: 530,
        // y: height - 4 * fontSize,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
    }
    if ((dataClient.pan === 2 || 1) || (dataClient.pan === 2 || 1 && dataClient.adhaar_verify_with_otp === 0) || (dataClient.pan === 1 || 2 && dataClient.adhaar_verify_with_otp === 0)) {

      page1.drawText('Pan  Details', {
        x: 25,
        // y: (dataClient.pan === 2 || dataClient.pan === 2 && dataClient.adhaar_verify_with_otp === 0) ? 730 : 490,
        y: 490,
        // y: height - 4 * fontSize,
        size: 20,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      })


      page1.drawText(`Pan No.                                    -                        ${panData1.pan_number} `, {
        x: 25,
        // y: (dataClient.pan === 2 || dataClient.pan === 2 && dataClient.adhaar_verify_with_otp === 0) ? 700 : 460,
        y: 460,
        // y: height - 4 * fontSize,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
      page1.drawText(`Name                                       -                        ${panData1.full_name}`, {
        x: 25,
        y: 440,
        // y: (dataClient.pan === 2 || dataClient.pan === 2 && dataClient.adhaar_verify_with_otp === 0) ? 680 : 440,
        // y: height - 4 * fontSize,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
      page1.drawText(`Catagory                                  -                       ${panData1.category} `, {
        x: 25,
        // y: (dataClient.pan === 2 || dataClient.pan === 2 && dataClient.adhaar_verify_with_otp === 0) ? 660 : 420,
        y: 420,
        // y: height - 4 * fontSize,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      })
    }

    // const arr = []

    const pdfBytes1 = await pdfDoc1.saveAsBase64({ dataUri: true })
    const kycdata = {
      "id": clientId,
      'admin_id': adminId,
      'kycdocument': pdfBytes1
    }
    const response = await SaveKycDoc(kycdata);

    setLoderShow(false)

    const transData = {
      //  'client_id': dataClient.client_id,
      'parent_admin_id': adminId,
      'user_id': clientId,
      'sign_type': 'aadhaar_sign',
      "template_id": Objecttemplate_id
    };
    // const respo = await PostTransectionHistory(transData);

    const getEsignUrl = await GenrateESign(reqforEsign);



    // console.log("respo", getEsignUrl.esignUrl);

    window.location.replace(getEsignUrl.esignUrl)

    // setrefresh(!refresh)
    // navigate('/thankyou', { replace: true })


    // }
  }



  useEffect(() => {
    getParticularClient();

    // close()
    // window.stop()
  }, [refresh]);


  const getVariables = async () => {

    const req = {
      "template_id": Objecttemplate_id
    }
    const userres = await Get_Variables_By_Template_ID(req);
    if (userres) {
      //   console.log("key", userres[0]);

      //   var inputArray = userres[0].variables.split(",");
      //   let obj = {};
      //   for (let i = 0; i < inputArray.length; i++) {

      //     let key = inputArray[i].trim().toUpperCase()
      //     obj[key] = "null";
      //   }
      //   const request = {
      //     "user_id": clientId,
      //     "variables": obj
      //   }
      //   const res_add_var = await Add_Variable_Columns_To_DataBase(request);
      setStoreAddInfo(userres[0].variables.slice(0).split(','))

    }


  }

  useEffect(() => {
    getVariables();
  }, []);


  const ChangeInputValue = (inputvalue, e, index, name) => {

    let abc = {
      id: index,
      value: inputvalue,
      varname: name
    }


    let newArray = [...storeFormValue, abc]
    setStoreFormValue(newArray)
    e.target.reset();
  }


  const Form_Submit_Button = async (e) => {
    e.preventDefault()

    let varable_object = {};

    Object.values(
      storeFormValue && storeFormValue.reduce((acc, cur) => {
        acc[cur.id] = cur;
        varable_object[cur.varname] = cur.value
        return acc;
      }, {})
    );

    const req = {
      "template_id": Objecttemplate_id
    }

    const userres = await Get_Variables_By_Template_ID(req);
    if (userres) {
      console.log("key", userres[0]);

      var inputArray = userres[0].variables.split(",");
      let obj = {};
      for (let i = 0; i < inputArray.length; i++) {

        let key = inputArray[i].trim().toUpperCase()
        obj[key] = "null";
      }
      const request = {
        "user_id": clientId,
        "variables": obj
      }
      const res_add_var = await Add_Variable_Columns_To_DataBase(request);
      // setStoreAddInfo(userres[0].variables.slice(0).split(','))

    }








    const request = {
      "user_id": clientId,
      "variables": varable_object,
      "template_id": Objecttemplate_id
    }

    const res_add_var = await Update_Variable_Values_Columns_To_DataBase(request);

    if (res_add_var.message === "success.") {
      setAlertMsg(true);
      setAlertColor("success");
      setTextAlert("Submit  Successully");
      setValues(values + 1)


    }
  }







  // const handleClick = () => {
  //   setDisabled(true);
  //   setCountdown(59);
  // };

  useEffect(() => {
    let intervalId;
    if (disabledButton && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setDisabledButton(false);
    }
    return () => clearInterval(intervalId);
  }, [disabledButton, countdown, refresh]);



  console.log("dataClient", showForm);





  return (
    <>
      <div className="submit-container">
        <div className='container'>
          <div className="p-5">
            <div className='row form-row' >
              <div className='col-md-6 ps-0  img-row d-none d-md-flex' style={{ background: '#1D3593' }}>
                <img src="../assets/images/form.png" alt="..." />
              </div>
              <div className='col-md-6 pe-0 ps-0 '>
                <div className="form multistep-form varification-panel h-100 bg-white">
                  <div className="form-container  ">
                    <div className="form-header">
                      <p className='text-center form-heading'>Document Verification Panel</p>
                    </div>
                    <div className="form-body">
                      {/* <SubmitOtp /> */}
                      <Box sx={{ width: '100%' }}>
                        {loderShow ? <Loder /> : ''}
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs value={values} onChange={handleChange} aria-label="basic tabs example" centered>

                            {showForm && showForm.additional_form === 0 ?
                              <Tab label="Add. Info."
                                //     disabled
                                {...a11yProps(0)} /> : ""
                            }
                            {/* adhar  Verify */}
                            {
                              dataClient.adhaar_verify_with_otp === 1 ?
                                <Tab label="Aadhaar Verification"
                                  //       disabled
                                  {...a11yProps(1)} />

                                : ""}
                            {/* Pan Verify */}

                            {
                              dataClient.pan === 1 ?
                                < Tab label="Pan Verification"
                                  //    disabled
                                  {...a11yProps(
                                    2
                                  )}

                                // className={dataClient.pan === 0 ? "d-none" : " d-block"}
                                />
                                : ""}

                            {/* otp Verify */}


                            {/* E-sign Verify */}

                            {NextUserStatus && NextUserStatus == 3 || dataClient.adhaar_sign === 1 ?
                              <Tab label="E-sign Verification"
                                //     disabled
                                {...a11yProps(
                                  3
                                )} />
                              : ''}
                          </Tabs>
                        </Box>

                        {/* Extra Form  */}

                        <TabPanel value={values} index={
                          0
                        } >
                          {/* storeAddInfo */}
                          {showForm && showForm.additional_form === 0 ?

                            <form>
                              <div className="row d-flex align-items-center martt">
                                {storeAddInfo && storeAddInfo.map((item, index) => {
                                  return <>
                                    <div className="col-12" key={index}>
                                      <label htmlFor={item}>{item}</label>
                                      <input
                                        onChange={(e) => {
                                          ChangeInputValue(e.target.value, e, index, item);
                                          // setAdharVerifyErr("");

                                        }}
                                        // value={AdharVerify}
                                        name={item}
                                        type="text"
                                        className="form-control"
                                        placeholder={`Enter A Valid ${item}`}
                                      // max="5"

                                      />
                                      {AdharVerifyErr ? <p>{AdharVerifyErr}</p> : ""}
                                    </div>
                                  </>

                                })}

                              </div>

                              <button
                                type="submit"
                                onClick={(e) => Form_Submit_Button(e)}
                                className="default-button mt-3"
                              >
                                Submit & Next
                              </button>



                            </form>
                            : ""}

                        </TabPanel>
                        {/* Aadhar  Verify */}
                        <TabPanel value={values} index={
                          (() => {
                            if (showForm && showForm.additional_form === 1) return 0
                            // if (dataClient.otpbased === 0) if (dataClient.adhaar === 0 && dataClient.adhaar_verify_with_otp === 2) return 1
                            return 1
                          })()

                          // 1
                        }
                        // className={dataClient.adhaar_verify_with_otp == 0 ? "tab-0" : ''}
                        >

                          {/* Adhar Verify With Otp */}

                          {dataClient.adhaar_verify_with_otp === 1 ?
                            <form>
                              <div className="row d-flex align-items-center martt">
                                <div className="col-12">
                                  <input
                                    onChange={(e) => {
                                      setAdharVerify(e.target.value);
                                      setAdharVerifyErr("");

                                    }}
                                    value={AdharVerify}
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Valid Aadhaar  No."
                                  // max="5"

                                  />
                                  {AdharVerifyErr ? <p>{AdharVerifyErr}</p> : ""}
                                </div>
                                <div className="col-md-12 float-lg-right">
                                  {/* {seconds === 0 ? "" :

                                  <button
                                    type="submit"
                                    onClick={(e) => submitAdharVarifyByOtpButton(e)}
                                    className="default-button mt-3"
                                    disabled={adharButtonDissabled}
                                  >
                                    Send OTP
                                  </button>
                                } */}
                                  {!adharButtonDissabled ? <>
                                    <button className="default-button mt-3" onClick={(e) => submitAdharVarifyByOtpButton(e)}
                                      // disabled={disabledButton}
                                      disabled={adharButtonDissabled}
                                    >
                                      {disabledButton ? `Please wait for Resend OTP  (${countdown})` : 'Send OTP'}
                                    </button>
                                  </> : ""
                                  }
                                </div>
                                {showOtpResults ?
                                  <div className="col-md-8 pt-3 d-flex ">
                                    {/* <Typography>Didn't Recieve Otp ?  -- */}
                                    {/* {seconds}  {seconds === 0  ?  */}
                                    {/* <button className='btn btn-primary'

                                  onClick={(e) => ResendAadhharOtp(e)}
                                  disabled={!adharButtonDissabled}
                                >Resend OTP</button>:"" } */}
                                    {/* </ Typography > */}
                                    {/* <button className='btn btn-primary'

                                  onClick={(e) => ResendAadhharOtp(e)}
                                  disabled={!adharButtonDissabled}
                                >Resend OTP</button> */}
                                    wait a minute to resend otp -
                                    <button
                                      type="submit"
                                      onClick={(e) => ResendAadhharOtp(e)}
                                      className="link-btn"
                                      disabled={!adharButtonDissabled}
                                    >
                                      Resend OTP
                                    </button>
                                  </div>
                                  : ""}

                              </div>

                              {showOtpResults ?
                                <div className="row d-flex align-items-center">
                                  <div className="col-md-12">
                                    <div className="mb-3 mt-3 ">
                                      <input
                                        onChange={(e) => {
                                          setsubmitAadharOtp(e.target.value);
                                          setsubmitAadharOtpErr("")
                                        }}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter OTP"
                                      // value={otpReceive}
                                      />
                                      {submitAadharOtpErr ? <p style={{ color: "red" }}>{submitAadharOtpErr}</p> : ''}
                                    </div>

                                  </div>

                                  <div className="col-md-12">

                                    <button
                                      type="submit"
                                      onClick={(e) => VarifyAdharOtp(e)}
                                      className="default-button"
                                    >
                                      Submit OTP & Next
                                    </button>

                                  </div>
                                </div>
                                : ""}


                            </form>


                            // </>

                            : ''}


                          {/* <Typography className='d-flex align-items-center justiy-content-center mt-center'>  </ Typography > */}

                        </TabPanel>


                        {/* pan Verify */}

                        {
                          dataClient.pan === 1 ? <>
                            <TabPanel value={values} index={
                              (() => {
                                // if (dataClient.additional_form === 0) if (dataClient.adhaar === 0 && dataClient.adhaar_verify_with_otp === 2) return 1
                                if (showForm && showForm.additional_form === 1 && dataClient.adhaar_verify_with_otp === 1) return 1
                                if (showForm && showForm.additional_form === 1 && dataClient.adhaar_verify_with_otp === 2) return 0
                                return 2
                              })()
                              // 1
                            }>
                              <div className="mb-3 marg">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputPassword1"
                                  placeholder="Pan No."
                                  onChange={(e) => { setPanNo(e.target.value.toUpperCase()); setPanErr("") }}
                                  value={panNo}
                                />
                                {PanErr ? <p style={{ color: "red" }}>{PanErr}</p> : ""}

                              </div>

                              <button
                                // type="submit"
                                onClick={(e) => submitPanVarify(e)}
                                className="default-button"
                              >
                                Verify and Next
                              </button>

                            </TabPanel>

                          </> : ""}

                        {/* ------------------------------------ */}



                        {/* esign */}


                        {
                          NextUserStatus && NextUserStatus == 3 || dataClient.adhaar_sign === 1 ? <>
                            <TabPanel value={values} index={
                              (() => {
                                if (showForm && showForm.additional_form === 0) {
                                  if (dataClient.adhaar_verify_with_otp === 1 && dataClient.pan === 1) {
                                    return 3
                                  }
                                  else if (dataClient.adhaar_verify_with_otp === 2 && dataClient.pan === 2) {
                                    return 1
                                  }
                                } else if (showForm && showForm.additional_form === 1) {
                                  if (dataClient.adhaar_verify_with_otp === 1 && dataClient.pan === 1) {
                                    return 2
                                  }
                                  else if (dataClient.adhaar_verify_with_otp === 2 && dataClient.pan === 1) {
                                    return 1
                                  }
                                  else if (dataClient.adhaar_verify_with_otp === 2 && dataClient.pan === 2) {
                                    return 0
                                  }

                                }

                                // if (showForm && showForm.additional_form === 1 && dataClient.adhaar_verify_with_otp === 2 && dataClient.pan === 2 && dataClient.adhaar_sign === 1) return 0
                                // if (showForm && showForm.additional_form === 1 && dataClient.adhaar_verify_with_otp === 1) return 2
                                // if (showForm && showForm.additional_form === 1 && dataClient.adhaar_verify_with_otp === 2) return 1
                                // if (showForm && showForm.additional_form === 1 && dataClient.adhaar_verify_with_otp === 2 && dataClient.adhaar_verify_with_otp === 2) return 1

                                // if (showForm && showForm.additional_form === 1 && dataClient.adhaar_verify_with_otp === 2 && dataClient.pan === 2) return 0

                                // FOR THIRD PARTY
                                // 3

                                // if (dataClient.otpbased === 0) if (dataClient.adhaar_verify_with_otp === 1 && dataClient.pan === 1) return 3
                                // if (dataClient.otpbased === 0) if (dataClient.adhaar_verify_with_otp === 2 && dataClient.pan === 1) return 2
                                // if (dataClient.otpbased === 0) if (dataClient.adhaar_verify_with_otp === 2 && dataClient.pan === 2) return 1

                                // if (dataClient.otpbased === 0) if (dataClient.adhaar_verify_with_otp === 1 && dataClient.pan === 0) return 2
                                // if (dataClient.otpbased === 0) if (dataClient.adhaar_verify_with_otp === 2 && dataClient.pan === 0) return 0
                                // if (dataClient.otpbased === 0) if (dataClient.adhaar_verify_with_otp === 0 && dataClient.pan === 1) return 2
                                // if (dataClient.otpbased === 0) if (dataClient.adhaar_verify_with_otp === 0 && dataClient.pan === 2) return 0

                                // // WITHOUT OTP

                                // if (dataClient.otpbased === 1) if (dataClient.adhaar_verify_with_otp === 0 && dataClient.pan === 1) return 2
                                // if (dataClient.otpbased === 1) if (dataClient.adhaar_verify_with_otp === 0 && dataClient.pan === 2) return 1
                                // if (dataClient.otpbased === 1) if (dataClient.adhaar_verify_with_otp === 0 && dataClient.pan === 2 && dataClient.otp > 0) return



                                // if (dataClient.otpbased === 0 && dataClient.pan === 1) if (dataClient.adhaar_verify_with_otp === 2)
                                //   // return 1
                                //   return 2
                                // // -----------------
                                // if (dataClient.otpbased === 0 && dataClient.pan === 0) if (dataClient.adhaar_verify_with_otp === 2) return 0
                                // if (dataClient.otpbased === 0 && dataClient.adhaar_verify_with_otp === 0) if (dataClient.pan === 2) return 0
                                // if (dataClient.otpbased === 0) if (dataClient.adhaar_verify_with_otp === 0) return 1
                                // if (dataClient.otpbased === 1 && dataClient.pan === 2 && dataClient.otp === 0) return 1

                                //   return 3
                              })()
                              // 1
                            }
                            >

                              <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                  {/*  dcocument  */}
                                  <Tabs value={value} onChange={handleEsignChange} aria-label="basic tabs example" centered>
                                    <Tab label="Step 1" {...a11yProps(0)}
                                      disabled
                                    />
                                    <Tab label="step 2" {...a11yProps(1)}
                                      disabled
                                    />
                                  </Tabs>
                                </Box>
                                <TabPanel value={value} index={0} >
                                  <form>

                                    <div className="mb-3">


                                      <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                                      <label htmlFor='name'>Full Name</label>
                                      <input type="text" className="form-control" name="fullname" value={dataClient.fullname} readOnly='true' placeholder='Full Name' id="name" />

                                    </div>
                                    <div className="mb-3">
                                      <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                                      <label htmlFor='mobile'>Mobile No.</label>
                                      <input type="number" className="form-control" name="mobileno" value={dataClient.personal_contact} readOnly='true' placeholder='Mobile No.' id="mobile" />
                                    </div>
                                    <div className="mb-3">
                                      <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                                      <label htmlFor='email'>Email</label>
                                      <input type="email" className="form-control" name="email" value={dataClient.email} readOnly='true' placeholder='Email' id='email' />
                                    </div>

                                    <button
                                      // type="submit"
                                      onClick={(e) => submitVarifydoc(e)}
                                      className="default-button"
                                    >
                                      Verify & Next
                                    </button>
                                  </form>

                                </TabPanel>
                                <TabPanel value={value} index={1}  >
                                  <div className='mb-3'>
                                    <form >

                                      <div className="form-group file-area">
                                        <div className="d-flex justify-content-center">
                                          <iframe
                                            className="d-flex"
                                            // src={`/images/${dataClient.id}e_sign-${(dataClient.document)}`}
                                            src={`/templates/${viewDocument}`}
                                            title="Your Document"
                                            width="350"
                                            height="280"
                                          />
                                        </div>

                                      </div>
                                    </form>

                                    <div className="form-group">
                                      <button type="submit " className="default-button" onClick={(e) => submitVarifyDocument(e)}>Confirm & Next </button>
                                    </div>

                                  </div>
                                </TabPanel>

                              </Box>
                            </TabPanel>
                          </> : ""}


                        {alertMsg && (
                          <AlertMessages
                            hideAlert={hideClose}
                            showAlert={alertMsg}
                            message={textAlert}
                            alertColor={alertColor}
                          />
                        )}
                      </Box>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div >

    </>
  );
}




