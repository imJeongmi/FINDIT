import React from "react";

import { useState, useRef } from "react";
import { Box, styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Camera } from "react-camera-pro";

import GuideLine from "static/guideline.png";

import CustomText from "components/atom/CustomText";
import CircleButton from "components/atom/CircleButton";
import ExitButton from "components/atom/ExitButton";

import { requestUpload } from "api/user";
import ls from "helper/LocalStorage";

const StatusBar = styled(Box)(
  () => `
  width: 100vw;
  height: 5vh;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
    `,
);

const GuidelineBox = styled(Box)(
  () => `
    text-align: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    `,
);

const ButtonBox = styled(Box)(
  () => `
    width: 89vw;
    position: absolute;
    left: 50%;
    bottom: 15vh;
    transform: translate(-50%);
    display: flex;
    align-items: end;
    justify-content: center;
    `,
);

export default function AddTreasure() {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const navigate = useNavigate();
  const entercode = ls.get('entercode')

  function onClickCamera() {
    const image = camera.current.takePhoto();
    uploadAction(image);
  }

  function uploadAction(image) {
    const file = dataURLtoFile(image, "treasure.jpeg");
    
    const formData = new FormData();
    formData.append("img", file);

    requestUpload(formData, uploadSuccess, uploadFail);
  }

  function uploadSuccess(res) {
    console.log(res);
    if (res.ok) { 
      console.log("OK");
    }
  }

  function uploadFail(error) {
    console.log(error);
  }

  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

function exitAddTreasure(e) {
  e.preventDefault();
  window.history.back();
}
  
  return (
    <Box>
      <Camera
        ref={camera}
        aspectRatio={9 / 20}
        numberOfCamerasCallback={setNumberOfCameras}
        facingMode="environment"
      />

        <StatusBar>
          <Box sx={{ position: "absolute", right: "5%" }} onClick={exitAddTreasure}>
            <ExitButton />
          </Box>
        </StatusBar>

      <GuidelineBox>
        <img src={GuideLine} alt="guideLine" />
        <br />
        <CustomText size="xxs">가이드 라인 내부에서 보물을 인식시켜주세요</CustomText>
      </GuidelineBox>

      <ButtonBox>
        <Box onClick={onClickCamera}>
          <CircleButton icon="camera" size="large" opacity="0.8" />
        </Box>
      </ButtonBox>
      {/* <Avatar src={image} sx={{position: "absolute", top:"5%", left:"5^", width:"10vw"}}/> */}
    </Box>
  );
}
