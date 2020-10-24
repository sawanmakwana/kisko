import React from "react";
import Footer from "./Widgets/Footer";
import SearchButton from "./Widgets/SearchButton";

const BookingId = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div id="clock"></div>
        <div className="container">
          <div className="commontitle">
            <h2>Hotel Setup</h2>
            <p>Lorem ipsum is a dummy text.</p>
          </div>
          <form className="login100-form validate-form flex-sb flex-w">
            <div className="formarea">
              <div className="col-md-12 nopadding">
                <div className="p-b-9">
                  <span className="txt1">PIN Number</span>
                </div>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Username is required"
                >
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="Type here.."
                  />
                  <span className="focus-input100"></span>
                </div>
              </div>
              <div className="col-md-12 nopadding mt-3">
                <div className="p-t-31 p-b-9">
                  <span className="txt1">Last Name</span>
                </div>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Username is required"
                >
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="Type here.."
                  />
                  <span className="focus-input100"></span>
                </div>
              </div>
            </div>
            <div className="col-md-12 text-center mtop">
              <SearchButton />
            </div>
          </form>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default BookingId;
