import React from "react";

import { useState } from "react";
import { Box, styled } from "@mui/system";

import ExitIcon from "static/exit.png";
import TimerIcon from "static/timer.svg";
import ScoreIcon from "static/medal.svg";
import GuideLine from "static/guideline.png";

import CustomText from "components/atom/CustomText";
import CircleButton from "components/atom/CircleButton";
import PlayingRanking from "components/module/PlayingRanking";
import PlayingTreasureList from "components/module/PlayingTreasureList";

const StatusBar = styled(Box)(
  () => `
    height: 5vh;
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    `,
);

const ScoreBox = styled(Box)(
  () => `
    width: 25vw;
    height: 10vh;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    position: absolute;
    top: 10vh;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    `,
);

const ButtonBox = styled(Box)(
  () => `
    width: 89vw;
    position: absolute;
    left: 50%;
    bottom: 7vh;
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

  return (
    <Box>
      <StatusBar>
        <Box
          sx={{
            width: "28vw",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <img src={TimerIcon} alt="timerIcon" width="25vw" />
          <CustomText size="m">03 : 54</CustomText>
        </Box>
        <Box sx={{ position: "absolute", right: "5%" }}>
          <img src={ExitIcon} alt="exitIcon" width="20vw" />
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
        <CustomText size="xxs">
          <br />
          가이드 라인 내부에서 보물을 인식시켜주세요
        </CustomText>
      </GuidelineBox>

      <ButtonBox>
        <Box onClick={showRankingModal}>
          <CircleButton icon="rank" size="smaller" opacity="0.6"></CircleButton>
        </Box>
        <Box>
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
