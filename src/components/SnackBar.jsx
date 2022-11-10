import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({
  open,

  handleClose,
  message,
}) {
  var structuredMessage = message.map((el) => el.split(":"));

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {structuredMessage[0]?.map((el) => (
            <div>{el}</div>
          ))}
        </Alert>
      </Snackbar>
    </>
  );
}
