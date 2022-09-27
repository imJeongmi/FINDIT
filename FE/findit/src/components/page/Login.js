import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/system";
import Modal from "components/atom/Modal";
import Input from "components/atom/Input";
import CustomButton from "components/atom/CustomButton";
import CustomText from "components/atom/CustomText";
import compass from "static/compass_100.png";
import { requestLogin } from "api/user";

import ls from 'helper/LocalStorage'

const LoginStyle = {
  mt: "5vh",
  mb: "3vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
};

export default function Login() {
  // const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  function loginSuccess(res) {
    console.log(res.data)
    const accessToken = res.data.accessToken;
    const refreshToken = res.data.refreshToken;
    ls.set("accessToken", accessToken);
    ls.set("refreshToken", refreshToken);
    // navigate("/hostmain");
  }

  function loginFail(res) {
    console.log(res);
  }

  function onClickLogin(e) {
    e.preventDefault();
    requestLogin(id, pw, loginSuccess, loginFail);
  }

  function onChangeId(e) {
    const id = e.target.value;
    setId(id);
  }

  function onChangePw(e) {
    const pw = e.target.value;
    setPw(pw);
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ mt: "3vh" }}>
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
          <Input placeholder="아이디" value={id} onChange={onChangeId} />
          <Input placeholder="비밀번호" value={pw} type="password" onChange={onChangePw} />
          <Box sx={{ padding: "0 5vh" }}>
            <CustomText size="xs" variant="grey">
              비밀번호를 잊어버리셨나요?
            </CustomText>
          </Box>
        </Box>
        <CustomButton size="medium" onClick={onClickLogin}>
          로그인
        </CustomButton>
      </Modal>
    </Box>
  );
}
