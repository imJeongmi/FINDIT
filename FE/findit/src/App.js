import { Box } from "@mui/system";

import React from "react";

import "./App.css";

import GameSettings from "components/page/GameSettings";

const BodyStyle = {
  marginTop: "4vh",
};

function App() {
  return (
    <Box sx={BodyStyle}>
      <GameSettings />
    </Box>
  );
}

export default App;
