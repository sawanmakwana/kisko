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
const { bookingType } = new AppServiceClass().getEnvironmentVariables();

const PickupScanQR = (props) => {
  const { lang } = useContext(GlobalContext);

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

  return (
    <div className="container">
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
