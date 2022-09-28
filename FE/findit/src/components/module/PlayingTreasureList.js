import React from "react";
import { Box, styled } from "@mui/system";
import CircleButton from "components/atom/CircleButton";
import PlayingModal from "components/atom/PlayingModal";
import CustomText from "components/atom/CustomText";
import TreasureItem from "components/atom/TreasureItem";
import ExitButton from "components/atom/ExitButton";

const TreasureBox = styled(Box)(
  () => `
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 50vh;
    overflow: scroll; 
    `,
);

const TextBox = styled(Box)(
    () => `
    position: absolute;
    top: 78%;
    right: 10%;
    `
)

const ButtonBox = styled(Box)(
  () => `
    position: absolute;
    bottom: 0;
    right: 3vw;
    `,
);

export default function PlayingTreasureList({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ mx: "auto", textAlign: "center", zIndex: "100" }}>
      <PlayingModal color="pink">
        <Box sx={{ position: "absolute", top: "3%", right: "5%" }} onClick={closeModal}>
          <ExitButton />
        </Box>
        <Box sx={{ mt: "7vh", mb: "5vh" }}>
          <CustomText weight="bold" size="xxl">
            보물 현황
          </CustomText>
        </Box>
        <TreasureBox>
          <TreasureItem src="https://placeimg.com/100/100/any" alt=""></TreasureItem>
          <TreasureItem src="https://placeimg.com/100/100/any" alt=""></TreasureItem>
          <TreasureItem src="https://placeimg.com/100/100/any" alt=""></TreasureItem>
          <TreasureItem src="https://placeimg.com/100/100/any" alt=""></TreasureItem>
          <TreasureItem src="https://placeimg.com/100/100/any" alt=""></TreasureItem>
          <TreasureItem src="https://placeimg.com/100/100/any" alt=""></TreasureItem>
          <TreasureItem src="https://placeimg.com/100/100/any" alt=""></TreasureItem>
          <TreasureItem src="https://placeimg.com/100/100/any" alt=""></TreasureItem>
          <TreasureItem src="https://placeimg.com/100/100/any" alt=""></TreasureItem>
        </TreasureBox>
        <TextBox>
          <CustomText size="xs">찾은 개수 : 2 / 6</CustomText>
        </TextBox>
        <ButtonBox>
          <CircleButton icon="treasure" size="smaller" opacity="0.6" />
        </ButtonBox>
      </PlayingModal>
    </Box>
  );
}
