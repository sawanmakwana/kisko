import React from "react";
import Footer from "../Widgets/Footer";
import CaptureImg from "../../assets/images/capture-photo.gif";
import Capture from "../../assets/images/capture.png";

const CaptureFace = () => {
  return (
    <div class="container">
      <h2 class="maintitle">
        Keep your <span>Face</span> infront of camera and press capture button
      </h2>
      <form class="login100-form validate-form flex-sb flex-w mtop">
        <div class="formarea fixarea">
          <img src={CaptureImg} />
        </div>
        <div class="col-md-12 text-center mtop">
          <button class="mainbutton">
            Capture <img src={Capture} />
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default CaptureFace;
