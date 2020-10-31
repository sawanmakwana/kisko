import React from "react";
import SocialImg from "../assets/images/socialid.png";
import LicenceImg from "../assets/images/license.png";
import Footer from "./Widgets/Footer";
import CancelButton from "./Widgets/CancelButton";
import { to } from "../RoutesPath";

const ScanId = (props) => {
  return (
    <>
      <div className="container transparent">
        <h2 className="maintitle">Select an option to scan ID</h2>
        <div className="row mt-5 mb-5m">
          <div className=" col-md-1"></div>
          <div className="col-md-5">
            <a href="" className="bluebutton">
              <img src={SocialImg} /> <span>Social ID</span>
              <div className="noverlay"></div>
            </a>
          </div>
          <div className="col-md-5" onClick={() => props.history.push(to.scanbarCode)}>
            <a href="" className="bluebutton" onClick={(e)=>e.preventDefault()}>
              <img src={LicenceImg} /> <span>Licence</span>
              <div className="noverlay"></div>
            </a>
          </div>
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.bookingInfo)} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ScanId;
