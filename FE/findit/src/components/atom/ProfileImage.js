import React from "react";
import { styled } from "@mui/system";
import { Avatar } from "@mui/material";

const Image = styled(Avatar)(
  ({ type }) => `
  margin: 0;
  width: ${getSizeByType(type)};
  height: ${getSizeByType(type)};
  border-radius: ${getBorderRadiusByType(type)};
`,
);

function getBorderRadiusByType(type) {
  switch (type) {
    case "rounded":
      return "25% 25% 25% 25%";
    default:
      return "50%";
  }
}

function getSizeByType(type) {
  switch (type) {
    case "rounded":
      return "150px";
    case "winner":
      return "90px";
    default:
      return "45px";
  }
}

export default function ProfileImage({ type }) {
  return <Image type={type} src=""></Image>;
}
