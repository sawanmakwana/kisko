import React from "react";
import CancelButton from "../Widgets/CancelButton";
import CalendarImg from "../../assets/images/calendar.png";
import Footer from "../Widgets/Footer";
import ContinueButton from "../Widgets/ContinueButton";
import { to } from "../../RoutesPath";
import { GlobalConfig } from "../../assets/js/globleConfig";

const BookingInfo = () => {
  const renderDetailView = () => {
    let booking = GlobalConfig.Booking;
    console.log({booking});

    return [1].map((item) => (
      <form class="login100-form validate-form flex-sb flex-w mtop">
        <div class="maindetail">
          <div class="row">
            <div class="col-md-4">
              <span class="leftsection">Guest Name</span>
            </div>
            <div class="col-md-8">
              <span class="rightsection">John Smith</span>
            </div>
          </div>
        </div>
        <div class="maindetail mtop">
          <div class="row">
            <div class="col-md-4">
              <span class="leftsection">PIN No.</span>
            </div>
            <div class="col-md-8">
              <span class="rightsection">123456</span>
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
                <img src={CalendarImg} class="detailcalendar" /> 20 Oct, 2020
                10:00 AM
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
                <img src={CalendarImg} class="detailcalendar" /> 21 Oct, 2020
                10:00 AM
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
                <strong>$89.99/</strong> <small>Per Night</small>
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
              <span class="rightsection">Deluxe</span>
            </div>
          </div>
        </div>

        <div class="col-md-12 text-center mtop">
          <CancelButton
            onClick={() => PaymentResponse.history.push(to.bookingId)}
          />
          <ContinueButton />
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
