import React, { useEffect } from "react";
import ThankYouImg from "../assets/images/thankyou.png";
import Footer from "./Widgets/Footer";
import { to } from "../RoutesPath";
import { GlobalContext } from "../assets/js/context";
import { GlobalConfig } from "../assets/js/globleConfig";

const ThankYou = (props) => {

  const RoomId = GlobalConfig.SelectedBooking

  useEffect(() => {
    setTimeout(() => {
      props.history.push(`/home`);
    }, 3000);
  }, []);

  return (
    <>
      <div class="container transparent text-center">
        <img src={ThankYouImg} class="thankyouimg" alt="ty" />
        <h1 class="thankyou">THANK YOU!!</h1>
        <h2 class="maintitle">Pick up your key(s) from tray</h2>
        <div class="roomnumber">
          <p>
            Your room number is <span> {RoomId.room_id}</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ThankYou;
