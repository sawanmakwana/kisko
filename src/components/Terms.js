import React, { useState } from "react";
import ContinueButton from "./Widgets/ContinueButton";
import CancelButton from "./Widgets/CancelButton";
import Footer from "./Widgets/Footer";
import { to } from "../RoutesPath";
import SignatureCanvas from "react-signature-canvas";

const Terms = (props) => {
  const [signatureEnd, setSignatureEnd] = useState(true);

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
