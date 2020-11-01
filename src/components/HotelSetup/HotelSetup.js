import React, { useState, useEffect, useContext } from "react";
import Footer from "../Widgets/Footer";
import ContinueButton from "../Widgets/ContinueButton";

import * as Services from "./Services";
import { GlobalConfig } from "../../assets/js/globleConfig";
import { GlobalContext } from "../../assets/js/context";
import { to } from "../../RoutesPath";

const HotelSetup = (props) => {
  const [uuid, setUuid] = useState("8881214933");
  const { loading, setLoading } = useContext(GlobalContext);

  const findHotelByUuid = () => {
    setLoading(true);

    Services.FindHotelByUuid({ uuid })
      .then((data) => {
        if (data.success) {
          GlobalConfig.Hotel = data.hotel;
          setLoading(false);
          props.history.push(to.home);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="wrap-login100">
        <h2 className="allcaps">Hotel Setup</h2>
        <form className="login100-form validate-form flex-sb flex-w">
          <div className="col-md-12 nopadding mt-3">
            <div className="p-t-31 p-b-9">
              <span className="txt1">Kiosk ID / Hotel ID</span>
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
          </div>
          {loading && <div>Hello</div>}
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
