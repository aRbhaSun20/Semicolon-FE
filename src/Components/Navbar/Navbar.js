import { Avatar, Typography } from "@mui/material";
import React from "react";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        padding: "1rem",
        backgroundColor: "blue",
        height: "4rem",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}
      >
        Semicolon-Team
      </Typography>
      <Avatar>A</Avatar>
    </div>
  );
}

export default Navbar;
