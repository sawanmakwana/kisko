import React from "react";
import Footer from "./Widgets/Footer";

const SelectKeys = () => {
  return (
    <>
      <div className="container transparent">
        <h2 className="maintitle">Please select number of room key(s)</h2>
        <div className="row mt-5">
          <div className=" col-md-1"></div>
          <div className="col-md-5">
            <a href="" className="bluebutton customtext">
              {" "}
              <span>1</span>
              <div className="noverlay"></div>
            </a>
          </div>
          <div className="col-md-5">
            <a href="" className="bluebutton customtext">
              {" "}
              <span>2</span>
              <div className="noverlay"></div>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default SelectKeys;
