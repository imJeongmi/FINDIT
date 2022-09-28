import { Box } from "@mui/system";
import CircleButton from "components/atom/CircleButton";
import CustomButton from "components/atom/CustomButton";
import Input from "components/atom/Input";
import { getWebsocket } from "helper/websocket";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CustomText from "../atom/CustomText";
import ProfileImage from "../atom/ProfileImage";


const ProfileBoxStyle = {
  margin: "auto",
  textAlign: "center",
};

const BoxStyle = {
  textAlign: "center",
  margin: "6vh auto",
};

function PlayerProfile({ gameId }) {
  const ws = getWebsocket();

  const [nickname, setNickname] = useState();
  // const enterCode = gameId
  // const profileImg = "1"

  function connect() {
    if (!ws.active) {
      // ws.onConnect({}, connectSuccess, connectFail);
      // ws.activate();
    }
  }

  // function connectSuccess(frame) {
  //   ws.subscribe(`/sub/room/${enterCode}`);
    // sendPlayerInfo();
  // }

  // function sendPlayerInfo() {
  //   const playerInfo = {
  //     entercode: enterCode,
  //     profileImg: profileImg,
  //     nickname: nickname,
  //   };
  //   ws.send(`/pub/enter`, {}, JSON.stringify(playerInfo))
  // }

  // function connectFail(error) {
  //   console.log(error)
  // }

  function changeNickname(e) {
    setNickname(e.target.value)
    console.log(nickname)
  }

  return (
    <Box sx={ProfileBoxStyle}>
      <Box sx={BoxStyle}>
        <CustomText size="xxl" weight="bold">
          프로필 설정
        </CustomText>
      </Box>
      <Box sx={BoxStyle}>
        <ProfileImage type="rounded"></ProfileImage>
      </Box>
      <Box>
        <CustomText>닉네임을 등록해주세요</CustomText>
        <Input type="text" placeholder="닉네임" onChange={changeNickname}></Input>
      </Box>
      <CustomButton size="large" color="primary" onClick={connect}>
        확인
      </CustomButton>
    </Box>
  );
}

function HostProfile() {
  // 로그아웃 함수 작성
  return (
    <Box sx={ProfileBoxStyle}>
      <Box sx={{ textAlign: "end", marginTop: "4vh", marginRight: "10vw" }}>
        <CircleButton icon="logout" size="smaller"></CircleButton>
      </Box>
      <Box sx={BoxStyle}>
        <CustomText size="xxl" weight="bold">
          마이 페이지
        </CustomText>
      </Box>
      <Box sx={BoxStyle}>
        <ProfileImage type="rounded"></ProfileImage>
      </Box>
      <Box>
        <CustomText>닉네임을 등록해주세요</CustomText>
        <Input type="text" placeholder="닉네임"></Input>
      </Box>
      <CustomButton size="small" color="secondary">
        비밀번호 변경
      </CustomButton>
      <CustomButton size="small" color="primary">
        프로필 변경
      </CustomButton>
    </Box>
  );
}

export default function SetProfile({ target }) {
  const { gameId } = useParams();
  function isPlayer(target) {
    if (target === "user") {
      return false;
    } else {
      return true;
    }
  }

  return (
    <Box>{isPlayer(target) ? <PlayerProfile gameId={gameId}></PlayerProfile> : <HostProfile></HostProfile>}</Box>
  );
}
