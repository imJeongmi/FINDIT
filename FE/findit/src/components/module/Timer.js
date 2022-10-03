import CustomText from "components/atom/CustomText";
import React from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp, target }) {
  const {
    seconds,
    minutes,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called")
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

export default function Timer({ limitMinute, target }) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + limitMinute * 60);
  return (
    <MyTimer expiryTimestamp={time} target={target} />
  );
}
