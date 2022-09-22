import React from "react";
import "./CircleButton.scss";
import CameraIcon from "static/camera.svg";
import RankIcon from "static/trophy.svg";
import TreasureIcon from "static/wrapped_gift.svg";

function getIcon(icon) {
  switch (icon) {
    case "camera":
      return CameraIcon;
    case "rank":
      return RankIcon;
    case "treasure":
      return TreasureIcon;
    default:
      return CameraIcon;
  }
}

function getSize(size) {
  switch (size) {
    case "large":
      return "10vh";
    case "small":
      return "8vh";
    default:
      return "9vh";
  }
}

function getIconSize(size) {
  switch (size) {
    case "large":
      return "7vh";
    case "small":
      return "4.8vh";
    default:
      return "7vh";
  }
}

export default function CircleButton({ size, icon }) {
  return (
    <div>
      <button className="button unit" style={{ height: getSize(size), width: getSize(size) }}>
        <img
          src={getIcon(icon)}
          alt={icon}
          style={{ height: getIconSize(size), width: getIconSize(size) }}
        />
      </button>
    </div>
  );
}
