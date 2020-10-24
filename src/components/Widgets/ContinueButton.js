import React from "react";
import rightArrow from "../../assets/images/arrow-right.png";

const ContinueButton = ({ onClick }) => {
  return (
    <button
      className="mainbutton"
      onClick={(e) => {
        onClick();
        e.preventDefault()
      }}
    >
      Continue <img src={rightArrow} alt="img" />
    </button>
  );
};
export default ContinueButton;
