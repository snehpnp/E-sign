import React from 'react'

 const Pricing = ({data}) => {
  return (
    <div style={{background:'#fff'}} id="pricing">
    <div className="pricing-table pt-100 pb-70">
      
   {/* {
   data && data.map((item,i)=>(
   <div className={`ptable-item ${i % 2 !== 0 ? "featured-item" : ""}`}>
      <div className="ptable-single">
        <div className="ptable-header">
       {i % 2 !== 0 ? <div className="ptable-status">
            <span>Hot</span>
          </div> : ""}
          <div className="ptable-title">
            <h2>{item.name}</h2>
          </div>
          <div className="ptable-price">
            <h2><small>Rs.</small>{item.price}<span>/ M</span></h2>
          </div>
        </div>
        <div className="ptable-body">
          <div className="ptable-description">
            <ul>
              <li>Signatures : {item.signature_count}</li>
              <li>Package Validity : {item.package_validity} {item.package_day_month}</li>
              <li>Well-commented Code</li>
              <li>Easy to Use</li>
            </ul>
          </div>
        </div>
        <div className="ptable-footer">
          <div className="ptable-action">
            <a href="">Buy Now</a>
          </div>
        </div>
      </div>
    </div>
   ))  
  } */}
  
    <div className="ptable-item featured-item">
      <div className="ptable-single">
        <div className="ptable-header">
        
          <div className="ptable-title">
            <h2>Trial </h2>
          </div>
          <div className="ptable-price">
            <h2><small><b>₹</b></small>500<span><b>+GST</b></span></h2>
          </div>
        </div>
        <div className="ptable-body">
          <div className="ptable-description ">
          <h5 className='w-100'>Package Validity 15 Days</h5>
          <a href="#" className="rainbow-button" alt="Offer 15+15days = 30 days"></a>
          <div className='d-flex justify-content-center'>
            <ul>
              <li>Pan Verification </li>
              <li>Aadhaar Verification </li>
              <li>Aadhaar Signature</li>
            </ul>
            <ul>
           
            <li>₹7</li>
            <li>₹13</li>
            <li>₹30</li>
          </ul>
          </div>
          <hr/>
          <h6 className='w-100'>Total- One Signature ₹50</h6>
         
          </div>
        </div>
       
      </div>
    </div> 
  
   <div className="ptable-item">
      <div className="ptable-single">
        <div className="ptable-header">
          <div className="ptable-title">
            <h2>Silver </h2>
          </div>
          <div className="ptable-price">
            <h2><small><b>₹</b></small>3000<span><b>+GST</b></span></h2>
          </div>
        </div>
        <div className="ptable-body">
          <div className="ptable-description ">
          <h5 className='w-100'>Package Validity 45 Days</h5>
          <a href="#" className="rainbow-button" alt="Offer 45+45days = 90 days"></a>
          <div className='d-flex justify-content-center'>
            <ul>
              <li>Pan Verification </li>
              <li>Aadhaar Verification </li>
              <li>Aadhaar Signature</li>
            </ul>
            <ul>
           
            <li>₹6</li>
            <li>₹12</li>
            <li>₹22</li>
          </ul>
          </div>
          <hr/>
          <h6 className='w-100'>Total- One Signature ₹40</h6>
          <p className='px-2' style={{fontSize:'12px'}}>Note- Data Validity 2 month from purchase</p>
          </div>
        </div>
        
      </div>
    </div>
    <div className="ptable-item featured-item">
    <div className="ptable-single">
      <div className="ptable-header">

        <div className="ptable-title">
          <h2>Gold</h2>
        </div>
        <div className="ptable-price">
          <h2><small><b>₹</b></small>7000<span><b>+GST</b></span></h2>
        </div>
      </div>
      <div className="ptable-body">
      <div className="ptable-description ">
      <h5 className='w-100'>Package Validity 3 Months</h5>
      <a href="#" className="rainbow-button" alt="Offer  3+3 Month = 6 Month"></a>

      <div className='d-flex justify-content-center'>
        <ul>
          <li>Pan Verification </li>
          <li>Aadhaar Verification </li>
          <li>Aadhaar Signature</li>
        </ul>
        <ul>
       
        <li>₹5</li>
        <li>₹10</li>
        <li>₹20</li>
      </ul>
      </div>
      <hr/>
      <h6 className='w-100'>Total- One Signature ₹35</h6>
      <p className='px-2' style={{fontSize:'12px'}}>Note- Data Validity 6 month from purchase</p>
      </div>
    </div>
     
    </div>
  </div>  
  <div className="ptable-item">
  <div className="ptable-single">
    <div className="ptable-header">
      <div className="ptable-title">
        <h2>Platinum</h2>
      </div>
      <div className="ptable-price">
        <h2><small><b>₹</b></small>12500<span><b>+GST</b></span></h2>
      </div>
    </div>
    <div className="ptable-body">
          <div className="ptable-description ">
          <h5 className='w-100'>Package Validity 3 Months</h5>
          <a href="#" className="rainbow-button" alt="Offer 3+3 Month = 6 Month"></a>
          <div className='d-flex justify-content-center'>
            <ul>
              <li>Pan Verification </li>
              <li>Aadhaar Verification </li>
              <li>Aadhaar Signature</li>
            </ul>
            <ul>
           
            <li>₹3</li>
            <li>₹7</li>
            <li>₹15</li>
          </ul>
          </div>
          <hr/>
          <h6 className='w-100'>Total- One Signature ₹25</h6>
          <p className='px-2' style={{fontSize:'12px'}}>Note- Data Validity 6 month from purchase</p>
          </div>
        </div>
  
  </div>
</div>
  </div>
    </div>
  )
}
export default Pricing