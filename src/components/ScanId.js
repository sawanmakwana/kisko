import React from "react";
import SocialImg from "../assets/images/socialid.png";
import LicenceImg from "../assets/images/license.png";
import Footer from "./Widgets/Footer";
import CancelButton from "./Widgets/CancelButton";
import { to } from "../RoutesPath";

const ScanId = (props) => {
  return (
    <>
      <div class="container transparent">
        <h2 class="maintitle">Select an option to scan ID</h2>
        <div class="row mt-5 mb-5m">
          <div class=" col-md-1"></div>
          <div class="col-md-5">
            <a href="" class="bluebutton">
              <img src={SocialImg} /> <span>Social ID</span>
              <div class="noverlay"></div>
            </a>
          </div>
          <div class="col-md-5" onClick={() => props.history.push(to.scanbarCode)}>
            <a href="" class="bluebutton">
              <img src={LicenceImg} /> <span>Licence</span>
              <div class="noverlay"></div>
            </a>
          </div>
        </div>
        <div class="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.bookingInfo)} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ScanId;
