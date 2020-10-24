import React from "react";
import Footer from "./Widgets/Footer";
import KeyImg from "../assets/images/keys.png";
import CheckInImg from "../assets/images/checkin.png";

const Home = (props) => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div id="clock"></div>
        <div className="container transparent">
          <div className="hotelname">
            <h2>
              Welcome To, <br /> <span>Boutique Hotel</span>
            </h2>
          </div>
          <h2 className="maintitle">What would you like to do ?</h2>
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
      </div>
    </div>
  );
};

export default Home;
