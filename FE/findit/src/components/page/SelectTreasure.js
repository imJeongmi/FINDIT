import React from "react";
import { Box, styled } from "@mui/system";
import { Link } from 'react-router-dom';

import CustomButton from "components/atom/CustomButton";
import CustomText from "../atom/CustomText";
import TreasureItem from "../atom/TreasureItem";

const BoxStyle = {
  width: "80vw",
  margin: "auto",
};

const TreasureBoxStyle = {
  mt: "4vh",
  height: "51vh",
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
    <Box sx={BoxStyle}>
      <Box sx={{ marginTop: "5vh" }}>
        <CustomText size="xxl" weight="bold">
          보물 선택
        </CustomText>
        <br />
        <CustomText size="xs" variant="grey">
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

        <Link to="/addtreasure">
          <AddTreasureButton>
            <CustomText size="large" variant="primary">
              +
            </CustomText>
          </AddTreasureButton>
        </Link>
      </Box>
      
      <CustomButton size="large" color="secondary">
        보물 설정 완료
      </CustomButton>
    </Box>
  );
}
