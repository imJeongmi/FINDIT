import React from "react";

import { Box, styled } from "@mui/system";

import CustomText from "components/atom/CustomText";
import GameSettingSection from "components/module/GameSettingSection";

const StyledTitleBox = styled(Box)(
  () => `
margin: 5vh 10vw;
display: flex;
flex-direction: column;
`,
);

export default function GameSetting() {
  return (
    <Box>
      <StyledTitleBox>
        <CustomText variant="black" weight="bold" size="xxl" margin="10">
          게임 설정
        </CustomText>
        <CustomText variant="grey" size="xs" margin="5">
          게임 유형을 선택해주세요.
        </CustomText>
      </StyledTitleBox>
      <GameSettingSection />
    </Box>
  );
}
