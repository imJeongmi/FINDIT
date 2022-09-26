import React from "react";
import { styled } from "@mui/system";

const CustomLogo = styled("span")(
  ({ size, margin }) => `
color: #333333;
font-size: ${getSize(size)};
margin: ${getMargin(margin)};
padding: 0;
letter-spacing: .1rem;
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

function getMargin(margin) {
  if (!!margin) {
    return margin;
  } else {
    return ".5rem";
  }
}

export default function LogoFont({ size, margin }) {
  return (
    <CustomLogo size={size} margin={margin}>
      Find It!
    </CustomLogo>
  );
}
