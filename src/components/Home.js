import React, { useState, useContext, useEffect } from "react";
import Footer from "./Widgets/Footer";
import KeyImg from "../assets/images/keys.png";
import CheckInImg from "../assets/images/checkin.png";
import CheckOutImg from "../assets/images/checkout.png";
import WalkInImg from "../assets/images/walkin.png";
import LostKeyImg from "../assets/images/lost-key.png";
import { GlobalConfig } from "../assets/js/globleConfig";
import { to } from "../RoutesPath";
import { LANG } from "../assets/js/language";
import { GlobalContext } from "../assets/js/context";
import AlertPopup from "./Widgets/AlertPopup";
const ipcRenderer =  window.require && window.require("electron") ? window.require("electron").ipcRenderer : {send:()=>{}};
const Home = (props) => {
  const hotel = GlobalConfig.Hotel;

  const { lang } = useContext(GlobalContext);
  const [keyLogs, setKeyLogs] = useState([1,2,3]);
  const [text, setText] = useState({ header: "Coming Soon !", subHeader: "" });
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    ipcRenderer.send('logs',{type:'info',msg:"Home Screen"});
  }, [])

  return (
    <>
      <AlertPopup
        isVisible={alert}
        header={text.header}
        subHeader={text.subHeader}
        onCancel={() => {
          setAlert(false);
        }}
        cancelText={LANG[lang].Cancel}
        
        onSuccess={() => {
          setAlert(false);
          props.history.push(to.home);
        }}
      />
      <div className="container transparent">
        <div className="hotelname">
          <h2>
            
            {LANG[lang].Welcome_To}, <br /> <span>{hotel.name}</span>
          </h2>
        </div>
        <h2 className="maintitle">{LANG[lang].What_would_you_like_to_do}</h2>
        <div className="row mt-5 align-center">
          {/* <div className=" col-md-1"></div> */}
          {/* {hotel.pickup_key_flow
          && 
            [1,2,3,4,5].map(()=>{

            return (
              <div className="col-md-6 mb-4 margin0auto">
                <div
                  className="bluebutton"
                  onClick={() => {
                    GlobalConfig.SEARCH_TYPE = "pickUp";
                    props.history.push(to.checkIn);
                  }}
                >
                  <img src={KeyImg} alt="img" />{" "}
                  <span>{LANG[lang].Pick_up_Keys}</span>
                  <div className="noverlay"></div>
                </div>
              </div>)
            })
          } */}
          {hotel.pickup_key_flow
          && 
              <div className="col-md-6 mb-4 margin0auto">
                <div
                  className="bluebutton"
                  onClick={() => {
                    ipcRenderer.send('logs',{type:'info',msg:"Kiosk Pickup Click"});
                    GlobalConfig.SEARCH_TYPE = "pickUp";
                    props.history.push(to.checkIn);
                  }}
                >
                  <img src={KeyImg} alt="img" />{" "}
                  <span>{LANG[lang].Pick_up_Keys}</span>
                  <div className="noverlay"></div>
                </div>
              </div>
          }
          {hotel.checkin_flow
          && 
              <div className="col-md-6 mb-4 margin0auto">
                <div
                  className="bluebutton"
                  onClick={() => {
                    ipcRenderer.send('logs',{type:'info',msg:"Kiosk CheckIn Click"});
                    GlobalConfig.SEARCH_TYPE = "checkIn";
                    props.history.push(to.checkIn);
                  }}
                >
                  <img src={CheckInImg} alt="img" />{" "}
                  <span>{LANG[lang].Check_In}</span>
                  <div className="noverlay"></div>
                </div>
              </div>
          }
          {hotel.checkout_flow
          && 
              <div className="col-md-6 mb-4 margin0auto">
                <div
                  className="bluebutton"
                  onClick={() => {
                    GlobalConfig.SEARCH_TYPE = "checkOut";
                    ipcRenderer.send('logs',{type:'info',msg:"Kiosk Checkout Click"});
                    // props.history.push(to.checkIn);
                    setAlert(true);
                  }}
                >
                  <img src={CheckOutImg} alt="img" />{" "}
                  <span>{LANG[lang].Check_Out}</span>
                  <div className="noverlay"></div>
                </div>
              </div>
          }
          {hotel.walkin_flow
          && 
              <div className="col-md-6 mb-4 margin0auto">
                <div
                  className="bluebutton"
                  onClick={() => {
                    GlobalConfig.SEARCH_TYPE = "walkIn";
                    ipcRenderer.send('logs',{type:'info',msg:"Kiosk Walkin Click"});
                    props.history.push(to.videoScreen);
                    // setAlert(true);
                  }}
                >
                  <img src={WalkInImg} alt="img" />{" "}
                  <span>{LANG[lang].WalkIn}</span>
                  <div className="noverlay"></div>
                </div>
              </div>
          }
          {hotel.lost_key_flow
          && 
              <div className="col-md-6 mb-4 margin0auto">
                <div
                  className="bluebutton"
                  onClick={() => {
                    ipcRenderer.send('logs',{type:'info',msg:"Kiosk Lost key Click"});
                    GlobalConfig.SEARCH_TYPE = "lostKey";
                    // props.history.push(to.checkIn);
                    setAlert(true);
                  }}
                >
                  <img src={LostKeyImg} alt="img" />{" "}
                  <span>{LANG[lang].LostKey}</span>
                  <div className="noverlay"></div>
                </div>
              </div>
          }
          
          
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
