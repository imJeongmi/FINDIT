import { Box, styled } from "@mui/system";
import React from "react";

const TreasureBox = styled(Box)(
  () => `
  width: 25vw;
  height: 25vw;
  margin: 3px;
  border-radius: 25%;
  box-shadow: 2px 2px 10px 1px #E2E2E2;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  background-color: white;
  `,
);

const TreasureImage = styled("img")(
  () => `
  width: 22vw;
  height: 22vw;
  border-radius: 25%;
  `,
);

export default function TreasureItem({ src }) {
  return (
    <TreasureBox>
      <TreasureImage src={src} />
    </TreasureBox>
  );
}
