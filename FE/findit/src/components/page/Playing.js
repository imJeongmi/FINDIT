import React, { useState, useRef, useEffect, startTransition } from "react";

import { Box, styled } from "@mui/system";
import { Camera } from "react-camera-pro";

import TimerIcon from "static/timer.svg";
import ScoreIcon from "static/medal.svg";
import GuideLine from "static/guideline.png";

import CustomText from "components/atom/CustomText";
import CircleButton from "components/atom/CircleButton";
import PlayingRanking from "components/module/PlayingRanking";
import PlayingTreasureList from "components/module/PlayingTreasureList";
import ExitButton from "components/atom/ExitButton";
import Timer from "components/module/Timer";

import { requestUpload } from "api/player";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getWebsocket } from "helper/websocket";
import ss from "helper/SessionStorage";

const StatusBar = styled(Box)(
  () => `
    width: 100vw;
    height: 5vh;
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    align-items: center;
    `,
);

const ScoreBox = styled(Box)(
  () => `
    width: 25vw;
    height: 10vh;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    position: absolute;
    top: 9vh;
    left: 3vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    `,
);

const GuidelineBox = styled(Box)(
  () => `
    text-align: center;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    `,
);

const ButtonBox = styled(Box)(
  () => `
    width: 89vw;
    position: absolute;
    left: 50%;
    bottom: 15vh;
    transform: translate(-50%);
    display: flex;
    align-items: end;
    justify-content: space-between;
    `,
);

const MessageBox = styled(Box)(
  () => `
    position: absolute;
    left: 50%;
    bottom: 27vh;
    transform: translate(-50%);
  `,
);

export default function Playing() {
  const [modalOpen, setModalOpen] = useState(false);
  const showRankingModal = () => {
    setModalOpen(1);
  };
  const showTreasureModal = () => {
    setModalOpen(2);
  };

  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  const { gameid } = useParams();
  const [ranking, setRanking] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [myRank, setMyRank] = useState("1st");
  const [findedTreasures, setFindedTreasures] = useState([]);
  const [notTreasureMsg, setNotTreasureMsg] = useState("");
  const location = useLocation();
  const limitMinute = location?.state?.limitMinute;
  const sessionId = ss.get("sessionId");
  const navigate = useNavigate();
  const startTime = ss.get("starttime");

  function onClickCamera() {
    console.log("카메라 클릭", notTreasureMsg);
    const image = camera.current.takePhoto();
    uploadAction(image);
  }

  function uploadAction(image) {
    console.log("사진 업로드 시작", notTreasureMsg);
    const file = dataURLtoFile(image, "treasure.jpeg");

    const data = {
      game_id: gameid,
      file: file,
    };

    requestUpload(data, uploadSuccess, uploadFail);
  }

  function uploadSuccess(res) {
    const tid = res.data.message;
    console.log(res);
    console.log(`tid: ${tid}`);
    // const tid = 1;
    if (tid !== "NOT TREASURE" && findedTreasures.indexOf(tid) === -1) {
      setFindedTreasures(findedTreasures => [...findedTreasures, tid]);
      ws.publish({ destination: "/pub/find", body: `${gameid},${tid}` });
      console.log(`찾은 보물 ${tid}가 findedTreasures에 저장되었어요 => findedTreasures : ${findedTreasures}`);
      console.log("사진 업로드 완료");
    } else {
      setNotTreasureMsg("보물이 아니에요");
      setTimeout(() => setNotTreasureMsg(""), 1500);
    }
  }

  function uploadFail(error) {
    console.log(error);
  }

  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // useEffect(() => {
  //   if (game) {
  //     console.log(game.info)
  //   }
  // }, [game])
  const ws = getWebsocket();

  function getRankFromSocket(message) {
    console.log("메시지 바디", message.body);
    const msg = JSON.parse(message.body);
    console.log("파싱한 메시지", msg);
    if (msg[0]?.status === "end") {
      const finalRank = msg.slice(1);
      console.log("최종 랭크", finalRank);
      navigate(`/result/${gameid}`, { state: { finalRank: finalRank } });
    } else {
      setRanking(msg);
      const temp = msg.find(element => element.sessionId === sessionId);
      if (temp) {
        setMyRank(temp?.rank);
      }
    }
  }

  function getScoreFromSocket(message) {
    const msg = JSON.parse(message.body);
    setFinalScore(msg?.finalscore);
  }

  function temp() {}
  
  useEffect(() => {
    if (!!gameid && !!sessionId) {
      ws.subscribe(`/sub/player/${sessionId}`, getScoreFromSocket);
      ws.subscribe(`/sub/rank/${gameid}`, getRankFromSocket);
      setInterval(function () {
        // ws.subscribe(`/sub/rank/${gameid}`, getRankFromSocket);
        ws.subscribe(`/sub`, temp);
      }, 58000);
    }
  }, [ws, gameid, sessionId]);

  return (
    <Box>
      <Camera
        ref={camera}
        aspectRatio={9 / 20}
        numberOfCamerasCallback={setNumberOfCameras}
        facingMode="environment"
      />
      <StatusBar>
        <Box
          sx={{
            width: "20vw",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            verticalAlign: "middle",
          }}
        >
          <img src={TimerIcon} alt="timerIcon" width="25vw" />

          <Timer startTime={startTime} limitMinute={limitMinute} />
        </Box>
        <Box sx={{ position: "absolute", right: "5%" }}>
          <ExitButton />
        </Box>
      </StatusBar>
      <ScoreBox>
        <CustomText size="xl" weight="bold" variant="warning">
          {myRank}
        </CustomText>
        <Box
          sx={{
            width: "18vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={ScoreIcon} alt="medalIcon" width="25vw" />
          <CustomText size="m" weight="bold">
            {finalScore}
          </CustomText>
        </Box>
      </ScoreBox>
      <GuidelineBox>
        <img src={GuideLine} alt="guideLine" />
        <br />
        <CustomText size="xxs">가이드 라인 내부에서 보물을 인식시켜주세요</CustomText>
      </GuidelineBox>
      <ButtonBox>
        <Box onClick={showRankingModal}>
          <CircleButton icon="rank" size="smaller" opacity="0.6"></CircleButton>
        </Box>
        <Box onClick={onClickCamera}>
          <CircleButton icon="camera" size="large" opacity="0.8" />
        </Box>
        <Box onClick={showTreasureModal}>
          <CircleButton icon="treasure" size="smaller" opacity="0.6" />
        </Box>
      </ButtonBox>
      <MessageBox>
        <CustomText size="xs">{notTreasureMsg}</CustomText>
      </MessageBox>
      {modalOpen === 1 && <PlayingRanking setModalOpen={setModalOpen} ranking={ranking} />}
      {modalOpen === 2 && (
        <PlayingTreasureList setModalOpen={setModalOpen} findedTreasures={findedTreasures} />
        // <PlayingTreasureList setModalOpen={setModalOpen} findedTreasures={[0, 3, "NOT TREASURE"]} />
      )}
    </Box>
  );
}
