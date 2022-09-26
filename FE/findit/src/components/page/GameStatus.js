import React from "react";
import { Box, styled } from "@mui/system";
import CustomButton from "components/atom/CustomButton";
import CustomText from "components/atom/CustomText";
import RankingList from "components/module/RankingList";

const CenterStyle = {
  margin: "7vh 0 5vh 0",
  textAlign: "center",
};

const ButtonStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

}

const RankingBox = styled(Box)(
  () => `
    height: 50vh;
    margin: 3vh auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    overflow-x: hidden;
    `,
);

function DeactivateButton() {
  return <CustomButton size="medium" color="secondary">게임 종료</CustomButton>;
}

function ActivateButton() {
  return (
    // solid style
    <Box sx={ButtonStyle}>
      <CustomButton size="medium" color="secondary">게임 종료</CustomButton>
      <CustomText variant="grey" size="xs">보물을 모두 찾은 사람이 있어요</CustomText>
    </Box>
  );
}

export default function GameStatus({ target }) {
  function isFinished(target) {
    target = 1;
    if (target !== 0) return true;
  }
  return (
    <Box>
      <Box sx={CenterStyle}>
        <CustomText size="l" weight="bold">
          남은 시간
        </CustomText>
        <br />
        <CustomText size="xxxl" weight="bold">
          04:10
        </CustomText>
      </Box>
      <RankingBox>
        <RankingList />
        <RankingList />
        <RankingList />
        <RankingList />
        <RankingList />
        <RankingList />
      </RankingBox>
      <Box>{isFinished(target) ? <ActivateButton /> : <DeactivateButton />}</Box>
    </Box>
  );
}
