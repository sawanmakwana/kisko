import React from "react";
import Footer from "./Widgets/Footer";
import CancelButton from "./Widgets/CancelButton";
import ContinueButton from "./Widgets/ContinueButton";
import { to } from "../RoutesPath";

const ConfirmDetails = (props) => {
  return (
    <div class="container">
      <div class="commontitle">
        <h2>Confirmation Details</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      <form class="login100-form validate-form flex-sb flex-w mtop">
        <div class="maindetail">
          <div class="row">
            <div class="col-md-3">
              <span class="leftsection">Mobile No.</span>
            </div>
            <div class="col-md-9">
              <span class="rightsection">9876543210</span>
            </div>
          </div>
        </div>
        <div class="maindetail mtop">
          <div class="row">
            <div class="col-md-3">
              <span class="leftsection">Email ID</span>
            </div>
            <div class="col-md-9">
              <span class="rightsection">john.smith@gmail.com</span>
            </div>
          </div>
        </div>
        <div class="maindetail mtop mb-5">
          <div class="row">
            <div class="col-md-3">
              <span class="leftsection">Address</span>
            </div>
            <div class="col-md-9">
              <span class="rightsection">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </div>
          </div>
        </div>

        <div class="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.checkIn)} />
          <ContinueButton onClick={() => props.history.push(to.scanId)}   />
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default ConfirmDetails;
