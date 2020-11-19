import Settings from "./settings";
import React from "react";
import ErrorHandler from "./errorHandler";
import axios from "axios";
import { BASE, ENCRIPT } from "../assets/js/endpoint";
import CryptoJS from "crypto-js";
// import NotificationSystem from './notificationSystem';
import AppServiceClass from "../assets/js/environmentConfig";
import { GlobalContext } from "../assets/js/context";
const { key, iv, isEncrypt } = new AppServiceClass().getEnvironmentVariables();

class Connection extends React.Component {
  static BASE = BASE;

  static createHeaders = (token) => {
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${token || Settings.token}`);
    !isEncrypt && HEADERS.append("x-aavgo-crypto-disable", `true`);
    return HEADERS;
  };

  static responseRestructure = (response) => {
    ErrorHandler.errorHandler(response);
    return response.ok ? response.json() : response.json();
  };

  static POST = async (controllerName, actionName, body) => {
    console.log({ actionName });
    <GlobalContext.Consumer>
      {(value) => {
        console.log({ value });
        return value.setLoading([...(value.loading || []), actionName]);
      }}
    </GlobalContext.Consumer>;
    // console.log({ load: this.context.loading ,actionName});

    const HEADERS = Connection.createHeaders(body.token);
    delete body.token;
    if (isEncrypt) {
      let data = body;
      const requestObject = await this.encryptFunc(
        `${controllerName}/${actionName}`,
        data
      );
      const requestUrl = requestObject.cipherUrl;
      if (!(data instanceof FormData)) {
        data = { data: requestObject.cipherBody };
      }
      const RESULTS = await axios.post(
        `${Connection.BASE}${requestUrl}`,
        data,
        HEADERS
      );
      const toBedecryptedResponse = await this.decryptedResponse(RESULTS.data);

      <GlobalContext.Consumer>
        {(context) =>
          context.setLoading(
            context.loading.filter((item) => item !== actionName)
          )
        }
      </GlobalContext.Consumer>;

      return JSON.parse(toBedecryptedResponse);
    } else {
      const RESULTS = await fetch(
        `${Connection.BASE}${controllerName}/${actionName}`,
        {
          method: "POST",
          headers: HEADERS,
          body: JSON.stringify(body),
        }
      );
      <GlobalContext.Consumer>
        {(context) =>
          context.setLoading(
            context.loading.filter((item) => item !== actionName)
          )
        }
      </GlobalContext.Consumer>;
      return Connection.responseRestructure(RESULTS);
    }
  };

  static PUT = async (controllerName, actionName, body) => {
    const HEADERS = Connection.createHeaders();
    const RESULTS = await fetch(
      `${Connection.BASE}${controllerName}/${actionName}`,
      {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(body),
      }
    );
    return Connection.responseRestructure(RESULTS);
  };

  static DELETE = async (controllerName, actionName, body) => {
    const HEADERS = Connection.createHeaders();
    const RESULTS = await fetch(
      `${Connection.BASE}${controllerName}/${actionName}`,
      {
        method: "DELETE",
        headers: HEADERS,
        body: body ? JSON.stringify(body) : "",
      }
    );
    return Connection.responseRestructure(RESULTS);
  };

  static GET = async (controllerName, actionName, headers) => {
    const HEADERS = headers || Connection.createHeaders();
    const RESULTS = await fetch(
      `${Connection.BASE}${controllerName}/${actionName}`,
      {
        method: "GET",
        headers: HEADERS,
      }
    );
    return Connection.responseRestructure(RESULTS);
  };

  static GET_FILE = async (controllerName, actionName, headers) => {
    const HEADERS = headers || Connection.createHeaders();
    const RESULTS = await fetch(
      `${Connection.BASE}${controllerName}/${actionName}`,
      {
        method: "GET",
        headers: HEADERS,
        responseType: "blob",
      }
    );
    return RESULTS;
  };

  static UPLOAD = async (
    controllerName,
    actionName,
    body,
    plainBody,
    contentType,
    method
  ) => {
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${Settings.token}`);
    if (contentType) HEADERS.append("Content-Type", contentType);
    const RESULTS = await fetch(
      `${Connection.BASE}${controllerName}/${actionName}`,
      {
        method: method || "POST",
        headers: HEADERS,
        body: plainBody ? body : JSON.stringify(body),
      }
    );
    return Connection.responseRestructure(RESULTS);
  };

  static UPLOAD_PROGRESS = async (
    controllerName,
    actionName,
    body,
    plainBody,
    contentType,
    method,
    progressEvent
  ) => {
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${Settings.token}`);
    if (contentType) HEADERS.append("Content-Type", contentType);
    const config = {
      headers: {
        Authorization: `Bearer ${Settings.token}`,
      },
      onUploadProgress: progressEvent,
    };
    let RESULTS;

    await axios({
      method: method,
      url: `${Connection.BASE}${controllerName}/${actionName}`,
      headers: {
        Authorization: `Bearer ${Settings.token}`,
      },
      data: plainBody ? body : JSON.stringify(body),
      onUploadProgress: progressEvent,
    })
      .then((data) => {
        // console.log("data.data",data.data)
        RESULTS = data.data;
      })
      .catch((data) => {
        // console.log("data.data",data.data)
        RESULTS = data;
      });
    return RESULTS;
  };

  static encryptFunc = async (url, data) => {
    let cipherUrl;
    let cipherBody;
    if (url) {
      cipherUrl = CryptoJS.AES.encrypt(url, key, { iv }).toString();
      cipherUrl = cipherUrl.replace(/\//g, "@");
      cipherUrl = encodeURIComponent(cipherUrl);
    }
    if (data) {
      cipherBody = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
        iv,
      }).toString();
    }
    return {
      cipherUrl,
      cipherBody,
      //  encryptedHeaderObjes
    };
  };

  static decryptedResponse = async (encryptedData) => {
    console.log(key, { iv });
    const decrypted = await CryptoJS.AES.decrypt(encryptedData.data, key, {
      iv,
    });
    console.log(decrypted);
    return await decrypted.toString(CryptoJS.enc.Utf8);
  };
}

export default Connection;
