import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Base64 } from "js-base64";
import AlertMessages from "../../utils/AlertMessages";
import { panVerifigation, PostTransectionHistory } from "../../services";
import Esignature from './Esignature';

const Panvarification = () => {

  const location = useLocation();

  const userid = location.pathname.split("/")[2];

  const [panNo, setPanNo] = useState("");

  // alert states
  const [alertMsg, setAlertMsg] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [textAlert, setTextAlert] = useState("");

  const hideClose = () => {
    setAlertMsg(false);
  };


  const SuperAdminToken = JSON.parse(localStorage.getItem("admin")).accessToken;

  const parendId = JSON.parse(localStorage.getItem("admin")).id;


  const submitVarify = async (e) => {

    e.preventDefault();

    const data = {
      'id_number': panNo,

    };
    const response = await panVerifigation(data);

    if (response.success === true) {

      // // setPanNo("")
      const transData = {
        'client_id': response.data.client_id,
        'pan_number': response.data.pan_number,
        'full_name': response.data.full_name,
        'category': response.data.category,
        'sign_type': "pan_verify",
        'parent_admin_id': parendId,
        'user_id': Base64.decode(userid),
      };
      const res = await PostTransectionHistory(transData, SuperAdminToken);


      // setGetRespone(response.data);
      setAlertMsg(true);
      setAlertColor("success");
      setTextAlert("Your Pancard Verification is Successfully ");
      // <Esignature />

      // setTimeout(() => navigate('/admin/clientlist'), 1000)

    } else if (response.data.success === false) {
      setTextAlert(response.data.message);
      setAlertMsg(true);
      setAlertColor("error");
    }
  };


  return (
    <form>
      {/* <div className="mb-3">
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Full Name"
        />
      </div> */}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Pan No."
          onChange={(e) => setPanNo(e.target.value)}
        />
      </div>

      <button
        // type="submit"
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

export default Panvarification;
