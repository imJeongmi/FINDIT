import { Box, styled } from "@mui/system";
import { getTreasureList } from "api/treasure";
import CustomButton from "components/atom/CustomButton";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CustomText from "../atom/CustomText";
import TreasureItem from "../atom/TreasureItem";

const BoxStyle = {
  width: "80vw",
  margin: "auto",
};

const TreasureBoxStyle = {
  my: 5,
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  float: left;
  background-color: white;
  `,
);

export default function SelectTreasure() {
  // 더미데이터 api연결 후 삭제할 것
  const [treasureList, setTreasureList] = useState([
    "https://placeimg.com/100/100/any",
    "https://placeimg.com/100/100/any",
    "https://placeimg.com/100/100/any",
    "https://placeimg.com/100/100/any",
    "https://placeimg.com/100/100/any",
    "https://placeimg.com/100/100/any",
    "https://placeimg.com/100/100/any",
    "https://placeimg.com/100/100/any",
    "https://placeimg.com/100/100/any",
    "https://placeimg.com/100/100/any",
  ]);
  const { gameId } = useParams();
  const [selectedTreasures, setSelectedTreasures] = useState([]);

  useEffect(() => {
    getTreasureList(getTreasureListSuccess, getTreasureListFail);
  }, [gameId]);

  function getTreasureListSuccess(res) {
    setTreasureList(res.data);
  }

  function getTreasureListFail(err) {
    console.log("보물 목록 요청 실패", err);
  }

  function selectTreasure(treasure) {
    setSelectedTreasures([...selectedTreasures, treasure]);
  }

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
        {/* <TreasureItem
          src="https://placeimg.com/100/100/any"
          onClick={() => selectTreasure(treasure)}
        ></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem>
        <TreasureItem src="https://placeimg.com/100/100/any"></TreasureItem> */}
        {treasureList.map((treasure, key) => (
          <TreasureItem src={treasure} />
        ))}
        {/* Onclick 달아야 함 */}
        <AddTreasureButton>
          <CustomText size="xxxl" variant="secondary">
            +
          </CustomText>
          <CustomText size="xxs" variant="secondary">
            나만의 보물 추가
          </CustomText>
        </AddTreasureButton>
      </Box>
      <CustomButton size="large" color="secondary">
        보물 설정 완료
      </CustomButton>
    </Box>
  );
}
