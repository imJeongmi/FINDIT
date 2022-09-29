import React from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import CustomButton from "components/atom/CustomButton";
import RankingList from "components/module/RankingList";

import { Link } from "react-router-dom";

const CenterStyle = {
  margin: "7vh auto",
  textAlign: "center",
};

const RankingBox = styled(Box)(
  () => `
    width: 80vw;  
    height: 41vh; 
    margin: 3vh auto;
    align-items: center;
    overflow: scroll;
    overflow-x: hidden; 
    `,
);

function PlayerButton() {
  return (
    <CustomButton size="large" my="0">
      튜토리얼 보기
    </CustomButton>
  );
}

function HostButton() {
  return (
    // solid style
    <CustomButton size="large" my="0">
      PLAY
    </CustomButton>
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
        <CustomText size="xs" variant="grey">
          방장이 시작 버튼을 누르면 게임이 시작돼요
        </CustomText>
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
      <Box sx={{ textAlign: "center" }}>
        {isPlayer(target) ? (
          <Link to="/tutorial">
            <PlayerButton />
          </Link>
        ) : (
          <Link to="/help">
            <HostButton />
          </Link>
        )}
      </Box>
    </Box>
  );
}
