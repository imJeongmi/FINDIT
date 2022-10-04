import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/system";

import CircleButton from "components/atom/CircleButton";
import CustomButton from "components/atom/CustomButton";
import Input from "components/atom/Input";
import CustomText from "../atom/CustomText";
import ProfileImage from "../atom/ProfileImage";
import RefreshIcon from "static/refresh.png";

import { requestLogout, requestUserInfo } from "api/user";
import { requestUpdateProfile } from "api/host";
import ls from "helper/LocalStorage";

import { setUserInfoToStore } from "reducers/user";

const ProfileBoxStyle = {
  margin: "auto",
  textAlign: "center",
};

const BoxStyle = {
  textAlign: "center",
  margin: "6vh auto",
};

const IconStyle = {
  position: "absolute",
  left: "65%",
};

function PlayerProfile() {
  const [nickname, setNickname] = useState();
  const navigate = useNavigate();
  const { gameid } = useParams();
  const [imgNum, setImgNum] = useState("1");

  function onClickRefresh() {
    setImgNum(Math.floor(Math.random() * 10));
  }

  function onChangeNickname(e) {
    const nickname = e.target.value;
    setNickname(nickname);
  }

  function sendPlayerToWaiting(e) {
    e.preventDefault();
    navigate(`/waiting/${gameid}`, { state: { imgNum: imgNum, nickname: nickname } });
  }

  return (
    <Box sx={ProfileBoxStyle}>
      <Box sx={BoxStyle}>
        <CustomText size="xxl" weight="bold">
          프로필 설정
        </CustomText>
      </Box>
      <Box sx={BoxStyle}>
        <ProfileImage type="rounded" num={imgNum}></ProfileImage>
        <Box sx={IconStyle} onClick={onClickRefresh}>
          <img src={RefreshIcon} alt="refresh" width="25px" />
        </Box>
      </Box>
      <Box>
        <CustomText>닉네임을 등록해주세요</CustomText>
        <Input type="text" placeholder="닉네임" onChange={onChangeNickname}></Input>
      </Box>
      <CustomButton size="large" color="primary" onClick={sendPlayerToWaiting}>
        확인
      </CustomButton>
    </Box>
  );
}

function HostProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.info);
  const [userId, setUserId] = useState("");
  const [imgNum, setImgNum] = useState("");
  const [hostNickname, setHostNickname] = useState("");
  const [hostProfileImg, setHostProfileImg] = useState(0);

  useEffect(() => {
    setHostNickname(user?.nickname);
    setHostProfileImg(user?.img);
    setUserId(user?.userId);
  }, [user]);

  function logoutSuccess() {
    console.log("로그아웃 성공");
    ls.remove("accessToken");
    ls.remove("refreshToken");
    navigate("/main");
  }

  function logoutFail(err) {
    console.log(err);
  }

  function onClickLogout(event) {
    event.preventDefault();
    requestLogout(logoutSuccess, logoutFail);
  }

  // const [nickname, setNickname] = useState("");

  function onClickRefresh() {
    const ranNum = Math.floor(Math.random() * (10 - 1) + 1);
    // setImgNum(Math.floor(Math.random() * 10));
    console.log(ranNum);
    setHostProfileImg(ranNum);
  }

  function onChangeNickname(event) {
    const nickname = event.target.value;
    setHostNickname(nickname);
  }

  async function updateProfileSuccess() {
    await requestUserInfo(userId, getUserInfoSuccess, getUserInfoFail);
    navigate("/hostmain");
  }

  function updateProfileFail(err) {
    console.log(err);
  }

  function getUserInfoSuccess(res) {
    dispatch(setUserInfoToStore(res.data));
    navigate("/hostmain");
  }

  function getUserInfoFail(err) {
    console.log(err);
  }

  function onClickUpdateProfile(event) {
    event.preventDefault();
    console.log(imgNum, hostNickname);
    requestUpdateProfile(
      userId,
      hostProfileImg,
      hostNickname,
      updateProfileSuccess,
      updateProfileFail,
    );
  }

  // 로그아웃 함수 작성
  return (
    <Box sx={ProfileBoxStyle}>
      <Box sx={{ textAlign: "end", marginTop: "4vh", marginRight: "10vw" }} onClick={onClickLogout}>
        <CircleButton icon="logout" size="smaller"></CircleButton>
      </Box>
      <Box sx={BoxStyle}>
        <CustomText size="xxl" weight="bold">
          마이 페이지
        </CustomText>
      </Box>
      <Box sx={BoxStyle}>
        <ProfileImage type="rounded" num={hostProfileImg - 1}></ProfileImage>
        <Box sx={IconStyle} onClick={onClickRefresh}>
          <img src={RefreshIcon} alt="refresh" width="25px" />
        </Box>
      </Box>

      <Box>
        <CustomText>닉네임을 등록해주세요</CustomText>
        <Input type="text" placeholder={hostNickname} onChange={onChangeNickname}></Input>
      </Box>
      {/* <CustomButton size="small" color="secondary">
        비밀번호 변경
      </CustomButton> */}
      <CustomButton size="large" color="primary" onClick={onClickUpdateProfile}>
        프로필 변경
      </CustomButton>
    </Box>
  );
}

export default function SetProfile({ target }) {
  function isPlayer(target) {
    if (target === "user") {
      return false;
    } else {
      return true;
    }
  }

  return (
    <Box>{isPlayer(target) ? <PlayerProfile></PlayerProfile> : <HostProfile></HostProfile>}</Box>
  );
}
