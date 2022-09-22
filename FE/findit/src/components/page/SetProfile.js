import { Box } from "@mui/system";
import React from "react";
import CustomText from "../atom/CustomText";
import ProfileImage from "../atom/ProfileImage";

const ProfileBoxStyle = {
  margin: "auto",
  textAlign: "center",
};

function PlayerProfile() {
  return (
    <Box sx={ProfileBoxStyle}>
      <CustomText size="large">프로필 설정</CustomText>
      <ProfileImage type="rounded"></ProfileImage>
      <Box>
        <CustomText>닉네임을 등록해주세요</CustomText>
        {/* input */}
      </Box>
      {/* 버튼 */}
    </Box>
  );
}

function UserProfile() {
  return (
    <Box sx={ProfileBoxStyle}>
      <CustomText size="large">마이 페이지</CustomText>
      <Box sx={{ my: 5, }}>
        <ProfileImage type="rounded"></ProfileImage>
      </Box>
      <Box>
        <CustomText size="small">닉네임을 등록해주세요</CustomText>
        {/* input */}
      </Box>
      {/* 버튼 */}
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
    <Box>{isPlayer(target) ? <PlayerProfile></PlayerProfile> : <UserProfile></UserProfile>}</Box>
  );
}
