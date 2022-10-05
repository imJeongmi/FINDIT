import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, styled } from "@mui/system";

import PlayingModal from "components/atom/PlayingModal";
import CustomText from "components/atom/CustomText";
import CircleButton from "components/atom/CircleButton";
import ExitButton from "components/atom/ExitButton";
import TreasureItem from "components/atom/TreasureItem";

import { getGameTreasureList } from "api/player";

const TreasureBox = styled(Box)(
  () => `
    position: absolute;
    top: 55%;
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
    top: 80%;
    right: 10%;
    `,
);

const ButtonBox = styled(Box)(
  () => `
    position: absolute;
    bottom: 1vh;
    right: 3vw;
    `,
);

export default function PlayingTreasureList({ setModalOpen, findedTreasures }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  let { gameid } = useParams();
  const [treasureList, setTreasureList] = useState([]);

  useEffect(() => {
    getGameTreasureList(gameid, getGameTreasureListSuccess, getGameTreasureListFail);
    // alert(`findedTreasures : ${findedTreasures}`);
  }, [gameid]);

  function getGameTreasureListSuccess(res) {
    // console.log(res.data);
    // console.log(res.data.tid);
    setTreasureList(res.data);
  }

  function getGameTreasureListFail(err) {
    console.log("보물 목록 요청 실패", err);
  }

  if (!!gameid) {
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
            {treasureList.map(({ img, tid }) => (
              <Box key={tid}>
                {img !== null && (
                  <TreasureItem
                    src={img}
                    alt="treasure"
                    isReadPage="false"
                    finded={findedTreasures.includes(tid)}
                  />
                )}
              </Box>
            ))}
          </TreasureBox>
          <TextBox>
            <CustomText size="xs">
              찾은 개수 : {findedTreasures.length} / {treasureList.length}
            </CustomText>
          </TextBox>
          <ButtonBox>
            <CircleButton icon="treasure" size="smaller" opacity="0.6" />
          </ButtonBox>
        </PlayingModal>
      </Box>
    );
  }
}
