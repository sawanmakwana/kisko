import React from "react";
import CancelButton from "../Widgets/CancelButton";
import CalendarImg from "../../assets/images/calendar.png";
import Footer from "../Widgets/Footer";
import ContinueButton from "../Widgets/ContinueButton";
import { to } from "../../RoutesPath";
import { GlobalConfig } from "../../assets/js/globleConfig";
import { get } from "../../AppUtills";
import moment from "moment";

const BookingInfo = (props) => {
  const renderDetailView = () => {
    let booking = GlobalConfig.Booking || [];

    return booking.map((item) => (
      <form class="login100-form validate-form flex-sb flex-w mtop">
        <div class="maindetail">
          <div class="row">
            <div class="col-md-4">
              <span class="leftsection">Guest Name</span>
            </div>
            <div class="col-md-8">
              <span class="rightsection">
                {get(["guest_fname"], item, "") +
                  get(["guest_lname"], item, "")}
              </span>
            </div>
          </div>
        </div>
        <div class="maindetail mtop">
          <div class="row">
            <div class="col-md-4">
              <span class="leftsection">PIN No.</span>
            </div>
            <div class="col-md-8">
              <span class="rightsection">{get(["id"], item, "-")}</span>
            </div>
          </div>
        </div>
        <div class="maindetail mtop">
          <div class="row">
            <div class="col-md-4">
              <span class="leftsection">Check-In</span>
            </div>
            <div class="col-md-8">
              <span class="rightsection">
                <img src={CalendarImg} class="detailcalendar" />{" "}
                {moment(get(["checkin_time"], item, "-")).format(
                  "DD-MM-YYYY, HH:MM"
                )}
              </span>
            </div>
          </div>
        </div>
        <div class="maindetail mtop">
          <div class="row">
            <div class="col-md-4">
              <span class="leftsection">Check-Out</span>
            </div>
            <div class="col-md-8">
              <span class="rightsection">
                <img src={CalendarImg} class="detailcalendar" />{" "}
                {moment(get(["checkout_time"], item, "-")).format(
                  "DD-MM-YYYY, HH:MM"
                )}
              </span>
            </div>
          </div>
        </div>
        <div class="maindetail mtop">
          <div class="row">
            <div class="col-md-4">
              <span class="leftsection">Avg. Rate</span>
            </div>
            <div class="col-md-8">
              <span class="rightsection">
                <strong>{get(["avg_night_rate"], item, "-")}</strong>{" "}
                <small>Per Night</small>
              </span>
            </div>
          </div>
        </div>
        <div class="maindetail mtop">
          <div class="row">
            <div class="col-md-4">
              <span class="leftsection">Room Type</span>
            </div>
            <div class="col-md-8">
              <span class="rightsection">
                {get(["room_type_name"], item, "-")}
              </span>
            </div>
          </div>
        </div>

        <div class="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.bookingId)} />
          <ContinueButton onClick={() => props.history.push(to.scanId)} />
        </div>
      </form>
    ));
  };

  return (
    <div class="container">
      <div class="commontitle">
        <h2>Booking Information</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      {renderDetailView()}
      <Footer />
    </div>
  );
};

export default BookingInfo;
