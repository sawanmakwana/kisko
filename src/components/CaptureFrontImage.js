import React, { useState, useEffect, useContext } from "react";
import Footer from "./Widgets/Footer";
import SearchButton from "./Widgets/SearchButton";
import CaptureGif from "../assets/images/capture-photo.gif";
import CameraIcon from "../assets/images/camera.png";
import CancelButton from "./Widgets/CancelButton";
import { to } from "../RoutesPath";
import ContinueButton from "./Widgets/ContinueButton";
import { GlobalConfig } from "../assets/js/globleConfig";
import HubConnection from "../Connection/hubConnection";
import { GlobalContext } from "../assets/js/context";
import Loader from "./Widgets/Loader";

const CaptureFrontImage = (props) => {
  const [captureImage, setCaptureImage] = useState(CaptureGif);
  const [retake, setRetake] = useState(false);
  const { loading, setLoading } = useContext(GlobalContext);

  const captureClick = () => {
    setLoading(true);
    if (GlobalConfig.Connected === 0) {
      setTimeout(() => {
        captureClick();
      }, 1000);
      return;
    } else if (GlobalConfig.Connected === 2) {
      return;
    }

    HubConnection.ACTION("ImagingDeviceCaptureImage", "PosiflexCamera").then(
      (data) => {
        console.log(data);
        if (data.success) {
          setCaptureImage("data:image/png;base64," + data.result.Data);
          setRetake(true);
          setLoading(false);
        }
      }
    );
  };

  return (
    <div className="container">
      {loading && <Loader text={"Capturing..."} />}
      <div className="commontitle">
        <h2 className="maintitle">
          Keep your <span>Front side</span> ID document infront of camera and
          press capture button
        </h2>
      </div>
      {/* <form className="login100-form validate-form flex-sb flex-w mtop">
        <div className="formarea fixarea">
          <img src="images/capture-photo.gif" />
        </div>
        <div className="col-md-12 text-center mtop">
          <button className="mainbutton">
            Capture <img src="images/camera.png" />
          </button>
        </div>
      </form> */}
      <form className="login100-form validate-form flex-sb flex-w">
        <div className="formarea fixarea">
          <img src={captureImage} alt="img" />
        </div>
        {retake ? (
          <div className="col-md-12 text-center mtop">
            <ContinueButton
              imgIcon={CameraIcon}
              text={"Retake"}
              onClick={() => captureClick()}
            />
          </div>
        ) : null}
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.scanId)} />{" "}
          {retake ? (
            <ContinueButton
              onClick={() => props.history.push(to.confirmDetails)}
            />
          ) : (
            <ContinueButton
              imgIcon={CameraIcon}
              text={"Capture"}
              onClick={() => captureClick()}
            />
          )}
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default CaptureFrontImage;
