import React from "react";
import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";

import PlayerMain from "components/page/PlayerMain";
import EnterVerificationCode from "components/page/EnterVerificationCode";
import Intro from "components/page/Intro";
import SelectTreasure from "components/page/SelectTreasure";
import SetProfile from "components/page/SetProfile";

function checkAuth() {
  return true;
}

function CheckAuth({ children }) {
  if (checkAuth()) return children;
  return <Navigate to="/" />;
}

export default function RouterConfiguration() {
  return (
    <Router>
      <Routes>
        {/* 테스트 */}
        <Route path="/test" element={<Intro />} />
        {/* 공통 */}
        <Route path="/" element={<Intro />} />
        <Route path="/main" element={<PlayerMain />} />

        {/* player */}
        <Route path="/code" element={<EnterVerificationCode />} />
        <Route path="/nickname" element={<SetProfile />} />

        {/* User */}
        <Route
          path="/treasure"
          component={SelectTreasure}
          element={
            <CheckAuth>
              <SelectTreasure />
            </CheckAuth>
          }
        />

        <Route
          path="/profile"
          component={SetProfile}
          element={
            <CheckAuth>
              <SetProfile target="user" />
            </CheckAuth>
          }
        />
      </Routes>
    </Router>
  );
}
