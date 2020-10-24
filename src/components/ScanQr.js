import React from "react";
import Footer from "./Widgets/Footer";
import SearchButton from "./Widgets/SearchButton";
import ScanQrImg from "../assets/images/scanqr.gif"

const ScanQr = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div id="clock"></div>
        <div className="container">
          <div className="commontitle">
            <h2>Scan Qr Code</h2>
            <p>Search using QR code provided in the precheckin email</p>
          </div>
          <form className="login100-form validate-form flex-sb flex-w">
            <div className="formarea fixarea">
              <img src={ScanQrImg} alt="img" />
            </div>
            <div className="col-md-12 text-center mtop">
              <button className="cancelbutton">Cancel </button>
              <SearchButton />
            </div>
          </form>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ScanQr;
