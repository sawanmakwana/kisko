import React, { useState, useEffect, useContext } from "react";
import CaptureGif from "../../assets/images/capture-photo.gif";
import CameraIcon from "../../assets/images/camera.png";
import CancelButton from "../Widgets/CancelButton";
import { to } from "../../RoutesPath";
import ContinueButton from "../Widgets/ContinueButton";
import { GlobalConfig } from "../../assets/js/globleConfig";
import HubConnection from "../../Connection/hubConnection";
import { GlobalContext } from "../../assets/js/context";
import Loader from "../Widgets/Loader";
import { get } from "../../AppUtills";
import AlertPopup from "../Widgets/AlertPopup";
import * as Services from "./Services";
import { LANG } from "../../assets/js/language";
import {data} from "../../assets/images/frontImgData";

const CaptureFrontImage = (props) => {
  const [captureImage, setCaptureImage] = useState(data);
  const [retake, setRetake] = useState(true);
  const { loading, setLoading, lang } = useContext(GlobalContext);
  const hotel = GlobalConfig.Hotel;
  const SelectedBooking = GlobalConfig.SelectedBooking;

  const [text, setText] = useState({ header: "", subHeader: "",cancelText: "Cancel" });
  const [alert, setAlert] = useState(false);

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

  const uploadIamge=()=>{
    let DATA = {
      "booking_id":get(["avg_night_rate"], SelectedBooking),
      "hotel_id":hotel.booking_id,
      "image_urls":[captureImage]
    };
    setLoading(true);

    Services.ScanDocumentUpload(DATA)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          SelectedBooking.doc_image = data.data.doc_image;
          SelectedBooking.doc_thumb = data.data.doc_thumb;
          GlobalConfig.SelectedBooking = SelectedBooking;
          console.log(GlobalConfig.SelectedBooking)
          props.history.push(to.confirmDetails);
        } else {
          setAlert(true);
          setRetake(false);
          setText({
            header: "Invalid Image",
            subHeader: "Please Try Again",
            cancelText: LANG[lang].Cancel
          });
          // TOST : Booking not found
        }
      })
      .catch((err) => {
        setLoading(false);
        setAlert(true);
        setText({
          header: "Something Wrong",
          subHeader: "Please Try Again",
          cancelText: LANG[lang].Cancel
        });
      });
  }

  return (
    <div className="container">
      <AlertPopup
        isVisible={alert}
        header={text.header}
        subHeader={text.subHeader}
        cancelText={text.cancelText}
        onCancel={() => {
          setAlert(false);
        }}
  
      />
      {loading && <Loader text={"Uploading..."} />}
      <div className="commontitle">
        <h2 className="maintitle">
        Place your ID <span>infront of camera</span>
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
              onClick={() => {setRetake(false); setCaptureImage(CaptureGif)} }
            />
          </div>
        ) : null}
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => window.history.back()} />{" "}
          {retake ? (
            <ContinueButton
              onClick={() => {
                // uploadIamge();
                props.history.push(to.confirmDetails)
              }}
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
