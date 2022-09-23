import React from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import CustomButton from "components/atom/CustomButton";
import ProfileImage from "components/atom/ProfileImage";
import RankingList from "components/module/RankingList";

const CenterStyle = {
  margin: "7vh auto",
  textAlign: "center",
};

const AwardsBox = styled(Box)(
  () => `
  width: 60vw;
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  `,
);

const RankingBox = styled(Box)(
  () => `
  width: 80vw;
  height: 40vh;
  margin: 3vh auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  overflow-x: hidden;
  `,
);

const ButtonBox = styled(Box)(
  () => `
  width: 80%;
  margin: 3vh auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  `,
);

function getRank(rankNum) {
  switch (rankNum) {
    case 1:
      return <img src={require("static/1st_place_medal.svg").default} width="40px" />;
    case 2:
      return <img src={require("static/2nd_place_medal.svg").default} width="30px" />;
    case 3:
      return <img src={require("static/3rd_place_medal.svg").default} width="30px" />;
    default:
      return rankNum;
  }
}

function AwardsList(playerNum, rankNum) {
  rankNum = 1;
  playerNum = 1;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {rankNum === 1 ? <ProfileImage type="winner" /> : <ProfileImage />}
      <CustomText>{"Player " + playerNum}</CustomText>
      {getRank(rankNum)}
    </Box>
  );
}

export default function Result() {
  return (
    <Box>
      <Box sx={CenterStyle}>
        <CustomText size="xxl" weight="bold">
          결과
        </CustomText>
      </Box>
      <AwardsBox>
        <AwardsList rankNum={1} />
        <AwardsList rankNum={2} /> 
        <AwardsList rankNum={3} />
      </AwardsBox>
      <RankingBox>
        <RankingList />
        <RankingList />
        <RankingList />
        <RankingList />
        <RankingList />
      </RankingBox>
      <ButtonBox>
        <CustomButton size="small" color="secondary">
          메인
        </CustomButton>
        <CustomButton size="small">저장하기</CustomButton>
      </ButtonBox>
    </Box>
  );
}
