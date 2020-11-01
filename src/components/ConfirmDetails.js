import React from "react";
import Footer from "./Widgets/Footer";
import CancelButton from "./Widgets/CancelButton";
import ContinueButton from "./Widgets/ContinueButton";
import { to } from "../RoutesPath";
import { GlobalConfig } from "../assets/js/globleConfig";

const ConfirmDetails = (props) => {
  return (
    <div className="container">
      <div className="commontitle">
        <h2>Confirmation Details</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <div className="maindetail">
          <div className="row">
            <div className="col-md-3">
              <span className="leftsection">Mobile No.</span>
            </div>
            <div className="col-md-9">
              <span className="rightsection">9876543210</span>
            </div>
          </div>
        </div>
        <div className="maindetail mtop">
          <div className="row">
            <div className="col-md-3">
              <span className="leftsection">Email ID</span>
            </div>
            <div className="col-md-9">
              <span className="rightsection">john.smith@gmail.com</span>
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </div>
          </div>
        </div>

        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.checkIn)} />
          <ContinueButton onClick={() => {
            if(GlobalConfig.Hotel.allowed_selfie){
              props.history.push(to.captureFace);
            }else {
              props.history.push(to.swipeCard);
            }
            } 
            }  />
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default ConfirmDetails;
