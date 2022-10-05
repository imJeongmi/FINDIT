import React from "react";
import { Box, styled } from "@mui/system";
import CustomButton from "components/atom/CustomButton";
import CustomText from "components/atom/CustomText";
import RankingList from "components/module/RankingList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getWebsocket } from "helper/websocket";
import { useEffect } from "react";
import Timer from "components/module/Timer";
import { useState } from "react";

import ls from "helper/LocalStorage";

const CenterStyle = {
  margin: "7vh 0 5vh 0",
  textAlign: "center",
};

const ButtonStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const RankingBox = styled(Box)(
  () => `
    width: 90vw;
    height: 45vh;
    margin: 1.5vh auto;
    align-items: center;
    overflow: scroll;
    overflow-x: hidden;
    `,
);

export default function GameStatus() {
  const { gameid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const limitMinute = location?.state?.limitMinute;
  const [target, setTarget] = useState(0);
  const [ranking, setRanking] = useState([]);
  const startTime = ls.get("starttime");

  const ws = getWebsocket();

  function temp() {}

  useEffect(() => {
    if (!!gameid) {
      ws.subscribe(`/sub/rank/${gameid}`, getRankFromSocket);
      ws.subscribe(`/sub/private/${gameid}`, checkEnd);
      setInterval(function () {
        ws.subscribe(`/sub`, temp);
      }, 58000);
    }
  }, [ws, gameid]);

  function getRankFromSocket(message) {
    console.log("유저 메시지", message);
    const msg = JSON.parse(message.body);
    console.log("파싱한 메시지", msg);
    if (msg[0]?.status === "end") {
      // const finalRank = msg.slice(1);
      // console.log("최종 랭크", finalRank)
      navigate(`/result/${gameid}`);
    } else {
      setRanking(msg);
    }
  }

  function checkEnd() {
    setTarget(1);
  }

  ////////////////////////////////////
  // target 값 변동 시, 실행
  useEffect(() => {
    isFinished(target);
  }, [target]);

  function isFinished(target) {
    if (target !== 0) return true;
  }
  ////////////////////////////////////

  function ActivateButton() {
    return (
      // solid style
      <Box sx={ButtonStyle}>
        <CustomButton size="large" color="secondary" onClick={finishGame}>
          게임 종료
        </CustomButton>
        <CustomText variant="grey" size="xs">
          보물을 모두 찾은 사람이 있어요
        </CustomText>
      </Box>
    );
  }

  function finishGame() {
    ws.publish({ destination: "/pub/finish", body: `${gameid}` });
    setInterval(function () {}, 3000);
    // ws.deactivate();
    // navigate(`/result/${gameid}`);
  }

  function DeactivateButton() {
    return (
      <CustomButton size="large" color="secondary">
        게임 종료
      </CustomButton>
    );
  }

  return (
    <Box>
      <Box sx={CenterStyle}>
        <CustomText size="xl" weight="bold">
          남은 시간
        </CustomText>
        <br />
        <Timer startTime={startTime} limitMinute={limitMinute} target="user" gameid={gameid} />
      </Box>
      <RankingBox>
        {ranking.map((item, idx) => (
          <RankingList
            key={idx}
            rankNum={item.rank}
            userName={item.nickname}
            gameScore={item.score}
            imgNum={item.profileImg}
          />
        ))}
      </RankingBox>
      <Box>{isFinished ? <ActivateButton /> : <DeactivateButton />}</Box>
    </Box>
  );
}
