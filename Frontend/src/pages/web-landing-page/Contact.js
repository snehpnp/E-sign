import React from 'react'
import { Link } from "react-router-dom"
import Navbar from './Navbar'
import Footer from './Footer'

const Contact = () => {
  return (
    <div className='contact-div'>
      <Navbar />
      <section className="uni-banner">
<div className="container">
<div className="uni-banner-text-area">
<h1>Contact Us</h1>

</div>
</div>
</section>
      <section className="contact ptb-100">
        <div className="container">
          <div className="row d-flec align-items-center">
            <div className="col-lg-4">
              <div className="contact-card-area pr-20">
                <div className="default-section-title">
                  
                  <h3>Connect with us and we are happy to answer all your questions.</h3>
                </div>
                <div className="contact-card pt-3">
                  <h4> Address: </h4>
                  <p><Link to="#" className>137, Ahilya Nagar Ext. Gopur Square.</Link></p>
                </div>
                <div className="contact-card pt-3">
                  <h4> Email: </h4>
                  <p><a href="mailto:esign@esignaadhaar.com">esign@esignaadhaar.com</a> 
</p>
                </div>
                <div className="contact-card pt-3">
                  <h4>Call: </h4>
                  <p><a href="tel:(7049037000)">7049037000</a></p>
                </div>
               
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact-page-form-area pt-30 booking-form-area">
              <form>
              <div className="row">
                 <div className="col-lg-6">
                    <input
                       type="text"
                       className="form-control"
                       placeholder="Your Name*"
                       required
                    />
                 </div>
                 <div className="col-lg-6">
                    <input
                       type="email"
                       className="form-control"
                       placeholder="Your Email*"
                       required
                    />
                 </div>
                 <div className="col-lg-12">
                    <input
                       type="number"
                       className="form-control"
                       placeholder="Contact Number*"
                       required
                    />
                 </div>
                 <div className="col-lg-12">
                    <textarea
                       className="form-control"
                       rows="5"
                       placeholder="Your Message*"
                    />
                 </div>
                 <div className="col-lg-12">
                    <button className="default-button" type="submit">
                       Submit{" "}
                    </button>
                 </div>
              </div>
           </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
export default Contact