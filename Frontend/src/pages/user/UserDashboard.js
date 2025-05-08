import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

// components
import Page from '../../components/Page';
import { getUsersById } from '../../services';

import Iconify from '../../components/Iconify';
// sections

// import Adduser from './Adduser';
// import Addharvarification from './Addharvarification';
// import Panvarification from './Panvarification';
// import Esignature from './Esignature';
// import SendOtp from "./SendOtp"
import SubmitOtp from "./SubmitOtp"

// ----------------------------------------------------------------------

const FormTitles = [];

export default function UserDashboard() {
  const { id } = useParams()
  const [page, setPage] = useState(0);
  const [useData, setUserData] = useState()

  //  FormTitles = ["Aaddhar Varification", "Pan varification", "E Signature"]

  //   if(useData && useData){
  //   //  FormTitles = ["Aaddhar Varification", "Pan varification", "E Signature"];`
  //    if(useData.adhaar === 0){
  //     // FormTitles =  FormTitles.filter((item) => item !== "Aaddhar Varification");
  //       FormTitles = ["Pan varification", "E Signature"];

  //    }
  //  }



  const PageDisplay = (data) => {

    // if (data === "Aadhar Varification") {
    //   return useData && useData.adhaar === 0 ? " " : <Addharvarification />;
    // }
    // if (data === "Pan varification") {
    //   return useData && useData.pan === 0 ? " " : <Panvarification />;
    // }
    // if (data === "Send Otp ") {
    //   return useData && useData.otpbased === 1 ? " " : <SendOtp />;
    // }

    if (data === "Submit Otp ") {
      return useData && useData.otpbased === 1 ? " " : <SubmitOtp />;
    }
    // if (data === "E Signature") {
    //   return useData && useData.adhaar_sign === 0 ? " " : <Esignature />;
    // }
  };

  // const ProgressPerCss = (data) => {
  //   if (FormTitles.length === 3) {
  //     return "33.3%"
  //   }
  //   if (FormTitles.length === 2) {
  //     return "66.6%"
  //   }
  //   if (FormTitles.length === 1) {
  //     return "100%"
  //   }
  // }

  // page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%"
  // atob(id)
  // const getUserData = async () => {


  //   const Res = await getUsersById(atob(id));


  //   console.log("dddd", Res)


  //   if (Res) {
  //     if (Res.data.adhaar === 1) {
  //       FormTitles.push("Aadhar Varification")
  //     }
  //     if (Res.data.pan === 1) {
  //       FormTitles.push("Pan varification")
  //     }

  //     if (Res.data.otpbased === 1) {
  //       FormTitles.push("Send Otp ")
  //     }

  //     if (Res.data.otpbased === 1) {
  //       FormTitles.push("Submit Otp ")
  //     }

  //     if (Res.data.adhaar_sign === 1) {
  //       FormTitles.push("E Signature")
  //     }
  //     setUserData(Res)
  //     // console.log("FormTitles", FormTitles);
  //   }
  // }

  // useEffect(() => {
  //   getUserData()

  // }, []);

  return (
    <section style={{ height: "100vh" }} className="user-section" >
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6 img-row'>
            <img src="../assets/images/vp.png" alt="..." />
          </div>
          <div className='col-md-6 pe-0'>
            <div className="form multistep-form">

              <div className="form-container  pb-5">
                <div className="form-header">
                  <p className='text-center form-heading'>Document Verification Panel</p>
                </div>
                <div className="form-body  loder-form">
                  {/* <SubmitOtp /> */}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
