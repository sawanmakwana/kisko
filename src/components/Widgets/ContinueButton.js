import React from "react";
import rightArrow from "../../assets/images/arrow-right.png";

const ContinueButton = ({text, onClick, disable,imgIcon }) => {
  return (
    <button
      disabled={disable || false}
      className="mainbutton"
      style={disable?{opacity:.5}:{}}
      onClick={(e) => {
        onClick();
        e.preventDefault()
      }}
    >
      {text || "Continue"} <img src={imgIcon || rightArrow} alt="img" />
    </button>
  );
};
export default ContinueButton;
