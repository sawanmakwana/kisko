import React from "react";
import Footer from "../Widgets/Footer";
import CancelButton from "./Widgets/CancelButton";
import ScanqrImg from "../assets/images/scanqr.gif"

const ScanbarCode = () => {
  return (
    <div class="container">
      <h2 class="maintitle">Place your Barcode ID in scanning area</h2>
      <form class="login100-form validate-form flex-sb flex-w mtop">
        <div class="formarea fixarea">
          <img src={ScanqrImg} alt="img" />
        </div>
        <div class="col-md-12 text-center mtop">
          <CancelButton />
        </div>
        <div class="col-md-12 text-center timer">
          <p>
            Scan will auto cancel in <span>03:00</span>
          </p>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default ScanbarCode;
