import React from "react";

import { Box } from "@mui/system";
import RouterConfiguration from "configs/router";

import Background from "static/background.png";

import "./App.css";

const BodyStyle = {
  // marginTop: "4vh",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  height: "100vh",
  width: "100vw",
  position: "fixed",
  top: 0,
  left: 0,
};

function App() {
  return (
    <Box sx={BodyStyle}>
      <RouterConfiguration />
    </Box>
  );
}

export default App;
