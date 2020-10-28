import React from "react";
import CancelButton from "./Widgets/CancelButton";
import ContinueButton from "./Widgets/ContinueButton";

const Multibooking = (props) => {
  return (
    <div class="container">
      <div class="commontitle">
        <h2>RESERVATION Information</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      <form class="login100-form validate-form flex-sb flex-w mtop">
        <article class="card card-product-list maindetail">
          <div class="row no-gutters">
            <div class="reservtick">
              <div class="radio">
                <input id="radio-1" name="radio" type="radio" />
              </div>
            </div>
            <aside class="col-md-3">
              <div class="img-wrap">
                <img src="images/room.jpg" />
              </div>
            </aside>
            <div class="col-md-9">
              <div class="info-main">
                <p class="reservtitle">
                  John Smith <span>Standard Room</span>
                </p>
                <div class="checkinarea row">
                  <div class="col-md-6">
                    <h6>Check In</h6>
                    <span class="rightsection">
                      <img src="images/calendar1.png" class="reservcalendar" />{" "}
                      20 Oct, 2020
                    </span>
                  </div>
                  <div class="col-md-6">
                    <h6>Check Out</h6>
                    <span class="rightsection">
                      <img src="images/calendar1.png" class="reservcalendar" />{" "}
                      21 Oct, 2020
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="price-wrap col-md-4">
                <span>
                  <h6>Price</h6>
                  <strong>$89.99</strong>
                </span>
              </div>
              <div class="people col-md-4">
                <h6>No. of Night(s)</h6>
                <img src="images/bed.png" />
                <span>1 </span>
              </div>
              <div class="people col-md-4">
                <h6>Adult(s)</h6>
                <img src="images/adult.png" />
                <span>2 </span>
              </div>
            </div>
          </div>
        </article>

        <div class="col-md-12 text-center mtop">
          <CancelButton />
          <ContinueButton />
        </div>
      </form>
      <div class="footer">
        <div class="helpcenter">
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
