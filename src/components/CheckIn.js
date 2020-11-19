import React, { useContext } from "react";
import Footer from "./Widgets/Footer";
import BookingId from "../assets/images/bookingid.png";
import CreditCard from "../assets/images/creditcard.png";
import QrCode from "../assets/images/qrcode.png";
import BookingDetail from "../assets/images/bookingdetail.png";
import CancelButton from "./Widgets/CancelButton";
import { to } from "../RoutesPath";
import { Link } from "react-router-dom";
import { GlobalContext } from "../assets/js/context";
import { LANG } from "../assets/js/language";

const CheckIn = (props) => {
  const { lang } = useContext(GlobalContext);

  return (
    <div className="limiter">
      <div className="container-login100">
        <div id="clock"></div>
        <div className="container transparent">
          <h2 className="maintitle">{LANG[lang].Search_your_booking_by}</h2>
          <div className="row mt-5">
            <div className=" col-md-1"></div>
            <div className="col-md-5">
              <Link className="bluebutton" to={to.bookingId}>
                {LANG[lang].PIN_No}
                <img src={BookingId} alt="img" />{" "}
                <span> {LANG[lang].PIN_No}</span>
                <div className="noverlay"></div>
              </Link>
            </div>
            <div className="col-md-5">
              <Link className="bluebutton" to={to.creditCard}>
                <img src={CreditCard} alt="img" /> <span> {LANG[lang].Credit_Card}</span>
                <div className="noverlay"></div>
              </Link>
            </div>
          </div>
          <div className="row mtop">
            <div className=" col-md-1"></div>
            <div className="col-md-5">
              <Link className="bluebutton" to={to.scanQr}>
                <img src={QrCode} alt="img" /> <span>{LANG[lang].QR_Code}</span>
                <div className="noverlay"></div>
              </Link>
            </div>
            <div className="col-md-5">
              <Link className="bluebutton" to={to.bookingDetail}>
                <img src={BookingDetail} alt="img" />{" "}
                <span>{LANG[lang].Booking_Detail}</span>
                <div className="noverlay"></div>
              </Link>
            </div>
            <div className="col-md-12 text-center mtop">
              <CancelButton onClick={() => props.history.push(to.home)} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CheckIn;
