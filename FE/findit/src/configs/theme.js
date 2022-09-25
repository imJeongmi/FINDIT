import { createTheme } from "@mui/material/styles";

export default createTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "WendyOne",
      "GmarketSansMedium",
      "GmarketSansLight",
      "GmarketSansBold",
    ].join(","),
  },
  palette: {
    type: "light",
    primary: {
      week: "#E0E4EE",
      main: "#9FAFD8",
    },
    secondary: {
      week: "#EFDFDF",
      main: "#F1A6A7",
    },
    warning: {
      week: "#FAEBBA",
      main: "#FFCC33",
    },
    base: {
      white: "#FFFFFF",
      gray: "gray",
      grey: "gray",
      black: "#000000",
      blackDim: "#000000B0",
    },
  },
});
