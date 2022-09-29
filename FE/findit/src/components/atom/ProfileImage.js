import React from "react";
import { styled } from "@mui/system";
import { Avatar } from "@mui/material";

const Image = styled(Avatar)(
  ({ type, mb }) => `
  margin: auto;
  width: ${getSizeByType(type)};
  height: ${getSizeByType(type)};
  border-radius: ${getBorderRadiusByType(type)};
  margin-bottom: ${getMarginY(mb)};
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
      return "70px";
    default:
      return "45px";
  }
}

function getMarginY(mb) {
  if (!mb) {
    return "auto";
  } else {
    return mb;
  }
}

export default function ProfileImage({ type, mb }) {
  return <Image type={type} src="" mb={mb}></Image>;
}
