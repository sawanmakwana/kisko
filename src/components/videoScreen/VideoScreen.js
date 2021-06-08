import React, { useState, useContext, useEffect, useCallback } from "react";
import Footer from "../Widgets/Footer";
import { to } from "../../RoutesPath";
import { LANG } from "../../assets/js/language";
import { GlobalContext } from "../../assets/js/context";

// import CallObjectContext from '../../CallObjectContext';

const ipcRenderer =
  window.require && window.require("electron")
    ? window.require("electron").ipcRenderer
    : { send: () => {} };

const CapturePhoto = (props) => {
  const { lang} =
    useContext(GlobalContext);
  useEffect(() => {
    ipcRenderer.send("logs", { type: "info", msg: "Video vmeet Screen" });
  }, []);

  useEffect(() => {
    ipcRenderer.send("permissionAsk")
    // startJoiningCall('https://kiosk.daily.co/Hotel-Reception');
    // return () => {
    //   startLeavingCall()
    // }
    // navigator.mediaDevices
    //   .getUserMedia({ video: true })
    //   .then(function (stream) {
    //     // document.getElementById('camera').srcObject = stream;
    //     console.log(stream);
    //   })
    //   .catch(function () {
    //     alert("could not connect stream");
    //   });
  }, []);
  return (
    <div className="container">
      <h2 className="maintitle">
        You are connected with <span>Reception</span>
      </h2>
      {/* <Call  /> */}
      <iframe
        title="videoScreem"
        src="https://vtestv.veemochat.xyz/"
        allow="camera; microphone"
        className="videoScreenIframe"
      />
      {/* <video id="camera" autoplay className="videoScreenIframe">
     </video> */}
      <form className="login100-form validate-form flex-sb flex-w mtop">
        {/* https://vmeet.11sight.com/r/ratanhodar
        https://11to.me/cfpqtlm */}
        {/* https://devrel.daily.co/57ViX8enVs8fjM5Mhu4z */}

        {/* <GlobalContext.Provider value={callObject}> */}

        {/* <Tray
            disabled={!enableCallButtons}
            onClickLeaveCall={startLeavingCall}
          /> */}
        {/* </GlobalContext.Provider> */}
        <div className="videoScreenContent">
          <form className="login100-form validate-form flex-sb flex-w">
            <div className="formarea">
              {[1, 2, 3, 4, 5].map((ele) => {
                return (
                  <div className="col-md-12 nopadding">
                    <div className="p-b-9">
                      <span className="txt1">Sample Input {ele}</span>
                    </div>
                    <div
                      className="wrap-input100 validate-input"
                      data-validate="Username is required"
                    >
                      <input
                        className="input100"
                        type="text"
                        name="username"
                        placeholder="Type here.."
                        value={""}
                      />
                      <span className="focus-input100"></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
        <div className="col-md-12 text-center mtop">
          <button
            className="mainbutton"
            onClick={() => {
              // startLeavingCall();
              props.history.push(to.home);
            }}
          >
            Home
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default CapturePhoto;
