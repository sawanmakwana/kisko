import React, { useState } from "react";
import Footer from "../Widgets/Footer";
import SearchButton from "../Widgets/SearchButton";
import CancelButton from "../Widgets/CancelButton";
import * as Services from "./Services";
import AppServiceClass from "../../assets/js/environmentConfig";
import { GlobalConfig } from "../../assets/js/globleConfig";
import { get } from "../../AppUtills";
import { to } from "../../RoutesPath";
const { bookingType } = new AppServiceClass().getEnvironmentVariables();

const CreditCard = (props) => {
  const hotel = GlobalConfig.Hotel;

  const [last5Digit, setLast5Digit] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const findReservationKiosk = () => {
    let DATA = {
      last_name: lastName,
      hotel_id: hotel.id,
      search_type: bookingType.CC,
      browser: true,
      is_guest_user: true,
      cc_number: last5Digit,
    };
    setLoading(true);
    Services.FindReservationKiosk(DATA)
      .then((data) => {
        if (data.success) {
          GlobalConfig.Bookings = data.bookings;
        
            props.history.push(to.multiBooking);
         
          setLoading(false);
        } else {
          // TOST : Booking not found
        }
      })
      .catch((err) => setLoading(false));
  };

  return (
    <div className="container">
      <div className="commontitle">
        <h2>Credit Card</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      <form className="login100-form validate-form flex-sb flex-w">
        <div className="formarea">
          <div className="col-md-12 nopadding">
            <div className="p-b-9">
              <span className="txt1">Last 4 digit CC</span>
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
                onChange={(e) => setLast5Digit(e.target.value)}
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
          <CancelButton onClick={() => props.history.push(to.checkIn)} />{" "}
          <SearchButton onClick={findReservationKiosk} />
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};
export default CreditCard;
