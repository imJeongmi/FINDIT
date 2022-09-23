import React from "react";
import { Box, styled } from "@mui/system";
import CustomButton from "components/atom/CustomButton";
import CustomText from "components/atom/CustomText";
import RankingList from "components/module/RankingList";

const CenterStyle = {
  margin: "auto",
  textAlign: "center",
};

const ButtonStyle = {
    height: "8vh",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-between"

}

const RankingBox = styled(Box)(
  () => `
    width: 80vw;
    height: 50vh;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    overflow-x: hidden;
    `,
);

function DeactivateButton() {
  return <CustomButton size="small" color="secondary">게임 종료</CustomButton>;
}

function ActivateButton() {
  return (
    // solid style
    <Box sx={ButtonStyle}>
      <CustomButton size="small" color="secondary">게임 종료</CustomButton>
      <CustomText variant="grey" size="smaller">보물을 모두 찾은 사람이 있어요</CustomText>
    </Box>
  );
}

export default function GameStatus({ target }) {
  function isFinished(target) {
    target = 1;
    if (target != 0) return true;
  }
  return (
    <Box>
      <Box sx={CenterStyle}>
        <CustomText size="larger medium" weight="bold">
          남은 시간
        </CustomText>
        <br />
        <CustomText size="largest" weight="bold">
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
      <Box sx={CenterStyle}>{isFinished(target) ? <ActivateButton /> : <DeactivateButton />}</Box>
    </Box>
  );
}
