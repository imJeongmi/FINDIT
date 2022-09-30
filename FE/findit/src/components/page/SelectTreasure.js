import { Box, styled } from "@mui/system";
import { getTreasureList } from "api/treasure";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import CustomButton from "components/atom/CustomButton";
import CustomText from "../atom/CustomText";
import TreasureItem from "../atom/TreasureItem";

import { useNavigate } from "react-router-dom";

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
    "https://placeimg.com/100/100/tech",
    "https://placeimg.com/100/100/people",
    "https://placeimg.com/100/100/nature",
    "https://placeimg.com/100/100/architecture",
    "https://placeimg.com/100/100/animals",
  ]);

  // let selectedList = new Array(10);
  // for (let i = 0; i < selectedList.length; i++) {
  //   selectedList[i] = false;

  // const [isSelectedList, setIsSelectedList] = useState(selectedList);
  const { gameId } = useParams();
  // const [selectedTreasures, setSelectedTreasures] = useState([]);

  useEffect(() => {
    if (!!gameId) {
      getTreasureList(getTreasureListSuccess, getTreasureListFail);
    }
  }, [gameId]);

  function getTreasureListSuccess(res) {
    setTreasureList(res.data);
  }

  function getTreasureListFail(err) {
    console.log("보물 목록 요청 실패", err);
  }

  // function selectTreasure(key) {
  //   if (!(key in selectedTreasures)) {
  //     setSelectedTreasures([...selectedTreasures, key]);
  //   } else if (key in selectedTreasures) {
  //     setSelectedTreasures(selectedTreasures.filter(selectedTreasure => selectedTreasure !== key));
  //   }
  // }

  const [selectedItems, setSelectedItems] = useState([]);

  function selectedItemHandler(code, isSelected) {
    if (isSelected) {
      setSelectedItems([...selectedItems, code]);
    } else if (!isSelected && selectedItems.find(one => one === code)) {
      const filter = selectedItems.filter(one => one !== code);
      setSelectedItems([...filter]);
    }
  }

  const navigate = useNavigate();

  function confirm() {
    console.log(selectedItems);
    if (selectedItems.length > 0) {
      navigate(`/waiting/${gameId}`);
    } else {
      console.log("보물 선택 ㄱㄱ");
    }
  }
  if (!!gameId) {
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
          {treasureList.map((treasure, key) => (
            <Box key={key}>
              <TreasureItem
                src={treasure}
                selectedItems={selectedItems}
                selectedItemHandler={selectedItemHandler}
                alt="treasure"
              />
            </Box>
          ))}
          {/* Onclick 달아야 함 */}
          <Link to="/addtreasure">
            <AddTreasureButton>
              <CustomText size="xxxl" variant="secondary">
                +
              </CustomText>
              <CustomText size="xxs" variant="secondary">
                나만의 보물 추가
              </CustomText>
            </AddTreasureButton>
          </Link>
        </Box>
        <Box>
          <CustomButton size="large" color="secondary" onClick={confirm}>
            보물 설정 완료
          </CustomButton>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box sx={BoxStyle}>
        <Box sx={{ marginTop: "5vh" }}>
          <CustomText size="xxl" weight="bold">
            커스텀 보물 조회
          </CustomText>
          <br />
          <CustomText size="xs" variant="grey">
            원하는 보물을 추가할 수 있어요
          </CustomText>
        </Box>
        <Box sx={TreasureBoxStyle}>
          {treasureList.map((treasure, key) => (
            <Box key={key}>
              <TreasureItem
                src={treasure}
                // selectedItems={selectedItems}
                // selectedItemHandler={selectedItemHandler}
                alt="treasure"
                isReadPage="true"
              />
            </Box>
          ))}
          {/* Onclick 달아야 함 */}
          <Link to="/addtreasure">
            <AddTreasureButton>
              <CustomText size="xxxl" variant="secondary">
                +
              </CustomText>
              <CustomText size="xxs" variant="secondary">
                나만의 보물 추가
              </CustomText>
            </AddTreasureButton>
          </Link>
        </Box>

        <Link to="/hostmain" style={{ textDecoration: "none" }}>
          <CustomButton size="large" color="secondary">
            뒤로 가기
          </CustomButton>
        </Link>
      </Box>
    );
  }
}
