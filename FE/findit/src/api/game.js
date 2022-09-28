import UserApi from "./UserApi";

function requestGameConfiguration(userId, limitMinute, mode, success, fail) {
  UserApi.post("room/create", {
    limitMinute: limitMinute,
    mode: mode,
  })
    .then(success)
    .catch(fail);
}

export { requestGameConfiguration };
