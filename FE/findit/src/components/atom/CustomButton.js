import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

// const style = {

//   borderWidth: "6px",
//   border: "solid",
// }

const StyledButton = styled(Button)(
  ({ size, color, marginY }) => `
  width: ${getWidthBySize(size)};
  height: ${getHeightBySize(size)};
  margin: ${getMarginY(marginY)} 1vw;
  border-radius: 25px;
  border: solid;
  border-width: 2px;
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  background-color: white;
  color: ${getColor(color)}
  border-color : ${getColor(color)}
  
  `,
);

function getWidthBySize(size) {
  switch (size) {
    case "large":
      return "80vw";
    case "medium":
      return "75vw";
    case "small":
      return "40vw";
    case "smaller":
      return "30vw";
    case "smallest":
      return "5vw";
    case "none":
      return "unset";
    case "full":
      return "100%";
    default:
      return "75vw";
  }
}

function getHeightBySize(size) {
  switch (size) {
    case "large":
      return "6vh";
    case "medium":
      return "5vh";
    case "small":
      return "5vh";
    case "smaller":
      return "5vh";
    case "smallest":
      return "5vh";
    default:
      return "5vh";
  }
}

function getColor(color) {
  switch (color) {
    case "primary":
      return "#9FAFD8";
    case "secondary":
      return "#F1A6A7";
    case "warning":
      return "#FFCC33";
    default:
      return "#9FAFD8";
  }
}

function getMarginY(marginY) {
  if (!marginY) {
    return "3vh";
  } else {
    return marginY;
  }
}

export default function CustomButton({ size, onClick, color, marginY, children }) {
  return (
    // color : primary(파랑) secondary(분홍) warning(노랑)
    // size : 추후 변경 예정, large, medium, small만 있으면 될듯
    // onClick : 클릭 시 필요한 함수 상위 컴포넌트에서 작성하면 됨!
    <StyledButton size={size} onClick={onClick} color={color} marginY={marginY}>
      {children}
    </StyledButton>
  );
}
