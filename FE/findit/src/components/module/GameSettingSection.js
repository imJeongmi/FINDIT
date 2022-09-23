import React from "react";

import { Box, styled } from "@mui/system";

import CustomText from "components/atom/CustomText";
import GameSettingBox from "components/atom/GameSettingBox";

import TimerIcon from "static/timer_clock.svg";
import TreasureIcon from "static/wrapped_gift.svg";

// import { useSelector, useDispatch } from "react-redux";

const StyledTextBox = styled(Box)(
  () => `
display: flex;
flex-direction: column;
position: relative;
`,
);

const TimerSettingBox = styled(Box)(
  () => `
display: flex;
justify-content: center;
align-items: center;
margin: 20px 0;
`,
);

const TimerNum = styled(Box)(
  () => `
background: white;
width: 60px;
height: 60px;
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
margin: 0 10px;
`,
);

const HandlerButtom = styled("button")(
  () => `
width: 30px;
height: 30px;
background: #DA989A;
border: 0;
color: white;
font-weight: bold;
border-radius: 5px;
margin: 0 20px;
font-size: 20px;
`,
);

const StyledIcon = styled("img")(
  () => `
position: absolute;
height: 9vh;
left: 200px;
top: -50px;
`,
);

const ModeButtonBox = styled(Box)(
  () => `
margin: 40px 30px 5px;
display: flex;
justify-content: space-around;
`,
);

const ModeSelectButton = styled("button")(
  () => `
border: 0;
width: 98px;
height: 42px;
background: white;
border-radius: 15px;
`,
);

export default function GameSettingSection() {
  // const dispatch = useDispatch()
  // const timer = useSelector((state) => state.timer);
  // const show = useSelector((state) => state.showCounter);

  // const incrementHandler = () => {
  //   dispatch({ type: "increment", amount: 5 });
  // };

  // const decrementHandler = () => {
  //   dispatch({ type: "decrement", amount: 5 });
  // };

  return (
    <Box>
      <GameSettingBox>
        <StyledTextBox>
          <StyledIcon src={TimerIcon} alt="timer icon" />
          <CustomText variant="secondary" size="l" weight="bold">
            시간 설정
          </CustomText>
          <CustomText variant="secondary" size="xxs" margin="3">
            5분 단위로 설정 가능합니다.
          </CustomText>
          <TimerSettingBox>
            {/* <button onClick={decrementHandler}>-</button> */}
            <HandlerButtom>-</HandlerButtom>
            <TimerNum>
              <CustomText variant="secondary" weight="bold" size="xl">
                10
                {/* 나중에 timer로 바꿀것 */}
              </CustomText>
            </TimerNum>
            <CustomText variant="secondary" weight="bold" size="xl">
              min
            </CustomText>
            {/* <button onClick={incrementHandler}>+</button> */}
            <HandlerButtom>+</HandlerButtom>
          </TimerSettingBox>
        </StyledTextBox>
      </GameSettingBox>
      <GameSettingBox variant="primaryWeek">
        <StyledTextBox>
          <StyledIcon src={TreasureIcon} alt="timer icon" />
          <CustomText variant="primary" size="l" weight="bold">
            모드 선택
          </CustomText>
        </StyledTextBox>
        <ModeButtonBox>
          <ModeSelectButton>
            <CustomText size="s" weight="normal" variant="primary">
              일반 모드
            </CustomText>
          </ModeSelectButton>
          <ModeSelectButton>
            <CustomText size="s" weight="normal" variant="primary">
              랜덤 모드
            </CustomText>
          </ModeSelectButton>
        </ModeButtonBox>
        {/* <CustomText variant="primary" size="xxs" margin="3">
            5분 단위로 설정 가능합니다.
          </CustomText> */}
      </GameSettingBox>
    </Box>
  );
}
