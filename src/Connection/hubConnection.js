import { hubConnection } from "signalr-no-jquery";
import { GlobalConfig } from "../assets/js/globleConfig";
export const connection = hubConnection(GlobalConfig.KIOSK);
export const proxy = connection.createHubProxy("kioskHardwareHub");

class HubConnection {
  static ACTION = async (METHOD, DEVICE, MODE,TIMEOUT) => {
    return new Promise((resolve) => {
      if (GlobalConfig.Connected === 0)
        return { success: false, result: "Waiting for connection" };
      if (GlobalConfig.Connected === 2)
        return { success: false, result: "Connection Faild" };
      try {
        if (TIMEOUT !== undefined) {
            proxy
              .invoke(METHOD, DEVICE, MODE, TIMEOUT)
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
        else if (MODE !== undefined) {
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
