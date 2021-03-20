import React, { useState, useContext } from "react";
import HubConnection from "../Connection/hubConnection";
import { to } from "../RoutesPath";
import ContinueButton from "./Widgets/ContinueButton";
import Footer from "./Widgets/Footer";
import AlertPopup from "./Widgets/AlertPopup";
import { GlobalContext } from "../assets/js/context";
import Loader from "./Widgets/Loader";
import { LANG } from "../assets/js/language";
import { parseString } from "xml2js";
import moment from "moment";
import axios from "axios";
import { GlobalConfig } from "../assets/js/globleConfig";


const SelectKeys = (props) => {
  const [text, setText] = useState({ header: "", subHeader: "" });
  const [alert, setAlert] = useState(false);
  const [uid, setUid] = useState("");
  const [key, setKey] = useState("");
  const [WriteMifareRawData, setWriteMifareRawData] = useState(false);
  const [EjectCard, setEjectCard] = useState(false);
  const [keyLogs, setKeyLogs] = useState([]);

  const [startRemove, setStartRemove] = useState(16);
  const [endRemove, setEndRemove] = useState(0);

  const { loading, setLoading, lang } = useContext(GlobalContext);
  const SelectedBooking = GlobalConfig.SelectedBooking;
  // const dispatchKeysO = async (keyCount = 1) => {
  //   setLoading(true);
  //   try {
  //     await processKey();
  //     if (keyCount === 2) await processKey();
  //     setLoading(false);
  //     props.history.push(to.thankYou);
  //   } catch (err) {
  //     setAlert(true);
  //     setText({
  //       header: LANG[lang].Error,
  //       subHeader: LANG[lang].Something_went_wrong,
  //     });
  //     setLoading(false);

  //     // TOST Error
  //   }
  // };


const generateCardKey = async (keyCount = 1) => {
  return new Promise((resolve) => {
    try {
      console.log("[generateCardKey]")
      setKey("generateCardKey")
      // HubConnection.ACTION("CardSet", "SCT3Q8").then((result) => {
      // console.log("[CardSet]",result)
      HubConnection.ACTION("ActivateMifare", "SCT3Q8", "Mifare1k").then(
        (result) => {
          setKey("result generateCardKey")
          console.log(result)
          if (result.result.Data && result.result.Data.length) {
            setKey("success generateCardKey", result.result.Data)

            let haxCode = "";
            result.result.Data.map((ele) => {
              haxCode += Number(ele).toString(16)
            })

            // let kLogs = [...keyLogs];
            // kLogs.push("[ActivateMifare=>] "+haxCode);

            setKeyLogs(arr => [...arr, "[ActivateMifare  UUID =>] " + result.result.Data.toString()])
            setKeyLogs(arr => [...arr, "[ActivateMifare  UUID Hex=>] " + haxCode])


            setUid(haxCode)


            dispatchKeys(keyCount, haxCode)
          } else {
            /* Remove this Temporary*/
            result.Data = [137, 157, 207, 239]
            let haxCode = "";
            result.Data.map((ele) => {
              haxCode += Number(ele).toString(16);
            })
            console.log(haxCode)
            // let kLogs = [...keyLogs];
            // kLogs.push("[ActivateMifare_ Error=>] "+haxCode);

            // setKeyLogs( arr => [...arr, "[ActivateMifare_ Error=>] "+haxCode])


            setKeyLogs(arr => [...arr, "[ActivateMifare Error UUID =>] " + result.Data.toString()])
            setKeyLogs(arr => [...arr, "[ActivateMifare Error UUID Hex=>] " + haxCode])
            dispatchKeys(keyCount, haxCode)
          }

          // setWriteMifareRawData(JSON.stringify(result))
          // console.log("[WriteMifareRawData WriteTrack1]",result)
          // HubConnection.ACTION("EjectCard", "SCT3Q8").then((result) => {
          //   setEjectCard(JSON.stringify(result))
          //   console.log("[EjectCard]",result)
          //   //alert(result)
          //   resolve("done");
          // });
        }
      );
      // });
    } catch (err) {


      let Data = [137, 157, 207, 239]
      let haxCode = "";
      Data.map((ele) => {
        haxCode += Number(ele).toString(16);
      })
      console.log(haxCode)
      // let kLogs = [...keyLogs];
      // kLogs.push("[ActivateMifare Error=>] "+haxCode);
      setKeyLogs(arr => [...arr, "[ActivateMifare_ Error UUID =>] " + Data.toString()])
      setKeyLogs(arr => [...arr, "[ActivateMifare_ Error UUID Hex=>] " + haxCode])
      dispatchKeys(keyCount, haxCode)
      resolve("error");
    }
  });
};


const dispatchKeys = async (keyCount = 1, haxCode = "AAAAAAAA") => {
  setLoading(true);
  setKey("dispatchKeys");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/xml; charset=utf-8");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  myHeaders.append("SOAPAction", "http://tempuri.org/CreateNewBooking");

  let created = moment().utc().format();
  let expires = moment(SelectedBooking.checkout_time).utc().format();
  let reservationId = SelectedBooking.id;
  let checkInDate = moment(SelectedBooking.checkin_time).utc().format(); //"2020-11-21T04:27:13.6115233-08:00";
  let checkOutDate = moment(SelectedBooking.checkout_time).utc().format(); //"2020-11-21T04:27:53.6115233-08:00";
  let roomNumber = SelectedBooking.room_number;
  var raw = `<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <s:Header>\n    <h:AuthHeader xmlns=\"http://tempuri.org\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:h=\"http://tempuri.org\">\n      <Action xmlns=\"http://schemas.xmlsoap.org/ws/2004/08/addressing\">http://localhost:1619/MessengerPMSWS.asmx/CreateNewBooking</Action>\n      <From xmlns=\"http://schemas.xmlsoap.org/ws/2004/08/addressing\">urn:KABA</From>\n      <MessageID xmlns=\"http://schemas.xmlsoap.org/ws/2004/08/addressing\">a9327d70-6037-40df-bb87-0467a996d25b</MessageID>\n      <ReplyTo xmlns=\"http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous\" />\n      <To xmlns=\"http://schemas.xmlsoap.org/ws/2004/08/addressing\">http://localhost:1619/MessengerPMSWS.asmx</To>\n      <h:Security>\n        <Timestamp xmlns=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">\n          <Id>a50730b6-4571-48da-a9bd-b92c923932d6</Id>\n          <Created>${created}</Created>\n          <Expires>${expires}</Expires>\n        </Timestamp>\n        <UsernameToken xmlns=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">\n          <Id>e64bd314-b488-4384-9c8e-24fb1d022797</Id>\n          <Username>${GlobalConfig.KABA_USERNAME}</Username>\n          <Password>${GlobalConfig.KABA_PASSWORD}</Password>\n          <Nonce />\n          <Created>${created}</Created>\n        </UsernameToken>\n      </h:Security>\n    </h:AuthHeader>\n  </s:Header>\n  <s:Body xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\n    <CreateNewBooking xmlns=\"http://tempuri.org\">\n      <ReservationID>${reservationId}</ReservationID>\n      <SiteName>Main</SiteName>\n      <PMSTerminalID>WS1</PMSTerminalID>\n      <EncoderID>0</EncoderID>\n      <CheckIn>${checkInDate}</CheckIn>\n      <CheckOut>${checkOutDate}</CheckOut>\n      <GuestName xmlns=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">GuestTest</GuestName>\n      <MainRoomNo>${roomNumber}</MainRoomNo>\n      <bGrantAccessPredefinedSuiteDoors>false</bGrantAccessPredefinedSuiteDoors>\n      <VariableRoomList />\n      <CommonAreaList>\n        <CCommonAreas>\n          <PassLevelNo>1</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>2</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>3</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>4</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>5</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>6</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>7</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>8</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>9</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>10</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>11</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n        <CCommonAreas>\n          <PassLevelNo>12</PassLevelNo>\n          <eMode>DefaultConfiguredAccess</eMode>\n        </CCommonAreas>\n      </CommonAreaList>\n      <TrackIIFolioNo />\n      <TrackIGuestNo />\n      <KeyCount>1</KeyCount>\n      <KeySize>1</KeySize>\n      <UID>${haxCode}</UID>\n    </CreateNewBooking>\n  </s:Body>\n</s:Envelope>`;

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  };
  setKey(GlobalConfig.KABA);
  fetch(
    GlobalConfig.KABA,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      // console.log(result);
      setKey(result.toString());
      // let kLogs = [...keyLogs];
      // kLogs.push("[CreateNewBooking SOAP=>] "+result.toString());

      parseString(result, { trim: true }, async function (err, result) {
        try {
          let key =
            result["s:Envelope"]["s:Body"][0]["CreateNewBookingResponse"][0][
            "CreateNewBookingResult"
            ][0]["CMessengerResponse"][0]["retAccessKey"][0]["_"];
          console.log(key)
          setKey(key);
          setKeyLogs(arr => [...arr, "[BASE64 Key=>] " + key])
          await processKey(key);
          if (keyCount === 2){
            processDuplicateKey();
          }  
          else{
            setLoading(false);
            props.history.push(to.thankYou);
          }
          //  props.history.push(to.thankYou);
        } catch (err) {
          setLoading(false);
        }
      });
    })
    .catch((error) => {
      setKey(error.toString());
      setLoading(false);
      console.log("error", error)
    });
};

