import React from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import ProfileImage from "components/atom/ProfileImage";

const TextBoxStyle = {
  margin: "0 15px",
};

const RankingBox = styled("div")(
  () => `
    width: 75vw;
    // 고정 필요
    height: 55px; 
    background-color: white;
    border-radius: 10px;
    margin: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    `,
);

function getRank(rankNum) {
  switch (rankNum) {
    case 1:
      return <img src={require("static/1st_place_medal.svg").default} width="25px" />;
    case 2:
      return <img src={require("static/2nd_place_medal.svg").default} width="25px" />;
    case 3:
      return <img src={require("static/3rd_place_medal.svg").default} width="25px" />;
    default:
      return rankNum;
  }
}

export default function RankingList({ rankNum, userName, gameScore }) {
    rankNum = 1;
    userName = "김싸피";
    gameScore = 210;

  return (
    <RankingBox>
      {/* <Box>
        <Box sx={TextBoxStyle}>{getRank(rankNum)}</Box>
        <ProfileImage />
      </Box> */}
      <Box sx={TextBoxStyle}>{getRank(rankNum)}</Box>
      <ProfileImage />
      <CustomText size="medium">{userName}</CustomText>
      <Box sx={TextBoxStyle}>{gameScore}</Box>
    </RankingBox>
  );
}
