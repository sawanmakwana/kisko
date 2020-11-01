import React from "react";
import { to } from "../RoutesPath";
import Footer from "./Widgets/Footer";

const SelectKeys = (props) => {
  return (
    <>
      <div className="container transparent">
        <h2 className="maintitle">Please select number of room key(s)</h2>
        <div className="row mt-5">
          <div className=" col-md-1"></div>
          <div className="col-md-5">
          <div
              className="bluebutton"
              onClick={() => props.history.push(to.thankYou)}
            >
              {" "}
              <span>1</span>
              <div className="noverlay"></div>
            </div>
          </div>
          <div className="col-md-5">
          <div
              className="bluebutton"
              onClick={() => props.history.push(to.thankYou)}
            >
              {" "}
              <span>2</span>
              <div className="noverlay"></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default SelectKeys;
