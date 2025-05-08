import React, { useEffect, useState, useRef } from 'react'
import { Link as RouterLink, NavLink, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, Table, Stack, Avatar, Button, Checkbox, TableRow, Alert, TableBody, TableCell, Container, Typography, Tooltip, TableContainer, TablePagination, } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { AddNewTemplate, AddNewVariables, GetAllVariables } from '../../../services'
import AlertMessages from "../../../utils/AlertMessages";
import { Icon } from '@iconify/react';

import Iconify from '../../../components/Iconify';

const AddTemplete = () => {
  const navigate = useNavigate();

  const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
  const [templateName, setTemplateName] = useState("");
  const [tempData, setTempData] = useState("");
  const [tempData1, setTempData1] = useState("");
  const [tempDataErr, setTempDataErr] = useState("");
  const [show, setShow] = useState(false);
  // alert toast
  const [refresh, setrefresh] = useState(true)
  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")


  // for Add variable
  const [VariableName, setVariableName] = useState("");

  const [AddharArr, setAddharArr] = useState('');
  const [AddVarArr, setAddVarArr] = useState('');



  const [show1, setShow1] = useState(false);

  const [selectVariableDropdown, setSelectVariableDropdown] = useState("");






  const hideClose = () => {
    setAlertMsg(false)
  }
  const AddNewTemplateFunc = async (e) => {
    e.preventDefault();

    if (templateName == "") {
      setTempDataErr("Enter A Template Name")
      return
    }

    let forAddarVar = [...new Set(AddVarArr)]
    // let forAddVar = [...new Set(AddharArr)]



    const data = {
      "name": templateName,
      "html": tempData,
      "variables": forAddarVar
    }
    const tempres = await AddNewTemplate(data, AdminToken)
    if (tempres.message == "success") {
      setAlertMsg(true)
      setAlertColor("success")
      setTextAlert('Tamplate Add Successfully')
      navigate("/admin/templetelist")
      setShow(false)
    }

  }

  var aadharInfo = []
  var extraInfo = []
  const CopyLink = (data) => {
    if (data === "{{FATHERNAME}}" || data === "{{MOBILE}}" || data === "{{EMAIL}}" || data === "{{ZIP}}" || data === "{{ADDRESS}}" || data === "{{GENDER}}" || data === "{{DOB}}" || data === "{{FULLNAME}}") {
      aadharInfo.push(data.replace(/[_\s]/g, '').slice(2, -2))
      setAddharArr(pre => [...pre, aadharInfo].flat())
      // aadharInfo.push(data.substring(2, data.length - 2))
    } else {


      extraInfo.push(data.replace(/[_\s]/g, '').slice(2, -2))
      setAddVarArr(pre => [...pre, extraInfo].flat())
      // extraInfo.push(data.substring(2, data.length - 2))
    }
    var textField = document.createElement('textarea')
    textField.innerText = data
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    // alert('copied');

  }


  const getTransactionHistory = async () => {

    const response = await GetAllVariables(AdminToken)
    if (response) {
      setVariableName(response)

    }
  }


  useEffect(() => {
    getTransactionHistory();


  }, [])


  let kycarr = [{ "label": "FULLNAME" }, { "label": "DOB" }, { "label": "ADDRESS" }, { "label": "GENDER" }, { "label": "ZIP" }, { "label": "EMAIL" }, { "label": "MOBILE" }, { "label": "FATHERNAME" }]



  return (
    <div><Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

        <Typography variant="h4" gutterBottom>
          Add New Templete
        </Typography>
        <div className='d-flex mx-2'>

          <select aria-label="Default select example " style={{
            // left: '27.7em'
          }}
            className='filter-dropdown
           ms-2 custom-select w-50
           '
            name="status"
            onChange={(e) => setSelectVariableDropdown(e.target.value)}
          // value={flternactiveInactive}
          >
            <option value="" selected disabled >Select Variable</option>
            <option value="0">FOR ADDHAAR KYC </option>
            <option value="1">FOR ADDITIONAL </option>
          </select>


          {/* <select aria-label="Default select example " style={{
            // left: '27.7em'
          }}
            className='filter-dropdown
           ms-2 custom-select w-50
           '
            name="status"
            onChange={(e) => { CopyLink(e.target.value) }}
          // value={flternactiveInactive}
          >
            <option value="" selected disabled >Select Variable</option>
            {VariableName && VariableName.map((item) => {
              return <option value={`{{${item.label.toUpperCase()}}}`} >{item.label} </option>
            })}
          </select> */}

          {/* <select aria-label="Default select example " style={{
            // left: '27.7em'
          }}
            className='filter-dropdown
           ms-2 custom-select w-50
           '
            name="status"
            onChange={(e) => { CopyLink(e.target.value) }}
          // value={flternactiveInactive}
          >
            <option value="" selected disabled >Select Variable</option>
            <option value="{{FULLNAME}}">FULLNAME </option>
            <option value="{{DOB}}">DOB</option>
            <option value="{{ADDRESS}}">ADDRESS</option>
            <option value="{{GENDER}}">GENDER</option>
            <option value="{{ZIP}}">ZIP</option>
            <option value="{{EMAIL}}">EMAIL</option>
            <option value="{{MOBILE}}">MOBILE</option>
            <option value="{{FATHERNAME}}">FATHERNAME</option>


          </select> */}

          <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/admin/templetelist" startIcon={<Iconify icon="line-md:arrow-left" />}>
            Back
          </Button>
        </div>
      </Stack>
      <Card >
        <div className="d-flex">

          <div className="col-9">

            <SunEditor
              className=""
              setOptions={{
                // width: '210mm', // A4 paper width in millimeters
                height: '597mm',
                buttonList: [
                  ['preview'],
                  ["font", "fontSize", "formatBlock"],
                  [
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "subscript",
                    "superscript",
                  ],
                  ["align", "horizontalRule", "list", "table"],
                  ["fontColor", "hiliteColor"],
                  ["outdent", "indent"],
                  ["undo", "redo"],
                  // ["removeFormat"],
                  ["outdent", "indent"],
                  ["link", "image"],
                  ["preview", "print"],
                  // ["showBlocks", "codeView"],
                ],
                // previewTemplate: previewTemplate,
                onToolbarButtonClick: (event, button) => {
                  if (button === 'preview') {

                    setTempData1(event);
                  }
                }

              }}


              // getSunEditorInstance={getSunEditorInstance}
              onChange={(e) => setTempData(e)}
              style={{ overflowY: "scroll", height: "70vh" }}
            />
            <div>
              {tempData1}
            </div>

          </div>

          <div className='col-3'>

            {/* Show Vairables */}
            <Typography className="text-center" variant="h6" gutterBottom>
              Select Variables
            </Typography>

            <ul class="list-group list-group-flush " style={{ overflowY: "scroll", height: '5 0vh' }}>
              {selectVariableDropdown == "0" ?
                <>
                  {kycarr && kycarr.map((item) => {
                    return <li class="list-group-item flex-grow-1" style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between"
                    }} value={`{{${item.label.toUpperCase()}}}`} >{item.label} <button className='btn btn-primary ' onClick={(e) => CopyLink(`{{${item.label.toUpperCase()}}}`)}    >copy</button></li>
                  })}
                </>
                : selectVariableDropdown == "1" ?
                  <>
                    {VariableName && VariableName.map((item) => {
                      return <li class="list-group-item flex-grow-1" style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between"
                      }} value={`{{${item.label.toUpperCase()}}}`} >{item.label} <button className='btn btn-primary ' onClick={(e) => CopyLink(`{{${item.label.toUpperCase()}}}`)}>copy</button></li>
                    })}
                  </> : ""
              }
            </ul>

            {/* Show Vairables */}



          </div>
        </div>







        <Button className='MuiButton-contained mt-0 text-light ms-2 mt-2' onClick={() => setShow1(true)} >Next</Button>

        {/* Templete Save Model  */}
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create New Tempalte</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" placeholder='Enter Template Name' className='form-control' onChange={(e) => { setTemplateName(e.target.value); setTempDataErr("") }} />
            <p className='text-danger  fw-bold'>   {tempDataErr ? tempDataErr : ""} </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => AddNewTemplateFunc(e)}>
              AddTemplate
            </Button>
          </Modal.Footer>
        </Modal>





        {/* View Selected Variable  Model  */}

        <Modal show={show1} onHide={() => setShow1(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Your Selected Variables</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Typography variant="h6" gutterBottom>
              For Addhar Kyc
            </Typography>

            {[...new Set(AddharArr)]  && [...new Set(AddharArr)].map((item, index) => {
              return <>
                <div className="form-check form-check-inline" key={index}>
                  <input className="form-check-input mb-3 check_mobile" type="checkbox" id={item}
                    checked="true"
                  />
                  <label className="form-check-label fw-bold" htmlFor={item}>{item}
                  </label>
                </div>
              </>
            })}
            <hr />

            <Typography variant="h6" gutterBottom>
              For Additional Variable
            </Typography>


            { [...new Set(AddVarArr)]  && [...new Set(AddVarArr)].map((item, index) => {
              return <>
                <div className="form-check form-check-inline" key={index}>
                  <input className="form-check-input mb-3 check_mobile" type="checkbox" id="inlineCheckbox4"
                    checked="true"
                  />
                  <label className="form-check-label fw-bold" htmlFor="inlineCheckbox4">{item}
                  </label>
                </div>
              </>

            })}

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => { setShow(true); setShow1(false) }}>
              Next
            </Button>
          </Modal.Footer>
        </Modal>








      </Card>
      {
        alertMsg && (
          <AlertMessages
            hideAlert={hideClose}
            showAlert={alertMsg}
            message={textAlert}
            alertColor={alertColor}
          />
        )
      }
    </Container>

    </div >
  )
}

export default AddTemplete











