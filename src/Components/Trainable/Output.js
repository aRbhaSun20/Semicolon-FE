import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  linearProgressClasses,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";
import { browser } from "@tensorflow/tfjs";
import { PREDICTIONS_ACTIONS } from "../../redux/PredictionsReducers";

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
const label = { inputProps: { "aria-label": "Switch demo" } };

function Output() {
  const predictions = useSelector((state) => state.prediction);
  const [show, setShow] = useState(false);
  const [runPredictions, setRunPredictions] = useState(false);
  const webcamRef = useRef(null);
  const { model, knnClassifier, complete } = useSelector(
    (state) => state.model
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      handlePrediction();
    }, 500);
    if (!runPredictions) clearInterval(interval);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runPredictions]);

  const handlePrediction = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    let imgBLob = new Image(100, 100);
    imgBLob.src = imageSrc;
    const imgage = await browser.fromPixelsAsync(imgBLob);
    const activation1 = model.infer(imgage, "conv_preds");
    const predictions = await knnClassifier.predictClass(activation1);
    dispatch({
      type: PREDICTIONS_ACTIONS.LOAD,
      payload: predictions.confidences,
    });
    imgage.dispose();
  };

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
        <Switch
          {...label}
          disabled={!complete}
          checked={runPredictions}
          onChange={() => setRunPredictions((state) => !state)}
        />
        {runPredictions && (
          <Webcam
            height={100}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={200}
            videoConstraints={videoConstraints}
          />
        )}
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          disabled={predictions.length === 0}
          onClick={() => setShow((state) => !state)}
        >
          <Typography>Input Keys</Typography>
          {show ? <ArrowUpward /> : <ArrowDownward />}
        </Button>
        {show && (
          <div style={{ display: "grid", gap: "1rem" }}>
            {Object.keys(predictions).map((ele, i) => (
              <div key={i}>
                <Typography>{ele}</Typography>
                <LinearProgressWithLabel value={predictions[ele] * 100} />
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
