import React from "react";

import { Box } from "@mui/system";
import { Carousel } from "react-responsive-carousel";
import Modal from "components/atom/Modal";

import compass from "static/compass_100.png";
import CustomButton from "components/atom/CustomButton";
import CustomText from "components/atom/CustomText";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./dot.css";
import "./compass.scss";

import { Link } from "react-router-dom";

export default function Tutorial({ target }) {
  const orderedHostText = [
    "새로운 Findit!을 누르면 게임 설정 화면이 나타나요",
    "게임 시간과 모드를 설정할 수 있어요",
    "플레이어가 찾을 보물을 선택하고, 커스텀 보물을 추가할 수 있어요",
    "PLAY 버튼을 눌러 게임을 시작하세요",
    "게임 진행 중에는 남은 시간과 실시간 랭킹을 확인할 수 있어요",
    "플레이어가 보물을 모두 찾은 경우에는 게임을 종료할 수 있어요",
    "보물 조회 버튼을 누르면 등록해놓은 커스텀 보물을 확인할 수 있어요",
  ];

  const orderedPlayerText = new Array(
    "카메라 버튼을 누르면 보물을 인식할 수 있어요",
    "트로피 아이콘을 누르면 실시간 랭킹을 볼 수 있어요",
    "선물 아이콘을 누르면 보물 현황을 볼 수 있어요",
    "가이드 라인 내부에서 보물을 인식해주세요",
    "나의 순위와 획득한 점수를 확인할 수 있어요",
    "남은 시간에 유의하여 게임을 진행하세요",
  );

  const orderedHostImage = new Array(
    require("static/tutorial/playerTutorial1.png"),
    require("static/tutorial/playerTutorial2.png"),
    require("static/tutorial/playerTutorial3.png"),
    require("static/tutorial/playerTutorial4.png"),
    require("static/tutorial/playerTutorial5.png"),
    require("static/tutorial/playerTutorial6.png"),
  );

  const orderedPlayerImage = [
    require("static/tutorial/playerTutorial1.png"),
    require("static/tutorial/playerTutorial2.png"),
    require("static/tutorial/playerTutorial3.png"),
    require("static/tutorial/playerTutorial4.png"),
    require("static/tutorial/playerTutorial5.png"),
    require("static/tutorial/playerTutorial6.png"),
  ];

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ mt: "3vh" }}>
        <img src={compass} alt="compass" width="100" className="floating-small"></img>
      </Box>
      <Modal>
        <Box>
          <Carousel showArrows={false} showStatus={false} showThumbs={false}>
            {target === "user"
              ? orderedHostImage.map((image, index) => (
                  <Box sx={{ my: "4vh", mx: "auto", width: "80vw" }} key={index}>
                    <Box sx={{ mx: "auto", width: "60vw" }}>
                      <img src={image} alt="" />
                    </Box>
                    <CustomText size="xxs" variant="black" sx={{ mt: "3vh" }}>
                      {orderedHostText[index]}
                    </CustomText>
                  </Box>
                ))
              : orderedPlayerImage.map((image, index) => (
                  <Box sx={{ my: "4vh", mx: "auto", width: "80vw" }} key={index}>
                    <Box sx={{ mx: "auto", width: "60vw" }}>
                      {/* {console.log(image)} */}
                      <img src={image} alt="" />
                    </Box>
                    <CustomText size="xxs" variant="black" sx={{ mt: "3vh" }}>
                      {orderedPlayerText[index]}
                    </CustomText>
                  </Box>
                ))}
          </Carousel>
        </Box>
        {target === "player" ? (
          <Link to="/code" style={{ textDecoration: "none" }}>
            <CustomButton size="large" color="primary" my="0.5vh">
              입장 코드 입력
            </CustomButton>
          </Link>
        ) : (
          <Link to="/hostmain" style={{ textDecoration: "none" }}>
            <CustomButton size="large" color="primary" my="0.5vh">
              메인으로
            </CustomButton>
          </Link>
        )}
      </Modal>
    </Box>
  );
}
