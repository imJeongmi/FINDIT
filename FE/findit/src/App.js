import React from "react";

import { Box } from "@mui/system";
import RouterConfiguration from "configs/router";
import Tutorial from "components/page/Tutorial";

import "./App.css";

const BodyStyle = {
  marginTop: "4vh",
};

function App() {
  return <Box sx={BodyStyle}>
    <Tutorial />
  </Box>;
}

export default App;
