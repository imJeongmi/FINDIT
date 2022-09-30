import { Box, styled } from "@mui/system";
import React, { useState, useEffect } from "react";

const TreasureBox = styled(Box)(
  () => `
  width: 25vw;
  height: 25vw;
  margin: 3px;
  border-radius: 25%;
  box-shadow: 2px 2px 10px 1px #E2E2E2;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  background-color: white;
  `,
);

const TreasureImage = styled("img")(
  selected => `
  width: 22vw;
  height: 22vw;
  border-radius: 25%;
  filter: ${getSelectedColor(selected)};
  `,
);

function getSelectedColor(selected) {
  // if (!!selected) {
  //   return "brightness(50%)";
  // } else {
  //   return "brightness(100%)";
  // }
}

export default function TreasureItem({ src, selectedItems, selectedItemHandler, alt, isReadPage, idx }) {
  const [isSelected, setIsSelected] = useState(false);

  const onSelect = ({ target }) => {
    console.log(target)
    console.log(target.idx, target.checked);
    selectedItemHandler(target.value, target.checked);
    setIsSelected(target.checked);
  };

  useEffect(() => {
    if (!isReadPage) {
      if (selectedItems.includes(src)) {
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }
    }
  }, [selectedItems]);

  if (isReadPage === "true") {
    return (
      <TreasureBox>
        <TreasureImage src={src} alt={alt} />
      </TreasureBox>
    );
  } else {
    return (
      <TreasureBox>
        <label key={idx} style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="checkbox"
            name="treasure"
            checked={isSelected}
            value={idx}
            onChange={e => onSelect(e)}
            style={{ display: "none" }}
          />
          <TreasureImage
            src={src}
            alt={alt}
            style={{ filter: isSelected ? "brightness(40%)" : "brightness(100%)" }}
          />
          {/* {isSelected && <Box style={{ display: "fixed", backgroundColor: "black" }} />} */}
        </label>
      </TreasureBox>
    );
  }
}
