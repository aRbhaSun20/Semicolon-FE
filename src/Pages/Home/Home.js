import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Trainable from "../../Components/Trainable/Trainable";

function Home() {
  return (
    <div
      style={{ display: "grid", gridTemplateRows: "6rem 1fr", rowGap: "1rem",minHeight:"100vh" }}
    >
      <Navbar />
      <Trainable />
    </div>
  );
}

export default Home;
