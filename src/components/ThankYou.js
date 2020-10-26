import React from "react";
import ThankYouImg from "../assets/images/capture-photo.gif";
import Footer from "./Widgets/Footer";

const ThankYou = () => {
  return (
    <>
      <div class="container transparent text-center">
        <img src={ThankYouImg} class="thankyouimg" />
        <h1 class="thankyou">THANK YOU!!</h1>
        <h2 class="maintitle">Pick up your key(s) from tray</h2>
      </div>
      <Footer />
    </>
  );
};
export default ThankYou;
