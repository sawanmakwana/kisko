import React, { useState } from "react";
import CancelButton from "./Widgets/CancelButton";
import ContinueButton from "./Widgets/ContinueButton";
import { GlobalConfig } from "../assets/js/globleConfig";
import RoomImg from "../assets/images/room.jpg";
import CalendarImg from "../assets/images/calendar1.png";
import BedImg from "../assets/images/bed.png";
import AdultImg from "../assets/images/adult.png";
import Footer from "./Widgets/Footer";
import { get } from "../AppUtills";
import moment from "moment";
import { to } from "../RoutesPath";

const Multibooking = (props) => {
  const Bookings = GlobalConfig.Bookings || [];

  const [selected, setSelected] = useState(Bookings[0].id);

  return (
    <div className="container">
      <div className="commontitle">
        <h2>RESERVATION Information</h2>
        {/* <p>Lorem ipsum is a dummy text.</p> */}
      </div>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        {Bookings.map((booking) => (
          <article className="card card-product-list maindetail">
            <div className="row no-gutters">
              <div className="reservtick">
                <div className="radio">
                  <input
                    id="radio-1"
                    name="radio"
                    type="radio"
                    checked={selected === booking.id}
                    onClick={() => setSelected(booking.id)}
                  />
                </div>
              </div>
              {/* <aside className="col-md-3">
                <div className="img-wrap">
                  <img src={RoomImg} alt="img" />
                </div>
              </aside> */}
              <div className="col-md-12">
                <div className="info-main">
                  <p className="reservtitle">
                    {`${get(["room_number"], booking, "")} - ${get(["guest_fname"], booking, "")} ${get(
                      ["guest_lname"],
                      booking,
                      ""
                    )}`}{" "}
                    <span>{get(["room_type_name"], booking, "")}</span>
                  </p>
                  <div className="checkinarea row">
                    <div className="col-md-6">
                      <h6>Check In</h6>
                      <span className="rightsection">
                        <img
                          src={CalendarImg}
                          className="reservcalendar"
                          alt="img"
                        />{" "}
                        {moment(get(["checkin_time"], booking, "")).format(
                          "DD MMM, YYYY"
                        )}
                      </span>
                    </div>
                    <div className="col-md-6">
                      <h6>Check Out</h6>
                      <span className="rightsection">
                        <img
                          src={CalendarImg}
                          className="reservcalendar"
                          alt="img"
                        />{" "}
                        {moment(get(["checkout_time"], booking, "")).format(
                          "DD MMM, YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="price-wrap col-md-4">
                  <span>
                    <h6>Price</h6>
                    <strong>${get(["avg_night_rate"], booking, "")}</strong>
                  </span>
                </div>
                <div className="people col-md-4">
                  <h6>No. of Night(s)</h6>
                  <img src={BedImg} alt="img" />
                  <span>1 </span>
                </div>
                <div className="people col-md-4">
                  <h6>Adult(s)</h6>
                  <img src={AdultImg} alt="img" />
                  <span>2 </span>
                </div>
              </div>
            </div>
          </article>
        ))}

        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.checkIn)} />
          <ContinueButton
            onClick={() => {
              if (selected) {
                GlobalConfig.SelectedBooking = Bookings.find(
                  (book) => book.id === selected
                );
              }
              props.history.push(to.scanId);
            }}
          />
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default Multibooking;
