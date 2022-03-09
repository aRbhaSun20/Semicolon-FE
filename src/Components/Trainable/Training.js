import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { data,browser } from "@tensorflow/tfjs";
import { load } from "@tensorflow-models/mobilenet";
import dog from "./dog.jpg";
import { useDispatch, useSelector } from "react-redux";
import { MODEL_ACTIONS } from "../../redux/ModelReducers";
import { PREDICTIONS_ACTIONS } from "../../redux/PredictionsReducers";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 300,
  height: 180,
  facingMode: "user",
};

function Training() {
  const [inputValue, setInputValue] = useState({
    epoch: 5,
    batchSize: 20,
    learningRate: 0.01,
  });

  const dispatch = useDispatch();
  const { model, knnClassifier } = useSelector((state) => state.model);
  const imageRef = useRef();
  const webcamRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const loadModel = async () => {
    const tempModel = await load({ version: 2, alpha: 0.5 });
    dispatch({ type: MODEL_ACTIONS.LOAD, payload: tempModel });
    setLoading(true);
  };

  useEffect(() => {
    loadModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrediction = async () => {
    if (model && webcamRef) {
      const webCam = await data.webcam(webcamRef.current);
      const imgage = await browser.fromPixelsAsync(imageRef.current)
      const img = await webCam.capture();
      const activation2 = model.infer(imgage, true);
      const activation = model.infer(img, true);

      knnClassifier.addExample(activation, "dog");
      knnClassifier.addExample(activation2, "dog1");

      const activation1 = model.infer(imgage, "conv_preds");
      const predictions = await knnClassifier.predictClass(activation1);
      img.dispose();
      // const predictions = await model.classify(imageRef.current);
      console.log(predictions);
      // dispatch({ type: PREDICTIONS_ACTIONS.LOAD, payload: predictions });
    }
  };

  const handleChange = (e) =>
    setInputValue((state) => ({ ...state, [e.target.name]: e.target.value }));

  const [show, setShow] = useState(false);
  return (
    <div
      style={{
        width: "auto",
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
        position: "fixed",
        top: "45%",
        left: "54%",
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
          <b>Training Process</b>
        </Typography>
        <Button
          variant="contained"
          onClick={handlePrediction}
          disabled={!loading}
          // style={{ background: "gray" }}
        >
          {!loading ? "Model Loading" : "Train Now"}
        </Button>
        <Divider />
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={() => setShow((state) => !state)}
        >
          <Typography>More Settings</Typography>
          {show ? <ArrowUpward /> : <ArrowDownward />}
        </Button>
        {show && (
          <div style={{ display: "grid", gap: "1rem" }}>
            <TextField
              onChange={handleChange}
              value={inputValue.epoch}
              label="Epochs"
              type="number"
              name="epoch"
            />
            <TextField
              value={inputValue.batchSize}
              label="Batch Size"
              onChange={handleChange}
              type="number"
              name="batchSize"
            />
            <TextField
              value={inputValue.learningRate}
              label="Learning Rate"
              onChange={handleChange}
              type="number"
              name="learningRate"
            />{" "}
          </div>
        )}{" "}
        <video
          height={100}
          ref={webcamRef}
          autoPlay={true}
          playsInline
          loop
          // screenshotFormat="image/jpeg"
          width={200}
          // videoConstraints={videoConstraints}
        />
      </Paper>
      <img
        src={dog}
        alt="predictions"
        ref={imageRef}
        style={{ visibility: "hidden" }}
      />
    </div>
  );
}

export default Training;
