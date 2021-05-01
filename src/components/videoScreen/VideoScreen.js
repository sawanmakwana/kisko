import React, { useState, useContext, useEffect } from "react";
import Footer from "../Widgets/Footer";
import { to } from "../../RoutesPath";
const ipcRenderer =  window.require && window.require("electron") ? window.require("electron").ipcRenderer : {send:()=>{}};

const CapturePhoto = (props) => {

  useEffect(() => {
    ipcRenderer.send('logs',{type:'info',msg:"Video vmeet Screen"});
  }, [])

  return (
    <div className="container">
      <h2 className="maintitle">
        You are connected with <span>Reception</span>
      </h2>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <iframe
          title='videoScreem'
          src='https://vmeet.11sight.com/r/ratanhodar'
          allow="camera; microphone"
          className="videoScreenIframe"
        />
        <div className="col-md-12 text-center mtop">
          <button className="mainbutton"
            onClick={()=>{
              props.history.push(to.home);
            }}
          >Home</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default CapturePhoto;
