import UserApi from "./UserApi";

function requestGameConfiguration(limitMinute, mode, success, fail) {
  UserApi.post("room/create", {
    limitMinute: limitMinute,
    mode: mode,
  })
    .then(success)
    .catch(fail);
}

export { requestGameConfiguration };
