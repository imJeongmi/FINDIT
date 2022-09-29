import React from "react";
import { Box, styled } from "@mui/system";
import CustomButton from "components/atom/CustomButton";
import CustomText from "components/atom/CustomText";
import RankingList from "components/module/RankingList";

const CenterStyle = {
  margin: "7vh 0 5vh 0",
  textAlign: "center",
};

const ButtonStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center", 
};

const RankingBox = styled(Box)(
  () => `
    width: 90vw;
    height: 45vh;
    margin: 1.5vh auto;
    align-items: center;
    overflow: scroll;
    overflow-x: hidden;
    `,
);

function DeactivateButton() {
  return (
    <CustomButton size="large" color="secondary">
      게임 종료
    </CustomButton>
  );
}

function ActivateButton() {
  return (
    // solid style
    <Box sx={ButtonStyle}>
      <CustomButton size="large" color="secondary">
        게임 종료
      </CustomButton>
      <CustomText variant="grey" size="xs">
        보물을 모두 찾은 사람이 있어요
      </CustomText>
    </Box>
  );
}

export default function GameStatus({ target }) {
  function isFinished(target) {
    target = 1;
    if (target !== 0) return true;
  }
  return (
    <Box>
      <Box sx={CenterStyle}>
        <CustomText size="xl" weight="bold">
          남은 시간
        </CustomText>
        <br />
        <CustomText size="xxxl" weight="bold">
          04:10
        </CustomText>
      </Box>
      <RankingBox>
        <RankingList rankNum={1} userName="김싸피" gameScore={350}/>
        <RankingList rankNum={2} userName="이멀캠" gameScore={220}/>
        <RankingList rankNum={3} userName="박역삼" gameScore={160}/>
        <RankingList rankNum={4} userName="최문어" gameScore={140}/>
        <RankingList rankNum={5} userName="김싸피" gameScore={110}/>
        <RankingList rankNum={6} userName="김싸피" gameScore={90}/>
        <RankingList rankNum={7} userName="김싸피" gameScore={80}/>
      </RankingBox>
      <Box>{isFinished(target) ? <ActivateButton /> : <DeactivateButton />}</Box>
    </Box>
  );
}
