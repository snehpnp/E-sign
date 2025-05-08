import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams, useLocation } from "react-router-dom";
import { Card, Stack, Button, Container, Typography } from "@mui/material";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Iconify from "../../components/Iconify";
// import { getAdmins } from '../../services';
import Page from "../../components/Page";
import AlertMessages from "../../utils/AlertMessages";
import * as Common from "../../utils/CommonMessage";
import { getAdminById, getStampsById, getAllPackages } from "../../services";

const ViewUserDetails = () => {
  const { id } = useParams();
  const AdminToken = JSON.parse(localStorage.getItem("superadmin")).accessToken;

  const location = useLocation();
  const [dataAdmin, setDataAdmin] = useState([]);
  const [estamps, setEStamps] = useState([]);
  const [packageData, setPackageData] = useState([]);

  const getAllAdmins = async () => {
    const response = await getAdminById(AdminToken, id);
    if (response) {
      setDataAdmin(response);
      // console.log("view", response);
    }
  };

  const getStampsData = async () => {
    const response = await getStampsById(AdminToken, id);
    if (response) {
      setEStamps(response);
      // console.log("stamp", response);
    }
  };

  // Get API For Get Packages Data

  const getPackages = async () => {
    const response = await getAllPackages(AdminToken);
    if (response) {
      setPackageData(response);
    }
  };
  console.log("package", packageData);

  useEffect(() => {
    getAllAdmins();
    getStampsData();
    getPackages();
  }, []);

  /* eslint-disable camelcase */
  const {
    fullname,
    username,
    email,
    company_email,
    personal_contact,
    company_contact,
    company_domain,
    fund,
    pan,
    adhaar,
    adhaar_sign,
    client_stamp,
    address,
    package_id,
  } = dataAdmin;
  //   console.log("Datata", dataClient);
  return (
    <Page title="User">
      {dataAdmin && (
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Company Detail
            </Typography>
            <Button
              style={{ color: "#fff" }}
              variant="contained"
              component={RouterLink}
              to="/superadmin/adminlist"
              startIcon={<Iconify icon="line-md:arrow-left" />}
            >
              Back
            </Button>
          </Stack>
          <Card>
            <Form>
              <div className="detail-view mx-5 my-4">
                <h4 style={{ fontWeight: "bolder", fontSize: "36px" }}>
                  Personal
                </h4>
                <div className="row mb-3 mt-4">
                  <div className="col-md-3">
                    <Typography variant="h6" gutterBottom>
                      Full Name
                    </Typography>
                    <p>{fullname}</p>
                  </div>
                  
                  <div className="col-md-3">
                    <Typography variant="h6" gutterBottom>
                      Email
                    </Typography>
                    <p>{email}</p>
                  </div>
                  <div className="col-md-3">
                    <Typography variant="h6" gutterBottom>
                      Personal Contact
                    </Typography>
                    <p>{personal_contact}</p>
                  </div>
                <div className="col-md-3">
                    <Typography variant="h6" gutterBottom>
                      Address
                    </Typography>
                    <p>{address}</p>
                  </div>
                </div>
                <div className="row mb-5 mt-5">
                
                </div>

                <h4 style={{ fontWeight: "bolder", fontSize: "36px" }}>
                  Company
                </h4>
                <div className="row mb-3 mt-4">
                  <div className="col-md-3">
                    <Typography variant="h6" gutterBottom>
                      Company Email
                    </Typography>
                    <p>{company_email}</p>
                  </div>
                  <div className="col-md-3">
                    <Typography variant="h6" gutterBottom>
                      User Name
                    </Typography>
                    <p>{username}</p>
                  </div>
                  <div className="col-md-3">
                    <Typography variant="h6" gutterBottom>
                      Company Contact
                    </Typography>
                    <p>{company_contact}</p>
                  </div>
                  <div className="col-md-3">
                    <Typography variant="h6" gutterBottom>
                      Company Domain
                    </Typography>
                    <p>{company_domain}</p>
                  </div>
               
                </div>

                <div className="row mb-3 mt-5">
                  <div className="col-md-3">
                    <Typography variant="h6" gutterBottom>
                      Verification
                    </Typography>
                    <ul>
                      {adhaar === 1 && <li>Aadhaar Verify</li>}
                      {pan === 1 && <li>Pan Verify</li>}
                      {adhaar_sign === 1 && <li>Aadhaar Sign</li>}
                    </ul>
                  </div>
                  <div className="col-md-3">
                    <Typography variant="h6" gutterBottom>
                      Fund
                    </Typography>
                    <p>{fund}</p>
                  </div>
                  <div className="col-md-3">
                    <div className="col-md-3">
                      <Typography variant="h6" gutterBottom>
                        Stamp
                      </Typography>
                      {estamps.map((x) => (
                        <ul>
                          <li>{x.stamp}</li>
                        </ul>
                      ))}
                    </div>
                  </div>

                  {/* <div className="col-md-3">
                    <div className="col-md-3">
                      <Typography variant="h6" gutterBottom>
                        Package
                      </Typography>
                      {packageData.map((x) => (
                        <ul>
                          <li>{x.name}</li>
                        </ul>
                      ))}
                    </div>
                  </div> */}
                  {/* <div className='col-md-3'>
                  <Typography variant="h6" gutterBottom>
                    Package ID
                  </Typography>
                  <p>{package_id}</p>
                </div> */}
                </div>
              </div>
            </Form>
          </Card>
        </Container>
      )}
    </Page>
  );
};

export default ViewUserDetails;
