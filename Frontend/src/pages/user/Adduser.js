import React from 'react'

const Adduser = () => {
  return (

    <form>

      <div className="mb-3 form-group row">
        <div className='col-md-6'>
          <input type="text" className="form-control" placeholder='Name' required /></div>
        <div className='col-md-6'>
          <input type="email" className="form-control" placeholder='Email' required /></div>
      </div>

      <div className="mb-3 form-group row">
        <div className='col-md-6'>
          <input type="text" className="form-control" placeholder='Address' required="true" />
        </div>
        <div className='col-md-6'>
          <input type="number" className="form-control" placeholder='Contact No.' required /></div>
      </div>
      <div className="mb-3 form-group row">
        <div className='col-md-6'>
          <input type="date" className="form-control" placeholder='DOB' required="true" />
        </div>
        <div className='col-md-6' />

      </div>
      <div className='row'>
        <div className='col-md-6'>
          <div className="form-group">

            <select className="form-control" id="sel1">
              <option value="" disabled selected>Select stamp...</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
        <div className='col-md-6'>
          <div className="form-group">

            <select className="form-control" id="sel1">
              <option value="" disabled selected>Select signature...</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
      </div>
      <div className='row text-left'>
        <div className=" col-md-12">
          <div className="form-check-inline ">
            <input type="checkbox" className="form-check-input me-2" value="" />Pan Varification</div>
          <div className="form-check-inline ">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" placeholder='Contact No.' required="true" />Addhar Varification
          </div>
        </div>

      </div>


    </form>

  )
}

export default Adduser