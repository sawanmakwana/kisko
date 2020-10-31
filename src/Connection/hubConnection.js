import { hubConnection } from "signalr-no-jquery";
import { KIOSK } from "../assets/js/endpoint";
import { GlobalConfig } from "../assets/js/globleConfig";
const connection = hubConnection(KIOSK);
const proxy = connection.createHubProxy("kioskHardwareHub");
connection
  .start()
  .done(function () {
    GlobalConfig.Connected = 1;
    console.log("Now connected, connection ID=" + connection.id);
  })
  .fail(function () {
    GlobalConfig.Connected = 2;
    console.log("Could not connect");
  });
class HubConnection {
  static ACTION = async (METHOD, DEVICE, MODE) => {
    return new Promise((resolve) => {
      if (GlobalConfig.Connected === 0)
        return { success: false, result: "Waiting for connection" };
      if (GlobalConfig.Connected === 2)
        return { success: false, result: "Connection Faild" };
      try {
        if (MODE !== undefined) {
          proxy
            .invoke(METHOD, DEVICE, MODE)
            .done((result) => {
              console.log(`${METHOD}  execution done  `);
              console.log(result);
              resolve({ success: true, result });
            })
            .fail((err) => {
              console.log(`${METHOD}  execution failed  `, err);
              resolve({ success: false, result: err });
            });
        } else {
          proxy
            .invoke(METHOD, DEVICE)
            .done((result) => {
              console.log(`${METHOD}  execution done  `);
              console.log(result);
              resolve({ success: true, result });
            })
            .fail((err) => {
              console.log(`${METHOD}  execution failed  `, err);
              resolve({ success: false, result: err });
            });
        }
      } catch (err) {
        resolve({ success: false, result: err });
      }
    });
  };
  
  static proxy = proxy;
}

export default HubConnection;
