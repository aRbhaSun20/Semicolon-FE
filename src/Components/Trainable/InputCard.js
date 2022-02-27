import { Delete, Upload } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

function InputCard({ head, setInputRender, index }) {
  return (
    <Paper
      elevation={3}
      style={{
        width: "40rem",
        borderRadius: ".5rem",
        display: "grid",
        gridTemplateRows: "1fr 1.5fr",
      }}
    >
      <div
        style={{
          padding: "0 1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid gray",
        }}
      >
        <TextField
          value={head}
          onChange={(e) => {
            setInputRender((state) =>
              state.map((ele, j) => (index === j ? e.target.value : ele))
            );
          }}
        />
        <div>
          {/* <IconButton>
          <DisabledByDefault />
        </IconButton>{" "} */}
          <Tooltip title="delete input data">
            <IconButton
              onClick={() =>
                setInputRender((state) => state.filter((ele, i) => i !== index))
              }
            >
              <Delete style={{ color: "red" }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem 1.5rem",
          rowGap: ".75rem",
          alignItems: "flex-start",
        }}
      >
        <Typography>Add Input Data:</Typography>
        <IconButton style={{ background: "#e7e7e7", padding: "1rem" }}>
          <Upload style={{ color: "blue" }} />
        </IconButton>
      </div>
    </Paper>
  );
}

export default InputCard;
