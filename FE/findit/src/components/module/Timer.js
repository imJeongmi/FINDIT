import CustomText from "components/atom/CustomText";
import { getWebsocket } from "helper/websocket";
import React from "react";
import { useTimer } from "react-timer-hook";



export default function Timer({ limitMinute, startTime, target, gameid }) {
  const now = new Date();
  const start = new Date(startTime);
  const KR_TIME_DIFF = 9 * 60 * 60 ;
  const ws = getWebsocket();

  console.log(startTime)
  start.setSeconds(start.getSeconds() + KR_TIME_DIFF + limitMinute * 60 - now.getSeconds());
  function MyTimer({ expiryTimestamp, target, gameid }) {
    const {
      seconds,
      minutes,
    } = useTimer({
      expiryTimestamp,
      onExpire: () => {
        ws.publish({ destination: "/pub/finish", body: `${gameid}` });
        setInterval(function () { }, 3000);
      }
    });

    if (target === "user") {
      return (<CustomText size="xxxl" weight="bold">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</CustomText>)
    } else {
      return (
        <CustomText>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </CustomText>
      );
    }
  }
  return (
    <MyTimer expiryTimestamp={start} target={target} gameid={gameid} />
  );
}
