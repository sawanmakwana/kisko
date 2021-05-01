import React, { useState, useContext, useEffect } from "react";
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
const ipcRenderer =  window.require && window.require("electron") ? window.require("electron").ipcRenderer : {send:()=>{}};

const Terms = (props) => {
  const [signatureEnd, setSignatureEnd] = useState(true);
  const [sigPad, setSigPad] = useState({});
  const [sign, setSign] = useState("");
  const { loading, setLoading } = useContext(GlobalContext);

  const [text, setText] = useState({ header: "", subHeader: "",cancelText:"Cancel" });
  const [alert, setAlert] = useState(false);
  const hotel = GlobalConfig.Hotel;
  const SelectedBooking = GlobalConfig.SelectedBooking;
  useEffect(() => {
    ipcRenderer.send('logs',{type:'info',msg:"Term screen"});
  }, [])
  const uploadSign=()=>{
    let DATA = {
      "person_id":SelectedBooking.user.id,
      // "booking_id":SelectedBooking.id,
      "hotel_id":hotel.hotel_id,
      "image_urls": [sign],
      "filename":Date.now()+"_digital",
      "is_guest_user":true,
      "browser":true,
      "param_guest_id":get(["guest_id"], SelectedBooking),
      // "lang":"en",
      "token" : SelectedBooking.token
    };
    setLoading(true);

    Services.ScanSignUpload(DATA)
      .then((data) => {
        setLoading(false);
        if (data.success) {
          // SelectedBooking.doc_image = data.data.doc_image;
          SelectedBooking.digitalImg_urls = data.data.image_urls;
          GlobalConfig.SelectedBooking = SelectedBooking;
          console.log(GlobalConfig.SelectedBooking)
          ipcRenderer.send('logs',{type:'info',msg:"Sign upload success"});
          props.history.push(to.swipeCard)
        } else {
          setAlert(true);
          ipcRenderer.send('logs',{type:'error',msg:"Sign upload error "+JSON.stringify(data)});
          setText({
            header: "Invalid Sign",
            subHeader: "Please Try Again",
            cancelText:"Cancel"
          });
          // TOST : Booking not found
        }
      })
      .catch((err) => {
        ipcRenderer.send('logs',{type:'error',msg:"Sign upload error "+err});
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
              __html: hotel.terms_and_condition,
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
          <CancelButton onClick={() => window.history.back()} />
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
