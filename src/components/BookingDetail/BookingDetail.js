import React, { useState } from "react";
import CancelButton from "../Widgets/CancelButton";
import SearchButton from "../Widgets/SearchButton";
import CalendarImg from "../../assets/images/calendar.png";
import { to } from "../../RoutesPath";
import * as Services from "./Services";
import AppServiceClass from "../../assets/js/environmentConfig";
import { GlobalConfig } from "../../assets/js/globleConfig";
import { get } from "../../AppUtills";
import Footer from "../Widgets/Footer";
const { bookingType } = new AppServiceClass().getEnvironmentVariables();

const BookingDetail = (props) => {
  const hotel = GlobalConfig.Hotel;

  const [checkoutDate, setCheckoutDate] = useState("33923");
  const [firstName, setFirstName] = useState("desai");
  const [lastName, setLastName] = useState("desai");
  const [loading, setLoading] = useState(false);

  const findReservationKiosk = () => {
    let DATA = {
      last_name: lastName,
      hotel_id: hotel.id,
      search_type: bookingType.Detail,
      browser: true,
      is_guest_user: true,
      checkout_date: checkoutDate,
      first_name: firstName,
    };
    setLoading(true);

    Services.FindReservationKiosk(DATA)
      .then((data) => {
        if (data.success) {
          GlobalConfig.Bookings = data.bookings;
        
            props.history.push(to.multiBooking);
         
        } else {
          // TOST : Booking not found
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="commontitle">
        <h2>Booking Detail</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      <form className="login100-form validate-form flex-sb flex-w">
        <div className="formarea">
          <div className="col-md-12 nopadding">
            <div className="p-b-9">
              <span className="txt1">Check Out Date</span>
            </div>
            <div
              className="wrap-input100 validate-input"
              data-validate="Username is required"
            >
              <img src={CalendarImg} className="inputcalendar" alt="img" />
              <input
                className="input100 pl-100"
                type="date"
                name="username"
                placeholder="Type here.."
                onChange={(e) => setCheckoutDate(e.target.value)}
              />
              <span className="focus-input100"></span>
            </div>
          </div>
          <div className="col-md-12 nopadding  mtop">
            <div className="p-b-9">
              <span className="txt1">First Name</span>
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
                onChange={(e) => setFirstName(e.target.value)}
              />
              <span className="focus-input100"></span>
            </div>
          </div>
          <div className="col-md-12 nopadding mt-3">
            <div className="p-t-31 p-b-9">
              <span className="txt1">Last Name</span>
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
                onChange={(e) => setLastName(e.target.value)}
              />
              <span className="focus-input100"></span>
            </div>
          </div>
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.home)} />
          <SearchButton onClick={findReservationKiosk} />
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default BookingDetail;