import React from "react";

import BeforeEnter from "components/page/BeforeEntrance";
import EnterVerificationCode from "components/page/EnterVerificationCode";
import Intro from "components/page/Intro";

import { Routes, Route, Navigate } from "react-router-dom";
import SelectTreasure from "components/page/SelectTreasure";

function checkAuth() {
  return true;
}

function CheckAuth({ children }) {
  if (checkAuth()) return children;
  return <Navigate to="/" />;
}

export default function RouterConfiguration() {
  return (
    <Routes>
      {/* 공통 */}
      <Route path="/" element={<Intro />} />
      <Route path="/main" element={<BeforeEnter />} />

      {/* player */}
      <Route path="/code" element={<EnterVerificationCode />} />

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
        path="/"
        component={SelectTreasure}
        element={
          <CheckAuth>
            <SelectTreasure />
          </CheckAuth>
        }
      />
    </Routes>
  );
}
