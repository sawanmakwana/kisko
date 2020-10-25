import React, { useState, useEffect } from "react";
import { GlobalConfig } from "../../assets/js/globleConfig";
import { to } from "../../RoutesPath";
import Footer from "../Widgets/Footer";
import SearchButton from "../Widgets/SearchButton";
import * as Services from './Services';

const BookingId = (props) => {
  const hotel = GlobalConfig.Hotel;
  const lang = GlobalConfig.Language;
  if(!hotel){
    props.history.push(to.hotelSetup);
  }

  const [pin, setPin] = useState("33770");
  const [lastName, setLastName] = useState("shah");
  

  useEffect(() => {

  }, [pin]);

  const findReservationKiosk = () => {
      let DATA = {
        "booking_id": pin,
        "last_name": lastName,
        "hotel_id": hotel.id,
        "search_type": 1,
        "browser": true,
        "is_guest_user": true
      }
      Services.FindReservationKiosk(DATA).then(data => {
        console.log(data)
        if(data.success){
          
        }
      });
  };
  
  return (
    <div className="limiter">
      <div className="container-login100">
        <div id="clock"></div>
        <div className="container">
          <div className="commontitle">
            <h2>Hotel Setup</h2>
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
                    type="text"
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
              <SearchButton onClick={findReservationKiosk}/>
            </div>
          </form>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default BookingId;
