import React from "react";

import { useState } from "react";
import { Box, styled } from "@mui/system";

import GuideLine from "static/guideline.png";

import CustomText from "components/atom/CustomText";
import CircleButton from "components/atom/CircleButton";
import ExitButton from "components/atom/ExitButton";

const StatusBar = styled(Box)(
  () => `
    height: 5vh;
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
    bottom: 7vh;
    transform: translate(-50%);
    display: flex;
    align-items: end;
    justify-content: center;
    `,
);

export default function AddTreasure() {
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
        <Box sx={{ position: "absolute", right: "5%" }}>
          <ExitButton />
        </Box>
      </StatusBar>

      <GuidelineBox>
        <img src={GuideLine} alt="guideLine" />
        <br />
        <CustomText size="xxs">
          <br />
          가이드 라인 내부에서 보물을 인식시켜주세요
        </CustomText>
      </GuidelineBox>

      <ButtonBox>
        <CircleButton icon="camera" size="large" opacity="0.8" />
      </ButtonBox>
    </Box>
  );
}
