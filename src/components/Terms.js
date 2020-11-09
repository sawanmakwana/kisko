import React, { useState } from "react";
import ContinueButton from "./Widgets/ContinueButton";
import CancelButton from "./Widgets/CancelButton";
import Footer from "./Widgets/Footer";
import { to } from "../RoutesPath";
import SignatureCanvas from "react-signature-canvas";
import { GlobalConfig } from "../assets/js/globleConfig";

const Terms = (props) => {
  const [signatureEnd, setSignatureEnd] = useState(true);
  const hotel = GlobalConfig.Hotel;
  return (
    <div className="container">
      <div className="commontitle">
        <h2>Terms & Conditions</h2>
        {/* <p>Lorem ipsum is a dummy text.</p> */}
      </div>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <div className="formarea terms ">
          <p
          style={{textAlign:"justify"}}
            dangerouslySetInnerHTML={{
              __html: hotel.pre_checkin,
            }}
          ></p>
        </div>
        <h3 className="mt-5">Sign here</h3>
        <div className="formarea signature">
          <SignatureCanvas
            canvasProps={{ width: 1000, height: 200, className: "sigCanvas" }}
            dotSize={6}
            velocityFilterWeight={1}
            onEnd={(e) => {
              console.log({ e });
              setSignatureEnd(false);
            }}
          />
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.captureFace)} />
          <ContinueButton
            onClick={() => props.history.push(to.swipeCard)}
            disable={signatureEnd}
          />
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};
export default Terms;
