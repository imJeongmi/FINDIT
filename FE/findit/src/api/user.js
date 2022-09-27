import UserApi from "./UserApi";

function requestJoin(id, pw, nickname, success, fail) {
  UserApi.post("users", { id: id, pw: pw, nickname: nickname }).then(success).catch(fail);
}

export { requestJoin }