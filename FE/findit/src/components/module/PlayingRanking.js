import React from "react";
import { Box, styled } from "@mui/system";
import PlayingModal from "components/atom/PlayingModal";
import CircleButton from "components/atom/CircleButton";
import CustomText from "components/atom/CustomText";
import RankingList from "./RankingList";

const RankingBox = styled(Box)(
  () => `
    width: 90vw;
    height: 60vh;
    margin: 0 auto;
    align-items: center;
    overflow: scroll;w
    overflow-x: hidden;  
    `,
);

const ButtonBox = styled(Box)(
  () => `
    position: absolute;
    bottom: 2vh;
    left: 3vw;
    `,
);
 
export default function PlayingRanking({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ mx: "auto", textAlign: "center", zIndex: "100" }} onClick={closeModal}>
      <PlayingModal>
        <Box sx={{ mt: "7vh", mb: "5vh" }}>
          <CustomText weight="bold" size="xxl">
            랭킹
          </CustomText>
        </Box>
        <RankingBox>
          <RankingList />
          <RankingList />
          <RankingList />
          <RankingList />
          <RankingList />
          <RankingList />
        </RankingBox>
        <ButtonBox>
          <CircleButton icon="rank" size="smaller" opacity="0.6" />
        </ButtonBox>
      </PlayingModal>
    </Box>
  );
}
