import React, { useState, useEffect } from "react";
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
const { bookingType } = new AppServiceClass().getEnvironmentVariables();


const ScanQr = (props) => {
  const hotel = GlobalConfig.Hotel;

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
    let DATA = {
      booking_id: result.Data,
      last_name: "desai",
      hotel_id: hotel.id,
      search_type: bookingType.QR,
      browser: true,
      is_guest_user: true,
    };
    Services.FindReservationKiosk(DATA).then((data) => {
      if (data.success) {
        GlobalConfig.Booking = data.bookings;
        if (get(["bookings"], data, []).length > 1) {
          props.history.push(to.multiBooking);
        } else if (get(["bookings"], data, []).length === 1) {
          props.history.push(to.bookingInfo);
        }
        
      }else{
        // TOST : Booking not found 
        props.history.push(to.checkIn)
      }
    });
      
    });
  }

  return (
    <div className="container">
      <div className="commontitle">
        <h2>Scan Qr Code</h2>
        <p>Search using QR code provided in the precheckin email</p>
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

export default ScanQr;
