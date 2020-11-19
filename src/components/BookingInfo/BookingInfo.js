import React, { useContext } from "react";
import CancelButton from "../Widgets/CancelButton";
import CalendarImg from "../../assets/images/calendar.png";
import Footer from "../Widgets/Footer";
import ContinueButton from "../Widgets/ContinueButton";
import { to } from "../../RoutesPath";
import { GlobalConfig } from "../../assets/js/globleConfig";
import { get } from "../../AppUtills";
import moment from "moment";
import { LANG } from "../../assets/js/language";
import { GlobalContext } from "../../assets/js/context";

const BookingInfo = (props) => {

  const { lang } = useContext(GlobalContext);

  const renderDetailView = () => {
    let booking = GlobalConfig.Bookings || [];
    

    return booking.map((item,i) => (
      <form key={i} className="login100-form validate-form flex-sb flex-w mtop">
        <div className="maindetail">
          <div className="row">
            <div className="col-md-4">
              <span className="leftsection">{LANG[lang].Guest_Name}</span>
            </div>
            <div className="col-md-8">
              <span className="rightsection">
                {get(["guest_fname"], item, "")  
                +" "+
                  get(["guest_lname"], item, "")}
              </span>
            </div>
          </div>
        </div>
        <div className="maindetail mtop">
          <div className="row">
            <div className="col-md-4">
    <span className="leftsection">{LANG[lang].PIN_No}</span>
            </div>
            <div className="col-md-8">
              <span className="rightsection">{get(["id"], item, "-")}</span>
            </div>
          </div>
        </div>
        <div className="maindetail mtop">
          <div className="row">
            <div className="col-md-4">
    <span className="leftsection">{LANG[lang].Check_In}</span>
            </div>
            <div className="col-md-8">
              <span className="rightsection">
                <img src={CalendarImg} className="detailcalendar" alt="img" />{" "}
                {moment(get(["checkin_time"], item, "-")).format(
                  "DD-MM-YYYY, HH:MM"
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="maindetail mtop">
          <div className="row">
            <div className="col-md-4">
              <span className="leftsection">{LANG[lang].Check_Out}</span>
            </div>
            <div className="col-md-8">
              <span className="rightsection">
                <img src={CalendarImg} className="detailcalendar" alt="img" />{" "}
                {moment(get(["checkout_time"], item, "-")).format(
                  "DD-MM-YYYY, HH:MM"
                )}
              </span>
            </div>
          </div>
        </div>
        {get(["avg_night_rate"]) &&
          <div className="maindetail mtop">
            <div className="row">
              <div className="col-md-4">
                <span className="leftsection">{LANG[lang].Avg_Rate}</span>
              </div>
              <div className="col-md-8">
                <span className="rightsection">
                  <strong>{get(["avg_night_rate"], item, "-")}</strong>{" "}
                  <small>Per Night</small>
                </span>
              </div>
            </div>
          </div>
        }
        {get(["room_type_name"]) &&
          <div className="maindetail mtop">
            <div className="row">
              <div className="col-md-4">
                <span className="leftsection">{LANG[lang].Room_type}</span>
              </div>
              <div className="col-md-8">
                <span className="rightsection">
                  {get(["room_type_name"], item, "-")}
                </span>
              </div>
            </div>
          </div>
        }

        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.checkIn)} />
          <ContinueButton onClick={() => props.history.push(to.scanId)} />
        </div>
      </form>
    ));
  };

  return (
    <div className="container">
      <div className="commontitle">
        <h2>{LANG[lang].Booking_Information}</h2>
      </div>
      {renderDetailView()}
      <Footer />
    </div>
  );
};

export default BookingInfo;
