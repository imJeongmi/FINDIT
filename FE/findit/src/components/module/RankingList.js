import React from "react";
import CustomText from "../atom/CustomText";
import ProfileImage from "../atom/ProfileImage";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const RankingDiv = styled("div")(
  () => `
    width: 310px;
    height: 55px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    `,
);

const TextBoxStyle = {
    margin: "0 15px" 
};

function getRank(rankNum) {
  switch (rankNum) {
    case 1:
      return <img src={require("../../assets/1st_place_medal_color.svg").default} width="25px" />;
    case 2:
      return <img src={require("../../assets/2nd_place_medal_color.svg").default} width="25px" />;
    case 3:
      return <img src={require("../../assets/3rd_place_medal_color.svg").default} width="25px" />;
    default:
      return rankNum;
  }
}

export default function RankingList({ rankNum, userName, gameScore }) {
//   rankNum = 1;
//   userName = "김싸피";
//   gameScore = 210;

  return (
    <RankingDiv>
      <Box sx={TextBoxStyle}>{getRank(rankNum)}</Box>
      <ProfileImage />
      <Box sx={{ margin: "0 auto" }}>
        <CustomText variant="black" size="medium" weight="normal">
          {userName}
        </CustomText>
      </Box>
      <Box sx={TextBoxStyle}>{gameScore}</Box>
    </RankingDiv>
  );
}
