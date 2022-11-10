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
    // addresssCheck();
  };

  //   var arr = [
  //     "0x436f718B73476D5A1c42CfFFC6702884786a1bfD 10\n0x436f718B73476D5A1c42CfFFC6702884786a1bfD 10\n0x436f718B73476D5A1c42CfFFC6702884786a1bfD 20\n0x436f718B73476D5A1c42CfFFC6702884786a1bfe 30\n0x436f718B73476D5A1c42CfFFC6702884786a1bfe 40aa\n0x436f718B73476D5A1c42CfFFC6702884786a1bfk 40aa",
  //   ];
  var myData = data.map((el) => el.split("\n"));
  var newArr = myData[0]?.map((el) => el.split(" "));
  useEffect(() => {
    let msg = "";

    for (var k = 0; k < address.length; k++) {
      for (var j = 0; j < newArr.length; j++) {
        if (address[k] === newArr[j][0]) {
          msg = `${msg}Address ${newArr[j][0]} encountered duplicate in line ${
            j + 1
          }:`;

          setMessage([msg]);
          // console.log(`address ${newArr[j][0]} ${j}`);
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
  }, [data]);

  function addresssCheck() {
    var datas = [];

    for (let key in addressObject) {
      if (addressObject[key] > 1) {
        datas.push(key);
      }
    }
    setAddress(datas);
  }

  for (var k = 0; k < address.length; k++) {
    for (var j = 0; j < newArr.length; j++) {
      if (address[k] === newArr[j][0]) {
        console.log(`address ${newArr[j][0]} ${j}`);
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    arrangeData();
    addresssCheck();
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
      for (var k = 0; k < address.length; k++) {
        for (var j = 0; j < newArr.length; j++) {
          if (address[k] === newArr[j][0]) {
            addressObject.address = newArr[j][0];
            addressObject.amount = newArr[j][1];
          }
        }
      }

      keepFirstAddressArray.push(addressObject);

      setKeepFirstAddress(keepFirstAddressArray);
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
            <Button
              variant="contained"
              //   onClick={combineBalance}
            >
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
      {/* {isCombineBalance ? (
        <CombineBalance combineBalanceArr={combineBalanceArr} />
      ) : iskeepFirstAddress ? (
        <CombineBalance combineBalanceArr={keepFirstAddress} />
      ) : null} */}
      {iskeepFirstAddress ? (
        <CombineBalance combineBalanceArr={keepFirstAddress} />
      ) : null}
    </Paper>
  );
}
