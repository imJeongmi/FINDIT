import React from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import CustomButton from "components/atom/CustomButton";
import RankingList from "components/module/RankingList";

const CenterStyle = {
  margin: "auto",
  textAlign: "center",
};

const RankingBox = styled(Box)(
  () => `
    weight: 80vw;
    height: 50vh;
    margin: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    overflow-x: hidden; 
    `,
);

function PlayerButton() {
    return (
        <CustomButton size="small">튜토리얼 보기</CustomButton>
    )
}

function UserButton() {
    return (
        // solid style 
        <CustomButton size="small">PLAY</CustomButton> 
    )
}

export default function WaitPlaying({ target }) {
  function isPlayer(target) {
    if (target === "user") return false;
    else return true;
  }

  return (
    <Box>
      <Box sx={CenterStyle}>
        <CustomText size="large" weight="bold">대기중</CustomText>
        <br />
        <br />
        <CustomText variant="grey">방장이 시작 버튼을 누르면 게임이 시작돼요</CustomText>
      </Box>
      <RankingBox>
        <RankingList />
        <RankingList />
        <RankingList />
        <RankingList />
        <RankingList />
      </RankingBox>
      <Box sx={CenterStyle}>
        {isPlayer(target) ? <PlayerButton /> : <UserButton /> }
      </Box>
    </Box>
  );
}
