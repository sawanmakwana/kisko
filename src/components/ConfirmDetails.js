import React, { useState } from "react";
import CancelButton from "./Widgets/CancelButton";
import ContinueButton from "./Widgets/ContinueButton";
import { GlobalConfig } from "../assets/js/globleConfig";
import CalendarImg from "../assets/images/calendar.png";
import { get } from "../AppUtills";
import moment from "moment";

const ConfirmDetails = (props) => {
  const UserDetails = GlobalConfig.UserScanDetail;
  const SelectedBooking = GlobalConfig.SelectedBooking;
  const [phone, setPhone] = useState(UserDetails.phone || "");
  const [email, setEmail] = useState(UserDetails.email || "");


  const confirmDetails = () =>{ 

    // let data = {
    //   name:,
    //   checkin_time:,
    //   checkout_time:,
    //   avg_night_rate:,
    //   room_type:,
    //   phone:,
    //   email:,
    //   address:,
    // }
  }

  return (
    <div class="container">
      <div class="commontitle">
        <h2>Confirmation Details</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      <form class="login100-form validate-form flex-sb flex-w mtop">
        <div class="nscroll">
          <div class="maindetail">
            <div class="row">
              <div class="col-md-4">
                <span class="leftsection">Guest Name</span>
              </div>
              <div class="col-md-8">
                <span class="rightsection">
                  {" "}
                  {get(["firstName"], UserDetails, "") +
                    " " +
                    get(["lastName"], UserDetails, "")}
                </span>
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
                  <img src={CalendarImg} class="detailcalendar" alt="img" />{" "}
                  {moment(get(["checkin_time"], SelectedBooking)).format(
                    "DD MMM, YYYY HH:MM"
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
                  <img src={CalendarImg} class="detailcalendar" alt="img" />{" "}
                  {moment(get(["checkin_time"], SelectedBooking)).format(
                    "DD MMM, YYYY HH:MM"
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
                  <strong>${get(["avg_night_rate"], SelectedBooking)}/</strong>{" "}
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
                  {get(["room_type_name"], SelectedBooking)}
                </span>
              </div>
            </div>
          </div>
          <div class="maindetail mtop">
            <div class="row">
              <div class="col-md-3">
                <span class="leftsection">Mobile No.</span>
              </div>
              <div class="col-md-9">
                <span class="rightsection">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </span>
              </div>
            </div>
          </div>
          <div class="maindetail mtop">
            <div class="row">
              <div class="col-md-3">
                <span class="leftsection">Email ID</span>
              </div>
              <div class="col-md-9">
                <span class="rightsection">
                  {" "}
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </span>
              </div>
            </div>
          </div>
          <div class="maindetail mtop mb-5">
            <div class="row">
              <div class="col-md-3">
                <span class="leftsection">Address</span>
              </div>
              <div class="col-md-9">
                <span class="rightsection">{UserDetails.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12 text-center mtop">
          <CancelButton />
          <ContinueButton />
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default ConfirmDetails;
