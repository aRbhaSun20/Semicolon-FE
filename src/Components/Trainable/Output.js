import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  linearProgressClasses,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 300,
  height: 180,
  facingMode: "user",
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function Output() {
  const predictions = useSelector((state) => state.prediction);
  const [show, setShow] = useState(false);
  const webcamRef = useRef(null);
  return (
    <div
      style={{
        width: "auto",
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
        position: "fixed",
        top: "45%",
        left: "74%",
      }}
    >
      <Paper
        elevation={3}
        style={{
          width: "14rem",
          padding: "1rem",
          borderRadius: ".5rem",
          display: "grid",
          gap: ".5rem",
        }}
      >
        <Typography>
          <b>Output</b>
        </Typography>
        <Divider />
        {false && <Webcam
          height={100}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={200}
          videoConstraints={videoConstraints}
        />}
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          disabled={predictions.length ===0}
          onClick={() => setShow((state) => !state)}
        >
          <Typography>Input Keys</Typography>
          {show ? <ArrowUpward /> : <ArrowDownward />}
        </Button>
        {show && (
          <div style={{ display: "grid", gap: "1rem" }}>
            {predictions.map((ele, i) => (
              <div key={i}>
                <Typography>{ele.className}</Typography>
                <LinearProgressWithLabel value={ele.probability * 100} />
              </div>
            ))}
          </div>
        )}
      </Paper>
    </div>
  );
}

export default Output;
function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
