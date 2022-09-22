import React from "react";

import { styled } from "@mui/system";
// import JoystickIcon from "static/joystick.svg";
// import TutorialIcon from "static/open_book.svg";
// import LockIcon from "static/locked.svg";
// import TreasureIcon from "static/wrapped_gift.svg";
import Box from "@mui/material/Box";

// import "./BoxButton.scss";

const StyledBoxButton = styled(Box)(
  ({ size, color }) => `
height: ${getHeightBySize(size)};
background-color: ${getColor(color)};
border: 0;
outline: 0;
padding: 15px;
margin: 25px;
color: #61677c;
box-shadow: -5px -5px 10px #ffffff, 5px 5px 10px #babecc;
transition: all 0.2s ease-in-out;
cursor: pointer;
font-weight: 600;
border-radius: 15px;
display: flex;
justify-content: space-between;
align-items: center;

&:hover {
  box-shadow: -2px -2px 5px #ffffff, 2px 2px 5px #babecc;
}

&:active {
  box-shadow: inset 1px 1px 2px #babecc , inset -1px -1px 2px #ffffff;
}`,
);

function getHeightBySize(size) {
  switch (size) {
    case "large":
      return "10vh";
    case "medium":
      return "6vh";
    default:
      return "5vh";
  }
}

function getColor(color) {
  switch (color) {
    case "primaryWeek":
      return "#E0E4EE";
    case "secondaryWeek":
      return "#EFDFDF";
    case "warningWeek":
      return "#FAEBBA";
    default:
      return "#FFFFFF";
  }
}

// function getIcon(icon) {
//   switch (icon) {
//     case "joystick":
//       return JoystickIcon;
//     case "lock":
//       return LockIcon;
//     case "treasure":
//       return TreasureIcon;
//     case "tutorial":
//       return TutorialIcon;
//     default:
//       return JoystickIcon;
//   }
// }

// function getIconSize(size) {
//   switch (size) {
//     case "large":
//       return "7vh";
//     case "medium":
//       return "5vh";
//     default:
//       return "7vh";
//   }
// }

export default function BoxButton({ size, color, children }) {
  return (
    <StyledBoxButton color={color} size={size}>
      {/* <Box>참여자로 게임을 시작하고 싶다면</Box>
      <Box>입장 코드 입력</Box>
      <img src={getIcon(icon)} alt={icon} style={{ width: getIconSize(size) }} /> */}
      {children}
    </StyledBoxButton>
  );
}
