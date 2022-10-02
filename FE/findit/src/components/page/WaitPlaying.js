import React, { useEffect } from "react";
import { Box, styled } from "@mui/system";
import CustomText from "components/atom/CustomText";
import CustomButton from "components/atom/CustomButton";
import RankingList from "components/module/RankingList";

import { useNavigate, useParams } from "react-router-dom";

import ss from "helper/SessionStorage";
import { getWebsocket } from "helper/websocket";

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

  // function isPlayer(target) {
  //   if (target === "user") return false;
  //   else return true;
  // }
  let { gameid } = useParams();
  const navigate = useNavigate();

  function isPlayer() {
    const playeraccessToken = ss.get("playeraccessToken");
    console.log(playeraccessToken);
    if (playeraccessToken) {
      return true;
    } else {
      return false;
    }
  }

  const ws = getWebsocket();

  function startGame(e) {
    e.preventDefault();
    ws.publish({ destination: "/pub/gamestart", body: `entercode: ${gameid}`})
    navigate(`/status/${gameid}`)
  }

  // 소켓에서 보내는 메세지
  function getDataFromSocket(message) {
    console.log(message.body)
  }

  ws.onConnect = function (frame) {
    console.log("연결됨")
    ws.subscribe(`/sub/room/${gameid}`, getDataFromSocket)
  }

  useEffect(() => {
    if (!!gameid) {
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
        <RankingList userName="김싸피" imgNum={0} />
        <RankingList userName="이멀캠" imgNum={1} />
        <RankingList userName="박역삼" imgNum={2} />
        <RankingList userName="최문어" imgNum={3} />
        <RankingList userName="김싸피" imgNum={4} />
        <RankingList userName="김싸피" imgNum={5} />
        <RankingList userName="김싸피" imgNum={6} />
      </RankingBox>
      <Box sx={{ textAlign: "center" }}>
        {isPlayer() ? (
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
