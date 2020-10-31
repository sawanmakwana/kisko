import React, { useState, useEffect } from "react";
import Footer from "./Widgets/Footer";
import { to } from "../RoutesPath";
import CaptureGif from "../assets/images/capture-photo.gif";
import ContinueButton from "./Widgets/ContinueButton";
import HubConnection from "../Connection/hubConnection";
import { GlobalConfig } from "../assets/js/globleConfig";
const SwipeCreditCard = (props) => {
  let interval = null;
  useEffect(() => {
    scanCreditCard();

    // return () => {
    //   interval && clearInterval(interval);
    //   HubConnection.ACTION(
    //     "CancelCardRead",
    //     "IUC285"
    //   ).then((data) => {});
    //   HubConnection.proxy.off("barcodeScanned", function (result) {
    //     console.log("Scan OFF successful!: " + result);
    //   });
    // };
  }, []);

  const scanCreditCard = async () => {
    if (GlobalConfig.Connected === 0) {
      setTimeout(() => {
        scanCreditCard();
      }, 1000);
      return;
    } else if (GlobalConfig.Connected === 2) {
      return;
    }
    /*===== TEMP : START ====*/
    // setTimeout(()=>{
    //   let result =
    //   'u001eANSI 636015080001DL00410285ZC03260033DLDCACDCBNONEDCDNONEDBA01312022DCSHODARDACRATANDADGOVINDDBD08112017DBB01311978DBC1DAYBRNDAU069 INDAG388 BEALE ST APT 805DAISAN FRANCISCODAJCADAK941050000  DAQY8199490DCF08/11/2017503C8/DDFD/22DCGUSADDEUDDFUDDGUDAW164DAZBLKDCK17223Y81994900401DDB04162010DDD0ZCZCAZCBZCCBRNZCDBLKZCEZCF"';
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
    console.log(new Date());
    HubConnection.ACTION("ReadSwipe", "IUC285", -1).then(
      (data) => {
        console.log(new Date());
        console.log(data);
      }
    );

    // HubConnection.ACTION("CancelCardRead", "IUC285").then((data) => {
    //   console.log(data);
    //   if (!data) return;
    //   if (data.success) {
    //     // HubConnection.proxy.on("barcodeScanned", function (result) {
    //     //   console.log("Scan successful!: " + result);

    //     //   HubConnection.ACTION("CancelScanWait", "Honeywell3330G");
          
    //     //   console.log(result);
    //     //   if (typeof result == "object" && result.name) {
    //     //     props.history.push(to.captureFront);
    //     //   } else {
    //     //     console.log("id not valid");
    //     //   }
    //     // });
    //     HubConnection.ACTION("ReadSwipe", "IUC285", -1).then(
    //       (data) => {
    //         console.log(data);
    //       }
    //     );
    //   }
    // });
  };

  return (
    <div className="container">
      <h2 className="maintitle">
        Swipe your <span>Credit Card</span> to do payment
      </h2>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <div
          className="formarea fixarea"
          onClick={() => props.history.push(to.selectKeys)}
        >
          <img src={CaptureGif} />
        </div>
        <div className="col-md-12 text-center mtop">
          <button
            className="cancelbutton"
            onClick={() => props.history.push(to.checkIn)}
          >
            Cancel{" "}
          </button>
          {/* <ContinueButton onClick={() =>startNFC} /> */}
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default SwipeCreditCard;
