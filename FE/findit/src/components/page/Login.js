import React from "react";
import { Box, styled } from "@mui/system";
import Modal from "components/atom/Modal";
import Input from "components/atom/Input";
import CustomButton from "components/atom/CustomButton";
import CustomText from "components/atom/CustomText";
import compass from "static/compass_100.png";

const LoginStyle = {
  mt: "5vh",
  mb: "3vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
};

export default function Login() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box>
        <img src={compass} alt="compass" width="100" />
      </Box>
      <Modal>
        <Box sx={{ mt: "5vh", mb: "1vh" }}>
          <CustomText size="xl" weight="bold">
            {"Login | "}
          </CustomText>
          <CustomText size="xl" weight="bold" variant="grey">
            Signup
          </CustomText>
        </Box>
        <Box>
          <CustomText size="xs" variant="grey">
            게임을 생성하려면 로그인이 필요해요
          </CustomText>
        </Box>
        <Box sx={LoginStyle}>
          <Input placeholder="아이디" />
          <Input placeholder="비밀번호" />
          <Box sx={{ padding: "0 5vh" }}>
            <CustomText size="xs" variant="grey">
              비밀번호를 잊어버리셨나요?
            </CustomText>
          </Box>
        </Box>
        <CustomButton size="medium">로그인</CustomButton>
      </Modal>
    </Box>
  );
}
