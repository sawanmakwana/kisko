import React, { useState, useEffect } from "react";
import CancelButton from "./Widgets/CancelButton";
import ScanqrImg from "../assets/images/scanqr.gif";
import ContinueButton from "./Widgets/ContinueButton";
import { to } from "../RoutesPath";
import Footer from "./Widgets/Footer";
import HubConnection from "../Connection/hubConnection";
import { GlobalConfig } from "../assets/js/globleConfig";
import { pdf417 } from "../assets/js/idDecoder";
import moment from "moment";
// import { hubConnection } from "signalr-no-jquery";

const ScanbarCode = (props) => {
  const [disableRescan, setDisableRescan] = useState(true);
  const [counter, setCounter] = useState(180000);
  let interval = null;
  useEffect(() => {
    startScan();

    return () => {
      interval && clearInterval(interval);
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
    /*===== TEMP : START ====*/
    setTimeout(()=>{
      let result =
      'u001eANSI 636015080001DL00410285ZC03260033DLDCACDCBNONEDCDNONEDBA01312022DCSHODARDACRATANDADGOVINDDBD08112017DBB01311978DBC1DAYBRNDAU069 INDAG388 BEALE ST APT 805DAISAN FRANCISCODAJCADAK941050000  DAQY8199490DCF08/11/2017503C8/DDFD/22DCGUSADDEUDDFUDDGUDAW164DAZBLKDCK17223Y81994900401DDB04162010DDD0ZCZCAZCBZCCBRNZCDBLKZCEZCF"';
    // data = "asdas"
     result = pdf417(result);
    console.log(result);
    if (typeof result == "object" && result.name) {
      console.log("id valid");
      props.history.push(to.captureFront);
    } else {
      console.log("id not valid");
    }
    },2000)
    
    /*===== TEMP : END ====*/

    HubConnection.ACTION("CancelScanWait", "Honeywell3330G").then((data) => {
      console.log(data);
      if (!data) return;
      if (data.success) {
        HubConnection.proxy.on("barcodeScanned", function (result) {
          console.log("Scan successful!: " + result);
          if(result && result.HardwareResult == 0){

            result = pdf417(result.Barcode);
            console.log(result);
            if (typeof result == "object" && result.name) {
              props.history.push(to.captureFront);
            } else {
              console.log("id not valid");
            }
          }  
          HubConnection.ACTION("CancelScanWait", "Honeywell3330G");
          props.history.push(to.scanId)
          
        });
        HubConnection.ACTION("startScanBarcode", "Honeywell3330G", true).then(
          (data) => {
            console.log(data);
          }
        );
      }
    });
  };

  return (
    <div className="container">
      <h2 className="maintitle">Place your Barcode ID in scanning area</h2>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <div className="formarea fixarea">
          <img src={ScanqrImg} alt="img" />
        </div>
        <div className="col-md-12 text-center mtop">
          <CancelButton onClick={() => props.history.push(to.scanId)} />
          <ContinueButton
            disable={disableRescan}
            text={"Rescan"}
            onClick={() => startScan}
          />
        </div>
        <div className="col-md-12 text-center timer">
          <p>
            Scan will auto cancel in{" "}
            <span>{moment.utc(counter).format("mm:ss")}</span>
          </p>
        </div>
      </form>
      <Footer />
    </div>
  );
};
export default ScanbarCode;