const processDuplicateKey = async () => {
  HubConnection.ACTION("MonitorForRemoval", "SCT3Q8", 5).then(
    (result) => {
      if (result.result.Data) {
        generateDuplicateCardKey()
      } else {
        processDuplicateKey(2);
      }

    }
  );
}


const generateDuplicateCardKey = async (keyCount = 1) => {
  return new Promise((resolve) => {
    try {
      console.log("[generateCardKey]")
      setKey("generateCardKey")
      // HubConnection.ACTION("CardSet", "SCT3Q8").then((result) => {
      // console.log("[CardSet]",result)
      HubConnection.ACTION("ActivateMifare", "SCT3Q8", "Mifare1k").then(
        (result) => {
          setKey("result generateCardKey")
          console.log(result)
          if (result.result.Data && result.result.Data.length) {
            setKey("success generateCardKey", result.result.Data)

            let haxCode = "";
            result.result.Data.map((ele) => {
              haxCode += Number(ele).toString(16)
            })

            // let kLogs = [...keyLogs];
            // kLogs.push("[ActivateMifare=>] "+haxCode);

            setKeyLogs(arr => [...arr, "[ActivateMifare  UUID =>] " + result.result.Data.toString()])
            setKeyLogs(arr => [...arr, "[ActivateMifare  UUID Hex=>] " + haxCode])


            setUid(haxCode)


            dispatchDuplicateKeys(keyCount, haxCode)
          } else {
            /* Remove this Temporary*/
            result.Data = [137, 157, 207, 239]
            let haxCode = "";
            result.Data.map((ele) => {
              haxCode += Number(ele).toString(16);
            })
            console.log(haxCode)
            // let kLogs = [...keyLogs];

            setKeyLogs(arr => [...arr, "[ActivateMifare Error UUID =>] " + result.Data.toString()])
            setKeyLogs(arr => [...arr, "[ActivateMifare Error UUID Hex=>] " + haxCode])
            dispatchDuplicateKeys(keyCount, haxCode)
          }

        }
      );
      // });
    } catch (err) {


      let Data = [137, 157, 207, 239]
      let haxCode = "";
      Data.map((ele) => {
        haxCode += Number(ele).toString(16);
      })
      console.log(haxCode)
      // let kLogs = [...keyLogs];
      // kLogs.push("[ActivateMifare Error=>] "+haxCode);
      setKeyLogs(arr => [...arr, "[ActivateMifare_ Error UUID =>] " + Data.toString()])
      setKeyLogs(arr => [...arr, "[ActivateMifare_ Error UUID Hex=>] " + haxCode])
      dispatchKeys(keyCount, haxCode)
      resolve("error");
    }
  });
};

