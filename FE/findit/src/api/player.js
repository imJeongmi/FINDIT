import PlayerApi from "./PlayerApi";
import axios from "axios";

function requestEnter(entercode, success, fail) {
  PlayerApi.get(`room/${entercode}`).then(success).catch(fail);
}

function requestUpload(data, success, fail) {
  axios
    .post(
      "https://findit.life/fast/check",
      {
        game_id: data.game_id,
        file: data.file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "/",
        },
      },
    )
    .then(success)
    .catch(fail);
}

function requestRankingList(gameid, success, fail) {
  axios.get(`https://findit.life/api/v1/room/result/rank/${gameid}`).then(success).catch(fail);
}

// 방에서 정한 보물 조회
function getGameTreasureList(entercode, success, fail) {
  PlayerApi.get(`room/${entercode}/treasures`).then(success).catch(fail);
}

export { requestEnter, requestUpload, requestRankingList, getGameTreasureList };
