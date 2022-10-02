import CustomText from "components/atom/CustomText";
import React from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called")
  });

  return (
    <CustomText>{minutes}:{seconds}</CustomText>
  );
}

export default function Timer({ limitMinute }) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + limitMinute * 60);
  return (
    <MyTimer expiryTimestamp={time} />
  );
}
