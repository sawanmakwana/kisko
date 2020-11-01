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
  let interval = null;
  useEffect(() => {
    setTimeout(()=>{
      startScan();
    },5000)
    

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
    // if (GlobalConfig.Connected === 0) {
    //   setTimeout(() => {
    //     startScan();
    //   }, 1000);
    //   return;
    // } else if (GlobalConfig.Connected === 2) {
    //   return;
    // }
    /*===== TEMP : START ====*/
    // setTimeout(()=>{
    let result =
      // 'u001eANSI 636015080001DL00410285ZC03260033DLDCACDCBNONEDCDNONEDBA01312022DCSHODARDACRATANDADGOVINDDBD08112017DBB01311978DBC1DAYBRNDAU069 INDAG388 BEALE ST APT 805DAISAN FRANCISCODAJCADAK941050000  DAQY8199490DCF08/11/2017503C8/DDFD/22DCGUSADDEUDDFUDDGUDAW164DAZBLKDCK17223Y81994900401DDB04162010DDD0ZCZCAZCBZCCBRNZCDBLKZCEZCF"';
      // '@ANSI 636014040002DL00410288ZC03290034DLDCACDCBNONEDCDNONEDBA11092020DCSDESAIDACMRUNALDADHEMANTKUMARDBD11242015DBB11091982DBC1DAYBLKDAU067 INDAG2167 EL CAPITAN AVEDAISANTA CLARADAJCADAK950500000  DAQD3634400DCF11/24/20156453A/AAFD/20DCGUSADDEUDDFUDDGUDAW180DAZBLKDCK15328D36344000401DDB04162010DDD0ZCZCAYZCBZCCBLKZCDBLKZCEZCF"';
    'u001eANSI 636015080001DL00310274DLDCACDDAFDDB10102016DCBNONEDCDNONEDBA07132026DCSDESAIDDENDACCHINTAKDDFNDADNONEDDGNDBD09092019DBB07131987DBC1DAYBRODAZBLKDAU070 INDAW170DCLADAG5418 ANITA STDAIDALLASDAJTXDAK752060000  DCK45110063  20190911DAQ45110063DCF42111940195029205598DCGUSA"'
    // data = "asdas"
    result = pdf417(result);
    validateDetail(result)
    // },2000)

    /*===== TEMP : END ====*/

    HubConnection.ACTION("Scan", "Honeywell3330G").then((result) => {
      console.log(`Scan  execution done  `, result);
      if (result && result.Data) {
        result.Data = result.Data.replace("@ANSI ", "u001eANSI ");
        result = pdf417(result.Data);
        validateDetail(result)
      }
    });
  };
  const validateDetail = (result)=>{
    if (typeof result == "object" && result.name && result.name.first ) {
      GlobalConfig.UserScanDetail = {
        firstName: result.name.first,
        lastName: result.name.last,
        address: result.address,
        state: result.state,
        city: result.city,
        birthday: result.birthday,
        postalCode: result.postal_code,
        sex:result.sex,
        dl:result.dl
      };
      if(Math.floor(moment(new Date()).diff(moment(GlobalConfig.UserScanDetail.birthday,"YYYYMMDD"),'years',true)) < 18){
        //ADD TOST : AGE UNDER 18
        props.history.push(to.home);

      }
      
      if(String(GlobalConfig.Booking[0].guest_fname).toLowerCase() != String(GlobalConfig.UserScanDetail.firstName).toLowerCase() ||
        String(GlobalConfig.Booking[0].guest_lname).toLowerCase() != String(GlobalConfig.UserScanDetail.lastName).toLowerCase()){
          //ADD TOST : LICENCE DETAIL NOT MATCH
          props.history.push(to.scanId);
        }
        if(GlobalConfig.Hotel.allowed_doc_scan){
          props.history.push(to.captureFront);
        }else {
          props.history.push(to.confirmDetails);
        }
       
  }else{
    // ADD TOST : INVALID
  }

}
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
        <div className="col-md-12 text-center mtop">
          <ContinueButton onClick={() => props.history.push(to.captureFront)} />
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
