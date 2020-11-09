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
import ContinueButton from "../Widgets/ContinueButton";
import moment from "moment";
import AlertPopup from "../Widgets/AlertPopup";
import Loader from "../Widgets/Loader";
import { GlobalContext } from "../../assets/js/context";
const { bookingType } = new AppServiceClass().getEnvironmentVariables();

const ScanQr = (props) => {
  const hotel = GlobalConfig.Hotel;
  const [counter, setCounter] = useState(180000);
  const [disableRescan, setDisableRescan] = useState(true);
  const [text, setText] = useState({ header: "", subHeader: "" });
  const [alert, setAlert] = useState(false);
  const { loading, setLoading } = useContext(GlobalContext);
  const { scanData , setScanData} = useContext(GlobalContext);
  useEffect(() => {
    startScan();
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
  }, []);
  const startScan = async () => {
    // setLoading(true);
    if (GlobalConfig.Connected === 0) {
      setTimeout(() => {
        startScan();
      }, 1000);
      return;
    } else if (GlobalConfig.Connected === 2) {
      return;
    }
    HubConnection.ACTION("startScanBarcode", "Honeywell3330G", false);
    GlobalConfig.QR = true;
    
  };
  
  const validateDetail = (resultScan) => {
    GlobalConfig.QR = false;
    setScanData(null)
    console.log("[validate QR=]",resultScan)
    HubConnection.ACTION("Scan", "Honeywell3330G")
      .then((result) => {
        console.log(`Scan  execution done  `, result);
        let DATA = {
          booking_id: resultScan.Barcode,
          hotel_id: hotel.hotel_id,
          search_type: bookingType.QR,
          browser: true,
          is_guest_user: true,
        };
        Services.FindReservationKiosk(DATA).then((data) => {
          console.log("[data]", data);
          if (data.success) {
            GlobalConfig.Bookings = data.bookings;
            setLoading(setLoading);

            props.history.push(to.multiBooking);
          } else {
            setLoading();
            setAlert(true);
            setText({
              header: "Not Found",
              subHeader: "Your Booking not Found",
            });
            // TOST : Booking not found
            // props.history.push(to.checkIn);
          }
        });
      })
      .catch((err) => {
        setLoading();
        setAlert(true);
        setText({ header: "Not Found", subHeader: "Your Booking not Found" });
      });
  }
  if(GlobalConfig.QR && scanData) validateDetail(scanData)

  useEffect(() => {
    let intervalId;

    if (counter === 0) {
      setDisableRescan(false);
      return;
    }
    
    if (counter > 0) {
      intervalId = setInterval(() => {
        setCounter(counter - 1000);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [counter]);

  return (
    <div className="container">
      {loading && <Loader text={"Scanning..."} />}
      <AlertPopup
        isVisible={alert}
        header={text.header}
        subHeader={text.subHeader}
        onCancel={() => {
          setAlert(false);
          startScan()
          setCounter(180000);
          // setDisableRescan(false);
        }}
        cancelText={"Back"}
      />
      <div className="commontitle">
        <h2>Scan Qr Code</h2>
        <p>Search using QR code provided in the precheckin email</p>
      </div>
      <form className="login100-form validate-form flex-sb flex-w">
        <div className="formarea fixarea">
          <img src={ScanQrImg} alt="img" />
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.checkIn)} />
          <ContinueButton
            disable={disableRescan}
            text={"Rescan"}
            onClick={startScan}
          />
        </div>
        <div className="col-md-12 text-center mtop">
          <ContinueButton
            onClick={() => props.history.push(to.confirmDetails)}
          />
        </div>
        {counter !== 0 && (
          <div className="col-md-12 text-center timer">
            <p>
              Scan will auto cancel in{" "}
              <span>{moment.utc(counter).format("mm:ss")}</span>
            </p>
          </div>
        )}
      </form>
      <Footer />
    </div>
  );
};

export default ScanQr;
