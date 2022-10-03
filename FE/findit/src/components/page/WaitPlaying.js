import React, { useEffect } from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import CustomButton from "components/atom/CustomButton";
import RankingList from "components/module/RankingList";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getWebsocket } from "helper/websocket";
import ls from "helper/LocalStorage";
import { useState } from "react";

const CenterStyle = {
  margin: "7vh auto",
  textAlign: "center",
};

const RankingBox = styled(Box)(
  () => `
    width: 90vw;  
    height: 52vh; 
    margin: 3vh auto;
    align-items: center;
    overflow: scroll;
    overflow-x: hidden; 
    `,
);

function PlayerButton() {
  return (
    <CustomButton size="large" my="0">
      대기중
    </CustomButton>
  );
}


export default function WaitPlaying() {
  const location = useLocation();
  const imgNum = location?.state?.imgNum
  const nickname = location?.state?.nickname
  const [sessionId, setSessionId] = useState("");
  // function isPlayer(target) {
  //   if (target === "user") return false;
  //   else return true;
  // }
  let { gameid } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  function isGamePlayer() {
    const token = ls.get("accessToken");
    if (!token) {
      return true;
    } else {
      return false;
    }
  }

  const ws = getWebsocket();

  function startGame(e) {
    e.preventDefault();
    ws.publish({ destination: "/pub/gamestart", body: `${gameid}` })
    navigate(`/status/${gameid}`)
  }

  // 소켓에서 보내는 메세지
  function getDataFromSocket(message) {
    const msg = JSON.parse(message.body)
    console.log(msg)
    if (isGamePlayer() && msg.status === "start") {
      navigate(`/playing/${gameid}`, { state: { limiteMinute: msg.limitMinute, sessionId: sessionId } })
    } else if (!isGamePlayer() && msg.status === "start") {
      navigate(`/status/${gameid}`, { state: { limiteMinute: msg.limitMinute, } })
    }
    else if (isGamePlayer() && msg.status === "end") {
      ws.deactivate();
      navigate(`/result/${gameid}`)
    } else if (Array.isArray(msg)) {
      setPlayers(msg)
      const temp = msg.find(element => element.nickname === nickname)
      console.log(temp)
      if (temp) {
        setSessionId(temp?.sessionId)
      }
    }
  }

  ws.onConnect = function (frame) {
    console.log("연결됨")
    ws.subscribe(`/sub/room/${gameid}`, getDataFromSocket)
    if (!!nickname) {
      ws.publish({ destination: "/pub/enter", body: `${gameid},${imgNum},${nickname}` })
    }
  }

  useEffect(() => {
    if (!!ws && !!gameid) {
      ws.activate();
    }
  }, [gameid])

  function HostButton() {
    return (
      // solid style
      <CustomButton size="large" my="0" onClick={startGame}>
        PLAY
      </CustomButton>
    );
  }

  return (
    <Box>
      <Box sx={CenterStyle}>
        <CustomText size="xxl" weight="bold">
          대기중
        </CustomText>
        <br />
        <CustomText size="xs" variant="grey">
          방장이 시작 버튼을 누르면 게임이 시작돼요
        </CustomText>
      </Box>
      <RankingBox>
        {players.map((item, idx) => (
          <Box key={idx}>
            <RankingList userName={item.nickname} imgNum={0} />
          </Box>
        ))}
      </RankingBox>
      <Box sx={{ textAlign: "center" }}>
        {isGamePlayer() ? (
          // <Link to="/tutorial">
          // </Link>
          <PlayerButton />
        ) : (
          <HostButton />
        )}
      </Box>
    </Box>
  );
}
