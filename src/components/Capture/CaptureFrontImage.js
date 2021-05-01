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
const ipcRenderer =  window.require && window.require("electron") ? window.require("electron").ipcRenderer : {send:()=>{}};
const CaptureFrontImage = (props) => {
  const [captureImage, setCaptureImage] = useState(CaptureGif);
  const [retake, setRetake] = useState(false);
  const { loading, setLoading, lang } = useContext(GlobalContext);
  const { streamData, setStreamData } = useContext(GlobalContext);
  const hotel = GlobalConfig.Hotel;
  const SelectedBooking = GlobalConfig.SelectedBooking;

  const [text, setText] = useState({ header: "", subHeader: "",cancelText: "Cancel" });
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    ipcRenderer.send('logs',{type:'info',msg:"Front card image screen"});
    startStreamVideo();
    return () => {
      HubConnection.ACTION("ImagingDeviceCaptureImage", "PosiflexCamera").then(
        (data) => {
          
        }
      );
    }
  }, [])

  useEffect(() => {   
   if(streamData) setCaptureImage("data:image/png;base64," +streamData);
  }, [streamData])

  
  const startStreamVideo = () =>{
    HubConnection.ACTION("StreamVideo", "PosiflexCamera").then(
      (data) => {
        console.log(data);
        if (data.success) {
        }
      }
    );
  }
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
    console.log("ImagingDeviceCaptureImage");
    HubConnection.ACTION("ImagingDeviceCaptureImage", "PosiflexCamera").then(
      (data) => {
        console.log(data);
        if (data.success) {
          setCaptureImage("data:image/png;base64," + data.result.Data);
          ipcRenderer.send('logs',{type:'info',msg:"Image capture"});
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
          ipcRenderer.send('logs',{type:'info',msg:"Image uploaded"});
          ipcRenderer.send('logs',{type:'info',msg:"Confirm User detail screen"});
          props.history.push(to.confirmDetails);
        } else {
          setAlert(true);
          setRetake(false);
          setText({
            header: "Invalid Image",
            subHeader: "Please Try Again",
            cancelText: LANG[lang].Cancel
          });
          ipcRenderer.send('logs',{type:'error',msg:"Invalid Image"});
          // TOST : Booking not found
        }
      })
      .catch((err) => {
        ipcRenderer.send('logs',{type:'error',msg:"Invalid Image"+err});
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
        <div className="formarea fixMinarea flipImg">
          <img src={captureImage} alt="img" />
        </div>
        {retake ? (
          <div className="col-md-12 text-center mtop">
            <ContinueButton
              imgIcon={CameraIcon}
              text={"Retake"}
              onClick={() => {
                ipcRenderer.send('logs',{type:'info',msg:"Image recapture click"});
                setRetake(false); setCaptureImage(CaptureGif) ; startStreamVideo()} 
              }
            />
          </div>
        ) : null}
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => window.history.back()} />{" "}
          {retake ? (
            <ContinueButton
              onClick={() => {
                uploadIamge();
                // props.history.push(to.confirmDetails)
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
        <div className="col-md-12 text-center mtop">
        <ContinueButton
            text={"Continue (Testing)"}
              onClick={() => {
                props.history.push(to.confirmDetails)
              }}
            />
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default CaptureFrontImage;
