import { Box } from "@mui/system";
import RouterConfiguration from "configs/router";

import React from "react";

import "./App.css";

import GameSetting from "components/page/GameSettings";

const BodyStyle = {
  marginTop: "4vh",
};

function App() {
  return <Box sx={BodyStyle}>
    <RouterConfiguration />
  </Box>;
}

export default App;
