import React from "react";
import searchImg from "../../assets/images/search.png"

const SearchButton = ({ onClick }) => {
  return (
    <button className="mainbutton"
    onClick={(e) => {
      onClick();
      e.preventDefault()
    }}>
      Search <img src={searchImg} alt="img" />
    </button>
  );
};

export default SearchButton;
