import React,{useEffect,useState} from 'react'
import { Link as Nlink } from "react-router-dom"
import { Link } from "react-scroll";
import Navbar from "./Navbar";
import About from "./About";
import Pricing from "./Pricing";
import Process from "./Process";
import Footer from "./Footer";
import Benifits from "./Benifits";
import { getAllPackages } from '../../services';


const WebLanding = () => {
   const [data, setData] = useState([]);

   // const SuperAdminToken = JSON.parse(localStorage.getItem('superadmin')).accessToken;
 
 
     // Get API For Get AllAdmins Data
 
   //   const getPackages = async () => {
   //     const response = await getAllPackages(SuperAdminToken)
   //     if (response) {
   //        console.log("respo",response);
   //       setData(response);
   //     }
   //   }
   // console.log('data1',data);
   
   //   useEffect(() => {
   //     getPackages();
   //   }, []);
   return (
      <div className="weblanding">
         <Navbar />

         <div className="main-banner" id="banner">
            <div className="main-banner-single-slider d-flex align-items-center">
               <div className="container">
                  <div className="row d-flex align-items-center">
                     <div className="col-md-6">
                        <div className="banner-text-area">
                           <h2>
                              Importance of Electronic Signature
                              <span className="text-white">
                                 Technology in the business process
                              </span>
                           </h2>
                        
                        </div>
                     </div>
                     <div className="col-md-6 p-0">
                        <img
                           src={`${process.env.PUBLIC_URL}  /assets/images/banner/blog-anim.gif`}
                           alt="imagess"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <About />
<Benifits/>
         <Process />
         <Pricing data={data}/>

         <section className="booking ptb-100 bg-f8f8f8" id="enquiry">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-lg-6">
                     <div className="booking-form-area pr-20">
                        <div className="default-section-title">
                           <span>Get A Quote</span>
                           <h3>Fill Out This Form Now</h3>
                        </div>
                        <h6 className='pt-3'>
                        Get in touch and we’ll be glad to help.</h6>
                        <p>
                        Connect with us and we are happy to answer all your questions.
                        
                        </p>
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
                                    type="text"
                                    className="form-control"
                                    placeholder="Website Link*"
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
                  <div className="col-lg-6">
                     <div className="booking-img">
                        <img
                           src={`${process.env.PUBLIC_URL}  /assets/images/banner/contact.jpg`}
                           alt="imagess"
                        />

                        <div className="booking-shape">
                           <img src="assets/images/shape/shape3.png" alt="shape" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <Footer />
      </div>
   );
};

export default WebLanding;


