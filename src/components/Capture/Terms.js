import React, { useState, useContext } from "react";
import ContinueButton from "../Widgets/ContinueButton";
import CancelButton from "../Widgets/CancelButton";
import Footer from "../Widgets/Footer";
import { GlobalContext } from "../../assets/js/context";
import { to } from "../../RoutesPath";
import SignatureCanvas from "react-signature-canvas";
import { GlobalConfig } from "../../assets/js/globleConfig";
import AlertPopup from "../Widgets/AlertPopup";
import { get } from "../../AppUtills";
import Loader from "../Widgets/Loader";
import * as Services from "./Services";
const Terms = (props) => {
  const [signatureEnd, setSignatureEnd] = useState(true);
  const [sigPad, setSigPad] = useState({});
  const [sign, setSign] = useState("");
  const { loading, setLoading } = useContext(GlobalContext);

  const [text, setText] = useState({ header: "", subHeader: "",cancelText:"Cancel" });
  const [alert, setAlert] = useState(false);
  const hotel = GlobalConfig.Hotel;
  const SelectedBooking = GlobalConfig.SelectedBooking;
  const uploadSign=()=>{
    let DATA = {
      "booking_id":get(["booking_ref_no"], SelectedBooking),
      "hotel_id":hotel.booking_id,
      "image_urls":[sign],
      "is_digital":true,
      "filename":Date.now()+"_digital",
      "is_guest_user":true,
      "browser":true,
      "param_guest_id":get(["guest_id"], SelectedBooking),
      "lang":"en",
      "token" : SelectedBooking.user.tokens.pop()
    };
    setLoading(true);

    Services.ScanSignUpload(DATA)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          // SelectedBooking.doc_image = data.data.doc_image;
          SelectedBooking.digitalImg_urls = data.data.digitalImg_urls;
          GlobalConfig.SelectedBooking = SelectedBooking;
          console.log(GlobalConfig.SelectedBooking)
          
          props.history.push(to.swipeCard)
        } else {
          setAlert(true);
          
          setText({
            header: "Invalid Sign",
            subHeader: "Please Try Again",
            cancelText:"Cancel"
          });
          // TOST : Booking not found
        }
      })
      .catch((err) => {
        setLoading(false);
        setAlert(true);
        setText({
          header: "Something Wrong",
          subHeader: "Please Try Again",
          cancelText:"Cancel"
        });
      });
  }

  return (
    <div className="container">
      <AlertPopup
        isVisible={alert}
        header={text.header}
        subHeader={text.subHeader}
        cancelText={text.cancelText}
        onCancel={() => {
          setAlert(false);
        }}
  
      />
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
            fromDataURL
            velocityFilterWeight={1}
            ref={(ref) => { setSigPad(ref) }}
            onEnd={(e) => {
              console.log({ e });
              setSignatureEnd(false);
              setSign(sigPad.getTrimmedCanvas().toDataURL('image/png') )
            }}
          />
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.captureFace)} />
          <ContinueButton
            onClick={() => uploadSign()}
            disable={signatureEnd}
          />
        </div>
      </form>
      {/* <Footer /> */}
    </div>
  );
};
export default Terms;
