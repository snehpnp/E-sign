// import React from 'react'
// import { TailSpin } from 'react-loader-spinner'
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";



// const Loder = ({ loader }) => {



//     return (
//         <div className='d-flex align-items-center justify-content-center '>

//             {/* <TailSpin
//                 height="80"
//                 width="80"
//                 color="#4fa94d"
//                 ariaLabel="tail-spin-loading"
//                 radius="1"
//                 wrapperClass=""
//                 visible={show}
//             /> <h5>Please Wait ...</h5>  */}


//             <Backdrop
//                 sx={{
//                     color: "red",
//                     zIndex: (theme) => theme.zIndex.drawer + 1,
//                 }}
//                 open={loader}
//             // onClick={handleClose}
//             >
//                 <CircularProgress  />
//             </Backdrop>


//         </div>

//     )
// }

// export default Loder






// import React from 'react'
// import LoadingOverlay from 'react-loading-overlay';
// import '../pages/dashboard/dashboard.css'

// const ThankYou = ({ loderShow, text }) => {

//     return (
//         <div className='loder-background' style={{
//             height: '100vh', width: '100%',
//             overflow: 'hidden'
//         }} >
//             {/* <LoadingOverlay
//                 // active={loderShow}
//                 active
//                 //   data-enable-time
//                 spinner
//                 // className='loader-div'
//                 classNamePrefix="MyLoader_div "
//                 style={{ height: '100vh ! important' }}
//                 text=" Please Wait "
//             /> */}
//             {/* </LoadingOverlay>  */}

//             {/* 
//             <LoadingOverlay>
//                 active
//                 spinner
//                  styles={{
//                      overlay: (base) => ({
//                         ...base,
//                         background: 'rgba(255, 0, 0, 0.5)'
//                     })

//                 }}
//                 </LoadingOverlay> */}

//           



//         </div>
//     )
// }

// export default ThankYou



import React from 'react'

const Loder = ({ loderShow }) => {
    return (
        <div>
        
        <div className='background-overlay flex-column'>
        <img src="/images/loading.gif" alt="test" />
        <p  className='text-white'>Loading Please Wait.....</p>
  </div>
  </div>
  )
}

export default Loder