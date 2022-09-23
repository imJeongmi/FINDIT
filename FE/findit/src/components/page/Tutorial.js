import React from "react";
import { Box, styled } from "@mui/system";
import Modal from "components/atom/Modal";
import CustomButton from "components/atom/CustomButton";
import CustomText from "components/atom/CustomText";
import compass from "static/compass_100.png";

function setText(order) {
  switch (order) {
    case 1:
      return "카메라 버튼을 누르면 보물을 인식할 수 있어요";
    case 2:
      return "트로피 아이콘을 누르면 실시간 랭킹을 볼 수 있어요";
    case 3:
      return "선물 아이콘을 누르면 보물 현황을 볼 수 있어요";
    case 4:
      return "가이드 라인에 맞춰 보물을 인식해주세요";
    case 5:
      return "나의 순위와 획득한 점수를 확인할 수 있어요";
    case 6:
      return "남은 시간에 유의하여 게임을 진행하세요";
  }
}

export default function Tutorial(order) {
  order = 1;
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box>
        <img src={compass} alt="compass" width="100"></img>
      </Box>
      <Modal>
        <Box sx={{ mt: "5vh", mb: "2vh" }}>
          <img src="https://placeimg.com/225/300/any" alt=""></img>
        </Box>
        <Box>
          <CustomText size="xs">{setText(order)}</CustomText>
        </Box>
        <Box sx={{ mt: "5vh" }}>
            {/* 넘어가는거 찾아서 넣기 */}
        </Box>
        <CustomButton size="medium">
          입장 코드 입력
        </CustomButton>
      </Modal>
    </Box>
  );
}
