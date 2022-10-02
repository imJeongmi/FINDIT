import UserApi from "./UserApi";

function requestGameConfiguration(limitMinute, mode, success, fail) {
  // const payload = {
  //   mode: mode,
  //   limitMinute: limitMinute,
  // };
  // console.log(payload);
  UserApi.post("room/create", {
    mode: mode,
    limitMinute: limitMinute,
  })
    .then(success)
    .catch(fail);
}

function requestUpdateProfile(userId, img, nickname, success, fail) {
  UserApi.post(`user/${userId}/update`, {
    img: img,
    nickname: nickname,
  })
    .then(success)
    .catch(fail);
}

export { requestGameConfiguration, requestUpdateProfile };
