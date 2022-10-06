import UserApi from "./UserApi";

// 보물 리스트 조회
function getTreasureList(success, fail) {
  UserApi.get("users/treasures").then(success).catch(fail);
}

// 게임 내 사용할 보물 선택
function setGameTreasureList(tid, entercode, success, fail) {
  UserApi.post("users/treasures", { tid: tid, entercode: entercode }).then(success).catch(fail);
}

export { getTreasureList, setGameTreasureList };
