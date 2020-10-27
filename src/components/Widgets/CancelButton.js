import React from "react";

const CancelButton = ({ onClick }) => {
  return (
    <button
      className="cancelbutton"
      onClick={(e) => {
        onClick();
        e.preventDefault();
      }}
    >
      Back
    </button>
  );
};
export default CancelButton;
