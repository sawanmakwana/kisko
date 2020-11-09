import React, { useState, useEffect, useContext } from "react";
import Footer from "./Widgets/Footer";
import { to } from "../RoutesPath";
import CaptureGif from "../assets/images/capture-photo.gif";
import ContinueButton from "./Widgets/ContinueButton";
import HubConnection from "../Connection/hubConnection";
import { GlobalConfig } from "../assets/js/globleConfig";
import Loader from "./Widgets/Loader";
import AlertPopup from "./Widgets/AlertPopup";
import { GlobalContext } from "../assets/js/context";
const SwipeCreditCard = (props) => {
  const { loading, setLoading } = useContext(GlobalContext);
  const [text, setText] = useState({ header: "", subHeader: "" });
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    HubConnection.ACTION("CancelCardRead", "IUC285");
    HubConnection.ACTION("DisableNfc", "IUC285");
    HubConnection.ACTION("DisableSmartCard", "IUC285");

    scanCreditCard();

    // setTimeout(()=>{
    //   processNextScreen();
    // },3000)

    return () => {
      // interval && clearInterval(interval);
      // HubConnection.ACTION(
      //   "CancelCardRead",
      //   "IUC285"
      // ).then((data) => {});
      // HubConnection.proxy.off("DisableNfc", function (result) {
      //   console.log("DisableNfc: " + result);
      // });
      HubConnection.ACTION("CancelCardRead", "IUC285");
      HubConnection.ACTION("DisableNfc", "IUC285");
      HubConnection.ACTION("DisableSmartCard", "IUC285");
    };
  }, []);

  const scanCreditCard = async () => {
    // setLoading(true);
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

    /*===== TESTED OK START ====*/
    // HubConnection.ACTION("ReadSwipe", "IUC285", -1).then((data) => {
    //   console.log("ReadSwipe : START =======");
    //   console.log("ReadSwipe : ", data);
    //   console.log("ReadSwipe : ", new Date());
    //   console.log("ReadSwipe : END =======");
    // });
    /*===== TESTED OK END ====*/

    /*===== TEMP : END ====*/

    // HubConnection.ACTION("EnableNfc", "IUC285").then((data) => {
    //   console.log("EnableNfc : START =======");
    //   console.log("EnableNfc : ", data);
    //   console.log("EnableNfc : ", new Date());
    //   console.log("EnableNfc : END =======");
    //   HubConnection.ACTION("ReadNfc", "IUC285", 1.5, -1).then((data) => {

    //     console.log("ReadNfc : START =======");
    //     console.log("ReadNfc : ", data);
    //     console.log("ReadNfc : ", new Date());
    //     console.log("ReadNfc : END =======");
    //     HubConnection.ACTION("DisableNfc", "IUC285");
    //   });
    // });

    HubConnection.ACTION("EnableSmartCard", "IUC285").then((data) => {
      console.log("EnableSmartCard : START =======");
      console.log("EnableSmartCard : ", data);
      HubConnection.ACTION("ReadSmartCard", "IUC285", 1, -1)
        .then((data) => {
          processNextScreen();
          console.log("ReadSmartCard : START =======");
          console.log("ReadSmartCard : ", data);
          HubConnection.ACTION("DisableSmartCard", "IUC285");
        })
        //For card error...need to fix the case for alert !! (Multiple alert)
        // .catch((err) => {
        //   setLoading(false);
        //   setAlert(true);
        //   setText({ header: "Error", subHeader: "Something went wrong with payment" });
        // });

      // HubConnection.ACTION("ReadSwipe", "IUC285", -1).then((data) => {
      //   processNextScreen();
      //   console.log("ReadSwipe : START =======");
      //   console.log("ReadSwipe : ", data);
      //   console.log("ReadSwipe : ", new Date());
      //   console.log("ReadSwipe : END =======");
      // });
    });

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
    setLoading(false);
  };

  const processNextScreen = () => {
    props.history.push(to.selectKeys);
  };
  return (
    <div className="container">
      {loading && <Loader />}
      <AlertPopup
        isVisible={alert}
        header={text.header}
        subHeader={text.subHeader}
        onCancel={() => {
          setAlert(false);
        }}
        cancelText={"no"}
        successText={"yes"}
        onSuccess={() => {
          setAlert(false);
          props.history.push(to.home);
        }}
      />
      <h2 className="maintitle">
        Insert your <span>Credit Card</span> to do payment
      </h2>
      <form className="login100-form validate-form flex-sb flex-w mtop">
        <div
          className="formarea fixarea"
          // onClick={() => props.history.push(to.selectKeys)}
        >
          <img src={CaptureGif} alt="capture" />
        </div>
        <div className="col-md-12 text-center mtop">
          <button
            className="cancelbutton"
            // onClick={() => {
            //   setAlert(true);
            //   setText({
            //     header: "Cancel Checkin",
            //     subHeader: "Are you sure you want to cancel checkin ?",
            //   });
            // }}
            
            onClick={() => props.history.push(to.terms)}
          >
            Back{" "}
          </button>
          <ContinueButton onClick={() => props.history.push(to.selectKeys)} />
          {/* <ContinueButton onClick={() =>startNFC} /> */}
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default SwipeCreditCard;
