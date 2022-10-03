import React from "react";
import { Box, styled } from "@mui/system";

import "./LogoFont.scss";

const CustomLogo = styled("span")(
  ({ size, margin }) => `
color: #333333;
font-size: ${getSize(size)};

padding: 0;
font-family: 'WendyOne';
font-style: normal;
font-weight: 400;
line-height: 53px;
`,
);

function getSize(size) {
  switch (size) {
    case "xl":
      return "55px";
    case "medium":
      return "40px";
    default:
      return "15px";
  }
}

// function getMargin(margin) {
//   if (!!margin) {
//     return margin;
//   } else {
//     return ".5rem";
//   }
// }

export default function LogoFont({ size, margin }) {
  return (
    <Box>
      <CustomLogo size={size} margin={margin} className={size === "xl" ? "logo" : ""}>
        F
      </CustomLogo>
      <CustomLogo size={size} margin={margin} className={size === "xl" ? "logo" : ""}>
        i
      </CustomLogo>
      <CustomLogo size={size} margin={margin} className={size === "xl" ? "logo" : ""}>
        n
      </CustomLogo>
      <CustomLogo size={size} margin={margin} className={size === "xl" ? "logo" : ""}>
        d
      </CustomLogo>
      <CustomLogo size={size} margin={margin} className={size === "xl" ? "logo" : ""}>
        i
      </CustomLogo>
      <CustomLogo size={size} margin={margin} className={size === "xl" ? "logo" : ""}>
        t
      </CustomLogo>
      <CustomLogo size={size} margin={margin} className={size === "xl" ? "logo" : ""}>
        !
      </CustomLogo>
    </Box>
  );
}
