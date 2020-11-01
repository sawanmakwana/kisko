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
// import { hubConnection } from "signalr-no-jquery";
// import { KIOSK } from "../assets/js/endpoint";
// const connection = hubConnection(KIOSK);
// const proxy = connection.createHubProxy("kioskHardwareHub");
// connection
//   .start()
//   .done(function () {
//     GlobalConfig.Connected = 1;
//     console.log("Now connected, connection ID=" + connection.id);
//   })
//   .fail(function () {
//     GlobalConfig.Connected = 2;
//     console.log("Could not connect");
//   });

const ScanbarCode = (props) => {
  const [disableRescan, setDisableRescan] = useState(true);
  const [counter, setCounter] = useState(18000);

  useEffect(() => {
    return () => {
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
    setCounter(18000);
    setDisableRescan(true);
    if (GlobalConfig.Connected === 0) {
      setTimeout(() => {
        startScan();
      }, 1000);
      return;
    } else if (GlobalConfig.Connected === 2) {
      return;
    }
    /*===== TEMP : START ====*/
    // setTimeout(()=>{
    //   let result =
    //   'u001eANSI 636015080001DL00410285ZC03260033DLDCACDCBNONEDCDNONEDBA01312022DCSHODARDACRATANDADGOVINDDBD08112017DBB01311978DBC1DAYBRNDAU069 INDAG388 BEALE ST APT 805DAISAN FRANCISCODAJCADAK941050000  DAQY8199490DCF08/11/2017503C8/DDFD/22DCGUSADDEUDDFUDDGUDAW164DAZBLKDCK17223Y81994900401DDB04162010DDD0ZCZCAZCBZCCBRNZCDBLKZCEZCF"';
    //  '@ANSI 636014040002DL00410288ZC03290034DLDCACDCBNONEDCDNONEDBA11092020DCSDESAIDACMRUNALDADHEMANTKUMARDBD11242015DBB11091982DBC1DAYBLKDAU067 INDAG2167 EL CAPITAN AVEDAISANTA CLARADAJCADAK950500000  DAQD3634400DCF11/24/20156453A/AAFD/20DCGUSADDEUDDFUDDGUDAW180DAZBLKDCK15328D36344000401DDB04162010DDD0ZCZCAYZCBZCCBLKZCDBLKZCEZCF"'
    // // data = "asdas"
    //  result = pdf417(result);
    // console.log(result);
    // if (typeof result == "object" && result.name) {
    //   console.log("id valid");
    //   props.history.push(to.captureFront);
    // } else {
    //   console.log("id not valid");
    // }
    // },2000)

    /*===== TEMP : END ====*/
    /*===== INIT TEMP : START ====*/
    // HubConnection.ACTION("CancelScanWait", "Honeywell3330G").then((data) => {
    //   console.log(data);
    //   if (!data) return;
    //   if (data.success) {
    //     HubConnection.proxy.on("barcodeScanned", function (result) {
    //       console.log("Scan successful!: " + result);
    //       if(result && result.HardwareResult == 0){

    //         result = pdf417(result.Barcode);
    //         console.log(result);
    //         if (typeof result == "object" && result.name) {
    //           props.history.push(to.captureFront);
    //         } else {
    //           console.log("id not valid");
    //         }
    //       }
    //       HubConnection.ACTION("CancelScanWait", "Honeywell3330G");
    //       props.history.push(to.scanId)

    //     });
    //     HubConnection.ACTION("startScanBarcode", "Honeywell3330G", true).then(
    //       (data) => {
    //         console.log(data);
    //       }
    //     );
    //   }
    // });

    HubConnection.ACTION("Scan", "Honeywell3330G").then((result) => {
      console.log(`Scan  execution done  `, result);
      if (result && result.Data) {
        result.Data = result.Data.replace("@ANSI ", "u001eANSI ");
        result = pdf417(result.Data);
        console.log(result);
        if (typeof result == "object" && result.name) {
          props.history.push(to.captureFront);
        } else {
          console.log("id not valid");
        }
      }
    });
    /*===== INIT TEMP : END ====*/
    // HubConnection.ACTION("CancelScanWait", "Honeywell3330G").then((data) => {
    /*===== TESTED START ====*/
    // proxy
    // .invoke("Scan", "Honeywell3330G")
    // .done((result) => {
    //   console.log(`Scan  execution done  `,result);
    //   if (result && result.Data) {
    //     result.Data = result.Data.replace("@ANSI ","u001eANSI ")
    //           result = pdf417(result.Data);
    //           console.log(result);
    //           if (typeof result == "object" && result.name) {
    //             props.history.push(to.captureFront);
    //           } else {
    //             console.log("id not valid");
    //           }
    //         }
    // });
    /*===== TESTED END ====*/
    // proxy.invoke("CancelScanWait", "Honeywell3330G").done((result) => {
    //   console.log(`CancelScanWait  execution done  `);
    //   proxy.on("barcodeScanned", function (result) {
    //     console.log("Scan successful!: " + result);
    //     if (result && result.HardwareResult == 0) {
    //       result = pdf417(result.Barcode);
    //       console.log(result);
    //       if (typeof result == "object" && result.name) {
    //         props.history.push(to.captureFront);
    //       } else {
    //         console.log("id not valid");
    //       }
    //     }
    //   });
    //   proxy
    //     .invoke("startScanBarcode", "Honeywell3330G", false)
    //     .done((result) => {
    //       console.log(`startScanBarcode  execution done  `);
    //       proxy
    //         .invoke("Scan", "Honeywell3330G")
    //         .done((result) => {
    //           console.log(`Scan  execution done  `,result);
    //         });
    //     });
    // });
  };

  useEffect(() => {
    let intervalId;
                                                                                                                                                                                                                            
    if (counter === 0) {
      setDisableRescan(false);
      return;
    }

    if (counter > 0) {
      intervalId = setInterval(() => {
        setCounter(counter - 1000);
        console.log({ counter });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [counter]);

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
            onClick={startScan}
          />
        </div>
        <div className="col-md-12 text-center mtop">
          <ContinueButton onClick={() => props.history.push(to.captureFront)} />
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
export default ScanbarCode;
