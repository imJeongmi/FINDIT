import React from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import CustomButton from "components/atom/CustomButton";
import ProfileImage from "components/atom/ProfileImage";
import RankingList from "components/module/RankingList";

const CenterStyle = {
  mt: "5vh",
  mb: "3vh",
  mx: "auto",
  textAlign: "center",
};

const AwardsBox = styled(Box)(
  () => `
  width: 80vw;
  margin: 2vh auto;
  display: flex;
  justify-content: space-between;
  `,
);

const RankingBox = styled(Box)(
  () => `
  width: 90vw;
  height: 37vh;
  margin: 0 auto;
  align-items: center;
  overflow: scroll;
  overflow-x: hidden;
  `,
);

const ButtonBox = styled(Box)(
  () => `
  width: 85vw;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  `,
);

function getRank(rankNum) {
  switch (rankNum) {
    case 1:
      return <img src={require("static/1st_place_medal.svg").default} width="50px" />;
    case 2:
      return <img src={require("static/2nd_place_medal.svg").default} width="40px" />;
    case 3:
      return <img src={require("static/3rd_place_medal.svg").default} width="40px" />;
    default:
      return rankNum;
  }
}

function AwardsList(rankNum, playerName) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {rankNum === 1 ? <ProfileImage type="winner" mb="2vh" /> : <ProfileImage mb="2vh" />}
      <CustomText>{playerName}</CustomText>
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
        {AwardsList(2, "이멀캠")}
        {AwardsList(1, "김싸피")}
        {AwardsList(3, "박역삼")}
      </AwardsBox>
      <RankingBox>
        <RankingList rankNum={1} userName="김싸피" gameScore={350}/>
        <RankingList rankNum={2} userName="이멀캠" gameScore={220}/>
        <RankingList rankNum={3} userName="박역삼" gameScore={160}/>
        <RankingList rankNum={4} userName="최문어" gameScore={140}/>
        <RankingList rankNum={5} userName="김싸피" gameScore={110}/>
        <RankingList rankNum={6} userName="김싸피" gameScore={90}/>
        <RankingList rankNum={7} userName="김싸피" gameScore={80}/>
      </RankingBox>
      <ButtonBox>
        <CustomButton size="large" color="secondary">
          메인
        </CustomButton>
        <CustomButton size="large">저장하기</CustomButton>
      </ButtonBox>
    </Box>
  );
}
