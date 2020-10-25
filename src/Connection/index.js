import Settings     from './settings';
import ErrorHandler from './errorHandler';
import axios from 'axios';
// import NotificationSystem from './notificationSystem';

class Connection {

  static BASE = 'https://hotel-sandbox.aavgo.com/backend/'; // DEV


  static createHeaders = () => {
    const HEADERS = new Headers();
    HEADERS.append('Content-Type', 'application/json');
    HEADERS.append('Authorization', `Bearer ${Settings.token}`);
    HEADERS.append('x-aavgo-crypto-disable', `true`);
    return HEADERS;
  };

  static responseRestructure = response => {
    ErrorHandler.errorHandler(response);
    return response.ok ? response.json() : response.json();
  };

  static POST = async (controllerName, actionName, body) => {
    const HEADERS = Connection.createHeaders();
    const RESULTS = await fetch(`${Connection.BASE}${controllerName}/${actionName}`, {
      method : 'POST',
      headers: HEADERS,
      body   : JSON.stringify(body)
    });
    return Connection.responseRestructure(RESULTS);
  }

  static PUT = async (controllerName, actionName, body) => {
    const HEADERS = Connection.createHeaders();
    const RESULTS = await fetch(`${Connection.BASE}${controllerName}/${actionName}`, {
      method : 'PUT',
      headers: HEADERS,
      body   : JSON.stringify(body)
    });
    return Connection.responseRestructure(RESULTS);
  }

  static DELETE = async (controllerName, actionName,body) => {
    const HEADERS = Connection.createHeaders();
    const RESULTS = await fetch(`${Connection.BASE}${controllerName}/${actionName}`, {
      method : 'DELETE',
      headers: HEADERS,
      body   : body?JSON.stringify(body):""
    });
    return Connection.responseRestructure(RESULTS);
  }

  static GET = async (controllerName, actionName, headers) => {
    const HEADERS = headers || Connection.createHeaders();
    const RESULTS = await fetch(`${Connection.BASE}api/${controllerName}/${actionName}`, {
      method : 'GET',
      headers: HEADERS
    });
    return Connection.responseRestructure(RESULTS);
  }

  static GET_FILE = async (controllerName, actionName, headers) => {
    const HEADERS = headers || Connection.createHeaders();
    const RESULTS = await fetch(`${Connection.BASE}api/${controllerName}/${actionName}`, {
      method : 'GET',
      headers: HEADERS,
      responseType: 'blob',
    });
    return RESULTS;
  }

  static UPLOAD = async (controllerName, actionName, body, plainBody, contentType, method) => {
    const HEADERS = new Headers();
    HEADERS.append('Authorization', `Bearer ${Settings.token}`);
    if (contentType) HEADERS.append('Content-Type', contentType);
    const RESULTS = await fetch(`${Connection.BASE}api/${controllerName}/${actionName}`, {
      method : method || 'POST',
      headers: HEADERS,
      body   : plainBody ? body : JSON.stringify(body)
    });
    return Connection.responseRestructure(RESULTS);
  }

  static UPLOAD_PROGRESS = async (controllerName, actionName, body, plainBody, contentType, method,progressEvent) => {
    const HEADERS = new Headers();
    HEADERS.append('Authorization', `Bearer ${Settings.token}`);
    if (contentType) HEADERS.append('Content-Type', contentType);
      const config = {
        headers: {
          Authorization: `Bearer ${Settings.token}`
        },
        onUploadProgress: progressEvent
      }
      let  RESULTS ;

    await  axios({
      method: method,
      url: `${Connection.BASE}api/${controllerName}/${actionName}`,
      headers: {
        Authorization: `Bearer ${Settings.token}`
      },
      data:plainBody ? body : JSON.stringify(body),
      onUploadProgress: progressEvent

    }).then((data) => {
      // console.log("data.data",data.data)
      RESULTS =  data.data;
    }).catch((data) => {
      // console.log("data.data",data.data)
      RESULTS =  data;
    })
      return RESULTS;

  }


}

export default Connection;
