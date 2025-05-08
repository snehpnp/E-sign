import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Base64 } from "js-base64";
import AlertMessages from "../../utils/AlertMessages";
import { getUsersById, AdharAndPanVerifigation, PostTransectionHistory, } from "../../services";

const Addharvarification = () => {

  const location = useLocation();
  const userid = location.pathname.split("/")[2];
  const SuperAdminToken = JSON.parse(localStorage.getItem("admin")).accessToken;
  const parendId = JSON.parse(localStorage.getItem("admin")).id;
  const routId = Base64.decode(userid)

  const [adharPan, setAdharPan] = useState("");
  const [dataClient, setDataClient] = useState("")
  const [aadharErr, setAadharErr] = useState("");


  console.log("dataClient", dataClient);
  const navigate = useNavigate();

  // alert states
  const [alertMsg, setAlertMsg] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [textAlert, setTextAlert] = useState("");

  const hideClose = () => {
    setAlertMsg(false);
  };


  const getParticularClient = async () => {
    const response = await getUsersById(routId, SuperAdminToken);
    if (response) {
      setDataClient(response.data);
    }
  };

  useEffect(() => {
    getParticularClient();
  }, []);




  const submitVarify = async (e) => {
    e.preventDefault();

    const data = {
      'id_number': adharPan,
    };
    const response = await AdharAndPanVerifigation(data);


    console.log('logggg', response);

    if (response.success === true) {
      console.log('ifff');
      console.log('response.success', typeof response.success);
      console.log('response.success',response.success);
      const transData = {
        'aadhaar_number': response.data.aadhaar_number,
        'full_name': response.data.full_name,
        'client_id': response.data.client_id,
        'age_range': response.data.age_range,
        'gender': response.data.gender,
        'last_digits': response.data.last_digits,
        'state': response.data.state,
        'sign_type': "aadhar_verify",
        'parent_admin_id': parendId,
        'user_id': Base64.decode(userid),
      };
      const res = await PostTransectionHistory(transData, SuperAdminToken);

      // console.log("res", res);
      setAlertMsg(true);
      setAlertColor("success");
      setTextAlert("Your Adhar  Verification is Successfully ");

    }
    else {
      console.log('else');
      alert('hello')
      const transData = {
        'aadhaar_number': response.data.aadhaar_number,
        // 'full_name': 'failed',
        'client_id': response.data.client_id,
        'age_range': 'failed',
        'gender': 'failed',
        'last_digits': 'failed',
        'state': 'failed',
        'sign_type': "aadhar_verify",
        'parent_admin_id': parendId,
        'user_id': Base64.decode(userid),
      };
      const res = await PostTransectionHistory(transData, SuperAdminToken);

      setTextAlert(response.data.message);
      setAlertMsg(true);
      setAlertColor("error");
    }



  };

  return (
    <form>
      <div className="mb-3">
        <input
          onChange={(e) => {
            setAdharPan(e.target.value);
            setAadharErr("");
          }}
          type="text"
          className="form-control"
          placeholder="Enter Adhar No."
        />
      </div>

      <p>{aadharErr}</p>

      <button
        type="submit"
        onClick={(e) => submitVarify(e)}
        className="default-button"
      >
        Varify
      </button>

      {alertMsg && (
        <AlertMessages
          hideAlert={hideClose}
          showAlert={alertMsg}
          message={textAlert}
          alertColor={alertColor}
        />
      )}
    </form>
  );
};

export default Addharvarification;
