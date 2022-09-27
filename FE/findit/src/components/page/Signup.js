import React from "react";
import { Box } from "@mui/system";
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

export default function Signup() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ mt: "3vh" }}>
        <img src={compass} alt="compass" width="100" />
      </Box>
      <Modal>
        <Box sx={{ mt: "5vh", mb: "1vh" }}>
          <CustomText size="xl" weight="bold" variant="grey">
            Login
          </CustomText>
          <CustomText size="xl" weight="bold">
            {" | Signup"}
          </CustomText>
        </Box>
        <Box>
          <CustomText size="xs" variant="grey">
            회원가입을 통해 게임을 생성하거나 이력을 저장할 수 있어요
          </CustomText>
        </Box>
        <Box sx={LoginStyle}>
          <Input placeholder="아이디" />
          <Input placeholder="닉네임" />
          <Input placeholder="비밀번호" />
          <Input placeholder="비밀번호 확인" />
        </Box>
        <CustomButton size="medium" color="secondary" my="0">
          회원가입
        </CustomButton>
      </Modal>
    </Box>
  );
}
