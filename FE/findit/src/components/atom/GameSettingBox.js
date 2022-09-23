import React from "react";

import { Box, styled } from "@mui/system";

const StyledBox = styled(Box)(
  ({ variant }) => `
background: ${getColor(variant)};
width: 280px;
height: 120px;
box-shadow: ${getBoxShadow(variant)};
border-radius: 15px;
margin: auto;
padding: 20px
`,
);

function getColor(variant) {
  switch (variant) {
    case "primaryWeek":
      return "#E0E4EE";
    default:
      return "#EFDFDF";
  }
}

function getBoxShadow(variant) {
  switch (variant) {
    case "primaryWeek":
      return "-2px 2px 4px rgba(190, 194, 202, 0.2), 2px -2px 4px rgba(190, 194, 202, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.9), 2px 2px 5px rgba(190, 194, 202, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(190, 194, 202, 0.5)";
    default:
      return "-2px 2px 4px rgba(198, 185, 185, 0.2), 2px -2px 4px rgba(198, 185, 185, 0.2), -2px -2px 4px rgba(255, 255, 255, 0.9), 2px 2px 5px rgba(198, 185, 185, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(198, 185, 185, 0.5)";
  }
}

export default function GameSettingBox({ variant, children }) {
  return <StyledBox variant={variant}>{children}</StyledBox>;
}
