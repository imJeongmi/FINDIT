import React from "react";

import { Box, styled } from "@mui/system";

import MainPageButton from "components/module/MainPageButton";

import LogoFont from "components/atom/LogoFont";

// 나침반 사이즈 확인할 것
import compass from "static/compass_400.png";

const StyledCompass = styled("img")(
  () => `
width: 250px;
height: 250px;
`,
);

const StyledCompassBox = styled(Box)(
  () => `
text-align: center;
`,
);

export default function BeforeEnter() {
  return (
    <Box>
      <StyledCompassBox>
        <StyledCompass src={compass} alt="compass" />
      </StyledCompassBox>
      <Box sx={{ textAlign: "center", marginBottom: "50px" }}>
        <LogoFont size="medium" />
      </Box>
      <Box>
        <MainPageButton page="start" />
      </Box>
    </Box>
  );
}
