import React from "react";

import { Box } from "@mui/system";
import Modal from "components/atom/Modal";

import compass from "static/compass_100.png";
import CustomButton from "components/atom/CustomButton";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./dot.css";
import CustomText from "components/atom/CustomText";

export default function Tutorial({ target }) {
  const orderedPlayerText = [
    "카메라 버튼을 누르면 보물을 인식할 수 있어요",
    "트로피 아이콘을 누르면 실시간 랭킹을 볼 수 있어요",
    "선물 아이콘을 누르면 보물 현황을 볼 수 있어요",
    "가이드 라인에 맞춰 보물을 인식해주세요",
    "나의 순위와 획득한 점수를 확인할 수 있어요",
    "남은 시간에 유의하여 게임을 진행하세요",
  ];

  const orderedUserText = [
    "카메라 버튼을 누르면 보물을 인식할 수 있어요",
    "트로피 아이콘을 누르면 실시간 랭킹을 볼 수 있어요",
    "선물 아이콘을 누르면 보물 현황을 볼 수 있어요",
    "가이드 라인에 맞춰 보물을 인식해주세요",
    "나의 순위와 획득한 점수를 확인할 수 있어요",
    "남은 시간에 유의하여 게임을 진행하세요",
  ];

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box>
        <img src={compass} alt="compass" width="100"></img>
      </Box>
      <Modal>
        <Box>
          <Carousel showArrows={false} showStatus={false} showThumbs={false}>
            {target === "user" ? (orderedUserText.map((text, index) => (
              <Box sx={{ mt: "4vh", mb: "4vh", mx: "auto", width: "80vw" }}>
                <Box sx={{ mb: "1vh" }}>
                  <img src="https://placeimg.com/200/300/any" alt="img" />
                </Box>
                <CustomText size="xs" variant="black" key={index} sx={{ mt: "5vh" }}>
                  {text}
                </CustomText>
              </Box>
            ))) : (orderedPlayerText.map((text, index) => (
              <Box sx={{ mt: "4vh", mb: "4vh", mx: "auto", width: "80vw" }}>
                <Box sx={{ mb: "1vh" }}>
                  <img src="https://placeimg.com/200/300/any" alt="img" />
                </Box>
                <CustomText size="xs" variant="black" key={index} sx={{ mt: "5vh" }}>
                  {text}
                </CustomText>
              </Box>
            )))}
          </Carousel>
        </Box>
        <CustomButton size="medium" color="primary">
          입장 코드 입력
        </CustomButton>
      </Modal>
    </Box>
  );
}
