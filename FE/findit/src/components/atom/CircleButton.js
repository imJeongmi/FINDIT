import React from "react";
import CameraIcon from "static/camera.svg";
import RankIcon from "static/trophy.svg";
import TreasureIcon from "static/wrapped_gift.svg";
import LogoutIcon from "static/logout.svg";

import "./CircleButton.scss";

function getIcon(icon) {
  switch (icon) {
    case "camera":
      return CameraIcon;
    case "rank":
      return RankIcon;
    case "treasure":
      return TreasureIcon;
    case "logout":
      return LogoutIcon;
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
    case "smaller":
      return "7vh";
    case "smallest":
      return "7vh";
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
    case "smaller":
      return "3.5vh";
    case "smallest":
      return "3vh";
    default:
      return "7vh";
  }
}

function getOpacity(opacity) {
  switch (opacity) {
    case "0.5":
      return "rgba(255, 255, 255, 0.5)";
    default:
      return "rgb(255, 255, 255)";
  }
}

export default function CircleButton({ size, icon, opacity }) {
  return (
    <div>
      <button
        className="button unit"
        style={{ height: getSize(size), width: getSize(size), background: getOpacity(opacity) }}
      >
        <img
          src={getIcon(icon)}
          alt={icon}
          style={{ height: getIconSize(size), width: getIconSize(size) }}
        />
      </button>
    </div>
  );
}
