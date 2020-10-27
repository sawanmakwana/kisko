import React from "react";
import CancelButton from "../Widgets/CancelButton";
import SearchButton from "../Widgets/SearchButton";
import CalendarImg from "../../assets/images/calendar.png";
import { to } from "../../RoutesPath";

const BookingDetail = (props) => {
  return (
    <div class="container">
      <div class="commontitle">
        <h2>Booking Detail</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      <form class="login100-form validate-form flex-sb flex-w">
        <div class="formarea">
          <div class="col-md-12 nopadding">
            <div class="p-b-9">
              <span class="txt1">Check Out Date</span>
            </div>
            <div
              class="wrap-input100 validate-input"
              data-validate="Username is required"
            >
              <img src={CalendarImg} class="inputcalendar" />
              <input
                class="input100 pl-100"
                type="text"
                name="username"
                placeholder="Type here.."
              />
              <span class="focus-input100"></span>
            </div>
          </div>
          <div class="col-md-12 nopadding  mtop">
            <div class="p-b-9">
              <span class="txt1">First Name</span>
            </div>
            <div
              class="wrap-input100 validate-input"
              data-validate="Username is required"
            >
              <input
                class="input100"
                type="text"
                name="username"
                placeholder="Type here.."
              />
              <span class="focus-input100"></span>
            </div>
          </div>
          <div class="col-md-12 nopadding mt-3">
            <div class="p-t-31 p-b-9">
              <span class="txt1">Last Name</span>
            </div>
            <div
              class="wrap-input100 validate-input"
              data-validate="Username is required"
            >
              <input
                class="input100"
                type="text"
                name="username"
                placeholder="Type here.."
              />
              <span class="focus-input100"></span>
            </div>
          </div>
        </div>
        <div class="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.home)}  />
          <SearchButton onClick={() => props.history.push(to.bookingInfo)} />
        </div>
      </form>
      <div class="footer">
        <div class="helpcenter">
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
