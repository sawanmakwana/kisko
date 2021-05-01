import React, { useState, useEffect, useContext } from "react";
import Footer from "../Widgets/Footer";
import SearchButton from "../Widgets/SearchButton";
import CaptureGif from "../../assets/images/scan-photo.gif";
import CameraIcon from "../../assets/images/camera.png";
import CancelButton from "../Widgets/CancelButton";
import { to } from "../../RoutesPath";
import { GlobalContext } from "../../assets/js/context";
import ContinueButton from "../Widgets/ContinueButton";
import { GlobalConfig } from "../../assets/js/globleConfig";
import HubConnection from "../../Connection/hubConnection";
import AlertPopup from "../Widgets/AlertPopup";
import { get } from "../../AppUtills";
import Loader from "../Widgets/Loader";
import * as Services from "./Services";
import { LANG } from "../../assets/js/language";
import {data} from "../../assets/images/faceImage";
const ipcRenderer =  window.require && window.require("electron") ? window.require("electron").ipcRenderer : {send:()=>{}};
const CaptureFace = (props) => {
  const [captureImage, setCaptureImage] = useState(CaptureGif);

  const [retake, setRetake] = useState(true);
  const { loading, setLoading, lang,  streamData, setStreamData } = useContext(GlobalContext);

  const [text, setText] = useState({
    header: "",
    subHeader: "",
    cancelText: "Cancel",
  });
  const [alert, setAlert] = useState(false);

  const hotel = GlobalConfig.Hotel;
  const SelectedBooking = GlobalConfig.SelectedBooking;

  useEffect(() => {
    ipcRenderer.send('logs',{type:'info',msg:"Face Capture Screen"});
    startStreamVideo();
    return () => {
      HubConnection.ACTION("ImagingDeviceCaptureImage", "PosiflexCamera").then(
        (data) => {
          
        }
      );
    }
  }, []);
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
    if (GlobalConfig.Connected === 0) {
      setTimeout(() => {
        captureClick();
      }, 1000);
      return;
    } else if (GlobalConfig.Connected === 2) {
      return;
    }
    console.log("[captureClick]");
    HubConnection.ACTION("ImagingDeviceCaptureImage", "PosiflexCamera").then(
      (data) => {
        console.log(data);
        if (data.success) {
          setCaptureImage("data:image/png;base64," + data.result.Data);
          ipcRenderer.send('logs',{type:'info',msg:"Capture Face Image Success"});
          setRetake(true);
        }
      }
    ).catch((err)=>{
      console.log("err",err);
      ipcRenderer.send('logs',{type:'error',msg:"Capture Face Image Error "+err});
    });
  };

  const uploadIamge = () => {
    // let DATA = {
    //   booking_id: get(["avg_night_rate"], SelectedBooking),
    //   hotel_id: hotel.booking_id,
    //   image_urls: [captureImage],
    // };
    let DATA = {
      "person_id":SelectedBooking.user.id,
      // "booking_id":SelectedBooking.id,
      "hotel_id":hotel.hotel_id,
      "image_urls": [captureImage],
      "filename":Date.now()+"_digital",
      "is_guest_user":true,
      "browser":true,
      "param_guest_id":get(["guest_id"], SelectedBooking),
      // "lang":"en",
      "token" : SelectedBooking.token
    };
    setLoading(true);

    Services.ScanSignUpload(DATA)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          ipcRenderer.send('logs',{type:'info',msg:"Upload Face Image Success"});
          SelectedBooking.doc_image = data.data.doc_image;
          SelectedBooking.doc_thumb = data.data.doc_thumb;
          GlobalConfig.SelectedBooking = SelectedBooking;
          console.log(GlobalConfig.SelectedBooking);
          if (GlobalConfig.SEARCH_TYPE === "pickUp") {
            props.history.push(to.selectKeys);
          } else {
            props.history.push(to.terms);
          }
        } else {
          setAlert(true);
          setRetake(false);
          setText({
            header: LANG[lang].Invalid_Image,
            subHeader: LANG[lang].Please_Try_Again,
            cancelText: LANG[lang].Cancel,
          });
          ipcRenderer.send('logs',{type:'error',msg:"Upload Face Image error "+JSON.stringify(data)});
          // TOST : Booking not found
        }
      })
      .catch((err) => {
        ipcRenderer.send('logs',{type:'error',msg:"Upload Face Image error "+err});
        setLoading(false);
        setAlert(true);
        setText({
          header: LANG[lang].Something_went_wrong,
          subHeader: LANG[lang].Please_Try_Again,
          cancelText: LANG[lang].Cancel,
        });
      });
  };

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
          Take <span>{LANG[lang].Your_Picture}</span>{" "}
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
                setRetake(false);
                setCaptureImage(CaptureGif);
              }}
            />
          </div>
        ) : null}
        <div className="col-md-12 text-center mtop">
          <CancelButton
            onClick={() => {
              // if (GlobalConfig.SEARCH_TYPE === "pickUp") {
              //   props.history.push(to.scanId);
              // } else {
              //   props.history.push(to.confirmDetails);
              // }
              window.history.back();
            }}
          />{" "}
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
                if (GlobalConfig.SEARCH_TYPE === "pickUp") {
                  props.history.push(to.selectKeys);
                } else {
                  props.history.push(to.terms);
                }
              }}
            />
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default CaptureFace;
