import React from "react";
import { Paper, Divider } from "@mui/material";

function CombineBalance({ combineBalanceArr }) {
  return (
    <div>
      <h1>Addresses with Amounts</h1>
      <Paper
        elevation={6}
        sx={{
          width: "60%",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#e8dcdc",
        }}
      >
        <div>
          {combineBalanceArr?.map((el, index) => (
            <div key={index} style={{ display: "flex" }}>
              <p>{index + 1} </p>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
              <p>
                {el.address} {el.amount}
              </p>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
}

export default CombineBalance;
