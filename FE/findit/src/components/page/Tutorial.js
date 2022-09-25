import React from "react";

import { Box } from "@mui/system";
import Modal from "components/atom/Modal";

import compass from "static/compass_100.png";
import CustomButton from "components/atom/CustomButton";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./dot.css";
import CustomText from "components/atom/CustomText";

export default function Tutorial() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box>
        <img src={compass} alt="compass" width="100"></img>
      </Box>
      <Modal>
        <Box sx={{ textAlign: "center", mt: "6vh", height: "55vh" }}>
          <Carousel showArrows={false} showStatus={false} showThumbs={false}>
            <Box>
              <Box sx={{ width: "75vw", height: "48vh", margin: "auto" }}>
                <img src="https://placeimg.com/220/300/any" alt="img" />
              </Box>
              <p size="xs" variant="black">
                카메라 버튼을 누르면 보물을 인식할 수 있어요
              </p>
              <br />
            </Box>
            <Box>
              <Box sx={{ width: "75vw", height: "48vh", margin: "auto" }}>
                <img src="https://placeimg.com/220/300/any" alt="img" />
              </Box>
              <p size="xs" variant="black">
                트로피 아이콘을 누르면 실시간 랭킹을 확인할 수 있어요
              </p>
              <br />
            </Box>
          </Carousel>
        </Box>
        <CustomButton size="large" color="primary">
          입장 코드 입력
        </CustomButton>
      </Modal>
    </Box>
  );
}
