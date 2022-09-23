import React from "react";

import { Box, styled } from "@mui/system";

import CustomText from "components/atom/CustomText";
import GameSettingBox from "components/atom/GameSettingBox";

const StyledTitleBox = styled(Box)(
  () => `
margin: 10vw;
display: flex;
flex-direction: column;
justify-content: space-between;
height: 70px;
`,
);

const StyledTextBox = styled(Box)(
  () => `
display: flex;
flex-direction: column;
`,
);

export default function GameSetting() {
  return (
    <Box>
      <StyledTitleBox>
        <CustomText variant="black" weight="bold" size="xxl">
          게임 설정
        </CustomText>
        <CustomText variant="grey" size="xs">
          게임 유형을 선택해주세요.
        </CustomText>
      </StyledTitleBox>
      <GameSettingBox>
        <StyledTextBox>
          <CustomText variant="secondary" size="l" weight="bold">
            시간 설정
          </CustomText>
          <CustomText variant="secondary" size="xxs">
            5분 단위로 설정 가능합니다.
          </CustomText>
        </StyledTextBox>
      </GameSettingBox>
    </Box>
  );
}
