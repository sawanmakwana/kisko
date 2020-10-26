import React from "react";
import Footer from "./Widgets/Footer";
import KeyImg from "../assets/images/keys.png";
import CheckInImg from "../assets/images/checkin.png";
import { GlobalConfig } from "../assets/js/globleConfig";
import { to } from "../RoutesPath";
import { LANG } from "../assets/js/language";

const Home = (props) => {
  const hotel = GlobalConfig.Hotel;
  const lang = GlobalConfig.Language;
  if (!hotel) {
    props.history.push(to.hotelSetup);
  }

  return (
    <>
      <div className="container transparent">
        <div className="hotelname">
          <h2>
            {LANG[lang].Welcome_To}, <br /> <span>{hotel.name}</span>
          </h2>
        </div>
        <h2 className="maintitle">{LANG[lang].What_would_you_like_to_do}</h2>
        <div className="row mt-5">
          <div className=" col-md-1"></div>
          <div className="col-md-5">
            <a href="" className="bluebutton">
              <img src={KeyImg} alt="img" /> <span>Pick up Keys</span>
              <div className="noverlay"></div>
            </a>
          </div>
          <div className="col-md-5">
            <a
              href=""
              className="bluebutton"
              onClick={() => props.history.push(`check-in`)}
            >
              <img src={CheckInImg} alt="img" /> <span>Check In</span>
              <div className="noverlay"></div>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
