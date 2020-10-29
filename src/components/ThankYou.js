import React from "react";
import ThankYouImg from "../assets/images/capture-photo.gif";
import Footer from "./Widgets/Footer";

const ThankYou = () => {
  return (
    <>
      <div className="container transparent text-center">
        <img src={ThankYouImg} className="thankyouimg" />
        <h1 className="thankyou">THANK YOU!!</h1>
        <h2 className="maintitle">Pick up your key(s) from tray</h2>
      </div>
      <Footer />
    </>
  );
};
export default ThankYou;
