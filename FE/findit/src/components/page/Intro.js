import React from "react";

import { Box } from "@mui/material";
// import { styled } from "@mui/system";

const backgroundStyle = {
  width: "100vw",
  height: "100vh",
};

const redCircle = {
  position: "absolute",
  width: "592px",
  height: "592px",
  left: "-181px",
  top: "-266px",
  background:
    "radial-gradient(50% 50% at 37.75% 59.29%, rgba(250, 176, 198, 0.4) 0%, rgba(202, 228, 245, 0.0166667) 95.83%, rgba(202, 228, 245, 0) 99.99%, rgba(200, 230, 247, 0) 100%)",
  zIndex: -1,
};

const yellowCircle = {
  position: "absolute",
  width: "491px",
  height: "491px",
  left: "-50px",
  top: "129px",

  background:
    "radial-gradient(50% 50% at 50% 50%, rgba(237, 229, 185, 0.5) 0%, rgba(247, 235, 200, 0) 100%)",
  zIndex: -1,
};

const blueCircle = {
  position: "absolute",
  width: "436px",
  height: "436px",
  left: "172px",
  top: "474px",

  background:
    "radial-gradient(50% 50% at 50% 50%, rgba(209, 236, 252, 0.7) 0%, rgba(200, 230, 247, 0) 100%)",
  zIndex: -1,
};

export default function Intro({ children }) {
  return (
    <Box sx={backgroundStyle}>
      <Box sx={redCircle} />
      <Box sx={yellowCircle} />
      <Box sx={blueCircle} />
      {children}
    </Box>
  );
}
