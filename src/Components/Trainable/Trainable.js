import React from "react";
import Input from "./Input";
import Output from "./Output";
import Training from "./Training";

function Trainable() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1.5fr 1fr",
        width: "70%",
        margin: "auto",
        height: "95%",
      }}
    >
      <Input />
      <Training />
      <Output  />
    </div>
  );
}

export default Trainable;
