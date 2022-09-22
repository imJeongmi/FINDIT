import { styled } from "@mui/system";
import React from "react";

const CustomModal = styled("div")(
  () => `
  height: 80vh;
  width: 100%;
  border-radius: 30px 30px 0 0;
  position: absolute;
  bottom: 0;
  box-shadow: 0 3px 10px grey;
  background-color: white;
  `
)

export default function Modal({ children }) {
  return (
    <CustomModal>{children}</CustomModal>
  )
}
