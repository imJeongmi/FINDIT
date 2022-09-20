import { styled } from "@mui/system";
import React from "react";

const CustomModal = styled("div")(
  () => `
  height: 80vh;
  width: 100%;
  border-radius: 50px 50px 0 0;
  position: absolute;
  bottom: 0;
  box-shadow: 0 3px 10px black;
  background-color: white;
  z-index: -1;
  `
)

export default function Modal() {
  return (
    <CustomModal></CustomModal>
  )
}