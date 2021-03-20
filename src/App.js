import "./assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import "./assets/css/util.css";
import "./assets/css/main.css";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";

import Routes from "./Routes";
import Clock from "./components/Widgets/Clock";
import { GlobalContext } from "./assets/js/context";
import { useState, useEffect } from "react";
import { GlobalConfig } from "./assets/js/globleConfig";
import { withRouter } from "react-router-dom";
import { connection, proxy } from "./Connection/hubConnection";
import socketIOClient from "socket.io-client";
import { SOCKET_BASE } from "./assets/js/endpoint";
function App(props) {
  const [lang, setLang] = useState(GlobalConfig.Language || "en");
  const [loading, setLoading] = useState(false);
  const [scanData, setScanData] = useState("");

  useEffect(() => {

    
    connection
      .start()
      .done(function () {
        GlobalConfig.Connected = 1;
        console.log("Now connected, connection ID=" + connection.id);
        proxy.invoke("CancelScanWait", "Honeywell3330G");
      })
      .fail(function () {
        GlobalConfig.Connected = 2;
        console.log("Could not connect");
      });
    proxy.on("barcodeScanned", function (result) {
      console.log({ result });
      setScanData(result);

      proxy.invoke("CancelScanWait", "Honeywell3330G");
    });
    console.log(GlobalConfig.Hotel,GlobalConfig.KIOSK_ID)
    
    const socket = socketIOClient(SOCKET_BASE+"?x-aavgo-hotelid="+ (GlobalConfig.Hotel?Number(GlobalConfig.Hotel.id):"")+"&x-aavgo-kioskid="+GlobalConfig.KIOSK_ID, {
      extraHeaders: {
        "x-aavgo-hotelid": GlobalConfig.Hotel?Number(GlobalConfig.Hotel.id):"",
        "x-aavgo-kioskid": GlobalConfig.KIOSK_ID,
        // "Content-Type": "application/json",
//         "x-aavgo-hotelid": "abqURWBDc/5vpcXO1uE4mg==",
// "x-access-token": "lzRLdFEkZbTUd4G/Htn1NXoX6XiWbwtsrSrDyHtE6Y0nv5t3x5QgOUObLJ8delc8pizt0mpz6Z/4aWUdrtecfC6LnfRoodHhWOSLJzd3ki41/mR1wBIgsTqsWCVG4lo04HEJJf8Or4aXomdxbAAJPsHTjV2S7FD/N8qFog3US5A=",
// "x-aavgo-staffappid": "eyv9IhOebSZTQGcz6KYs9Q==",
// "EIO": 3,
// "transport": "websocket"
      }
    });

    // HEADERS.append("Content-Type", "application/json");
    // // Settings && HEADERS.append("Authorization", `Bearer ${Settings.token}`);
    // HEADERS.append("x-aavgo-from-new", true);
    // GlobalConfig.Hotel && HEADERS.append("x-aavgo-hotelid", GlobalConfig.Hotel.hotel_id);
    // GlobalConfig.SelectedBooking && HEADERS.append("x-aavgo-guestappid", GlobalConfig.SelectedBooking.user.id);
    // HEADERS.append("x-access-token", `${token}`);
    
    // !isEncrypt && HEADERS.append("x-aavgo-crypto-disable", `true`);
    socket.on("topic_kiosk_id_"+GlobalConfig.KIOSK_ID, data => {
      console.log(data)
    });
    setInterval(()=>{
     
      console.log(socket.connected)
    },10000)
  }, []);

  return (
    <div className="limiter">
      <div className="container-login100" style={{backgroundImage:`linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    url(${GlobalConfig.Hotel && GlobalConfig.Hotel.background_image?GlobalConfig.Hotel.background_image:'/static/media/bg-01.a9cab101.jpg'})`}}>
        <Clock {...props} />
        {/* {GlobalConfig.Hotel && (
          <span
            onClick={() => {
              window.localStorage.clear();
              props.history.push(`/`);
            }}
          >
            Logout
          </span>
        )} */}
        <GlobalContext.Provider
          value={{ setLang, lang, loading, setLoading, scanData, setScanData }}
        >
          <Routes />
        </GlobalContext.Provider>
      </div>
    </div>
  );
}

export default withRouter(App);
