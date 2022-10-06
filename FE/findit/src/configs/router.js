import React from "react";
import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";

import HostMain from "components/page/HostMain";
import PlayerMain from "components/page/PlayerMain";
import EnterVerificationCode from "components/page/EnterVerificationCode";
import Intro from "components/page/Intro";
import SelectTreasure from "components/page/SelectTreasure";
import SetProfile from "components/page/SetProfile";
import Login from "components/page/Login";
import Signup from "components/page/Signup";
import Tutorial from "components/page/Tutorial";
import GameSetting from "components/page/GameSettings";
import Result from "components/page/Result";
import WaitPlaying from "components/page/WaitPlaying";
import GameStatus from "components/page/GameStatus";
import Playing from "components/page/Playing";
import AddTreasure from "components/page/AddTreasure";
import ls from "helper/LocalStorage";

function checkAuth() {
  return !!ls.get("accessToken");
}

function CheckAuth({ children }) {
  if (checkAuth()) return children;
  return <Navigate to="/main" />;
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/result/:gameid" component={Result} element={<Result />} />

        {/* player */}
        <Route path="/code" element={<EnterVerificationCode />} />
        <Route path="/playerprofile/:gameid" component={SetProfile} element={<SetProfile />} />
        <Route path="/tutorial" element={<Tutorial target="player" />} />
        <Route path="/waiting/:gameid" component={WaitPlaying} element={<WaitPlaying />} />

        {/* player 게임 플레이 */}
        <Route path="/playing/:gameid" component={Playing} element={<Playing />} />

        {/* User */}
        <Route
          path="/hostmain"
          component={HostMain}
          element={
            <CheckAuth>
              <HostMain />
            </CheckAuth>
          }
        />

        <Route
          path="/treasure/:gameid"
          component={SelectTreasure}
          element={
            <CheckAuth>
              <SelectTreasure />
            </CheckAuth>
          }
        />

        <Route
          path="/mytreasure"
          component={SelectTreasure}
          element={
            <CheckAuth>
              <SelectTreasure />
            </CheckAuth>
          }
        />

        <Route
          path="/hostprofile"
          component={SetProfile}
          element={
            <CheckAuth>
              <SetProfile target="user" />
            </CheckAuth>
          }
        />

        <Route
          path="/help"
          component={Tutorial}
          element={
            <CheckAuth>
              <Tutorial target="user" />
            </CheckAuth>
          }
        />
        <Route
          path="/setting"
          component={GameSetting}
          element={
            <CheckAuth>
              <GameSetting />
            </CheckAuth>
          }
        />
        <Route
          path="/status/:gameid"
          component={GameStatus}
          element={
            <CheckAuth>
              <GameStatus />
            </CheckAuth>
          }
        />
        <Route
          path="/addtreasure"
          component={AddTreasure}
          element={
            <CheckAuth>
              <AddTreasure />
            </CheckAuth>
          }
        />
      </Routes>
    </Router>
  );
}
