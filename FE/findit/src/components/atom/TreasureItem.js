import { Box, styled } from "@mui/system";
import React from "react";

const TreasureBox = styled(Box)(
  () => `
  width: 30vw;
  height: 30vw;
  border-radius: 25%;
  box-shadow: 2px 2px 10px 1px #E2E2E2;
  display: flex;
  justify-content: center;
  align-items: center;
  `
)

const TreasureImage = styled("img")(
  () => `
  width: 28vw;
  height: 28vw;
  border-radius: 25%;
  
  `
)

export default function TreasureItem({ src }) {
  return (
    <TreasureBox>
      <TreasureImage src={src}/>
    </TreasureBox>
  )
}