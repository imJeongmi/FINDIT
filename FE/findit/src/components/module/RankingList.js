import React from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import ProfileImage from "components/atom/ProfileImage";

const RankingBox = styled("div")(
  () => `
    width: 95%;
    height: 55px;
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
    case "1st":
      return <img src={require("static/1st_place_medal.svg").default} width="30vw" alt="gold medal" />;
    case "2nd":
      return <img src={require("static/2nd_place_medal.svg").default} width="30vw" alt="silver medal" />;
    case "3rd":
      return <img src={require("static/3rd_place_medal.svg").default} width="30vw" alt="bronze medal" />;
    default:
      return (
        <Box sx={{ mx: "2.5vw" }}>
          <CustomText weight="bold">{rankNum}</CustomText>
        </Box>
      );
  }
}

export default function RankingList({ rankNum, userName, gameScore, imgNum }) {
  return (
    <RankingBox>
      <Box sx={{ mx: "3vw" }}>{getRank(rankNum)}</Box>
      <Box sx={{ position: "absolute", left: "18%" }}>
        <ProfileImage num={imgNum}/>
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
