import { AddOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { INPUT_ACTIONS } from "../../redux/InputsReducers";
import InputCard from "./InputCard";

function Input() {
  const dispatch = useDispatch();
  const inputRender = useSelector((state) => state.input);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
        paddingBottom: "2rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {inputRender.map((input, i) => (
        <InputCard
          key={i}
          head={input.name}
          index={i}
        />
      ))}
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: "6rem",
          border: "2px solid blue",
          borderStyle: "dotted",
          color: "blue",
          cursor: "pointer",
        }}
        onClick={() => {
          dispatch({ type: INPUT_ACTIONS.ADD });
        }}
      >
        <AddOutlined />
        <Typography>Add Input Key</Typography>
      </div>
    </div>
  );
}

export default Input;
