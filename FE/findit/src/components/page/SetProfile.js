import { Box } from "@mui/system";
import CircleButton from "components/atom/CircleButton";
import CustomButton from "components/atom/CustomButton";
import Input from "components/atom/Input";
import React from "react";
import CustomText from "../atom/CustomText";
import ProfileImage from "../atom/ProfileImage";

import { requestLogout } from "api/user";
import { useNavigate } from "react-router-dom";

const ProfileBoxStyle = {
  margin: "auto",
  textAlign: "center",
};

const BoxStyle = {
  textAlign: "center",
  margin: "6vh auto",
};

function PlayerProfile() {
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
        <Input type="text" placeholder="닉네임"></Input>
      </Box>
      <CustomButton size="large" color="primary">
        확인
      </CustomButton>
    </Box>
  );
}

function HostProfile() {
  const navigate = useNavigate();

  function logoutSuccess() {
    navigate("/main");
  }

  function logoutFail(err) {
    console.log(err);
  }

  function onClickLogout(event) {
    event.preventDefault();
    console.log("로그아웃 버튼 클릭");
    requestLogout(logoutSuccess, logoutFail);
  }
  // 로그아웃 함수 작성
  return (
    <Box sx={ProfileBoxStyle}>
      <Box sx={{ textAlign: "end", marginTop: "4vh", marginRight: "10vw" }} onClick={onClickLogout}>
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
  function isPlayer(target) {
    if (target === "user") {
      return false;
    } else {
      return true;
    }
  }

  return (
    <Box>{isPlayer(target) ? <PlayerProfile></PlayerProfile> : <HostProfile></HostProfile>}</Box>
  );
}
