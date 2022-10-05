import React, { useState } from "react";

import { Box } from "@mui/system";

import EnterCode from "components/atom/EnterCode";
import Modal from "components/atom/Modal";

import compass from "static/compass_100.png";
import CustomText from "components/atom/CustomText";
import CustomButton from "components/atom/CustomButton";

import { useNavigate } from "react-router-dom";

import { requestEnter } from "api/player";

import "./compass.scss";

export default function EnterVerificationCode() {
  const [enterCode, setEnterCode] = useState("");
  const navigate = useNavigate();

  function enterSuccess(res) {
    // console.log(res);
    navigate(`/playerprofile/${enterCode}`);
  }

  function enterFail(err) {
    alert("다시 한 번 입력해주세요😥");
    // console.log("게임 입장 실패", err);
  }

  function postEnterCode(event) {
    event.preventDefault();
    // console.log(enterCode);
    requestEnter(enterCode, enterSuccess, enterFail);
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ mt: "3vh" }}>
        <img src={compass} alt="compass" width="100" className="floating-small"></img>
      </Box>
      <Modal>
        <Box sx={{ textAlign: "center", my: 10 }}>
          <CustomText size="xl" weight="bold">
            입장코드 입력
          </CustomText>
          <br />
          <br />
          <CustomText size="xs">게임에 입장하기 위해 전달받은 코드를 입력하세요</CustomText>
          <EnterCode enterCode={enterCode} setEnterCode={setEnterCode}></EnterCode>
        </Box>
        <CustomButton size="large" color="primary" onClick={postEnterCode}>
          입장하기
        </CustomButton>
      </Modal>
    </Box>
  );
}
