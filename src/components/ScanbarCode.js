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

const ScanbarCode = (props) => {
  const [disableRescan, setDisableRescan] = useState(true);
  const [counter, setCounter] = useState(180000);
  useEffect(() => {
    // setTimeout(() => {
    //   startScan();
    // }, 5000);
    
  });

  useEffect(() => {
    HubConnection.ACTION("CancelScanWait", "Honeywell3330G");
    setTimeout(()=>{
      startScan();
    },2000)
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
    // setCounter(18000);
    // setDisableRescan(true);
    if (GlobalConfig.Connected === 0) {
      setTimeout(() => {
        startScan();
      }, 1000);
      return;
    } else if (GlobalConfig.Connected === 2) {
      return;
    }
   
/*===== INIT TEMP : START ====*/
// HubConnection.proxy.on("barcodeScanned", function (result) {
//   console.log("barcodeScanned *** Scan successful!: " + result);
//   if(result && result.HardwareResult === 0){
//     if (result && result.Data) {
//       result.Data = result.Data.replace("@ANSI ", "u001eANSI ");
//       result = pdf417(result.Data);
//       validateDetail(result);
//     }
//   }
//   // HubConnection.ACTION("CancelScanWait", "Honeywell3330G");
//   // props.history.push(to.scanId)

// });

    // HubConnection.ACTION("CancelScanWait", "Honeywell3330G").then((data) => {

    //     HubConnection.ACTION("startScanBarcode", "Honeywell3330G", false).then(
    //       (data) => {
    //         console.log("[startScanBarcode == ]",data); 
    //         // HubConnection.ACTION("CancelScanWait", "Honeywell3330G");
    //         HubConnection.ACTION("Scan", "Honeywell3330G").then((result) => {
    //           console.log(`Scan  execution done  `,result.success);
    //           console.log(`Scan  execution done  `,result.result.Data);

    //           if (result.success && result.result.Data) {
    //             // result.Data = result.Data.replace("@ANSI ", "u001eANSI ");
    //             result = pdf417(result.result.Data);
    //             console.log(result)
    //             validateDetail(result);
    //           }
    //           HubConnection.ACTION("CancelScanWait", "Honeywell3330G");
    //         });
    //       }
    //     );
        
      
    // });
    HubConnection.ACTION("startScanBarcode", "Honeywell3330G", false).then(
      (data) => {
        HubConnection.ACTION("Scan", "Honeywell3330G").then((result) => {
          console.log(`Scan  execution done  `,result.success);
          console.log(`Scan  execution done  `,result.result.Data);
    
          if (result.success && result.result.Data) {
            // result.Data = result.Data.replace("@ANSI ", "u001eANSI ");
            result = pdf417(result.result.Data);
            console.log(result)
            validateDetail(result);
          }
          // HubConnection.ACTION("CancelScanWait", "Honeywell3330G");
        });
      });
   
  };
  const validateDetail = (result) => {
    if (typeof result == "object" && result.name && result.name.first) {
      GlobalConfig.UserScanDetail = {
        firstName: result.name.first,
        lastName: result.name.last,
        address: result.address,
        state: result.state,
        city: result.city,
        birthday: result.birthday,
        postalCode: result.postal_code,
        sex: result.sex,
        dl: result.dl,
      };
      if (
        Math.floor(
          moment(new Date()).diff(
            moment(GlobalConfig.UserScanDetail.birthday, "YYYYMMDD"),
            "years",
            true
          )
        ) < 18
      ) {
        //ADD TOST : AGE UNDER 18
        props.history.push(to.home);
      }

      if (
        String(GlobalConfig.Bookings[0].guest_fname).toLowerCase() !=
          String(GlobalConfig.UserScanDetail.firstName).toLowerCase() ||
        String(GlobalConfig.Bookings[0].guest_lname).toLowerCase() !=
          String(GlobalConfig.UserScanDetail.lastName).toLowerCase()
      ) {
        //ADD TOST : LICENCE DETAIL NOT MATCH
        // props.history.push(to.scanId);
        return;
      }
      if(GlobalConfig.Bookings[0].pre_chekin_status){
        props.history.push(to.selectKeys);
      }else{
        if (GlobalConfig.Hotel.allowed_doc_scan || true) {
          props.history.push(to.captureFront);
        } else {
          props.history.push(to.confirmDetails);
        }
      }
      
    } else {
      // ADD TOST : INVALID BARCODE
    }
  };

  const processNext = ()=>{
      let result =
      // 'u001eANSI 636015080001DL00410285ZC03260033DLDCACDCBNONEDCDNONEDBA01312022DCSHODARDACRATANDADGOVINDDBD08112017DBB01311978DBC1DAYBRNDAU069 INDAG388 BEALE ST APT 805DAISAN FRANCISCODAJCADAK941050000  DAQY8199490DCF08/11/2017503C8/DDFD/22DCGUSADDEUDDFUDDGUDAW164DAZBLKDCK17223Y81994900401DDB04162010DDD0ZCZCAZCBZCCBRNZCDBLKZCEZCF"';
      // '@ANSI 636014040002DL00410288ZC03290034DLDCACDCBNONEDCDNONEDBA11092020DCSDESAIDACMRUNALDADHEMANTKUMARDBD11242015DBB11091982DBC1DAYBLKDAU067 INDAG2167 EL CAPITAN AVEDAISANTA CLARADAJCADAK950500000  DAQD3634400DCF11/24/20156453A/AAFD/20DCGUSADDEUDDFUDDGUDAW180DAZBLKDCK15328D36344000401DDB04162010DDD0ZCZCAYZCBZCCBLKZCDBLKZCEZCF"';
      'u001eANSI 636015080001DL00310274DLDCACDDAFDDB10102016DCBNONEDCDNONEDBA07132026DCSDESAIDDENDACCHINTAKDDFNDADNONEDDGNDBD09092019DBB07131987DBC1DAYBRODAZBLKDAU070 INDAW170DCLADAG5418 ANITA STDAIDALLASDAJTXDAK752060000  DCK45110063  20190911DAQ45110063DCF42111940195029205598DCGUSA"';
  
    result = pdf417(result);
    validateDetail(result);
  }

  useEffect(() => {
    let intervalId;

    if (counter === 0) {
      setDisableRescan(false);
      return;
    }

    if (counter > 0) {
      intervalId = setInterval(() => {
        setCounter(counter - 1000);
        // console.log({ counter });
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
            // onClick={()=>startScan()}
          />
        </div>
        <div className="col-md-12 text-center mtop">
          <ContinueButton onClick={processNext} />
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
      {/* <Footer /> */}
    </div>
  );
};
export default ScanbarCode;
