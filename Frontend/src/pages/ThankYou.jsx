import React, { useEffect, useState } from 'react'
import "./app.css";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";

import { getUsersById } from "../services";


const ThankYou = () => {
  const location = useLocation();
  // console.log("location.state", location.state.data.id);

  const getSignedDocument = (e) => {
    e.preventDefault();

    const downloadLink = document.createElement("a")
    const fileName = `${location.state.data.fullname}-signed-document.pdf`;
  //   // downloadLink.href = location.state.data.signeddocument;
  // console.log("fsdfdsfds" ,`/signeddocument/e_sign-${ location.state.data.document}`);
    downloadLink.href = `/signeddocument/${location.state.data.id}e_sign-${location.state.data.document}`;
   
    downloadLink.download = fileName;
    downloadLink.click();
// 
  }

  return (
    <section style={{ overflowX: 'hidden' }}>
      <div className='row d-flex align-items-center'>
        <div className='col-md-5 d-none d-md-block' style={{ background: '#000', height: '100vh' }}>
          <a href="#"><img src="/images/e-sign-aadhaar.png" className="w-50 m-auto logo-img" alt="e-sign" style={{ position: 'relative', top: '40%' }} /></a>
        </div>
        <div className='col-md-7'>
          <div className="jumbotron d-flex align-items-center justify-content-center flex-column text-center">
            <h1 className="display-3">Thank You!</h1>
            <p className="lead"><strong>For Signing With Us</strong></p>

            {location.state !== null && location.state.data.otpbased === 1 ?
               <button className='green-btn' onClick={((e) => getSignedDocument(e))}>Download Documents</button>
              : ""}

              
          </div>
        </div>
      </div>

    </section>
  )
}

export default ThankYou






