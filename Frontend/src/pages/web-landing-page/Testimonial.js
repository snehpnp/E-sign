import React from 'react'

export const Testimonial = () => {
  return (
    <div><section className="testimonials ptb-100">
    <div className="container">
       <div className="default-section-title default-section-title-middle">
          <span>Testimonials</span>
          <h3>Our Happy Clients</h3>
       </div>
       <div className="section-content">
          <div className="testimonial-slider-area ">
          <OwlCarousel className='owl-theme' loop  items={2}>
             <div className="testimonial-card item">
                <img src="assets/images/testimonial/tc2.jpg" alt="imagess"/>
                <div className="testimonial-card item-text">
                   <p>“It is a long established fact that a reader will page when looking at its layout. The point of opposed to using 'Content here, content here', making it look like readable English.”</p>
                   <div className="testimonial-intro-area">
                      <div className="testimonial-card item-intro">
                         <h4>Robert Cook</h4>
                         <span>Front End Developer</span>
                      </div>
                      <div className="stars">
                      <ul>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
    </ul>  
                      </div>
                   </div>
                </div>
             </div>
             <div className="testimonial-card item">
                <img src="assets/images/testimonial/tc3.jpg" alt="imagess"/>
                <div className="testimonial-card item-text">
                   <p>“It is a long established fact that a reader will page when looking at its layout. The point of opposed to using 'Content here, content here', making it look like readable English.”</p>
                   <div className="testimonial-intro-area">
                      <div className="testimonial-card item-intro">
                         <h4>Danial Cook</h4>
                         <span>Back End Developer</span>
                      </div>
                      <div className="stars">
                      <ul>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
    </ul>  
                      </div>
                   </div>
                </div>
             </div>
             <div className="testimonial-card item">
                <img src="assets/images/testimonial/tc4.jpg" alt="imagess"/>
                <div className="testimonial-card item-text">
                   <p>“It is a long established fact that a reader will page when looking at its layout. The point of opposed to using 'Content here, content here', making it look like readable English.”</p>
                   <div className="testimonial-intro-area">
                      <div className="testimonial-card item-intro">
                         <h4>Peter Smith</h4>
                         <span>Front End Developer</span>
                      </div>
                      <div className="stars">
                      <ul>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
    </ul>  
                      </div>
                   </div>
                </div>
             </div>
             <div className="testimonial-card item">
                <img src="assets/images/testimonial/tc5.jpg" alt="imagess"/>
                <div className="testimonial-card item-text">
                   <p>“It is a long established fact that a reader will page when looking at its layout. The point of opposed to using 'Content here, content here', making it look like readable English.”</p>
                   <div className="testimonial-intro-area">
                      <div className="testimonial-card item-intro">
                         <h4>Robert Brown</h4>
                         <span>Manager</span>
                      </div>
                      <div className="stars">
                      <ul>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
                      <li>star</li>
    </ul>  
                      </div>
                   </div>
                </div>
             </div>
             <div className="testimonial-card item">
                <img src="assets/images/testimonial/tc6.jpg" alt="imagess"/>
                <div className="testimonial-card item-text">
                   <p>“It is a long established fact that a reader will page when looking at its layout. The point of opposed to using 'Content here, content here', making it look like readable English.”</p>
                   <div className="testimonial-intro-area">
                      <div className="testimonial-card item-intro">
                         <h4>Stive Smith</h4>
                         <span>Front End Developer</span>
                      </div>
                      <div className="stars">
                          <ul>
                            <li>star</li>
                            <li>star</li>
                            <li>star</li>
                            <li>star</li>
                            <li>star</li>
      </ul>  
                      </div>
                   </div>
                </div>
             </div>
             </OwlCarousel>
          </div>
       </div>
    </div>
    </section></div>
  )
}

export default Testimonial