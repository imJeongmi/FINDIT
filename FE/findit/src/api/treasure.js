import UserApi from "./UserApi";

function getTreasureList(success, fail) {
  UserApi.get("user/treasures").then(success).catch(fail);
}

export { getTreasureList };
