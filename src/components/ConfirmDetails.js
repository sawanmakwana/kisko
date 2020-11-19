import React, { useState, useContext } from "react";
import CancelButton from "./Widgets/CancelButton";
import ContinueButton from "./Widgets/ContinueButton";
import { GlobalConfig } from "../assets/js/globleConfig";
import CalendarImg from "../assets/images/calendar.png";
import { get } from "../AppUtills";
import { to } from "../RoutesPath";
import moment from "moment";
import AlertPopup from "./Widgets/AlertPopup";
import Loader from "./Widgets/Loader";
import { GlobalContext } from "../assets/js/context";
import { LANG } from "../assets/js/language";

const ConfirmDetails = (props) => {
  const { lang } = useContext(GlobalContext);
  const UserDetails = GlobalConfig.UserScanDetail;
  const SelectedBooking = GlobalConfig.SelectedBooking;
  const [phone, setPhone] = useState(SelectedBooking.user.phone || "");
  const [email, setEmail] = useState(SelectedBooking.user.email || "");
  const { loading, setLoading } = useContext(GlobalContext);
  const [text, setText] = useState({ header: "", subHeader: "" });
  const [alert, setAlert] = useState(false);

  const confirmDetails = () => {
    // setLoading(true);
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
      {loading && <Loader />}
      <AlertPopup
        isVisible={alert}
        header={text.header}
        subHeader={text.subHeader}
        onSuccess={() => {
          setAlert(false);
          props.history.push(`/home`);
        }}
        onCancel={() => {
          setAlert(false);
        }}
        cancelText={"No"}
        successText={"Yes"}
      />
      <div className="commontitle">
        <h2>Confirmation Details</h2>
        {/* <p>Lorem ipsum is a dummy text.</p> */}
      </div>
      <form className="login100-form validate-form  mtop">
        <div className="nscroll">
          <div className="maindetail">
            <div className="row">
              <div className="col-md-4">
                <span className="leftsection">{LANG[lang].Guest_Name}</span>
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
                <span className="leftsection">{LANG[lang].Check_In}</span>
              </div>
              <div className="col-md-8">
                <span className="rightsection">
                  <img src={CalendarImg} className="detailcalendar" alt="img" />{" "}
                  {moment(get(["checkin_time"], SelectedBooking)).format(
                    "DD MMM, YYYY"
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
                  {moment(get(["checkout_time"], SelectedBooking)).format(
                    "DD MMM, YYYY"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="maindetail mtop">
            <div className="row">
              <div className="col-md-4">
                <span className="leftsection">{LANG[lang].Avg_Rate}</span>
              </div>
              <div className="col-md-8">
                <span className="rightsection">
                  <strong>${get(["avg_night_rate"], SelectedBooking)}/</strong>{" "}
                  <small>{LANG[lang].Per_Night}</small>
                </span>
              </div>
            </div>
          </div>
          <div className="maindetail mtop">
            <div className="row">
              <div className="col-md-4">
                <span className="leftsection">{LANG[lang].Room_type}</span>
              </div>
              <div className="col-md-8">
                <span className="rightsection">
                  {get(["room_type_name"], SelectedBooking) || "Standard"}
                </span>
              </div>
            </div>
          </div>
          <div className="maindetail mtop">
            <div className="row">
              <div className="col-md-4">
                <span className="leftsection editablefield">
                  {LANG[lang].Mobile_no}
                </span>
              </div>
              <div className="col-md-8">
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
              <div className="col-md-4">
                <span className="leftsection editablefield">
                  {LANG[lang].Email_Id}
                </span>
              </div>
              <div className="col-md-8">
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Username is required"
                >
                  {" "}
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="Type here.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="maindetail mtop mb-5">
            <div className="row">
              <div className="col-md-3">
                <span className="leftsection">Address</span>
              </div>
              <div className="col-md-9">
                <span className="rightsection">
                  {UserDetails.address}, {UserDetails.city}, {UserDetails.state}
                  , {UserDetails.postalCode}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 text-center mtop">
          <CancelButton
            text={LANG[lang].Cancel}
            onClick={() => {
              setAlert(true);
              setText({
                header: LANG[lang].Cancel,
                subHeader: LANG[lang].Are_you_sure_you_want_to_cancel_checkin,
              });
            }}
          />
          <ContinueButton onClick={() => props.history.push(to.captureFace)} />
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default ConfirmDetails;
