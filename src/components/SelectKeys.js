import React from "react";
import Footer from "./Widgets/Footer";

const SelectKeys = () => {
  return (
    <>
      <div class="container transparent">
        <h2 class="maintitle">Please select number of room key(s)</h2>
        <div class="row mt-5">
          <div class=" col-md-1"></div>
          <div class="col-md-5">
            <a href="" class="bluebutton customtext">
              {" "}
              <span>1</span>
              <div class="noverlay"></div>
            </a>
          </div>
          <div class="col-md-5">
            <a href="" class="bluebutton customtext">
              {" "}
              <span>2</span>
              <div class="noverlay"></div>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default SelectKeys;
