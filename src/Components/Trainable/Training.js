import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { browser } from "@tensorflow/tfjs";
import { load } from "@tensorflow-models/mobilenet";
import { useDispatch, useSelector } from "react-redux";
import { MODEL_ACTIONS } from "../../redux/ModelReducers";
import { PREDICTIONS_ACTIONS } from "../../redux/PredictionsReducers";
import PropTypes from "prop-types";

function Training() {
  const [inputValue, setInputValue] = useState({
    epoch: 5,
    batchSize: 20,
    learningRate: 0.01,
  });

  const dispatch = useDispatch();
  const { model, knnClassifier, training, complete } = useSelector(
    (state) => state.model
  );
  const input = useSelector((state) => state.input);
  const [currentNum, setCurrentNum] = useState(0);

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

  const handleClassiification = async (img, key) => {
    const imgage = await browser.fromPixelsAsync(img);
    const activation = model.infer(imgage, true);
    knnClassifier.addExample(activation, key);
    setCurrentNum((state) => state + 1);
    imgage.dispose();
  };

  const handlePrediction = async () => {
    if (model) {
      knnClassifier.clearAllClasses();
      dispatch({
        type: MODEL_ACTIONS.CHANGE_PARAMETERS,
        payload: { training: true, complete: false },
      });

      setCurrentNum(0);
      const imageData = [];
      for (let index = 0; index < inputValue.epoch; index++) {
        input.forEach((inp) => {
          inp.value.forEach((indiVal) => {
            if (typeof indiVal === "string") {
              let imgString = new Image();
              imgString.src = indiVal;
              imageData.push({ value: imgString, key: inp.name });
            } else {
              let imgBLob = new Image(100, 100);
              imgBLob.src = URL.createObjectURL(indiVal);
              imageData.push({ value: imgBLob, key: inp.name });
            }
          });
        });
      }

      const shuffledInput = shuffleArray(imageData);
      shuffledInput.forEach((shuffle) => {
        handleClassiification(shuffle.value, shuffle.key);
      });
    }
  };

  const handleChange = (e) =>
    setInputValue((state) => ({ ...state, [e.target.name]: e.target.value }));

  useEffect(() => {
    if (currentNum > 0) {
      setCurrentNum(0);
      dispatch({
        type: MODEL_ACTIONS.CHANGE_PARAMETERS,
        payload: { training: false },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [training, input]);

  useEffect(() => {
    if (validity(currentNum, getTotal(input))) {
      dispatch({
        type: MODEL_ACTIONS.CHANGE_PARAMETERS,
        payload: { complete: true },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNum]);

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
          <b>{complete ? "Training Complete" : "Training Process"}</b>
        </Typography>
        <Button
          variant="contained"
          onClick={handlePrediction}
          disabled={!loading}
          style={{ background: complete && "gray" }}
        >
          {!loading
            ? "Model Loading"
            : complete
            ? "Model Trained"
            : "Train Now"}
        </Button>
        <Divider />
        {training ? (
          <LinearProgressWithLabel
            variant="determinate"
            value={divide(currentNum, getTotal(input) * inputValue.epoch)}
          />
        ) : null}
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
      </Paper>
    </div>
  );
}

export default Training;

const getTotal = (data) => {
  let sum = 0;
  data.forEach((indi) => {
    sum = sum + indi.value.length;
  });
  return sum;
};

const divide = (num1, num2) => {
  if (num2 === 0) return false;
  return Math.floor((num1 / num2) * 100);
};

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
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

const validity = (num1, num2) => {
  if (num1 > 0 && num2 > 0) {
    if (num1 === num2) return true;
  }
  return false;
};

const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};
