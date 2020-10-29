import React from "react";
import Footer from "./Widgets/Footer";
import { to } from "../RoutesPath";

const SwipeCreditCard = (props) => {
  return (
    <div className="container">
      <h2 className="maintitle">
        Swipe your <span>Credit Card</span> to do payment
      </h2>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <div
          className="formarea fixarea"
          onClick={() => props.history.push(to.selectKeys)}
        >
          <img src="images/capture-photo.gif" />
        </div>
        <div className="col-md-12 text-center mtop">
          <button
            className="cancelbutton"
            onClick={() => props.history.push(to.creditCard)}
          >
            Cancel{" "}
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default SwipeCreditCard;
