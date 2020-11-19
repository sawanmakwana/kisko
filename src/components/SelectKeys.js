import React, { useState, useContext } from "react";
import HubConnection from "../Connection/hubConnection";
import { to } from "../RoutesPath";
import ContinueButton from "./Widgets/ContinueButton";
import Footer from "./Widgets/Footer";
import AlertPopup from "./Widgets/AlertPopup";
import { GlobalContext } from "../assets/js/context";
import Loader from "./Widgets/Loader";
import { LANG } from "../assets/js/language";

const SelectKeys = (props) => {
  const [text, setText] = useState({ header: "", subHeader: "" });
  const [alert, setAlert] = useState(false);
  const { loading, setLoading, lang } = useContext(GlobalContext);

  const dispatchKeys = async (keyCount = 1) => {
    setLoading(true);
    try {
      await processKey();
      if (keyCount === 2) await processKey();
      setLoading(false);
      props.history.push(to.thankYou);
    } catch (err) {
      setAlert(true);
      setText({ header: LANG[lang].Error, subHeader: LANG[lang].Something_went_wrong });
      setLoading(false);

      // TOST Error
    }
  };

  const processKey = async (data = "Test Dummy") => {
    return new Promise((resolve) => {
      try {
        HubConnection.ACTION("CardSet", "SCT3Q8").then((result) => {
          HubConnection.ACTION("WriteTrack1", "SCT3Q8", "TEXT DUMMY").then(
            (result) => {
              HubConnection.ACTION("EjectCard", "SCT3Q8").then((result) => {
                resolve("done");
              });
            }
          );
        });
      } catch (err) {
        resolve("error");
      }
    });
  };
  return (
    <>
      {loading && <Loader />}

      <AlertPopup
        isVisible={alert}
        header={text.header}
        subHeader={text.subHeader}
        onCancel={() => {
          setAlert(false);
        }}
        cancelText={LANG[lang].Back}
      />
      <div className="container transparent">
        <h2 className="maintitle">
          {LANG[lang].Please_select_number_of_room_key}
        </h2>
        <div className="row mt-5">
          <div className=" col-md-1"></div>
          <div className="col-md-5">
            <div
              className="bluebutton customtext"
              onClick={() => dispatchKeys(1)}
            >
              {" "}
              <span>1</span>
              <div className="noverlay"></div>
            </div>
          </div>
          <div className="col-md-5">
            <div
              className="bluebutton customtext"
              onClick={() => dispatchKeys(2)}
            >
              {" "}
              <span>2</span>
              <div className="noverlay"></div>
            </div>
          </div>
          <div className="col-md-12 text-center mtop">
            <ContinueButton onClick={() => props.history.push(to.thankYou)} />
            {/* <ContinueButton onClick={() =>startNFC} /> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default SelectKeys;
