import React from "react";
import CancelButton from "../Widgets/CancelButton";
import SearchButton from "../Widgets/SearchButton";
import CalendarImg from "../../assets/images/calendar.png";
import { to } from "../../RoutesPath";

const BookingDetail = (props) => {
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
              <img src={CalendarImg} className="inputcalendar" />
              <input
                className="input100 pl-100"
                type="text"
                name="username"
                placeholder="Type here.."
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
              />
              <span className="focus-input100"></span>
            </div>
          </div>
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.home)}  />
          <SearchButton onClick={() => props.history.push(to.bookingInfo)} />
        </div>
      </form>
      <div className="footer">
        <div className="helpcenter">
          <a href="">
            <span>Help</span>
            <img src="images/help.png" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
