import React from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import CustomButton from "components/atom/CustomButton";
import ProfileImage from "components/atom/ProfileImage";
import RankingList from "components/module/RankingList";

const CenterStyle = {
  margin: "40px auto",
  textAlign: "center",
};

const AwardsBox = styled(Box)(
  () => `
    width: 50vw;
    margin: 40px auto;
    display: flex;
    justify-content: space-between;
    `,
);

const RankingBox = styled(Box)(
  () => `
      width: 80vw;
      height: 50vh;
      margin: 40px auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: scroll;
      overflow-x: hidden;
      `,
);

const ButtonBox = styled(Box)(
  () => `
  width: 70vw;
  margin: 40px auto;
  display: flex;
  align-items: center;
  `
)

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
    <Box>
      {rankNum === 1 ? <ProfileImage type="winner" /> : <ProfileImage />}
      <CustomText>
        {"Player " + playerNum}
        <br />
      </CustomText>
      {getRank(rankNum)}
    </Box>
  );
}

export default function Result() {
  return (
    <Box>
      <Box sx={CenterStyle}>
        <CustomText size="large" weight="bold">
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
        <CustomButton>메인</CustomButton>
        <CustomButton>저장하기</CustomButton>
      </ButtonBox>
    </Box>
  );
}
