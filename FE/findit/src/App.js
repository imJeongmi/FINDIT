import { Box } from "@mui/system";

import React from "react";

import BeforeEntrance from "components/page/BeforeEntrance";

import "./App.css";

const BodyStyle = {
  marginTop: "4vh",
};

function App() {
  return (
    <Box sx={BodyStyle}>
      <BeforeEntrance />
    </Box>
  );
}

export default App;