const dispatchDuplicateKeys = async (keyCount = 1, haxCode = "AAAAAAAA") => {
  setLoading(true);
  setKey("dispatchKeys");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/xml; charset=utf-8");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  myHeaders.append("SOAPAction", "http://tempuri.org/MakeDuplicateKey");

  let created = moment().utc().format();
  let expires = moment(SelectedBooking.checkout_time).utc().format();
  let reservationId = SelectedBooking.id;
  let guestName = SelectedBooking.user ? SelectedBooking.user.guest_fname : "";
  let checkInDate = moment(SelectedBooking.checkin_time).utc().format(); //"2020-11-21T04:27:13.6115233-08:00";
  let checkOutDate = moment(SelectedBooking.checkout_time).utc().format(); //"2020-11-21T04:27:53.6115233-08:00";
  let roomNumber = SelectedBooking.room_number;
  var raw = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
    <s:Header>
      <h:AuthHeader xmlns="http://tempuri.org" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:h="http://tempuri.org">
        <Action xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing">http://localhost:1619/MessengerPMSWS.asmx/MakeDuplicateKey</Action>
        <From xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing">urn:KABA</From>
        <MessageID xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing">cdd11cf1-fbda-41b6-9315-ccd519c75ee9</MessageID>
        <ReplyTo xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous" />
        <To xmlns="http://schemas.xmlsoap.org/ws/2004/08/addressing">http://localhost:1619/MessengerPMSWS.asmx</To>
        <h:Security>
          <Timestamp xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
            <Id>20238512-5f3c-44ae-a6f1-a0fda1cab567</Id>
            <Created>${created}</Created>
            <Expires>${expires}</Expires>
          </Timestamp>
          <UsernameToken xmlns="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
            <Id>4ebfa482-5e35-4544-b512-abaea3aad292</Id>
            <Username>${GlobalConfig.KABA_USERNAME}</Username>
            <Password>${GlobalConfig.KABA_PASSWORD}</Password>
            <Nonce />
            <Created>${created}</Created>
          </UsernameToken>
        </h:Security>
      </h:AuthHeader>
    </s:Header>
    <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
      <MakeDuplicateKey xmlns="http://tempuri.org">
        <ReservationID>${reservationId}</ReservationID>
        <SiteName>WS1</SiteName>
        <PMSTerminalID>Main</PMSTerminalID>
        <EncoderID>0</EncoderID>
        <KeyCount>1</KeyCount>
        <KeySize>1</KeySize>
        <UID>${haxCode}</UID>
        <GuestName>${guestName}</GuestName>
      </MakeDuplicateKey>
    </s:Body>
  </s:Envelope>`;

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  };
  setKey(GlobalConfig.KABA);
  fetch(
    GlobalConfig.KABA,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      // console.log(result);
      setKey(result.toString());
      // let kLogs = [...keyLogs];
      // kLogs.push("[CreateNewBooking SOAP=>] "+result.toString());

      parseString(result, { trim: true }, async function (err, result) {
        try {
          let key =
            result["s:Envelope"]["s:Body"][0]["MakeDuplicateKeyResponse"][0][
            "MakeDuplicateKeyResult"
            ][0]["CMessengerResponse"][0]["retAccessKey"][0]["_"];
          console.log(key)
          setKey(key);
          setKeyLogs(arr => [...arr, "[BASE64 Key=>] " + key])
          await processKey(key);
          setLoading(false);
          props.history.push(to.thankYou);
        } catch (err) {
          setLoading(false);
        }
      });
    })
    .catch((error) => {
      setKey(error.toString());
      setLoading(false);
      console.log("error", error)
    });
};

const base64ToHex = async (str) => {
  const raw = atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result.toUpperCase();
}

const base64ToDecimalArr = async (str) => {
  let convertedToAscii = atob(str);
  let arrayData = [];
  for (let n = 0, l = convertedToAscii.length; n < l; n++) {
    var decimal = Number(convertedToAscii.charCodeAt(n));
    arrayData.push(decimal);
  }
  return arrayData;
}

const hex2a = async (hexx) => {
  let hex = hexx.toString();
  let str = '';
  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

const ascii_to_hexa = async (str) => {

  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
}

const processKey = async (data) => {

  // data = await base64ToHex(data);
  // setKeyLogs( arr => [...arr, "[base64ToHex=>] "+data])

  // data =  data.substring(32);
  // setKeyLogs( arr => [...arr, "[Remove First 32 Characters=>] "+data])

  // data =  data.substring(0, data.length - 1024);
  // setKeyLogs( arr => [...arr, "[Remove last 1024 Characters=>] "+data])

  // data = await hex2a(data);
  // setKeyLogs( arr => [...arr, "[ASCII=>] "+data])

  data = await base64ToDecimalArr(data);
  setKeyLogs(arr => [...arr, "[base64ToDecimal=>] " + data.toString()])

  data.splice(0, Number(startRemove));
  setKeyLogs(arr => [...arr, `[remove first ${startRemove}=>] ` + data.toString()])

  data.splice(data.length - Number(endRemove))
  setKeyLogs(arr => [...arr, `[remove last ${endRemove}=>] ` + data.toString()])

  return new Promise((resolve) => {
    try {
      console.log("[processKey]")
      // HubConnection.ACTION("CardSet", "SCT3Q8").then((result) => {
      // console.log("[CardSet]",result)
      HubConnection.ACTION("WriteMifareMemoryMap", "SCT3Q8", data).then(
        (result) => {
          setWriteMifareRawData(JSON.stringify(result))
          setKeyLogs(arr => [...arr, "[WriteMifareRawData=>] " + JSON.stringify(result)])
          console.log("[WriteMifareRawData WriteTrack1]", result)
          HubConnection.ACTION("EjectCard", "SCT3Q8").then((result) => {
            setEjectCard(JSON.stringify(result))
            setKeyLogs(arr => [...arr, "[EjectCard=>] " + JSON.stringify(result)])
            console.log("[EjectCard]", result)
            //alert(result)
            resolve("done");
          });
        }
      );
      // });
    } catch (err) {
      setLoading(false);
      resolve("error");
    }
  });
};
return (
  <>
    {loading && <Loader />}

    <AlertPopup
      isVisible={alert}
      header={text.header}
      subHeader={text.subHeader}
      onCancel={() => {
        setAlert(false);
      }}
      cancelText={LANG[lang].Back}
    />
    <div className="container transparent">
      {/* {keyLogs.map((ele)=>{
              return <div>{ele}</div>
            })}
          <br/> */}
      {/* {WriteMifareRawData} */}
      {/* <br/> */}
      {/* {EjectCard} */}
      {/* <div className="p-t-31 p-b-9">
              <span className="txt1">First Remove </span>
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="number"
                  value={startRemove}
                  onChange={(e) => {
                  setStartRemove(e.target.value);
                }}
              />
              <span className="focus-input100"></span>
            </div>
            <div className="p-t-31 p-b-9">
              <span className="txt1">Last Remove </span>
            </div>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="number"
                  value={endRemove}
                  onChange={(e) => {
                  setEndRemove(e.target.value);
                }}
              />
              <span className="focus-input100"></span>
            </div> */}
      <h2 className="maintitle">

        {LANG[lang].Please_select_number_of_room_key}
      </h2>
      <div className="row mt-5">
        <div className=" col-md-1"></div>
        <div className="col-md-5">
          <div
            className="bluebutton customtext"
            onClick={() => generateCardKey(1)}
          >
            {" "}
            <span>1</span>
            <div className="noverlay"></div>
          </div>
        </div>
        <div className="col-md-5">
          <div
            className="bluebutton customtext"
            onClick={() => generateCardKey(2)}
          >
            {" "}
            <span>2</span>
            <div className="noverlay"></div>
          </div>
        </div>
        <div className="col-md-12 text-center mtop">
          <ContinueButton onClick={() => props.history.push(to.thankYou)} />
          {/* <ContinueButton onClick={() =>startNFC} /> */}
        </div>
      </div>
    </div>

    <Footer />
  </>
);
};
export default SelectKeys;
