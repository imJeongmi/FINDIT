import React from "react";
import { styled } from "@mui/system";

const CustomLogo = styled("span")(
  ({ size }) => `
color: #504B43;
font-size: ${getSize(size)};
margin: .5rem;
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
      return "35px";
    default:
      return "15px";
  }
}

export default function LogoFont({ size }) {
  return <CustomLogo size={size}>Find It!</CustomLogo>;
}
