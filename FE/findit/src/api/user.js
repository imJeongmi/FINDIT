import UserApi from "./UserApi";
import axios from "axios";

function requestJoin(id, pw, nickname, success, fail) {
  UserApi.post("users", { id: id, pw: pw, nickname: nickname }).then(success).catch(fail);
}
 
function requestLogin(id, pw, success, fail) {
  UserApi.post("users/login", { id: id, pw: pw }).then(success).catch(fail);
}

function requestLogout(success, fail) {
  UserApi.post("users/logout").then(success).catch(fail);
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

export { requestJoin, requestLogin, requestLogout, requestUpload };
