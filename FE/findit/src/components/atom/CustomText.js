import React from "react";
import { styled } from "@mui/system";

const CustomSpan = styled("span")(
  ({ size, variant, weight, margin }) => `
  color: ${getColor(variant)};
  font-size: ${getSize(size)};
  margin: ${getMargin(margin)}px 0;
  padding: 0;
  font-family: ${getWeight(weight)}
  `,
);

function getSize(size) {
  switch (size) {
    case "xxxl":
      return "40px";
    case "xxl":
      return "30px";
    case "xl":
      return "25px";
    case "l":
      return "22px";
    case "m":
      return "19px";
    case "s":
      return "16px";
    case "xs":
      return "14px";
    case "xxs":
      return "10px";
    default:
      return "16px";
  }
}

function getColor(variant) {
  switch (variant) {
    case "primary":
      return "#9FAFD8";
    case "secondary":
      return "#DA9B9A";
    case "warning":
      return "#FFCC33";
    case "grey":
      return "#A7A7A7";
    case "white":
      return "white";
    default:
      return "#333333";
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

function getMargin(margin) {
  if (!!margin) {
    return margin;
  } else {
    return 0;
  }
}

export default function CustomText({ variant, children, weight, size, margin }) {
  return (
    //  텍스트는 크게 large, medium, small 사이즈로 구분되며
    // 색상은 primary, black, white 로 구분됩니다.
    // 두가지 모두 적용시켜주셔야 합니다.
    <CustomSpan variant={variant} size={size} weight={weight} margin={margin}>
      {children}
    </CustomSpan>
  );
}
