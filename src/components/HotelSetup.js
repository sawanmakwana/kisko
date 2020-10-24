import React, { useState, useEffect } from "react";
import Footer from "./Widgets/Footer";
import ContinueButton from "./Widgets/ContinueButton";
import { kisko_endpoint } from "../assets/js/endpoint";
import Axios from "axios";

const HotelSetup = (props) => {
  const [uuid, setUuid] = useState(window.localStorage.getItem("hotelUuid"));
  const [hotelId, setHotelId] = useState(
    window.localStorage.getItem("hotelUuid")
  );

  useEffect(() => {
    if (uuid) {
      props.history.push(`/home`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const generateUUID = () => {
    console.log("clicked");
    return Axios.request({
      url: kisko_endpoint + "/generateHotelUuid",
      method: "POST",
      headers: { "x-aavgo-crypto-disable": true },
      data: { hotel_id: hotelId },
    })
      .then(({ data }) => {
        console.log({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div id="clock"></div>
        <div className="container">
          <div className="wrap-login100">
            <h2 className="allcaps">Hotel Setup</h2>
            <form className="login100-form validate-form flex-sb flex-w">
              <div className="col-md-12 nopadding mt-3">
                <div className="p-t-31 p-b-9">
                  <span className="txt1">Kiosk ID / Hotel ID</span>
                </div>
                <div
                  className="wrap-input100 validate-input"
                  //   data-validate="Username is required"
                >
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="Type here.."
                    onChange={(e) => setHotelId(e.target.value)}
                  />
                  <span className="focus-input100"></span>
                </div>
              </div>

              <div className="col-md-12 text-center mtop">
                <ContinueButton onClick={generateUUID} />
              </div>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default HotelSetup;
