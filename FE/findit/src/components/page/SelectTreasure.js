import { Box } from "@mui/system";
import React from "react";

import CustomText from "../atom/CustomText";
import TreasureItem from "../atom/TreasureItem";

const TreasureBoxStyle = {
  mt: 4,
  height: "50vh",
  overflow: "scroll",
}

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
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
      </Box>
      {/* 버튼 */}
    </Box>
  );
}
