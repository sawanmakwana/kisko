import React from "react";
import Footer from "./Widgets/Footer";
import { to } from "../RoutesPath";

const SwipeCreditCard = (props) => {
  return (
    <div class="container">
      <h2 class="maintitle">
        Swipe your <span>Credit Card</span> to do payment
      </h2>
      <form class="login100-form validate-form flex-sb flex-w mtop">
        <div
          class="formarea fixarea"
          onClick={() => props.history.push(to.selectKeys)}
        >
          <img src="images/capture-photo.gif" />
        </div>
        <div class="col-md-12 text-center mtop">
          <button
            class="cancelbutton"
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
