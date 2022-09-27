import React, { useState } from "react";
import { Box } from "@mui/system";
import Modal from "components/atom/Modal";
import Input from "components/atom/Input";
import CustomButton from "components/atom/CustomButton";
import CustomText from "components/atom/CustomText";
import compass from "static/compass_100.png";
import { requestJoin } from "api/user";

const LoginStyle = {
  mt: "5vh",
  mb: "3vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
};

export default function Signup() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirm, setConfirm] = React.useState("");

  function onChangeId(e) {
    const id = e.target.value;
    setId(id);
  }

  function onChangePw(e) {
    const pw = e.target.value;
    setPw(pw);
  }

  function onChangeNickname(e) {
    const nickname = e.target.value;
    setNickname(nickname);
  }

  function onChangeConfirm(e) {
    const confirm = e.target.value;
    setConfirm(confirm);
    validateConfirm(confirm);
  }

  function validateConfirm(confirm) {
    if (confirm !== pw) {
      // setErrorMessageConfirm("비밀번호가 일치하지 않습니다.");
      return false;
    }

    // setErrorMessageConfirm("");
    return true;
  }

  function joinSuccess(res) {
    console.log("성공", res.data);
    setId("");
    setPw("");
    setNickname("");
  }

  function joinFail(res) {
    console.log("실패", res);
  }
  function onClickSignup() {
    requestJoin(id, pw, nickname, joinSuccess, joinFail);
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box>
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
          <Input placeholder="아이디" value={id} onChange={onChangeId} />
          <Input placeholder="닉네임" value={nickname} onChange={onChangeNickname} />
          <Input placeholder="비밀번호" value={pw} type="password" onChange={onChangePw} />
          <Input
            placeholder="비밀번호 확인"
            value={confirm}
            type="password"
            onChange={onChangeConfirm}
          />
        </Box>
        <CustomButton size="medium" color="secondary" onClick={onClickSignup}>
          회원가입
        </CustomButton>
      </Modal>
    </Box>
  );
}
