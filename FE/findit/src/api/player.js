import PlayerApi from "./PlayerApi";

function requestEnter(entercode, success, fail) {
  PlayerApi.get(`room/${entercode}`).then(success).catch(fail);
}

export { requestEnter };
