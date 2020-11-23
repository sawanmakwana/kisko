import React, { useState, useContext } from "react";
import HubConnection from "../Connection/hubConnection";
import { to } from "../RoutesPath";
import ContinueButton from "./Widgets/ContinueButton";
import Footer from "./Widgets/Footer";
import AlertPopup from "./Widgets/AlertPopup";
import { GlobalContext } from "../assets/js/context";
import Loader from "./Widgets/Loader";
import { LANG } from "../assets/js/language";
import { parseString } from "xml2js";
import moment from "moment";
import axios from "axios";
import { GlobalConfig } from "../assets/js/globleConfig";
import { KABA } from "../assets/js/endpoint";

const SelectKeys = (props) => {
  const [text, setText] = useState({ header: "", subHeader: "" });
  const [alert, setAlert] = useState(false);
  const { loading, setLoading, lang } = useContext(GlobalContext);
  const SelectedBooking = GlobalConfig.SelectedBooking;
  const dispatchKeysO = async (keyCount = 1) => {
    setLoading(true);
    try {
      await processKey();
      if (keyCount === 2) await processKey();
      setLoading(false);
      props.history.push(to.thankYou);
    } catch (err) {
      setAlert(true);
      setText({
        header: LANG[lang].Error,
        subHeader: LANG[lang].Something_went_wrong,
      });
      setLoading(false);

      // TOST Error
    }
  };

  const dispatchKeys = async (keyCount = 1) => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/xml; charset=utf-8");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    myHeaders.append("SOAPAction", "http://tempuri.org/CreateNewBooking");
    let created = moment().utc().format();
    let expires = moment(SelectedBooking.checkout_time).utc().format();
    let reservationId = SelectedBooking.id;
    let checkInDate = moment(SelectedBooking.checkin_time).utc().format(); //"2020-11-21T04:27:13.6115233-08:00";
    let checkOutDate = moment(SelectedBooking.checkout_time).utc().format(); //"2020-11-21T04:27:53.6115233-08:00";
    let roomNumber = SelectedBooking.room_number;
    var raw = `<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <s:Header>\n    <h:AuthHeader xmlns=\"http://tempuri.org\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:h=\"http://tempuri.org\">\n      <Action xmlns=\"http://schemas.xmlsoap.org/ws/2004/08/addressing\">http://localhost:1619/MessengerPMSWS.asmx/CreateNewBooking</Action>\n      <From xmlns=\"http://schemas.xmlsoap.org/ws/2004/08/addressing\">urn:KABA</From>\n      <MessageID xmlns=\"http://schemas.xmlsoap.org/ws/2004/08/addressing\">a9327d70-6037-40df-bb87-0467a996d25b</MessageID>\n      <ReplyTo xmlns=\"http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous\" />\n      <To xmlns=\"http://schemas.xmlsoap.org/ws/2004/08/addressing\">http://localhost:1619/MessengerPMSWS.asmx</To>\n      <h:Security>\n        <Timestamp xmlns=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">\n          <Id>a50730b6-4571-48da-a9bd-b92c923932d6</Id>\n          <Created>${created}</Created>\n          <Expires>${expires}</Expires>\n        </Timestamp>\n        <UsernameToken xmlns=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">\n          <Id>e64bd314-b488-4384-9c8e-24fb1d022797</Id>\n          <Username>DummyUser</Username>\n          <Password>DummyPwd</Password>\n          <Nonce />\n          <Created>${created}</Created>\n        </UsernameToken>\n      </h:Security>\n    </h:AuthHeader>\n  </s:Header>\n  <s:Body xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\n    <CreateNewBooking xmlns=\"http://tempuri.org\">\n      <ReservationID>${reservationId}</ReservationID>\n      <SiteName>Main</SiteName>\n      <PMSTerminalID>WS1</PMSTerminalID>\n      <EncoderID>0</EncoderID>\n      <CheckIn>${checkInDate}</CheckIn>\n      <CheckOut>${checkOutDate}</CheckOut>\n      <GuestName xmlns=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">GuestTest</GuestName>\n      <MainRoomNo>${roomNumber}</MainRoomNo>\n      <bGrantAccessPredefinedSuiteDoors>false</bGrantAccessPredefinedSuiteDoors>\n      <VariableRoomList />\n      <CommonAreaList>\n        <CCommonAreas>\n          <PassLevelNo>1</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>2</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>3</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>4</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>5</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>6</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>7</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>8</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>9</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>10</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>11</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>12</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n      </CommonAreaList>\n      <TrackIIFolioNo />\n      <TrackIGuestNo />\n      <KeyCount>1</KeyCount>\n      <KeySize>1</KeySize>\n      <UID>AAAAAAAA</UID>\n    </CreateNewBooking>\n  </s:Body>\n</s:Envelope>`;

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    };

    fetch(
      KABA,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
        parseString(result, { trim: true }, async function (err, result) {
          try {
            let key =
              result["s:Envelope"]["s:Body"][0]["CreateNewBookingResponse"][0][
                "CreateNewBookingResult"
              ][0]["CMessengerResponse"][0]["retAccessKey"][0]["_"];
            console.log(key)
            await processKey(key);
            if (keyCount === 2) await processKey(key);
            setLoading(false);
            props.history.push(to.thankYou);
          } catch (err) {
            setLoading(false);
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error)});
  };

  const processKey = async (data) => {
    return new Promise((resolve) => {
      try {
        console.log("[processKey]")
        HubConnection.ACTION("CardSet", "SCT3Q8").then((result) => {
          console.log("[CardSet]",result)
          HubConnection.ACTION("WriteMifareRawData", "SCT3Q8","data").then(
            (result) => {
              console.log("[WriteMifareRawData WriteTrack1]",result)
              HubConnection.ACTION("EjectCard", "SCT3Q8").then((result) => {
                console.log("[EjectCard]",result)
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
