import React from "react";

import { Box } from "@mui/material";
import Compass from "static/compass_400.png";
import LogoFont from "components/atom/LogoFont";
import CustomText from "components/atom/CustomText";

const IntroBoxStyle = {
  textAlign: "center",
  marginTop: "15vh"
};

const TextStyle = {
  marginTop: "5vh",
}

export default function Intro() {
  return (
    <Box sx={IntroBoxStyle}>
      {/* img에 온클릭 달기! */}
      <img src={Compass} alt="Compass" width="300px" />
      <Box sx={TextStyle}>
        <LogoFont size="xl" />
        <br />
        <br />
        <CustomText variant="grey" size="medium">나침반을 터치하세요</CustomText>
      </Box>
    </Box>
  );
}
