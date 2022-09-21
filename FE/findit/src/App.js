import React from "react";
import CircleButton from "./components/atom/CircleButton";

function App() {
  return (
    <div style={{ backgroundColor: "crimson" }}>
      <h1>Find It!</h1>
      <CircleButton size="large" icon="camera" />
      <CircleButton size="small" icon="rank" />
      <CircleButton size="small" icon="treasure" />
    </div>
  );
}

export default App;
