import React, { useState, useEffect, useContext } from "react";
import Footer from "../Widgets/Footer";
import SearchButton from "../Widgets/SearchButton";
import ScanQrImg from "../../assets/images/scanqr.gif";
import CancelButton from "../Widgets/CancelButton";
import { to } from "../../RoutesPath";
import HubConnection from "../../Connection/hubConnection";
import { GlobalConfig } from "../../assets/js/globleConfig";
import * as Services from "./Services";
import AppServiceClass from "../../assets/js/environmentConfig";
import { get } from "../../AppUtills";
import { GlobalContext } from "../../assets/js/context";
import { LANG } from "../../assets/js/language";
import AlertPopup from "../Widgets/AlertPopup";
import Loader from "../Widgets/Loader";
const { bookingType } = new AppServiceClass().getEnvironmentVariables();
const ipcRenderer =  window.require && window.require("electron") ? window.require("electron").ipcRenderer : {send:()=>{}};
const PickupScanQR = (props) => {
  const hotel = GlobalConfig.Hotel;
  const [counter, setCounter] = useState(180000);
  const [disableRescan, setDisableRescan] = useState(true);
  const [text, setText] = useState({ header: "", subHeader: "" });
  const [alert, setAlert] = useState(false);
  const { lang, scanData, setScanData } = useContext(GlobalContext);
  const { loading, setLoading } = useContext(GlobalContext);
  useEffect(() => {
    startScan();
    ipcRenderer.send('logs',{type:'info',msg:"Booking Scan QR Screen"});
    return () => {
      // interval && clearInterval(interval);
      HubConnection.ACTION(
        "CancelScanWait",
        "Honeywell3330G"
      ).then((data) => {});
      HubConnection.proxy.off("barcodeScanned", function (result) {
        console.log("Scan OFF successful!: " + result);
        
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const startScan = async () => {
    if (GlobalConfig.Connected === 0) {
      setTimeout(() => {
        startScan();
      }, 1000);
      return;
    } else if (GlobalConfig.Connected === 2) {
      return;
    }
    HubConnection.ACTION("Scan", "Honeywell3330G").then((result) => {
      console.log(`Scan  execution done  `, result);
    });
  };
  

  const validateDetail = (resultScan) => {
    GlobalConfig.QR = false;
    setScanData(null);
    console.log("[validate QR=]", resultScan);
    resultScan = JSON.parse(resultScan.Barcode);
    console.log("[validate QR Barcode=]", resultScan);
    let DATA = {
      booking_id: resultScan.pinNumber,
      last_name: resultScan.lastName,
      hotel_id: hotel.hotel_id,
      search_type: bookingType.Booking,
      browser: true,
      is_guest_user: true,
    };
    setLoading(true);
    Services.FindReservationKiosk(DATA)
      .then((data) => {
        if (data.success) {
          GlobalConfig.Bookings = data.bookings;
          ipcRenderer.send('logs',{type:'info',msg:"Kiosk Booking Confirm Scren"});
          props.history.push(to.multiBooking);
          setLoading(false);
        } else {
          setLoading(false);
          setAlert(true);
          setText({
            header: LANG[lang].Not_Found,
            subHeader: LANG[lang].Your_Booking_not_Found,
          });
          ipcRenderer.send('logs',{type:'error',msg:"Kiosk Booking Search"+JSON.stringify(data)});
          // TOST : Booking not found
        }
      })
      .catch((err) => {
        setLoading(false);
        setAlert(true);
        setText({
          header: LANG[lang].Not_Found,
          subHeader: LANG[lang].Your_Booking_not_Found,
        });
      });
    // HubConnection.ACTION("Scan", "Honeywell3330G")
    //   .then((result) => {
    //     console.log(`Scan  execution done  `, result);
    //     // let DATA = {
    //     //   booking_id: resultScan.reservationId,
    //     //   hotel_id: hotel.hotel_id,
    //     //   search_type: bookingType.QR,
    //     //   browser: true,
    //     //   is_guest_user: true,
    //     // };
        
    //   })
    //   .catch((err) => {
    //     setLoading();
    //     setAlert(true);
    //     setText({
    //       header: LANG[lang].Not_Found,
    //       subHeader: LANG[lang].Your_Booking_not_Found,
    //     });
    //   });
  };
  if (GlobalConfig.QR && scanData) validateDetail(scanData);
  return (
    <div className="container">
      {loading && <Loader text={"Scanning..."} />}
      <AlertPopup
        isVisible={alert}
        header={text.header}
        subHeader={text.subHeader}
        onCancel={() => {
          setAlert(false);
          startScan();
          setCounter(180000);
          // setDisableRescan(false);
        }}
        cancelText={"Back"}
      />
      <div className="commontitle">
        <h2>{LANG[lang].Scan_Qr_Code}</h2>
        <p>{LANG[lang].SearchusingQRcodeprovidedintheprecheckinemail}</p>
      </div>
      <form className="login100-form validate-form flex-sb flex-w">
        <div className="formarea fixarea">
          <img src={ScanQrImg} alt="img" />
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.checkIn)} />{" "}
          {/* <SearchButton onClick={() => startScan()} /> */}
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default PickupScanQR;
