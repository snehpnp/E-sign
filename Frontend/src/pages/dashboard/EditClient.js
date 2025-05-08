import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams, useLocation } from "react-router-dom";
import { Card, Stack, Button, Container, Typography } from "@mui/material";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Document } from 'react-pdf';
import Iconify from "../../components/Iconify";
import Page from "../../components/Page";
import AlertMessages from "../../utils/AlertMessages";
import * as Common from "../../utils/CommonMessage";
// import {  } from "../../services";
import { getSignedDocument, getUsersById  ,FindByOneTemplates} from '../../services';


const EditClient = () => {
  const { id } = useParams();
  const location = useLocation();
  const [dataClient, setDataClient] = useState([]);
  const [documentss, setDocument] = useState('');
  const [ErrorDoc, setErrorDoc] = useState('');
  const [doc, setDoc] = useState('');




  console.log("documentss", dataClient.template_id);





  const getParticularClient = async () => {
    const response = await getUsersById(id);
    var responsedata = response.data
    if (response) {
      setDataClient(responsedata)
    }
    if (responsedata) {

      

      if (responsedata.sign_status === 1) {
        if (responsedata.otpbased == 0) {
          const response = await getSignedDocument(responsedata.client_id)
          if (response.status_code == 200) {
            return setDocument(response.data.url)
          } else if (response.response.status) {
            return setErrorDoc(response.response.data.message)
          }
        }
        else if (responsedata.otpbased == 1) {
          return setDocument(`/signeddocument/${responsedata.id}e_sign-${responsedata.document} `)
        }
      } else {

        const request = {"id":  responsedata.template_id.toString() }
      const res = await FindByOneTemplates(request)
      // setDoc(`${res.name}${id}`)
      setDoc(`${res.html}`)
      console.log("find By One", res);
      
       //  return setDocument(`/images/${responsedata.id}e_sign-${responsedata.document}`)
      }
    }
  };

  useEffect(() => {
    getParticularClient();
  }, []);





  /* eslint-disable camelcase */
  const {
    username,
    fullname,
    email,
    personal_contact,
    client_stamp,
    adhaar,
    adhaar_sign,
    pan,
    data,
    document,
    adhaar_verify_with_otp,
    sign_status

  } = dataClient;


  return (
    <Page title="User">
      {dataClient && (
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              User Detail View
            </Typography>
            <Button
              style={{ color: "#fff" }}
              variant="contained"
              component={RouterLink}
              to="/admin/BulkClientList"
              startIcon={<Iconify icon="line-md:arrow-left" />}
            >
              Back
            </Button>
          </Stack>
          <Card>
            <Form>
              <div className="detail-view mx-5 my-4">
                <div className="row mb-3">
                  <Typography variant="h4" gutterBottom className="mb-4">                  </Typography>
                  <div className="col-md-6">
                    <Typography variant="h6" gutterBottom>
                      Document
                    </Typography>
                    {/* <p><img src='https://www.freeiconspng.com/thumbs/document-icon/document-icon-19.png' alt="..." style={{ width: '80px' }} /></p> */}
                    <p>

                      {/* <div className=" border my-2" style={{ height: "150px", width: '402px', borderRadius: '8px', position: "relative" }}>
                      <img src={typeof image === "string" ? `data: image / png; base64, ${ image } ` : URL.createObjectURL(image)} alt="zzz" style={{ height: "148px", width: '100%', borderRadius: '8px', position: "absolute" }}
                      />
                    </div> */}

                      {/* {sign_status ===1 ? `/ signeddocument / ${ dataClient.id } e_sign - ${ document } ` : ` / images / ${ dataClient.id } e_sign - ${ document } ` */}
                      {ErrorDoc && ErrorDoc !== '' ? <p>{ErrorDoc}</p> :
                      <>
                      { sign_status == 1 ? <iframe
                          src={documentss}
                          title="myFrame"
                          width="450"
                          height="500"
                        />
                      : 
                      <div style={{ height: '500px' , width: '450px' , overflowY : "scroll"}}  dangerouslySetInnerHTML={{ __html: doc && doc }} />

                      }
                    </>
                      }
                      {/* {ErrorDoc && ErrorDoc !== '' ? <p>{ErrorDoc}</p> :
                        <iframe
                          // src={showSignedDocument(dataClient.sign_status, dataClient.id, dataClient.document, dataClient.otpbased, dataClient.client_id)}
                          // src={documentss}
                          src={`/templates/${doc && doc}.pdf`}
                          title="myFrame"
                          width="450"
                          height="500"
                        //                        onLoad={(e)=>setDocument(e.target.files)}
                        />
                      } */}
                    </p>
                  </div>
                  <div className="col-md-6">

                    <Typography variant="h4" gutterBottom className="mb-4 mt-0">
                      User
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Full Name
                    </Typography>
                    <p>{fullname}</p>
                    <Typography variant="h6" gutterBottom>
                      Email
                    </Typography>
                    <p>{email}</p>
                    <Typography variant="h6" gutterBottom>
                      Mobile Number
                    </Typography>
                    <p>{personal_contact}</p>
                    <Typography variant="h6" gutterBottom>
                      Verification
                    </Typography>
                    <ul>
                      {adhaar_verify_with_otp !== 0 && <li>Aaddhar Varify</li>}
                      {pan !== 0 && <li>Pan Varify</li>}
                      {adhaar_sign !== 0 && <li>Aadhaar Sign</li>}
                    </ul>
                    {/* {client_stamp && (
                      <>
                        <Typography variant="h6" gutterBottom>
                          Stamp
                        </Typography>
                        <ul>
                          <li>{client_stamp}</li>
                        </ul>
                      </>
                    )} */}
                  </div>


                  <div className="col-md-6">
                    {/* <Typography variant="h4" gutterBottom className="mb-4">
                    User
                  </Typography> */}
                    {/* <div className="col-md-6">
                    <Typography variant="h6" gutterBottom>
                      Full Name
                    </Typography>
                    <p>{fullname}</p>
                    <Typography variant="h6" gutterBottom>
                      Email
                    </Typography>
                    <p>{email}</p>
                    <Typography variant="h6" gutterBottom>
                      Mobile Number
                    </Typography>
                    <p>{personal_contact}</p>
                  </div> */}

                  </div>
                </div>
                <div className="row mb-3">
                  {/* <div className="col-md-6">
                    <Typography variant="h6" gutterBottom>
                      Email
                    </Typography>
                    <p>{email}</p>
                  </div> */}
                  {/* <div className="col-md-6">
                    <Typography variant="h6" gutterBottom>
                      Mobile Number
                    </Typography>
                    <p>{personal_contact}</p>
                  </div> */}
                </div>
                {/* <Button variant="outlined" className='btn-lg  my-2' type="submit" onClick={(e) => ResendLink(e)}>
                  Update
                </Button> */}

              </div>
            </Form>
          </Card>
        </Container>
      )
      }
    </Page >
  );
};

export default EditClient;
