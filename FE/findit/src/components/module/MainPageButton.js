import React from "react";

import CustomText from "components/atom/CustomText";
import BoxButton from "components/atom/BoxButton";

import JoystickIcon from "static/joystick.svg";
import TutorialIcon from "static/open_book.svg";
import LockIcon from "static/locked.svg";
import TreasureIcon from "static/wrapped_gift.svg";

import Box from "@mui/material/Box";
import { styled } from "@mui/system";

function getIcon(icon) {
  switch (icon) {
    case "joystick":
      return JoystickIcon;
    case "lock":
      return LockIcon;
    case "treasure":
      return TreasureIcon;
    case "tutorial":
      return TutorialIcon;
    default:
      return JoystickIcon;
  }
}

function getIconSize(size) {
  switch (size) {
    case "large":
      return "7vh";
    case "medium":
      return "5vh";
    default:
      return "7vh";
  }
}

const playerMainButtonContentList = [
  {
    key: 1,
    explanation: "참여자로 게임을 시작하고 싶다면",
    title: "입장 코드 입력",
    icon: "joystick",
  },
  {
    key: 2,
    explanation: "FindIt!이 처음이신가요?",
    title: "튜토리얼 보기",
    icon: "tutorial",
  },
  {
    key: 3,
    explanation: "게임 이력을 관리하고 싶다면",
    title: "로그인 / 회원가입",
    icon: "lock",
  },
];

const hostMainButtonContentList = [
  {
    key: 1,
    explanation: "새로운 게임을 시작하고 싶다면",
    title: "새로운 FindIt!",
    icon: "joystick",
    color: "warningWeek",
  },
  {
    key: 2,
    explanation: "등록한 보물을 조회하고 싶다면",
    title: "커스텀 보물 조회",
    icon: "treasure",
    color: "secondaryWeek",
  },
  {
    key: 3,
    explanation: "게임 생성 및 운영 방법을 알고싶다면",
    title: "게임 도움말",
    icon: "tutorial",
    color: "primaryWeek",
  },
];

const StyledTextBox = styled("div")(
  () => `
display: flex;
flex-direction: column;
margin-left: 15px;
`,
);

export default function MainPageButton({ page }) {
  if (page === "playerMain") {
    return (
      <Box>
        {playerMainButtonContentList.map((item, key) => (
          <Box>
            <BoxButton key={key} size="medium">
              <StyledTextBox>
                <CustomText size="xxs" weight="lighter" marginY="5">
                  {item.explanation}
                </CustomText>
                <CustomText size="s" weight="bold">
                  {item.title}
                </CustomText>
              </StyledTextBox>
              <Box sx={{ marginRight: "15px" }}>
                <img
                  src={getIcon(item.icon)}
                  alt={item.icon}
                  style={{ width: getIconSize("medium") }}
                />
              </Box>
            </BoxButton>
            <Box sx={{ height: "5px" }} />
          </Box>
        ))}
      </Box>
    );
  } else {
    return (
      <Box>
        {hostMainButtonContentList.map((item, key) => (
          <Box>
            <Box sx={{ height: "12px" }} />
            <BoxButton key={key} size="large" color={item.color}>
              <Box>
                <StyledTextBox>
                  <CustomText size="xxs" weight="lighter">
                    {item.explanation}
                  </CustomText>
                  <Box sx={{ marginBottom: "7px" }} />
                  <CustomText size="m">{item.title}</CustomText>
                </StyledTextBox>
              </Box>
              <Box sx={{ marginRight: "15px" }}>
                <img
                  src={getIcon(item.icon)}
                  alt={item.icon}
                  style={{ width: getIconSize("large") }}
                />
              </Box>
            </BoxButton>
          </Box>
        ))}
      </Box>
    );
  }
}
