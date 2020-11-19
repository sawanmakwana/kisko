import React, { useState, useEffect, useContext } from "react";
import SocialImg from "../assets/images/socialid.png";
import LicenceImg from "../assets/images/license.png";
import Footer from "./Widgets/Footer";
import CancelButton from "./Widgets/CancelButton";
import { to } from "../RoutesPath";
import HubConnection from "../Connection/hubConnection";
import { GlobalConfig } from "../assets/js/globleConfig";
import { LANG } from "../assets/js/language";
import { GlobalContext } from "../assets/js/context";

const ScanId = (props) => {
  const { lang } = useContext(GlobalContext);

  return (
    <>
      <div className="container transparent">
        <h2 className="maintitle">{LANG[lang].Select_an_option_to_scan_ID}</h2>
        <div className="row mt-5 mb-5m text-center">
          <div className=" col-md-3 ml-3 "></div>
          {/* <div className="col-md-5">
            <a href="" className="bluebutton">
              <img src={SocialImg} /> <span>Social ID</span>
              <div className="noverlay"></div>
            </a>
          </div> */}
          <div
            className="col-md-5 ml-3"
            onClick={() => props.history.push(to.scanbarCode)}
          >
            <a className="bluebutton" onClick={(e) => e.preventDefault()}>
              <img src={LicenceImg} /> <span>{LANG[lang].Licence}</span>
              <div className="noverlay"></div>
            </a>
          </div>
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.multiBooking)} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ScanId;
