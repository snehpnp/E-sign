
import React, { useEffect, useState, useRef } from 'react'
import { Link as RouterLink, NavLink, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, Table, Stack, Avatar, Button, Checkbox, TableRow, Alert, TableBody, TableCell, Container, Typography, Tooltip, TableContainer, TablePagination, } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { FindByOneTemplates, UpdateTemplates , GetAllVariables } from '../../../services'
import AlertMessages from "../../../utils/AlertMessages";

import Iconify from '../../../components/Iconify';

const EditTemplete = () => {
  const navigate = useNavigate();
  const Location = useLocation();
  const { parmsid } = useParams();
  console.log("parmsid", parmsid);

  const AdminToken = JSON.parse(localStorage.getItem('admin')).accessToken;
  const [templateName, setTemplateName] = useState("");
  // const [content, setContent] = useState('');
  // console.log("navigate", content);

  const [tempData, setTempData] = useState("");
  const [tempDataErr, setTempDataErr] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');


  // for Add variable
  const [VariableName, setVariableName] = useState("");


  // alert toast
  const [refresh, setrefresh] = useState(true)
  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")
  const hideClose = () => {
    setAlertMsg(false)
  }



  const TemplateById = async (id) => {
    const request = {
      "id": Location.state[1]

    }
    const res = await FindByOneTemplates(request, AdminToken);
    console.log("find By One", res);
    setData(res)
    setTemplateName(res && res.name)

    // if (res) {
    // }

  }

  useEffect(() => {
    TemplateById()
  }, [])







  const UpdateTemplateFunc = async (e) => {
    e.preventDefault();
    if (templateName == "") {
      setTempDataErr("Enter A Template Name")
      return
    }

    const data = {
      "name": templateName,
      "html": tempData,
      "id": Location.state[1]
    }
    const tempres = await UpdateTemplates(data, AdminToken)
    console.log("tempres", tempres);
    if (tempres.message == "Template was updated successfully!") {
      setAlertMsg(true)
      setAlertColor("error")
      setTextAlert(tempres.message)
      setShow(false)
      navigate("/admin/templetelist")
    }

  }

  // Copy Variable

  const CopyLink = (data) => {
    var textField = document.createElement('textarea')
    textField.innerText = data
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    alert('copied');
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



  return (
    <div><Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Edit Templete
        </Typography>
        <div className='d-flex mx-2'>
          <select aria-label="Default select example " style={{
          }}
            className='filter-dropdown
           ms-2 custom-select w-50'
            name="status"
            onChange={(e) => { CopyLink(e.target.value) }}
          // value={flternactiveInactive}
          >
            <option value="" selected disabled >Select Additional Variables</option>
            {VariableName && VariableName.map((item) => {
              return <option value={`{{${item.label.toUpperCase()}}}`} >{item.label} </option>
            })}
          </select>

          <select aria-label="Default select example " style={{
            // left: '27.7em'
          }} className='filter-dropdown ms-2 custom-select' name="status"
            onChange={(e) => { CopyLink(e.target.value) }}
          // value={flternactiveInactive}
          >
            <option value="" selected disabled >Select Variable</option>
            <option value="{{FULLNAME}}" >FULLNAME</option>
            <option value="{{DOB}}">DOB</option>
            <option value="{{ADDRESS}}" >ADDRESS</option>
            <option value="{{GENDER}}" >GENDER</option>
            <option value="{{ZIP}}" >ZIP</option>
            <option value="{{EMAIL}}" >EMAIL</option>
            <option value="{{MOBILE}}" >MOBILE</option>


          </select>
          <Button style={{ color: '#fff' }} variant="contained" component={RouterLink} to="/admin/templetelist" startIcon={<Iconify icon="line-md:arrow-left" />}>
            Back
          </Button>
        </div>

      </Stack>
      <Card >
        <SunEditor
          name="content"
          setContents={data && data.html}
          // defaultValue={content}
          // defaultValue={<p>{data && data.html}</p>}

          setOptions={{
            buttonList: [
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
              ["showBlocks", "codeView"],
            ],
          }}
          // getSunEditorInstance={getSunEditorInstance}
          onChange={(e) => setTempData(e)}
          style={{ overflowY: "scroll", height: "70vh" }}
        />

        <Button className='MuiButton-contained mt-0 text-light ms-2 mt-2' onClick={() => setShow(true)} >Next</Button>

        {/* Templete Save Model  */}
        <Modal show={show} onHide={() => setShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Template Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" placeholder='Enter Template Name' className='form-control' onChange={(e) => { setTemplateName(e.target.value); setTempDataErr("") }} value={templateName} />
            <p className='text-danger  fw-bold'>   {tempDataErr ? tempDataErr : ""} </p>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button> */}
            <Button variant="primary" onClick={(e) => UpdateTemplateFunc(e)}>
              Update
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

    </div>
  )
}

export default EditTemplete