import React from "react";

import { useState, useRef } from "react";
import { Box, styled } from "@mui/system";
import { Link } from "react-router-dom";
import { Camera } from "react-camera-pro";

import GuideLine from "static/guideline.png";

import CustomText from "components/atom/CustomText";
import CircleButton from "components/atom/CircleButton";
import ExitButton from "components/atom/ExitButton";

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
  const [image, setImage] = useState(null);

  return (
    <Box>
      <Camera
        ref={camera}
        aspectRatio={9 / 20}
        numberOfCamerasCallback={setNumberOfCameras}
        facingMode="environment"
      />

      <Link to="/treasure/:gameid">
        <StatusBar>
          <Box sx={{ position: "absolute", right: "5%" }}>
            <ExitButton />
          </Box>
        </StatusBar>
      </Link>

      <GuidelineBox>
        <img src={GuideLine} alt="guideLine" />
        <br />
        <CustomText size="xxs">
          가이드 라인 내부에서 보물을 인식시켜주세요
        </CustomText>
      </GuidelineBox>

      <ButtonBox>
        <Box
          onClick={() => {
            const photo = camera.current.takePhoto();
            console.log(photo);
            setImage(photo);
          }}
        >
          <CircleButton icon="camera" size="large" opacity="0.8" />
        </Box>
      </ButtonBox>
      {/* <Avatar src={image} sx={{position: "absolute", top:"5%", left:"5^", width:"10vw"}}/> */}
    </Box>
  );
}
