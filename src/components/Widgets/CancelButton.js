import React from "react";

const CancelButton = ({ onClick,text }) => {
  return (
    <button
      className="cancelbutton"
      onClick={(e) => {
        onClick();
        e.preventDefault();
      }}
    >
      {text || "Back"}
    </button>
  );
};
export default CancelButton;
