import React from "react";
import ReactInputVerificationCode from "react-input-verification-code";

import CustomButton from "./CustomButton";
import "./EnterCode.css";

export default function EnterCode({ enterCode, setEnterCode }) {
  // const [value, setValue] = useState("");
  // const [isInvalid, setIsInvalid] = useState(false);
  // const [error, setError] = useState(null);

  return (
    <div className="custom-styles">
      <ReactInputVerificationCode
        value={enterCode}
        placeholder={null}
        length={6}
        onChange={newValue => {
          setEnterCode(newValue);

          // if (newValue !== "") {
          //   setError(null);
          // }
        }}
        // style={{ fontFamily: "GmarketSansBold" }}
      />
      <CustomButton size="large" color="primary">
        입장하기
      </CustomButton>
    </div>
  );
}
