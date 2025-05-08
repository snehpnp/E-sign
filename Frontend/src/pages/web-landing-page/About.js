import React from 'react'

export default function About() {
  return (
    <div  id="about"><section className="why-only-we ptb-100">
    <div className="container">
       <div className="row align-items-center">
       <div className="col-xl-6 col-lg-12 col-sm-12 col-md-12 col-12">
             <div className="why-only-img-area">
             <img src={`${process.env.PUBLIC_URL}  /assets/images/banner/about.gif`}  alt="imagess"/> 
             </div>
          </div>
          <div className="col-xl-6 col-lg-12 col-sm-12 col-md-12 col-12">
             <div className="why-only-we-text-area pr-20">
                <div className="default-section-title">
                   <span>Why Only We</span>
                   <h3>Reason For Choosing Our Strike Consultancy</h3>
                </div>
                <p>Looking for a way to esign documents fast?</p>
                <p>Our experts measures the brand safety. We are delivered comprehensive protection as well as brand protection, domain management and cyber security with worldwide reach. As a customer, you will get a package solution with your own dedicated customer team for proactive advice and management of your company's brand portfolio.
                </p>
                <p>Our unique solution Electronic Signature Technology gives you a complete overview and security of all your brands, domains through one with the same platform.Use our electronic signature solution to sign documents or send business contracts to others for them to esign. Simplify the signing process from anywhereon any device with our secure esignature tool. Use our secure ESign PDF online tool to simplify your workflows with one simple solution:PDF!</p>
                
             </div>
          </div>
          
       </div>
    </div>
    </section>
    </div>
  )
}


