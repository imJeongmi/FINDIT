import React from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText"; 
import CustomButton from "components/atom/CustomButton";
import RankingList from "components/module/RankingList";

const CenterStyle = {
  margin: "7vh auto",
  textAlign: "center",
};

const RankingBox = styled(Box)(
  () => `
    width: 90vw;  
    height: 45vh; 
    margin: 0 auto;
    align-items: center;
    overflow: scroll;
    overflow-x: hidden; 
    `,
);

function PlayerButton() {
  return <CustomButton size="large">튜토리얼 보기</CustomButton>;
}

function UserButton() {
  return (
    // solid style
    <CustomButton size="large">PLAY</CustomButton>
  );
}

export default function WaitPlaying({ target }) {
  function isPlayer(target) {
    if (target === "user") return false;
    else return true;
  }

  return ( 
    <Box>
      <Box sx={CenterStyle}>
        <CustomText size="xxl" weight="bold">
          대기중
        </CustomText>
        <br />
        <CustomText size="xs" variant="grey">방장이 시작 버튼을 누르면 게임이 시작돼요</CustomText>
      </Box>
      <RankingBox>
        <RankingList />
        <RankingList />
        <RankingList />
        <RankingList />
        <RankingList />
        <RankingList />
        <RankingList />
      </RankingBox>
      <Box sx={CenterStyle}>{isPlayer(target) ? <PlayerButton /> : <UserButton />}</Box>
    </Box>
  );
}
