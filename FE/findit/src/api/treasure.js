import UserApi from "./UserApi";

function getTreasureList(success, fail) {
  UserApi.get("users/treasures").then(success).catch(fail);
}

function setGameTreasureList(tid, entercode, success, fail) {
  UserApi.post("users/treasures", { tid: tid, entercode: entercode}).then(success).catch(fail);
}

export { getTreasureList, setGameTreasureList };
