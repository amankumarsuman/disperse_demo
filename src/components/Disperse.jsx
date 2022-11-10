import { Button, Grid, Paper, TextareaAutosize } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import CombineBalance from "./CombineBalance";
import CustomizedSnackbars from "./SnackBar";

export default function TestingComponent() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [address, setAddress] = useState([]);
  const [message, setMessage] = useState([]);
  const [open, setOpen] = useState(false);
  const [addressObject, setAddressObject] = useState({});
  const [isCombineBalance, setIsCombineBalance] = useState(false);
  const [iskeepFirstAddress, setIskeepFirstAddress] = useState(false);
  const [keepFirstAddress, setKeepFirstAddress] = useState([]);
  const [combineBalanceArr, setCombineBalance] = useState([]);

  //function to cupdate input state
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  // function to store input data
  const arrangeData = () => {
    setData([input]);
  };

  var myData = data.map((el) => el.split("\n"));
  var newArr = myData[0]?.map((el) => el.split(" "));

  //useEffect hook to render the logic once when data state change
  useEffect(() => {
    let msg = "";

    for (var k = 0; k < address.length; k++) {
      for (var j = 0; j < newArr.length; j++) {
        if (address[k] === newArr[j][0]) {
          msg = `${msg}Address ${newArr[j][0]} encountered duplicate in line ${
            j + 1
          }:`;

          setMessage([msg]);
        }
        if (isNaN(+newArr[j][1])) {
          msg = `${msg}Line ${j + 1} wrong amount :`;
          setMessage([msg]);
        }
      }
    }

    var obj = {};
    for (var i = 0; i < newArr?.length; i++) {
      obj[newArr[i][0]] = obj[newArr[i][0]] ? obj[newArr[i][0]] + 1 : 1;
    }
    setAddressObject(obj);

    arrangeData();
    addresssCheck();
  }, [data]);

  //function to store duplicate address data
  function addresssCheck() {
    var datas = [];

    for (let key in addressObject) {
      if (addressObject[key] > 1) {
        datas.push(key);
      }
    }
    setAddress(datas);
  }

  //function to handle submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    arrangeData();
    addresssCheck();
    setOpen(true);
    setIsCombineBalance(false);
    setIskeepFirstAddress(false);
  };

  //function to keepFirstAddress
  const keepFirstOne = () => {
    setIsCombineBalance(false);
    setIskeepFirstAddress(true);
    var keepFirstAddressArray = [];
    var keepFirstAddressObj = {};
    for (var j = 0; j < newArr?.length; j++) {
      if (keepFirstAddressObj[newArr[j][0]] === undefined) {
        keepFirstAddressObj[newArr[j][0]] = newArr[j][1];
      }
    }

    for (let key in keepFirstAddressObj) {
      console.log(key, keepFirstAddressObj[key]);
      keepFirstAddressArray.push({
        address: key,
        amount: keepFirstAddressObj[key],
      });
    }
    setKeepFirstAddress(keepFirstAddressArray);
  };

  //function to combineBalance
  const combineBalance = () => {
    setIsCombineBalance(true);
    setIskeepFirstAddress(false);
    var combineBalanceArray = [];
    var combineBalanceObj = {};
    for (var j = 0; j < newArr?.length; j++) {
      if (combineBalanceObj[newArr[j][0]] === undefined) {
        combineBalanceObj[newArr[j][0]] = +newArr[j][1];
      } else {
        combineBalanceObj[newArr[j][0]] =
          combineBalanceObj[newArr[j][0]] + +newArr[j][1];
      }
    }

    for (let key in combineBalanceObj) {
      console.log(key, combineBalanceObj[key]);
      combineBalanceArray.push({
        address: key,
        amount: combineBalanceObj[key],
      });
    }
    setCombineBalance(combineBalanceArray);
  };
  return (
    <Paper
      elevation={6}
      sx={{ marginTop: "50px", padding: "50px", width: "60%", margin: "auto" }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
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
