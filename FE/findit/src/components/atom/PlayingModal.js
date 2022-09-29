import React from "react";
import { styled } from "@mui/system";

const CustomModal = styled("div")(
   ({color}) => `
    width: 95vw;
    height: 72vh;
    border-radius: 25px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: ${getColor(color)};
    align-items: space-between;
    justify-content: space-between;
    `,
);

function getColor(color) { 
    switch (color) {
      case "pink":
        return "#F6EDED";
      default:
        return "#F6F4ED";
    }
  }

export default function PlayingModal({ color, children }) {
  return <CustomModal color={color}>{children}</CustomModal>;
}
