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
import { GlobalConfig } from "../assets/js/globleConfig";

const CheckIn = (props) => {
  const hotel = GlobalConfig.Hotel;
  const { lang } = useContext(GlobalContext);

  return (
    <div className="limiter">
      <div className="container-login100"style={{backgroundImage:`linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    url(${GlobalConfig.Hotel && GlobalConfig.Hotel.background_image?GlobalConfig.Hotel.background_image:'/static/media/bg-01.a9cab101.jpg'})`}}>
        <div id="clock"></div>
        <div className="container transparent">
          <h2 className="maintitle">{LANG[lang].Search_your_booking_by}</h2>
          <div className="row mt-5">
            {/* <div className=" col-md-1"></div>
             */}
             {hotel.pin_number_search
              && 
                  <div className="col-md-6 mb-4 margin0auto">
                    <Link className="bluebutton" to={to.bookingId}>
                      <img src={BookingId} alt="img" />{" "}
                      <span> {LANG[lang].PIN_No}</span>
                      <div className="noverlay"></div>
                    </Link>
                  </div>
              }
              {hotel.credit_card_search
              && 
                  <div className="col-md-6 mb-4 margin0auto">
                    <Link className="bluebutton" to={to.creditCard}>
                      <img src={CreditCard} alt="img" /> <span> {LANG[lang].Credit_Card}</span>
                      <div className="noverlay"></div>
                    </Link>
                  </div>
              }
              {hotel.qr_code_search
              && 
              <div className="col-md-6 mb-4 margin0auto">
                  <Link className="bluebutton" to={to.scanQr}>
                    <img src={QrCode} alt="img" /> <span>{LANG[lang].QR_Code}</span>
                    <div className="noverlay"></div>
                  </Link>
                </div>
              }
              {hotel.booking_detail_search
              && 
                  <div className="col-md-6 mb-4 margin0auto">
                    <Link className="bluebutton" to={to.bookingDetail}>
                      <img src={BookingDetail} alt="img" />{" "}
                      <span>{LANG[lang].Booking_Detail}</span>
                      <div className="noverlay"></div>
                    </Link>
                  </div>
              }
            {/* <div className="col-md-5">
              <Link className="bluebutton" to={to.bookingId}>
                <img src={BookingId} alt="img" />{" "}
                <span> {LANG[lang].PIN_No}</span>
                <div className="noverlay"></div>
              </Link>
            </div> */}
 
 
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
