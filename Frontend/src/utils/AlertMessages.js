import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function AlertMessages({
  hideAlert,
  showAlert,
  message,
  alertColor
})

{
  return(
      <div>
        <Snackbar
          style={{ height: "30%" }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={showAlert}
          autoHideDuration={5000}
          onClose={hideAlert}
        >
          <Alert
            onClose={hideAlert}
            severity={alertColor}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    )
  }










// import React from 'react'
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import Slide from '@mui/material/Slide';

// function TransitionLeft(props) {
//   return <Slide {...props} direction="left" />;
// }

// const AlertMessages = () => {

//   const [open, setOpen] = React.useState(false);
//   const [transition, setTransition] = React.useState(undefined);

//   const handleClick = (Transition) => () => {
//     setTransition(() => Transition);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button onClick={handleClick(TransitionLeft)}>Right</Button>

//       <Snackbar
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={transition}
//         message="I love snacks"
//         key={transition ? transition.name : ''}
//       />
//     </div>
//   )
// }

// export default AlertMessages