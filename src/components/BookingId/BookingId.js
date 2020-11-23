import React, { useState, useEffect, useContext } from "react";
import { GlobalConfig } from "../../assets/js/globleConfig";
import { to } from "../../RoutesPath";
import Footer from "../Widgets/Footer";
import SearchButton from "../Widgets/SearchButton";
import * as Services from "./Services";
import AppServiceClass from "../../assets/js/environmentConfig";
import CancelButton from "../Widgets/CancelButton";

import Loader from "../Widgets/Loader";
import AlertPopup from "../Widgets/AlertPopup";
import { LANG } from "../../assets/js/language";
import { GlobalContext } from "../../assets/js/context";

const { bookingType } = new AppServiceClass().getEnvironmentVariables();

const BookingId = (props) => {
  const hotel = GlobalConfig.Hotel;
  const { lang } = useContext(GlobalContext);

  const [pin, setPin] = useState("34113");
  const [lastName, setLastName] = useState("desai");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState({ header: "", subHeader: "" });
  const [alert, setAlert] = useState(false);

  const findReservationKiosk = () => {
    let DATA = {
      booking_id: pin,
      last_name: lastName,
      hotel_id: hotel.hotel_id,
      search_type: bookingType.Booking,
      browser: true,
      is_guest_user: true,
    };
    setLoading(true);
    Services.FindReservationKiosk(DATA)
      .then((data) => {
        if (data.success) {
          GlobalConfig.Bookings = data.bookings;

          props.history.push(to.multiBooking);
          setLoading(false);
        } else {
          setLoading(false);
          setAlert(true);
          setText({
            header: LANG[lang].Not_Found,
            subHeader: LANG[lang].Your_Booking_not_Found,
          });
          // TOST : Booking not found
        }
      })
      .catch((err) => {
        setLoading(false);
        setAlert(true);
        setText({
          header: LANG[lang].Not_Found,
          subHeader: LANG[lang].Your_Booking_not_Found,
        });
      });
  };

  return (
    <div className="container">
      {loading && <Loader />}
      <AlertPopup
        isVisible={alert}
        header={text.header}
        subHeader={text.subHeader}
        onCancel={() => {
          setAlert(false);
        }}
        cancelText={LANG[lang].Back}
      />
      <div className="commontitle">
        <h2>{LANG[lang].PIN_No}</h2>
        {/* <p>Lorem ipsum is a dummy text.</p> */}
      </div>
      <form className="login100-form validate-form flex-sb flex-w">
        <div className="formarea">
          <div className="col-md-12 nopadding">
            <div className="p-b-9">
              <span className="txt1">{LANG[lang].PIN_No}</span>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Username is required"
            >
              <input
                className="input100"
                type="number"
                name="username"
                placeholder="Type here.."
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <span className="focus-input100"></span>
            </div>
          </div>
          <div className="col-md-12 nopadding mt-3">
            <div className="p-t-31 p-b-9">
              <span className="txt1">{LANG[lang].Last_Name}</span>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Username is required"
            >
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Type here.."
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <span className="focus-input100"></span>
            </div>
          </div>
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.checkIn)} />
          <SearchButton onClick={findReservationKiosk} />
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default BookingId;
