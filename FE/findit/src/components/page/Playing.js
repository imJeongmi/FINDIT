import React from "react";

import { useState, useRef } from "react";
import { Box, styled } from "@mui/system";
import { Camera } from "react-camera-pro";

import TimerIcon from "static/timer.svg";
import ScoreIcon from "static/medal.svg";
import GuideLine from "static/guideline.png";

import CustomText from "components/atom/CustomText";
import CircleButton from "components/atom/CircleButton";
import PlayingRanking from "components/module/PlayingRanking";
import PlayingTreasureList from "components/module/PlayingTreasureList";
import ExitButton from "components/atom/ExitButton";

import { requestUpload } from "api/player";
import axios from "axios";
import Timer from "components/module/Timer";

const StatusBar = styled(Box)(
  () => `
    width: 100vw;
    height: 5vh;
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    align-items: center;
    `,
);

const ScoreBox = styled(Box)(
  () => `
    width: 25vw;
    height: 10vh;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    position: absolute;
    top: 9vh;
    left: 3vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
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
    justify-content: space-between;
    `,
);

export default function Playing() {
  const [modalOpen, setModalOpen] = useState(false);
  const showRankingModal = () => {
    setModalOpen(1);
  };
  const showTreasureModal = () => {
    setModalOpen(2);
  };

  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);

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

  function uploadSuccess(res) {
    console.log(res);
    if (res.ok) {
      console.log("OK");
    }
  }

  function uploadFail(error) {
    console.log(error);
  }

  function uploadAction(image) {
    const file = dataURLtoFile(image, "treasure.jpeg");

    const data = {
      game_id: 39,
      file: file,
    };

    requestUpload(data, uploadSuccess, uploadFail);
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
        <Box
          sx={{
            width: "20vw",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            verticalAlign: "middle",
          }}
        >
          <img src={TimerIcon} alt="timerIcon" width="25vw" />
          {/* limitMinute redux에서 받아와서 설정 */}
          <Timer limitMinute={10}/>
        </Box>
        <Box sx={{ position: "absolute", right: "5%" }}>
          <ExitButton />
        </Box>
      </StatusBar>
      <ScoreBox>
        <CustomText size="xl" weight="bold" variant="warning">
          5th
        </CustomText>
        <Box
          sx={{
            width: "18vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={ScoreIcon} alt="medalIcon" width="25vw" />
          <CustomText size="m" weight="bold">
            203
          </CustomText>
        </Box>
      </ScoreBox>
      <GuidelineBox>
        <img src={GuideLine} alt="guideLine" />
        <br />
        <CustomText size="xxs">가이드 라인 내부에서 보물을 인식시켜주세요</CustomText>
      </GuidelineBox>
      <ButtonBox>
        <Box onClick={showRankingModal}>
          <CircleButton icon="rank" size="smaller" opacity="0.6"></CircleButton>
        </Box>
        <Box
          onClick={() => {
            const photo = camera.current.takePhoto();
            setImage(photo);
            uploadAction(image);
          }}
        >
          <CircleButton icon="camera" size="large" opacity="0.8" />
        </Box>
        <Box onClick={showTreasureModal}>
          <CircleButton icon="treasure" size="smaller" opacity="0.6" />
        </Box>
      </ButtonBox>
      {modalOpen == 1 && <PlayingRanking setModalOpen={setModalOpen} />}
      {modalOpen == 2 && <PlayingTreasureList setModalOpen={setModalOpen} />}
    </Box>
  );
}
