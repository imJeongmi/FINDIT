import { Box, styled } from "@mui/system";
import React from "react";

import CustomText from "../atom/CustomText";
import TreasureItem from "../atom/TreasureItem";

const TreasureBoxStyle = {
  mt: 4,
  height: "50vh",
  overflow: "scroll",
};

const AddTreasureButton = styled(Box)(
  () => `
  width: 25vw;
  height: 25vw;
  margin: 3px;
  border-radius: 25%;
  box-shadow: 2px 2px 10px 1px #E2E2E2;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  `,
);

export default function SelectTreasure() {
  // treasure_list 받아오면
  return (
    <Box>
      <Box>
        <CustomText size="large">보물 선택</CustomText>
        <br />
        <CustomText size="small" variant="grey">
          원하는 보물을 추가해볼까요?
        </CustomText>
      </Box>
      <Box sx={TreasureBoxStyle}>
        {/* 보물 리스트 받아온 후, map으로 변경 */}
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        {/* Onclick 달아야 함 */}
        <AddTreasureButton>
          <CustomText size="large" variant="primary">
            +
          </CustomText>
        </AddTreasureButton>
      </Box>
      {/* 버튼 */}
    </Box>
  );
}
