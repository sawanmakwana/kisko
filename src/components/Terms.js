import React from "react";
import ContinueButton from "./Widgets/ContinueButton";
import CancelButton from "./Widgets/CancelButton";
import Footer from "./Widgets/Footer";
import { to } from "../RoutesPath";

const Terms = (props) => {
  return (
    <div className="container">
      <div className="commontitle">
        <h2>Terms & Conditions</h2>
        <p>Lorem ipsum is a dummy text.</p>
      </div>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <div className="formarea terms">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
            <br />
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
            <br />
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
        </div>
        <div className="formarea signature">
          <div className="mainarea">
            <span>Sign Here</span>
          </div>
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={()=>props.history.push(to.terms)} />
          <ContinueButton onClick={()=>props.history.push(to.selectKeys)}/>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default Terms;
