// import { Client } from "@stomp/stompjs";
import { Client } from "@stomp/stompjs";

// const ws = new Client({
//     brokerURL: "ws://localhost:8399/api/v1/ws",
//     connectHeaders: {
//         login: "user",
//         passcode: "password",
//     },
//     debug: function (str) {
//         console.log(str);
//     },
//     reconnectDelay: 5000,
//     heartbeatIncoming: 4000,
//     heartbeatOutgoing: 4000,
// });
const ws = new Client({
  brokerURL: "ws://localhost:8399/api/v1/ws",
  connectHeaders: {
  },
  debug: function (str) {
    console.log(str);
  },
});

function getWebsocket() {
  return ws;
}

export { getWebsocket };

// import SockJs from "sockjs-client";
// import { Stomp } from "@stomp/stompjs/esm6";

// const sock = new SockJs("http://localhost:8399/api/v1/ws");
// //client 객체 생성 및 서버주소 입력

// const stomp = Stomp.over(sock);
// //stomp로 감싸기

// function getWebsocket() {
//     // return ws;
//     return stomp;
// }

// export { getWebsocket };