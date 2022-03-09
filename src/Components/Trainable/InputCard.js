import { Camera, Delete, Upload, Clear } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { INPUT_ACTIONS } from "../../redux/InputsReducers";

function InputCard({ name, index, value }) {
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  const onFileInputChange = (e) => {
    const { files } = e.target;
    dispatch({
      type: INPUT_ACTIONS.ADD_IMAGE,
      payload: {
        index,
        value: Object.values(files).filter((ele) =>
          ele.type.includes("image/")
        ),
      },
    });
  };

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
          value={name}
          onChange={(e) => {
            dispatch({
              type: INPUT_ACTIONS.CHANGE,
              payload: { index, value: e.target.value },
            });
          }}
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
        <Typography>Add Input Data:</Typography>{" "}
        {/* {value.length > 0 && (
          <Typography>{value.length} images selected</Typography>
        )} */}

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <IconButton
            onClick={() => fileInputRef.current.click()}
            style={{
              background: "#e7e7e7",
              padding: "1rem",
              width: "3.5rem",
              height: "3.5rem",
            }}
          >
            <Upload style={{ color: "blue" }} />
          </IconButton>
          <IconButton
            style={{
              background: "#e7e7e7",
              padding: "1rem",
              width: "3.5rem",
              height: "3.5rem",
            }}
          >
            <Camera style={{ color: "blue" }} />
          </IconButton>
          <div
            style={{
              display: "flex",
              gap: ".5rem",
              alignItems: "center",
              overflowX: "auto",
              maxWidth: "28rem",
            }}
          >
            {value.map((image, i) => (
              <div style={{ position: "relative" }} key={i}>
                <IconButton
                  onClick={() => {
                    dispatch({
                      type: INPUT_ACTIONS.DELETE_IMAGE,
                      payload: { index, imgIndex: i },
                    });
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    padding: 0,
                  }}
                >
                  <Clear
                    style={{
                      width: "1.2rem",
                    }}
                  />
                </IconButton>

                <img
                  src={URL.createObjectURL(image)}
                  alt={`uploadedImage${i}`}
                  style={{ width: "3rem", height: "3rem", cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        </div>
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
        accept="image/*"
      />
    </Paper>
  );
}

export default InputCard;
