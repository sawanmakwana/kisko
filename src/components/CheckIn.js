import React from "react";
import Footer from "./Widgets/Footer";
import BookingId from "../assets/images/bookingid.png";
import CreditCard from "../assets/images/creditcard.png";
import QrCode from "../assets/images/qrcode.png";
import BookingDetail from "../assets/images/bookingdetail.png";
import CancelButton from "./Widgets/CancelButton";
import { to } from "../RoutesPath";
import { Link } from "react-router-dom";

const CheckIn = (props) => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div id="clock"></div>
        <div className="container transparent">
          <h2 className="maintitle">Search your booking by</h2>
          <div className="row mt-5">
            <div className=" col-md-1"></div>
            <div className="col-md-5">
              <Link className="bluebutton" to={to.bookingId}>
                <img src={BookingId} alt="img" /> <span>Pin Number</span>
                <div className="noverlay"></div>
              </Link>
            </div>
            <div className="col-md-5">
              <Link
                className="bluebutton"
                to={to.creditCard}
              >
                <img src={CreditCard} alt="img" /> <span>Credit Card</span>
                <div className="noverlay"></div>
              </Link>
            </div>
          </div>
          <div className="row mtop">
            <div className=" col-md-1"></div>
            <div className="col-md-5">
              <Link
                className="bluebutton"
                to={to.scanQr}
              >
                <img src={QrCode} alt="img" /> <span>QR Code</span>
                <div className="noverlay"></div>
              </Link>
            </div>
            <div className="col-md-5">
              <Link className="bluebutton" to={to.bookingDetail}>
                <img src={BookingDetail} alt="img" />{" "}
                <span>Booking Detail</span>
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
