import { Delete, Upload } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { FileDrop } from "react-file-drop";
import { useDispatch } from "react-redux";
import { INPUT_ACTIONS } from "../../redux/InputsReducers";

function InputCard({ head, index }) {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState([]);

  const onFileInputChange = (e) => {
    const { files } = e.target;
    setUploadedFile(Object.values(files));
  };
  const dispatch = useDispatch();
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
          onChange={(e) =>
            dispatch({
              type: INPUT_ACTIONS.CHANGE,
              payload: { index, value: e.target.value },
            })
          }
        />
        <div>
          <Tooltip title="delete input data">
            <IconButton
              onClick={() =>
                dispatch({ type: INPUT_ACTIONS.DELETE, payload: { index } })
              }
            >
              <Delete style={{ color: "red" }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>{" "}
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
        <FileDrop
          onDrop={(files, event) => {
            setUploadedFile((state) => [...state, ...files]);
          }}
          onTargetClick={() => {
            fileInputRef.current.click();
          }}
        >
          {" "}
          <div>
            <IconButton style={{ background: "#e7e7e7", padding: "1rem" }}>
              <Upload style={{ color: "blue" }} />
            </IconButton>
            <Typography>
              {uploadedFile
                .slice(0, 10)
                .map((ele) => ele.name)
                .join(",")}
            </Typography>
          </div>
        </FileDrop>
      </div>{" "}
      <input
        ref={fileInputRef}
        onChange={onFileInputChange}
        style={{
          filter: "alpha(opacity=0)",
          opacity: 0,
          visibility: "hidden",
        }}
        multiple
        type="file"
      />
    </Paper>
  );
}

export default InputCard;
