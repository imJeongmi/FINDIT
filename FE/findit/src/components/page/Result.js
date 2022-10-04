import React, { useState, useEffect } from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import CustomButton from "components/atom/CustomButton";
import ProfileImage from "components/atom/ProfileImage";
import RankingList from "components/module/RankingList";

import { requestRankingList } from "api/player";
import { useParams, Link } from "react-router-dom";
import ls from "helper/LocalStorage";

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
      return (
        <img src={require("static/1st_place_medal.svg").default} width="50px" alt="gold medal" />
      );
    case 2:
      return (
        <img src={require("static/2nd_place_medal.svg").default} width="40px" alt="silver medal" />
      );
    case 3:
      return (
        <img src={require("static/3rd_place_medal.svg").default} width="40px" alt="bronze medal" />
      );
    default:
      return rankNum;
  }
}

function AwardsList(rankNum, playerName, imgNum) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {rankNum === 1 ? (
        <ProfileImage type="winner" mb="2vh" num={imgNum} />
      ) : (
        <ProfileImage mb="2vh" num={imgNum} />
      )}
      <CustomText>{playerName}</CustomText>
      {getRank(rankNum)}
    </Box>
  );
}

export default function Result() {
  const [rankingList, setRankingList] = useState([]);
  const [topThreeList, setTopThreeList] = useState([]);
  const { gameid } = useParams();

  useEffect(() => {
    requestRankingList(gameid, requestRankingListSuccess, requestRankingListFail);
  }, [gameid]);

  function requestRankingListSuccess(res) {
    console.log(res);
    setRankingList(res.data);
    setTopThreeList(res.data.slice(0, 3));
  }

  function requestRankingListFail(err) {
    console.log("랭킹 요청 실패", err);
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

  function isPlayer() {
    const token = ls.get("accessToken");
    if (!token) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Box>
      <Box sx={CenterStyle}>
        <CustomText size="xxl" weight="bold">
          결과
        </CustomText>
      </Box>
      <AwardsBox>
        {AwardsList(2, "이멀캠", 1)}
        {AwardsList(1, "김싸피", 0)}
        {AwardsList(3, "박역삼", 2)}
        {/* {topThreeList.map((rank, idx) => (
          <AwardsList rankNum={idx + 1} playerName={rank.nickname} />
        ))} */}
      </AwardsBox>
      <RankingBox>
        <RankingList rankNum={1} userName="김싸피" gameScore={350} imgNum={0} />
        <RankingList rankNum={2} userName="이멀캠" gameScore={220} imgNum={1} />
        <RankingList rankNum={3} userName="박역삼" gameScore={160} imgNum={2} />
        <RankingList rankNum={4} userName="최문어" gameScore={140} imgNum={3} />
        <RankingList rankNum={5} userName="김싸피" gameScore={110} imgNum={4} />
        <RankingList rankNum={6} userName="김싸피" gameScore={90} imgNum={5} />
        <RankingList rankNum={7} userName="김싸피" gameScore={80} imgNum={6} />
        {/* {rankingList.map((rank, idx) => (
          <RankingList rankNum={idx + 1} userName={rank.nickname} gameScore={rank.score} />
        ))} */}
      </RankingBox>
      <ButtonBox>
        <CustomButton size="large" color="secondary">
          {isPlayer() ? (<Link to="/main" style={{ textDecoration: "none", color: "#DA9B9A" }}>
            메인
          </Link>) : (<Link to="/hostmain" style={{ textDecoration: "none", color: "#DA9B9A" }}>
            메인
          </Link>)}
          
        </CustomButton>
        <CustomButton size="large">저장하기</CustomButton>
      </ButtonBox>
    </Box>
  );
}
