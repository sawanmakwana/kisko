import React from "react";
import ThankYouImg from "../assets/images/thankyou.png";
import ContinueButton from "./Widgets/ContinueButton";
import Footer from "./Widgets/Footer";
import { to } from "../RoutesPath";

const ThankYou = (props) => {
  return (
    <>
      <div className="container transparent text-center">
        <img src={ThankYouImg} className="thankyouimg" />
        <h1 className="thankyou">THANK YOU!!</h1>
        <h2 className="maintitle">Pick up your key(s) from tray</h2>
        <div className="col-md-12 text-center mtop">
          
          <ContinueButton onClick={() => props.history.push(to.home)} text="HOME" />
          {/* <ContinueButton onClick={() =>startNFC} /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ThankYou;
