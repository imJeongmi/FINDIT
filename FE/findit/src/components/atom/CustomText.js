import React from "react";
import { styled } from "@mui/system";

const CustomSpan = styled("span")(
  ({ size, variant, weight }) => `
  color: ${getColor(variant)};
  font-size: ${getSize(size)};
  margin: 0;
  padding: 0;
  font-family: ${getWeight(weight)}
  `,
);

function getSize(size) {
  switch (size) {
    case "large":
      return "30px";
    case "medium":
      return "19px";
    case "small":
      return "16px";
    case "smaller":
      return "14px";
    case "smallest":
      return "10px";
    default:
      return "15px";
  }
}

function getColor(variant) {
  switch (variant) {
    case "primary":
      return "#e37373";
    case "secondary":
      return "#F1A6A7";
    case "warning":
      return "#FFCC33";
    case "gray":
    case "grey":
      return "grey";
    case "white":
      return "white";
    default:
      return "black";
  }
}

function getWeight(weight) {
  switch (weight) {
    case "bold":
      return "GmarketSansBold";
    case "normal":
      return "GmarketSansMedium";
    case "lighter":
      return "GmarketSansLight";
    default:
      return "GmarketSansMedium";
  }
}

export default function CustomText({ variant, children, weight, size }) {
  return (
    //  텍스트는 크게 large, medium, small 사이즈로 구분되며
    // 색상은 primary, black, white 로 구분됩니다.
    // 두가지 모두 적용시켜주셔야 합니다.
    <CustomSpan variant={variant} size={size} weight={weight}>
      {children}
    </CustomSpan>
  );
}
