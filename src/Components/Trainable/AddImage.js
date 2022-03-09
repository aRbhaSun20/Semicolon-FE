import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const videoConstraints = {
  width: 150,
  height: 90,
  facingMode: "user",
};

function AddImage({ open, setOpen, addImage }) {
  const handleClose = () => setOpen(false);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    addImage([imageSrc]);
    // eslint-disable-next-line
  }, [webcamRef]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Image
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Webcam
              height={250}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={350}
              videoConstraints={videoConstraints}
            />
            <Button variant="outlined" onClick={capture}>
              Capture Now
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AddImage;
