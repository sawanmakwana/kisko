import React, { useState, useEffect, useContext } from "react";
import Footer from "../Widgets/Footer";
import ContinueButton from "../Widgets/ContinueButton";

import * as Services from "./Services";
import { GlobalConfig } from "../../assets/js/globleConfig";
import { GlobalContext } from "../../assets/js/context";
import { to } from "../../RoutesPath";
import Loader from "../Widgets/Loader";
import AlertPopup from "../Widgets/AlertPopup";
import { LANG } from "../../assets/js/language";

const HotelSetup = (props) => {
  const [uuid, setUuid] = useState("4734181389");
  const [kioskUrl, setKioskUrl] = useState(GlobalConfig.KIOSK);
  const [kabaUrl, setKabaUrl] = useState(GlobalConfig.KABA);
  const [kabaUserName, setKabaUserName] = useState(GlobalConfig.KABA_USERNAME);
  const [kabaPassword, setKabaPassword] = useState(GlobalConfig.KABA_PASSWORD);
  const { loading, setLoading, lang } = useContext(GlobalContext);
  const [hotelText, setHotelText] = useState({ header: "", subHeader: "" });
  const [alert, setAlert] = useState(false);

  const findHotelByUuid = () => {
    setLoading(true);

    Services.FindHotelByUuid({ uuid }).then((data) => {
      if (data.success) {
        GlobalConfig.Hotel = data.hotel;
        setLoading(false);
        props.history.push(to.home);
      }
      if (data.success === 0) {
        setLoading(false);
        setAlert(true);
        setHotelText({
          header: "Not Found",
          subHeader: "Your id did not match any hotel",
        });
      }
    });
  };

  return (
    <div className="container">
      {loading && <Loader />}
      <AlertPopup
        isVisible={alert}
        header={hotelText.header}
        subHeader={hotelText.subHeader}
        onCancel={() => {
          setAlert(false);
        }}
        cancelText={"Back"}
      />
      <div className="wrap-login100">
        <h2 className="allcaps">{LANG[lang].Hotel_Setup}</h2>
        <form className="login100-form validate-form flex-sb flex-w">
          <div className="col-md-12 nopadding mt-3">
            <div className="p-t-31 p-b-9">
              <span className="txt1">Kiosk ID </span>
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Type here.."
                value={uuid}
                onChange={(e) => setUuid(e.target.value)}
              />
              <span className="focus-input100"></span>
            </div>
            <div className="p-t-31 p-b-9">
              <span className="txt1">Kiosk URL </span>
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Type here.."
                value={kioskUrl}
                onChange={(e) => {
                  GlobalConfig.KIOSK = e.target.value;
                  setKioskUrl(e.target.value);
                }}
              />
              <span className="focus-input100"></span>
            </div>
            <div className="p-t-31 p-b-9">
              <span className="txt1">Dormakaba URL </span>
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Type here.."
                value={kabaUrl}
                onChange={(e) => {
                  GlobalConfig.KABA = e.target.value;
                  setKabaUrl(e.target.value);
                }}
              />
              <span className="focus-input100"></span>
            </div>
            <div className="p-t-31 p-b-9">
              <span className="txt1">Dormakaba USERNAME </span>
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Type here.."
                value={kabaUserName}
                onChange={(e) => {
                  GlobalConfig.KABA_PASSWORD = e.target.value;
                  setKabaUserName(e.target.value);
                }}
              />
              <span className="focus-input100"></span>
            </div>
            <div className="p-t-31 p-b-9">
              <span className="txt1">Dormakaba PASSWORD </span>
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Type here.."
                value={kabaPassword}
                onChange={(e) => {
                  GlobalConfig.KABA_PASSWORD = e.target.value;
                  setKabaPassword(e.target.value);
                }}
              />
              <span className="focus-input100"></span>
            </div>
          </div>

          <div className="col-md-12 text-center mtop">
            <ContinueButton onClick={findHotelByUuid} />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default HotelSetup;
