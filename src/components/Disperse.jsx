import { Button, Grid, Paper, TextareaAutosize } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import CombineBalance from "./CombineBalance";
import CustomizedSnackbars from "./SnackBar";

export default function Disperse() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isCombineBalance, setIsCombineBalance] = useState(false);
  const [iskeepFirstAddress, setIskeepFirstAddress] = useState(false);
  const [message, setMessage] = useState([]);
  const [keepFirstAddress, setKeepFirstAddress] = useState([]);
  const [combineBalanceArr, setCombineBalance] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const arrangeData = () => {
    setData([input]);
  };
  useEffect(() => {
    let msg = "";
    for (var i = 0; i < newArr?.length; i = i + 2) {
      if (newArr[i][0] === newArr[i + 1][0]) {
        msg = `${msg}Address ${newArr[i][0]} encountered duplicate in line ${
          i + 1
        },${i + 2}:`;

        setMessage([msg]);
      }

      if (isNaN(+newArr[i][1])) {
        msg = `${msg}Line ${i + 1} wrong amount :`;
        setMessage([msg]);
      }
      if (isNaN(+newArr[i + 1][1])) {
        msg = `${msg}Line  ${i + 2} wrong amount :`;
        setMessage([msg]);
      }
    }
  }, [data]);
  // /[\s,]+/;
  var myData = data.map((el) => el.split("\n"));
  var newArr = myData[0]?.map((el) => el.split(" "));

  const handleSubmit = (e) => {
    e.preventDefault();
    arrangeData();

    setOpen(true);
    setIsCombineBalance(false);
    setIskeepFirstAddress(false);
  };

  const keepFirstOne = () => {
    setIsCombineBalance(false);
    setIskeepFirstAddress(true);
    var keepFirstAddressArray = [];
    for (var i = 0; i < newArr?.length; i = i + 2) {
      let addressObject = {
        address: "",
        amount: 0,
      };
      if (newArr[i][0] === newArr[i + 1][0]) {
        addressObject.address = newArr[i][0];
        addressObject.amount = newArr[i][1];
      }
      keepFirstAddressArray.push(addressObject);

      setKeepFirstAddress(keepFirstAddressArray);
    }
  };

  const combineBalance = () => {
    setIsCombineBalance(true);
    setIskeepFirstAddress(false);
    var combineBalanceArray = [];
    for (var i = 0; i < newArr?.length; i = i + 2) {
      let combineBalanceObject = {
        address: "",
        amount: 0,
      };
      if (newArr[i][0] === newArr[i + 1][0]) {
        combineBalanceObject.address = newArr[i][0];
        combineBalanceObject.amount = +newArr[i][1] + Number(newArr[i + 1][1]);
      }

      combineBalanceArray.push(combineBalanceObject);

      setCombineBalance(combineBalanceArray);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{ marginTop: "50px", padding: "50px", width: "60%", margin: "auto" }}
    >
      <form onSubmit={handleSubmit}>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={4}
          placeholder="Enter Address And Amount"
          onChange={(e) => handleChange(e)}
          value={input}
          style={{ width: 550, height: 250 }}
        />
        <Grid container spacing={2} sx={{ width: "60%", margin: "auto" }}>
          <Grid item xs={4}>
            <Button variant="contained" type="submit">
              SUBMIT
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={keepFirstOne}>
              KEEP FIRST ONE
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={combineBalance}>
              COMBINE BALANCE
            </Button>
          </Grid>
        </Grid>
      </form>

      {open ? (
        <CustomizedSnackbars
          open={open}
          handleClose={handleClose}
          message={message}
        />
      ) : null}
      {isCombineBalance ? (
        <CombineBalance combineBalanceArr={combineBalanceArr} />
      ) : iskeepFirstAddress ? (
        <CombineBalance combineBalanceArr={keepFirstAddress} />
      ) : null}
    </Paper>
  );
}
