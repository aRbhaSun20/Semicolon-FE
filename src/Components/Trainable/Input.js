import { AddOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import InputCard from "./InputCard";

function Input() {
  const [inputRender, setInputRender] = useState([
    {
      name: "Input Key",
      value: null,
    },
  ]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
        paddingBottom: "2rem",alignItems:"center",justifyContent:"center"
      }}
    >
      {inputRender.map((input, i) => (
        <InputCard
          key={i}
          head={input.name}
          setInputRender={setInputRender}
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
          setInputRender((state) =>
            state.concat({
              name: `Input Key ${state.length}`,
              value: null,
            })
          );
        }}
      >
        <AddOutlined />
        <Typography>Add Input Key</Typography>
      </div>
    </div>
  );
}

export default Input;
