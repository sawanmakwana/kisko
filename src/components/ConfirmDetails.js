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

  const confirmDetails = () => {
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
  };

  return (
    <div className="container">
      <div className="commontitle">
        <h2>Confirmation Details</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <div className="nscroll">
          <div className="maindetail">
            <div className="row">
              <div className="col-md-4">
                <span className="leftsection">Guest Name</span>
              </div>
              <div className="col-md-8">
                <span className="rightsection">
                  {" "}
                  {get(["firstName"], UserDetails, "") +
                    " " +
                    get(["lastName"], UserDetails, "")}
                </span>
              </div>
            </div>
          </div>

          <div className="maindetail mtop">
            <div className="row">
              <div className="col-md-4">
                <span className="leftsection">Check-In</span>
              </div>
              <div className="col-md-8">
                <span className="rightsection">
                  <img src={CalendarImg} className="detailcalendar" alt="img" />{" "}
                  {moment(get(["checkin_time"], SelectedBooking)).format(
                    "DD MMM, YYYY HH:MM"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="maindetail mtop">
            <div className="row">
              <div className="col-md-4">
                <span className="leftsection">Check-Out</span>
              </div>
              <div className="col-md-8">
                <span className="rightsection">
                  <img src={CalendarImg} className="detailcalendar" alt="img" />{" "}
                  {moment(get(["checkin_time"], SelectedBooking)).format(
                    "DD MMM, YYYY HH:MM"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="maindetail mtop">
            <div className="row">
              <div className="col-md-4">
                <span className="leftsection">Avg. Rate</span>
              </div>
              <div className="col-md-8">
                <span className="rightsection">
                  <strong>${get(["avg_night_rate"], SelectedBooking)}/</strong>{" "}
                  <small>Per Night</small>
                </span>
              </div>
            </div>
          </div>
          <div className="maindetail mtop">
            <div className="row">
              <div className="col-md-4">
                <span className="leftsection">Room Type</span>
              </div>
              <div className="col-md-8">
                <span className="rightsection">
                  {get(["room_type_name"], SelectedBooking)}
                </span>
              </div>
            </div>
          </div>
          <div className="maindetail mtop">
            <div className="row">
              <div className="col-md-3">
                <span className="leftsection">Mobile No.</span>
              </div>
              <div className="col-md-9">
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Username is required"
                >
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="Type here.."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <span className="focus-input100"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="maindetail mtop">
            <div className="row">
              <div className="col-md-3">
                <span className="leftsection">Email ID</span>
              </div>
              <div className="col-md-9">
                <span className="rightsection">
                  {" "}
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="Type here.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="maindetail mtop mb-5">
            <div className="row">
              <div className="col-md-3">
                <span className="leftsection">Address</span>
              </div>
              <div className="col-md-9">
                <span className="rightsection">{UserDetails.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 text-center mtop">
          <CancelButton />
          <ContinueButton />
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default ConfirmDetails;
