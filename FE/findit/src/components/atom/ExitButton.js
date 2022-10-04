import React from "react";
import { styled, Box } from "@mui/system";

import ExitIcon from "static/exit.png";

const ButtonBox = styled(Box)(
  () => `
    width: 6vw;
    height: 6vw;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -1px -1px 5px white, 2px 2px 5px #babecc;
    cursor: pointer;
    `,
);

export default function ExitButton() {
  return (
    <ButtonBox>
      <img src={ExitIcon} alt="exitIcon" width="20px" height="20px" />
    </ButtonBox>
  );
}
