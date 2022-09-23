import { Box } from "@mui/system";

import React from "react";

import "./App.css";

import GameSetting from "components/page/GameSettings";

const BodyStyle = {
  marginTop: "4vh",
};

function App() {
  return (
    <Box sx={BodyStyle}>
      <GameSetting />
    </Box>
  );
}

export default App;
