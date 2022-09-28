import React from "react";

import { Box } from "@mui/system";

import EnterCode from "components/atom/EnterCode";
import Modal from "components/atom/Modal";

import compass from "static/compass_100.png";
import CustomText from "components/atom/CustomText";

export default function EnterVerificationCode() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ mt: "3vh" }}>
        <img src={compass} alt="compass" width="100"></img>
      </Box>
      <Modal>
        <Box sx={{ textAlign: "center", my: 10 }}>
          <CustomText size="xl" weight="bold">
            입장코드 입력
          </CustomText>
          <br />
          <br />
          <CustomText size="xs">게임에 입장하기 위해 전달받은 코드를 입력하세요.</CustomText>
          <EnterCode></EnterCode>
        </Box>
      </Modal>
    </Box>
  );
}
