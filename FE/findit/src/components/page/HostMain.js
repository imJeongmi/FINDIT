import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, styled } from "@mui/system";

import LogoFont from "components/atom/LogoFont";
import CustomText from "components/atom/CustomText";
import ProfileImage from "components/atom/ProfileImage";
import MainPageButton from "components/module/MainPageButton";

import { useSelector } from "react-redux";
import { useEffect } from "react";

const StyledHeader = styled(Box)(
  () => `
margin: 40px 25px 25px;
padding: 10px;
display: flex;
justify-content: space-between;
align-items: center;
`,
);

const StyledHostNickname = styled("span")(
  () => `
margin: 0 10px
`,
);

const LogoNickname = styled(Box)(
  () => `
display: flex;
flex-direction: column
`,
);

const StyledProfileBox = styled(Box)(
  () => `
  height: 55px;
  width: 55px;
  border: 1px solid #FFCC33;
  background: #FFFFFF;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`,
);

export default function HostMain() {
  const navigate = useNavigate();
  const user = useSelector(state => state.user.info);
  // const hostNickname = "player1234";
  const [hostNickname, setHostNickname] = useState("");
  const [hostProfileImg, setHostProfileImg] = useState("");

  useEffect(() => {
    setHostNickname(user?.nickname);
    setHostProfileImg(user?.img);
  }, [user, hostNickname, hostProfileImg]);

  function goToSetProfile() {
    navigate("/hostprofile");
  }

  return (
    <Box>
      <StyledHeader>
        <LogoNickname>
          <LogoFont size="medium" margin="0" />
          <CustomText size="xs">
            반가워요,
            <StyledHostNickname>
              <CustomText size="xs" weight="bold">
                {hostNickname}
              </CustomText>
            </StyledHostNickname>
            님
          </CustomText>
        </LogoNickname>
        <StyledProfileBox onClick={goToSetProfile}>
          <ProfileImage src={hostProfileImg}></ProfileImage>
        </StyledProfileBox>
      </StyledHeader>
      <MainPageButton />
    </Box>
  );
}
