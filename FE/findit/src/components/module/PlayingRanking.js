import React from "react";
import { Box, styled } from "@mui/system";
import PlayingModal from "components/atom/PlayingModal";
import CircleButton from "components/atom/CircleButton";
import CustomText from "components/atom/CustomText";
import RankingList from "./RankingList";
import ExitButton from "components/atom/ExitButton";

const RankingBox = styled(Box)(
  () => `
    width: 90vw;
    height: 44vh;
    margin: 0 auto;
    align-items: center;
    overflow: scroll;w
    overflow-x: hidden;  
    `,
);

const ButtonBox = styled(Box)(
  () => `
    position: absolute;
    bottom: 1vh;
    left: 3vw;
    `,
);

export default function PlayingRanking({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ mx: "auto", textAlign: "center", zIndex: "100" }}>
      <PlayingModal>
        <Box sx={{ position: "absolute", top: "3%", right: "5%" }} onClick={closeModal}>
          <ExitButton />
        </Box>
        <Box sx={{ mt: "7vh", mb: "4vh" }}>
          <CustomText weight="bold" size="xxl">
            랭킹
          </CustomText>
        </Box>
        <RankingBox>
          <RankingList rankNum="1st" userName="김싸피" gameScore={350} imgNum={0} />
          <RankingList rankNum="2nd" userName="이멀캠" gameScore={220} imgNum={1} />
          <RankingList rankNum="3rd" userName="박역삼" gameScore={160} imgNum={2} />
          <RankingList rankNum={4} userName="최문어" gameScore={140} imgNum={3} />
          <RankingList rankNum={5} userName="김싸피" gameScore={110} imgNum={4} />
          <RankingList rankNum={6} userName="김싸피" gameScore={90} imgNum={5} />
          <RankingList rankNum={7} userName="김싸피" gameScore={80} imgNum={6} />
        </RankingBox>
        <ButtonBox>
          <CircleButton icon="rank" size="smaller" opacity="0.6" />
        </ButtonBox>
      </PlayingModal>
    </Box>
  );
}
