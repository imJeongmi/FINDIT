import React, { useState, useEffect } from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import CustomButton from "components/atom/CustomButton";
import ProfileImage from "components/atom/ProfileImage";
import RankingList from "components/module/RankingList";

import { Link, useLocation, useParams } from "react-router-dom";

import { requestRankingList } from "api/player";
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
  justify-content: space-around;
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

export default function Result() {
  function getRank(rankNum) {
    switch (rankNum) {
      case 1:
        return (
          <img src={require("static/1st_place_medal.svg").default} width="60px" alt="gold medal" />
        );
      case 2:
        return (
          <img
            src={require("static/2nd_place_medal.svg").default}
            width="50px"
            alt="silver medal"
          />
        );
      case 3:
        return (
          <img
            src={require("static/3rd_place_medal.svg").default}
            width="50px"
            alt="bronze medal"
          />
        );
      default:
        return rankNum;
    }
  }
  const [topThreeList, setTopThreeList] = useState([]);
  // const [goldRank, setGoldRank] = useState([]);
  // const [silverRank, setSilverRank] = useState([]);
  // const [bronzeRank, setBronzeRank] = useState([]);
  const [rankingList, setRankingList] = useState([]);
  const { gameid } = useParams();
  const location = useLocation();
  const finalRank = location?.state?.finalRank;

  // useEffect(() => {
  //   if (finalRank) {
  //     setTopThreeList(finalRank.slice(0, 3))
  //   }
  // }, [finalRank]);

  useEffect(() => {
    // console.log(gameid);
    if (!!gameid) {
      requestRankingList(gameid, requestRankingListSuccess, requestRankingListFail);
    }
  }, [gameid]);

  function requestRankingListSuccess(res) {
    // console.log(res.data);
    setRankingList(res.data);
    setTopThreeList(res.data.slice(0, res.data.length <= 3 ? res.data.length : 3));
    // for (const ranking of rankingList) {
    //   if (ranking.rank === 1) {
    //     setGoldRank(ranking);
    //   } else if (ranking.rank === 2) {
    //     setSilverRank(ranking);
    //   } else if (ranking.rank === 3) {
    //     setBronzeRank(ranking);
    //   }
    // }
    // setGoldRank(res.data.rank)
    // console.log(topThreeList.legnth);
  }

  function requestRankingListFail(error) {
    // console.log("에러 발생", error);
  }

  // function AwardsList(rankNum, playerName) {
  //   return (
  //     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  //       {rankNum === 1 ? <ProfileImage type="winner" mb="2vh" /> : <ProfileImage mb="2vh" />}
  //       <CustomText>{playerName}</CustomText>
  //       {getRank(rankNum)}
  //     </Box>
  //   );
  // }

  function AwardsList({ rankNum, playerName, imgNum }) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {rankNum === 1 ? (
          <ProfileImage type="winner" mb="1vh" num={imgNum} />
        ) : (
          <ProfileImage mb="2vh" num={imgNum} />
        )}
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
      {topThreeList.length > 0 && (
        <AwardsBox>
          <AwardsList
            rankNum={2}
            playerName={topThreeList[1]?.player_nickname}
            imgNum={topThreeList[1]?.player_profileImg}
          />
          <AwardsList
            rankNum={1}
            playerName={topThreeList[0]?.player_nickname}
            imgNum={topThreeList[0]?.player_profileImg}
          />
          <AwardsList
            rankNum={3}
            playerName={topThreeList[2]?.player_nickname}
            imgNum={topThreeList[2]?.player_profileImg}
          />

          {/* <Box>
          <AwardsList
          rankNum={2}
          playerName={silverRank?.player_nickname}
          imgNum={silverRank?.player_img}
          />
          <AwardsList
          rankNum={1}
          playerName={goldRank?.player_nickname}
          imgNum={goldRank?.player_img}
          />
          <AwardsList
          rankNum={3}
          playerName={bronzeRank?.player_nickname}
          imgNum={bronzeRank?.player_img}
          />
        </Box> */}
        </AwardsBox>
      )}
      <RankingBox>
        {/* <RankingList rankNum={1} userName="김싸피" gameScore={350} imgNum={0} />
        <RankingList rankNum={2} userName="이멀캠" gameScore={220} imgNum={1} />
        <RankingList rankNum={3} userName="박역삼" gameScore={160} imgNum={2} />
        <RankingList rankNum={4} userName="최문어" gameScore={140} imgNum={3} />
        <RankingList rankNum={5} userName="김싸피" gameScore={110} imgNum={4} />
        <RankingList rankNum={6} userName="김싸피" gameScore={90} imgNum={5} />
        <RankingList rankNum={7} userName="김싸피" gameScore={80} imgNum={6} /> */}
        {rankingList.map((rank, idx) => (
          <RankingList
            key={idx}
            rankNum={rank.player_rank}
            userName={rank.player_nickname}
            gameScore={rank.player_score}
            imgNum={rank.player_profileImg}
          />
        ))}
      </RankingBox>
      <ButtonBox>
        <CustomButton size="large" color="secondary">
          {isPlayer() ? (
            <Link to="/main" style={{ textDecoration: "none", color: "#DA9B9A" }}>
              메인으로
            </Link>
          ) : (
            <Link to="/hostmain" style={{ textDecoration: "none", color: "#DA9B9A" }}>
              메인으로
            </Link>
          )}
        </CustomButton>
        {/* <CustomButton size="large">저장하기</CustomButton> */}
      </ButtonBox>
    </Box>
  );
}
