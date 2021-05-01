import React from "react";
import Footer from "../Widgets/Footer";
import CaptureImg from "../../assets/images/capture-photo.gif";
import Capture from "../../assets/images/capture.png";

const VideoScreen = () => {
  return (
    <div className="container">
      <h2 className="maintitle">
        Keep your <span>Front side</span> ID document infront of camera and
        press capture button
      </h2>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <div className="formarea fixarea">
          <img src={CaptureImg} />
        </div>
        <div className="col-md-12 text-center mtop">
          <button className="mainbutton">
            Capture <img src={Capture} />
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default VideoScreen;
