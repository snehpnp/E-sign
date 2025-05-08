import React from 'react'

 const Process = () => {
  return (
    <div id='process'>
    <section className="why-we why-we-1 pt-100 pb-100 bg-f8f8f8">
<div className="shape">
   <div className="shape-img">
      <img src="assets/images/shape/shape1.png" alt="imagess"/>
   </div>
</div>
<div className="container">
   <div className="row d-flex align-items-center">
      <div className="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12">
         <div className="why-we-img-area">
         <img src={`${process.env.PUBLIC_URL}  /assets/images/banner/process.png`}  alt="imagess" className='ps-2'/> 
          
         </div>
      </div>
      <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
         <div className="why-we-text-area  pl-20">
            <div className="default-section-title">
               <span>Why Choose Us</span>
               <h3>Process Of E-Signature</h3>
            </div>
            <div className="why-card-area">
               <div className="row">
                  <div className="col-lg-10 col-md-12 col-sm-12 col-12">
                     <div className="why-we-card">
                        <h4>Aadhaar Verification</h4>
                        <p>Aadhaar Card verification is the process of verifying the existence of your Aadhaar card. </p>
                     </div>
                  </div>
                  <div className="col-lg-10 col-md-12 col-sm-12 col-12">
                     <div className="why-we-card">
                        <h4>PAN Verification</h4>
                        <p>Pan card verification, with the passage of time, has become a priority for easy onboarding of customers as well as vendors.</p>
                     </div>
                  </div>
                  <div className="col-lg-10 col-md-12 col-sm-12 col-12">
                     <div className="why-we-card">
                        <h4>Aadhaar E-Signature  </h4>
                        <p>The Aadhaar-holder can affix his/her eSign on any electronic content by authenticating himself/herself through OTP received on their mobile number registered with Aadhaar. </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</section>
    </div>
  )
}
export default Process