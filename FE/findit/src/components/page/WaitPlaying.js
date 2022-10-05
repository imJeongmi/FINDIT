import React, { useEffect } from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import CustomButton from "components/atom/CustomButton";
import RankingList from "components/module/RankingList";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getWebsocket } from "helper/websocket";
import ls from "helper/LocalStorage";
import { useState } from "react";
import ss from "helper/SessionStorage";

const CenterStyle = {
  margin: "7vh auto 2vh",
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
    <CustomButton size="large" color="info" my="0">
      대기중
    </CustomButton>
  );
}

export default function WaitPlaying() {
  const location = useLocation();
  const imgNum = location?.state?.imgNum;
  const nickname = location?.state?.nickname;
  // let sessionId = ""

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
    ws.publish({ destination: "/pub/gamestart", body: `${gameid}` });
    navigate(`/status/${gameid}`);
  }

  // 소켓에서 보내는 메세지
  function getDataFromSocket(message) {
    const msg = JSON.parse(message.body);
    console.log(msg);
    if (isGamePlayer() && msg.status === "start") {
      ss.set("starttime", msg.starttime);
      navigate(`/playing/${gameid}`, {
        state: { limitMinute: msg?.limitminute },
      });
    } else if (!isGamePlayer() && msg.status === "start") {
      ls.set("starttime", msg.starttime);
      navigate(`/status/${gameid}`, { state: { limitMinute: msg?.limitminute } });
    } else if (isGamePlayer() && msg.status === "end") {
      ws.deactivate();
      navigate(`/result/${gameid}`);
    } else if (Array.isArray(msg)) {
      setPlayers(msg);
      findAndSet(msg);
    }
  }

  function findAndSet(msg) {
    msg.forEach(player => {
      if (player?.nickname === nickname) {
        const temp = player?.sessionId;
        ss.set("sessionId", temp);
      }
    });
  }

  function temp() { }

  ws.onConnect = function (frame) {
    console.log("연결됨");
    ws.subscribe(`/sub/room/${gameid}`, getDataFromSocket);
    setInterval(function () {
      // ws.subscribe(`/sub/rank/${gameid}`, getRankFromSocket);
      ws.subscribe(`/sub`, temp);
    }, 58000);
    if (!!nickname) {
      ws.publish({ destination: "/pub/enter", body: `${gameid},${imgNum},${nickname}` });
    }
  };

  useEffect(() => {
    if (!!ws && !!gameid) {
      ws.activate();
    }
  }, [ws, gameid]);

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
      {!isGamePlayer() && (
        <Box sx={{ textAlign: "center" }}>
          <CustomText size="xxl" weight="bold" variant="green">
            {gameid}
          </CustomText>
        </Box>
      )}
      <RankingBox>
        {players.map((item, idx) => (
          <Box key={idx}>
            <RankingList userName={item.nickname} imgNum={item.profileImg} />
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
