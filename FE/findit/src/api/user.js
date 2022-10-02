import UserApi from "./UserApi";

function requestJoin(id, pw, nickname, success, fail) {
  UserApi.post("users", { id: id, pw: pw, nickname: nickname }).then(success).catch(fail);
}

function requestLogin(id, pw, success, fail) {
  UserApi.post("users/login", { id: id, pw: pw }).then(success).catch(fail);
}

function requestLogout(success, fail) {
  UserApi.post("users/logout").then(success).catch(fail);
}

function requestUserInfo(userId, success, fail) {
  UserApi.get(`users/${userId}`).then(success).catch(fail);
}

export { requestJoin, requestLogin, requestLogout, requestUserInfo };
