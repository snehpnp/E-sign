// import React from 'react'

// import { panVerifigation, PostTransectionHistory } from "../../services";
// const Esignature = () => {




//   const submitVarify = async (e) => {
//     e.preventDefault();





//   }

//   return (

//     <form>

//       <div className="mb-3">

//         <input type="email" className="form-control" placeholder='Name' />

//       </div>
//       <div className="mb-3">

//         <input type="password" className="form-control" placeholder='Addhar No' />
//       </div>
//       <div className="mb-3 ">
//         <input type="number" className="form-control" placeholder='OTP' />

//       </div>
//       <button
//         // type="submit"
//         onClick={(e) => submitVarify(e)}
//         className="default-button"
//       >
//         Varify
//       </button>
//     </form>
//   )
// }

// export default Esignature




import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Base64 } from "js-base64";



import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { encode, decode } from 'uint8-to-base64';
import { getUsersById, SignDocWithNotRegistredNo } from "../../services";
import { dateFormate } from "../../utils/formatTime";



function TabPanel(props) {
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [documentLink, setDocumnetLink] = useState("");

  const adminToken = JSON.parse(localStorage.getItem("admin")).accessToken;
  // const [data, setData] = useState("");
  const [dataClient, setDataClient] = useState("")
  // const [pdfInfo, setPdfInfo] = useState([]);
  const location = useLocation();

  const userid = Base64.decode(location.pathname.split("/")[2]);


  const getParticularClient = async () => {
    const response = await getUsersById(userid);
    console.log("editclient", response.data)
    if (response) {
      setDataClient(response.data);
      // setData(response.data.document);
      // setMultipart(response.multipart);
    }
  };

  useEffect(() => {
    getParticularClient();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const submitVarify = async (e) => {
    e.preventDefault();
    setValue(value + 1)
  }




  const submitVarifyDocument = async (e) => {
    e.preventDefault();


    if (dataClient.otpbased === 1) {
      const existingPdfBytes = await fetch(`/images/e_sign-${dataClient.document}`).then(res => res.arrayBuffer())
      // const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

      // Load a PDFDocument from the existing PDF bytes
      const pdfDoc = await PDFDocument.load(existingPdfBytes)

      // Embed the Helvetica font
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

      // Get the first page of the document
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]
      // pdfDoc.setAuthor('Humpty Dumpty')


      // Get the width and height of the first page
      const { width, height } = firstPage.getSize()

      // Draw a string of text diagonally across the first page

      firstPage.drawText(`Digitally signed by  ${dataClient.fullname}`, {
        x: 15,
        y: 53,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),

      })
      firstPage.drawText(`Date:  ${dateFormate(dataClient.createdAt)} `, {
        x: 15,
        y: 43,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),

      })
      firstPage.drawText('Reason: Contract', {
        x: 15,
        y: 33,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),

      })
      firstPage.drawText(`Verified By Mobile No -${dataClient.personal_contact} and Otp - ${dataClient.otp}  `, {
        x: 15,
        y: 23,
        size: 8,
        font: helveticaFont,
        color: rgb(0, 0, 0),

      })

      const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true })

      const downloadLink = document.createElement("a")
      const fileName = `${dataClient.fullname}.pdf`;
      downloadLink.href = pdfBytes;
      downloadLink.download = fileName;
      downloadLink.click();


      const req = {
        "id": userid,
        "signeddocument": pdfBytes
      }
      const response = await SignDocWithNotRegistredNo(req, adminToken);

    }
    else {
      window.open(dataClient.data, '_blank')
    }





    // ---------------------------------------------------








  }






  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          {/* <Tab label="Step 1" {...a11yProps(0)}   disabled={dissable}/> */}
          <Tab label="Step 1" {...a11yProps(0)} />
          <Tab label="step 2" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} >



        {/* Item One */}
        <form>

          <div className="mb-3">


            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
            <label htmlFor='name'>Full Name</label>
            <input type="text" className="form-control" name="fullname" value={dataClient.fullname} readOnly='true' placeholder='Full Name' id="name" />

          </div>
          {/* {namerror ? <p>{namerror}</p> : " "} */}
          <div className="mb-3">
            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
            <label htmlFor='mobile'>Mobile No.</label>
            <input type="number" className="form-control" name="mobileno" value={dataClient.personal_contact} readOnly='true' placeholder='Mobile No.' id="mobile" />
          </div>
          {/* {mobilerror ? <p>{mobilerror}</p> : " "} */}
          <div className="mb-3">
            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
            <label htmlFor='email'>Email</label>
            <input type="email" className="form-control" name="email" value={dataClient.email} readOnly='true' placeholder='Email' id='email' />
          </div>
          {/* {emailerror ? <p>{emailerror}</p> : " "} */}
          {/* {/* <div className="mb-3"> */}
          <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
          {/* <label htmlFor='reason'>Resson</label>
            <input type="text" className="form-control" name="resson" onChange={(e) => inputChange(e)} placeholder='Resson' id='reason' /> */}
          {/* </div> */}
          {/* {ressonError ? <p>{ressonError}</p> : " "} */}

          <button
            // type="submit"
            onClick={(e) => submitVarify(e)}
            className="default-button"
          >
            Varify
          </button>
        </form>

      </TabPanel>
      <TabPanel value={value} index={1}  >

        <div className='mb-3'>
          <form >

            <div className="form-group file-area">
              <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              {/* <label htmlFor="images">Select Document</label> */}
              {/* <input type="file" name="images" id="formdData" required="required" accept="application/pdf"  onChange={(e) => setDocumnet(e.target.files[0])} /> */}

              <div className="file-dummy">
                {/* <div className="success">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8SLh8GOim2szf-nANkrOU-C-WjufBbkSSmgD1utGBaTDZcKJPAQKfjttB0WstiNI4R4&usqp=CAU' alt=".." />
              </div> */}
                {/* <div className="default">*  Please Upload The Document You Want To Sign </div> */}

                <iframe
                  src={`/images/e_sign-${(dataClient.document)}`}
                  title="Your Document"
                  width="450"
                  height="500"
                />
              </div>

            </div>
          </form>

          <div className="form-group">
            <button type="submit " className="default-button" onClick={(e) => submitVarifyDocument(e)}>Submit Document</button>
          </div>

        </div>



      </TabPanel>

    </Box>
  );
}
