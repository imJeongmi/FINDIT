import React from "react";
import { useState } from "react";
import { Box, styled } from "@mui/system";
import PlayingRanking from "components/module/PlayingRanking";
import PlayingTreasureList from "components/module/PlayingTreasureList"
import CircleButton from "components/atom/CircleButton";
import CustomText from "components/atom/CustomText";

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
    }

    const showTreasureModal = () => {
        setModalOpen(2);
    }

    return (
      <Box>
        <Box>{/* 상단부 */}</Box>
        <Box>{/* 중간 인식부 */}</Box>
        <ButtonBox>
          <Box onClick={showRankingModal}>
            <CircleButton icon="rank" size="smaller" opacity="0.5"></CircleButton>
          </Box>
          <Box>
            <CircleButton icon="camera" size="large" opacity="0.5" />
          </Box>
          <Box onClick={showTreasureModal}>
            <CircleButton icon="treasure" size="smaller" opacity="0.5" />
          </Box>
        </ButtonBox>
        {modalOpen == 1 && <PlayingRanking setModalOpen={setModalOpen} />}
        {modalOpen == 2 && <PlayingTreasureList setModalOpen={setModalOpen} />}
      </Box>
    );
}