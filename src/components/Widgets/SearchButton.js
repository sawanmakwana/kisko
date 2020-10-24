import React from "react";
import searchImg from "../../assets/images/search.png"

const SearchButton = () => {
  return (
    <button className="mainbutton">
      Search <img src={searchImg} alt="img" />
    </button>
  );
};

export default SearchButton;
