import { Client } from "@stomp/stompjs";

const ws = new Client({
  brokerURL: "ws://localhost:8399/api/v1/ws",
  connectHeaders: {
    login: "user",
    passcode: "password",
  },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

function getWebsocket() {
  return ws;
}

export { getWebsocket };
