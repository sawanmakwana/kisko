import React from "react";

const CancelButton = ({ onClick }) => {
  return (
    <button className="cancelbutton" onClick={onClick}>
      Back
    </button>
  );
};
export default CancelButton;
