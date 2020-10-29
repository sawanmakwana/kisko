import React from "react";
import CancelButton from "./Widgets/CancelButton";
import ScanqrImg from "../assets/images/scanqr.gif"
import ContinueButton from "./Widgets/ContinueButton";
import { to } from "../RoutesPath";
import Footer from "./Widgets/Footer";

const ScanbarCode = (props) => {
  return (
    <div className="container">
      <h2 className="maintitle">Place your Barcode ID in scanning area</h2>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <div className="formarea fixarea">
          <img src={ScanqrImg} alt="img" />
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={()=> props.history.push(to.scanbarCode)} />
          <ContinueButton onClick={()=> props.history.push(to.confirmDetails)} />
        </div>
        <div className="col-md-12 text-center timer">
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
