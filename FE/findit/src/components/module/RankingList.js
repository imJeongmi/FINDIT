import React from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import ProfileImage from "components/atom/ProfileImage";

const RankingBox = styled("div")(
  () => `
    width: 350px;
    height: 60px;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    background-color: white;
    margin: 1.5vh auto;
    position: relative;
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    `,
);

function getRank(rankNum) {
  switch (rankNum) {
    case 1:
      return <img src={require("static/1st_place_medal.svg").default} width="30px" />;
    case 2:
      return <img src={require("static/2nd_place_medal.svg").default} width="30px" />;
    case 3:
      return <img src={require("static/3rd_place_medal.svg").default} width="30px" />;
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
      <Box sx={{ mx: "4vw" }}>{getRank(rankNum)}</Box>
      <Box sx={{ position: "absolute", left: "20%" }}>
        <ProfileImage />
      </Box>
      <Box sx={{ position: "absolute", left: "50%", transform: "translate(-50%, 0)" }}>
        <CustomText size="m">{userName}</CustomText>
      </Box>
      <Box sx={{ position: "absolute", right: "10%" }}>
        <CustomText size="s">{gameScore}</CustomText>
      </Box>
    </RankingBox>
  );
}
