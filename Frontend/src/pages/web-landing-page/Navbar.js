import React from 'react'
import { Link as NLink } from "react-router-dom";
import { Link } from "react-scroll";
import "jquery/dist/jquery"
import "bootstrap/dist/js/bootstrap";


const Navbar = () => {

    return (
       <div className="header-area header-1">
          <div className="navbar-area">
             <div className="main-responsive-nav">
                <div className="container-fluid px-0">
                   <div className="mobile-nav">
                   <nav className="navbar navbar-expand-xlg  navbar-dark">
                   <div className="container-fluid">
                     
                     <Link className="navbar-brand" to="">
                         <img src="assets/images/e-sign-aadhaar.png" alt="logo" style={{width:'100px'}}/>
                      </Link>
                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                       <span className="navbar-toggler-icon"/>
                     </button>
                     <div className="collapse navbar-collapse" id="collapsibleNavbar">
                     <ul className="navbar-nav">
                     <li className="nav-item ">
                        <NLink to="/" className="nav-link active">
                           Home
                        </NLink>
                     </li>
                     <li className="nav-item">
                        <Link to="about" className="nav-link">
                           About
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link to="benifits" className="nav-link">
                           Benifits
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link to="process" className="nav-link">
                           Process
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link to="pricing" className="nav-link">
                           Pricing{" "}
                        </Link>
                     </li>

                     <li className="nav-item">
                        <Link to="enquiry" className="nav-link">
                           Enquiry
                        </Link>
                     </li>
                     <li className="nav-item">
                        <NLink to="/contact" className="nav-link">
                           Contact Us
                        </NLink>
                     </li>
                  </ul>
                     </div>
                   </div>
                 </nav>
                   </div>
                </div>
             </div>
             <div className="main-nav">
                <div className="container">
                   <nav className="navbar navbar-expand-md navbar-light">
                      <NLink className="navbar-brand" to="/">
                         <img src="assets/images/e-sign-aadhaar.png" alt="logo" style={{width:'130px'}}/>
                      </NLink>
                      <div
                         className="collapse navbar-collapse mean-menu"
                         id="navbarSupportedContent"
                      >
                         <ul className="navbar-nav">
                            <li className="nav-item ">
                               <NLink to="/" className="nav-link active">
                                  Home
                               </NLink>
                            </li>
                            <li className="nav-item">
                               <Link to="about" className="nav-link">
                                  About
                               </Link>
                            </li>
                            <li className="nav-item">
                               <Link to="benifits" className="nav-link">
                                  Benifits
                               </Link>
                            </li>
                            <li className="nav-item">
                               <Link to="process" className="nav-link">
                                  Process
                               </Link>
                            </li>
                            <li className="nav-item">
                               <Link to="pricing" className="nav-link">
                                  Pricing{" "}
                               </Link>
                            </li>
 
                            <li className="nav-item">
                               <Link to="enquiry" className="nav-link">
                                  Enquiry
                               </Link>
                            </li>
                            <li className="nav-item">
                               <NLink to="/contact" className="nav-link">
                                  Contact Us
                               </NLink>
                            </li>
                         </ul>
                         <div className="menu-sidebar d-flex align-items-center">
                         <a href="/#/login" target="_blank" className="default-button" >
                         Login
                      </a> 
                        {/* <NLink className="pe-3" to="/login">
                               Login
    </NLink> 
                            <a href="/#/register" target="_blank" className="default-button" >
                               Get in touch
                            </a> */} 
                         </div>
                      </div>
                   </nav>
                </div>
             </div>
          </div>
       </div>
    );
 }
 export default Navbar