import React from "react";
import CancelButton from "./Widgets/CancelButton";
import ContinueButton from "./Widgets/ContinueButton";

const Multibooking = (props) => {
  return (
    <div className="container">
      <div className="commontitle">
        <h2>RESERVATION Information</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <article className="card card-product-list maindetail">
          <div className="row no-gutters">
            <div className="reservtick">
              <div className="radio">
                <input id="radio-1" name="radio" type="radio" />
              </div>
            </div>
            <aside className="col-md-3">
              <div className="img-wrap">
                <img src="images/room.jpg" />
              </div>
            </aside>
            <div className="col-md-9">
              <div className="info-main">
                <p className="reservtitle">
                  John Smith <span>Standard Room</span>
                </p>
                <div className="checkinarea row">
                  <div className="col-md-6">
                    <h6>Check In</h6>
                    <span className="rightsection">
                      <img src="images/calendar1.png" className="reservcalendar" />{" "}
                      20 Oct, 2020
                    </span>
                  </div>
                  <div className="col-md-6">
                    <h6>Check Out</h6>
                    <span className="rightsection">
                      <img src="images/calendar1.png" className="reservcalendar" />{" "}
                      21 Oct, 2020
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="price-wrap col-md-4">
                <span>
                  <h6>Price</h6>
                  <strong>$89.99</strong>
                </span>
              </div>
              <div className="people col-md-4">
                <h6>No. of Night(s)</h6>
                <img src="images/bed.png" />
                <span>1 </span>
              </div>
              <div className="people col-md-4">
                <h6>Adult(s)</h6>
                <img src="images/adult.png" />
                <span>2 </span>
              </div>
            </div>
          </div>
        </article>

        <div className="col-md-12 text-center mtop">
          <CancelButton />
          <ContinueButton />
        </div>
      </form>
      <div className="footer">
        <div className="helpcenter">
          <a href="">
            <span>Help</span>
            <img src="images/help.png" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Multibooking;
