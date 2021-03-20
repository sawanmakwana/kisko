import React, { useContext, useState } from "react";
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
import AlertPopup from "./Widgets/AlertPopup";
import { LANG } from "../assets/js/language";
import { GlobalContext } from "../assets/js/context";
import Connection from '../Connection';
import { USER_CONTROLLER, API } from "../assets/js/endpoint";
const Multibooking = (props) => {
  const Bookings = GlobalConfig.Bookings || [];

  
  const [selected, setSelected] = useState(Bookings[0].id);
  const { loading, setLoading, lang } = useContext(GlobalContext);
  const [text, setText] = useState({ header: "", subHeader: "" });
  const [alert, setAlert] = useState(false);
  const hotel = GlobalConfig.Hotel;
  let SelectedBooking = GlobalConfig.SelectedBooking;
  const UserScanDetail = GlobalConfig.UserScanDetail;

  const processNextScreen = async () => {
    setLoading(true);
    if (selected) {
       GlobalConfig.SelectedBooking = await Bookings.find(
        (book) => book.id === selected
      );
    }
    SelectedBooking = GlobalConfig.SelectedBooking 
    let DATA = {
     "hotel_id": hotel.hotel_id,
    "booking_id": SelectedBooking.id
    }
    let result = await Connection.POST(USER_CONTROLLER,API.selectReservationKiosk, DATA);
    setLoading(false);
    // console.log("[result]",result)
    if(result.success){
      SelectedBooking.token = result.token;
      GlobalConfig.SelectedBooking = SelectedBooking;
      if(GlobalConfig.SEARCH_TYPE === "checkIn"){
        if(hotel.checkin_flow_setting.id_scan){
          props.history.push(to.scanbarCode);
        }else if(hotel.checkin_flow_setting.front_picture_of_id){
          props.history.push(to.captureFront);
        }else if(hotel.checkin_flow_setting.guest_image){
          props.history.push(to.captureFace);
        }else{
          props.history.push(to.terms); 
        }
      }else if(GlobalConfig.SEARCH_TYPE === "pickUp"){
        if(hotel.pickup_key_flow_setting.id_scan){
          props.history.push(to.scanbarCode);
        }else if(hotel.pickup_key_flow_setting.front_picture_of_id){
          props.history.push(to.captureFront);
        }else if(hotel.pickup_key_flow_setting.guest_image){
          props.history.push(to.captureFace);
        }else{
          props.history.push(to.selectKeys); 
        }
      }
      
      
    }else{
      setAlert(true);
          setText({
            header: " ",
            subHeader: result.message,
          });
    }
    console.log(result)
    
    // props.history.push(to.scanId);
  }
  return (
    <div className="container">
      <AlertPopup
        isVisible={alert}
        header={text.header}
        subHeader={text.subHeader}
        onCancel={() => {
          setAlert(false);
        }}
        cancelText={LANG[lang].Cancel}
        
        onSuccess={() => {
          setAlert(false);
          props.history.push(to.home);
        }}
      />
      <div className="commontitle">
  <h2>{LANG[lang].Reservation_Information}</h2>
        {/* <p>Lorem ipsum is a dummy text.</p> */}
      </div>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        {Bookings.map((booking, i) => (
          <article key={i} className="card card-product-list maindetail">
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
                    {`${get(["room_number"], booking, "")} - ${get(
                      ["guest_fname"],
                      booking,
                      ""
                    )} ${get(["guest_lname"], booking, "")}`}{" "}
                    <span>{get(["room_type_name"], booking, "")}</span>
                  </p>
                  <div className="checkinarea row">
                    <div className="col-md-6">
                      <h6>{LANG[lang].Check_In}</h6>
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
                      <h6>{LANG[lang].Check_Out}</h6>
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
                    <h6>{LANG[lang].Avg_Rate}</h6>
                    <strong>
                      $
                      {get(["avg_night_rate"], booking, "") === "null"
                        ? "--"
                        : get(["avg_night_rate"], booking, "")}
                    </strong>
                  </span>
                </div>
                <div className="people col-md-4">
                  <h6>{LANG[lang].No_of_Night}</h6>
                  <img src={BedImg} alt="img" />
                  <span>
                    {moment(get(["checkout_time"], booking, "")).diff(
                      moment(get(["checkin_time"], booking, "")),
                      "days"
                    ) || 1}{" "}
                  </span>
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
              processNextScreen()
            }}
          />
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default Multibooking;
