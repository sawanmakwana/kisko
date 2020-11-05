import React, { useState, useEffect } from "react";
import { GlobalConfig } from "../../assets/js/globleConfig";
import { to } from "../../RoutesPath";
import Footer from "../Widgets/Footer";
import SearchButton from "../Widgets/SearchButton";
import * as Services from "./Services";
import AppServiceClass from "../../assets/js/environmentConfig";
import CancelButton from "../Widgets/CancelButton";
import { get } from "../../AppUtills";
import Loader from "../Widgets/Loader";
const { bookingType } = new AppServiceClass().getEnvironmentVariables();

const BookingId = (props) => {
  const hotel = GlobalConfig.Hotel;
  

  const [pin, setPin] = useState("33923");
  const [lastName, setLastName] = useState("desai");
  const [isLoading, setIsLoading] = useState(false);


  const findReservationKiosk = () => {
    let DATA = {
      booking_id: pin,
      last_name: lastName,
      hotel_id: hotel.id,
      search_type: bookingType.Booking,
      browser: true,
      is_guest_user: true,
    };
    setIsLoading(true);
    Services.FindReservationKiosk(DATA).then((data) => {
      setIsLoading(false);
      if (data.success) {
        GlobalConfig.Bookings = data.bookings;
      
          props.history.push(to.multiBooking);
       
        
      }else{
        // TOST : Booking not found 
        
      }
    });
  };

  return (
    <div className="container">
      {isLoading?<Loader text="Searching"/>:null}
      <div className="commontitle">
        <h2>Pin Number</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      <form className="login100-form validate-form flex-sb flex-w">
        <div className="formarea">
          <div className="col-md-12 nopadding">
            <div className="p-b-9">
              <span className="txt1">PIN Number</span>
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
