import React, { useContext, useEffect } from "react";
import ThankYouImg from "../assets/images/thankyou.png";
import Footer from "./Widgets/Footer";
import { to } from "../RoutesPath";
import { GlobalContext } from "../assets/js/context";
import { GlobalConfig } from "../assets/js/globleConfig";
import ContinueButton from "./Widgets/ContinueButton";
import { LANG } from "../assets/js/language";

const ThankYou = (props) => {
  const RoomId = GlobalConfig.SelectedBooking;

  const { lang } = useContext(GlobalContext);

  let timer = null;
  useEffect(() => {
    timer = setTimeout(() => {
      props.history.push(to.home);
    }, 600000);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <div className="container transparent text-center">
        <img src={ThankYouImg} className="thankyouimg" alt="ty" />
        <h1 className="thankyou">{LANG[lang].THANK_YOU}!!</h1>
        <h2 className="maintitle">{LANG[lang].Pick_up_your_key_from_tray}</h2>
        <div className="roomnumber">
          <p>
            {LANG[lang].Your_room_number_is} <span> {RoomId.room_number}</span>
          </p>
        </div>
        <div className="col-md-12 text-center mtop">
          <ContinueButton
            text="Home"
            onClick={() => props.history.push(to.home)}
          />
          {/* <ContinueButton onClick={() =>startNFC} /> */}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ThankYou;
