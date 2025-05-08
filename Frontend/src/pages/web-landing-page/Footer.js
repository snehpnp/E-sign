import React from 'react'
import { Link } from 'react-router-dom';

 const Footer = () => {
  return (
    <div><section className="footer ptb-100 bg-071327">
    <div className="container">
       <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
             <div className="footer-logo-area">
                <Link to="/"><img src="assets/images/e-sign-aadhaar.png" alt="imagess" style={{width:'200px'}}/></Link>
                <p>Aadhaar eSign is an online electronic signature service  to facilitate an Aadhaar holder to digitally sign a document. </p>
           
             </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
             <div className="footer-links footer-news-area pr-20">
                <h3>Important Links</h3>
               
                <ul>
                <li><Link to="/privacypolicy" className='pt-3'>Privacy Policy</Link></li>
                <li><Link to="/termsconditions" className='pt-3'>Terms & Conditions</Link></li>
                <li><Link to="/contact" className='pt-3'>Contact Us</Link></li>
                
                </ul>
             </div>
          </div>
          <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 col-12">
             <div className="footer-links footer-contact">
                <h3>Contact Us</h3>
                <ul>
                   <li><span>Our Address:</span> <Link to="">137, Ahilya Nagar Ext. Gopur Square.
                   Indore (Madhya Pradesh)</Link></li>
                   
                   <li><span>Our Phone:</span> <a href="tel:704903700">7049037000</a></li>
                   <li><span>Email:</span><a href="mailto:esign@esignaadhaar.com">esign@esignaadhaar.com</a>
</li>
                </ul>
             </div>
          </div>
        
       </div>
    </div>
    </section>
    </div>
  )
}
export default Footer;