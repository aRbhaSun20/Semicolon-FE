import { Avatar, Typography } from "@mui/material";
import React from "react";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        height: "4rem",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "blue",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          position: "fixed",
          height: "4rem",
          padding: "0 1rem",
          zIndex: 1,
        }}
      >
        <Typography
          style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}
        >
          Semicolon-Team
        </Typography>
        <Avatar style={{ right: "2rem" }}>A</Avatar>
      </div>
    </div>
  );
}

export default Navbar;
