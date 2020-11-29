let _token,_hotel,_language,_booking,_connected = 0, _userDetail, _scanLicense = false, _scanQR = false,_searchType = "checkIn";
let _KABA_DEFAULT = "http://10.1.10.94:1619/MessengerPMSWS.asmx"
let _KIOSK_DEFAULT = "http://localhost:7000";
let _KABA_USERNAME = "DummyUser";
let _KABA_PASSWORD = "DummyPwd";
export class GlobalConfig {
  static get Token() {
    _token = window.localStorage.getItem("token");
    return _token;
  }
  static set Token(value) {
    window.localStorage.setItem("token", value);
    _token = window.localStorage.getItem("token");
  }

  static get Hotel() {
    _hotel = window.localStorage.getItem("hotel");
    if(_hotel){
        _hotel = JSON.parse(_hotel)
    }else{
        _hotel = null;
    }
    return _hotel;
  }

  static set Hotel(value) {
    window.localStorage.setItem("hotel", JSON.stringify(value));
    _hotel = window.localStorage.getItem("hotel");
  }

  static set UserScanDetail(value) {
    window.localStorage.setItem("UserScanDetail", JSON.stringify(value));
    _userDetail = window.localStorage.getItem("UserScanDetail");
  }

  static get UserScanDetail() {
    _userDetail = window.localStorage.getItem("UserScanDetail");
    if(_userDetail){
      _userDetail = JSON.parse(_userDetail)
    }else{
      _userDetail = null;
    }
    return _userDetail;
  }
  
  
  static get Bookings() {
    _booking = window.localStorage.getItem("bookings");
    if(_booking){
        _booking = JSON.parse(_booking)
    }else{
        _booking = null;
    }
    return _booking;
  }
  static set Bookings(value) {
    window.localStorage.setItem("bookings", JSON.stringify(value));
    _booking = window.localStorage.getItem("bookings");
  }


  static get SelectedBooking() {
    _booking = window.localStorage.getItem("selectedBooking");
    if(_booking){
        _booking = JSON.parse(_booking)
    }else{
        _booking = null;
    }
    return _booking;
  }
  static set SelectedBooking(value) {
    window.localStorage.setItem("selectedBooking", JSON.stringify(value));
    _booking = window.localStorage.getItem("selectedBooking");
  }
  static get Language() {
    _language = window.localStorage.getItem("language");
    if(!_language) _language = "en";
    return _language;
  }
  static set Language(value) {
    window.localStorage.setItem("language", value);
    _language = window.localStorage.getItem("language");
  }
  static get Connected() {
    return _connected;
  }
  static set Connected(value) {
    return _connected = value;
  }

  static get License() {
    return _scanLicense;
  }
  static set License(value) {
    return _scanLicense = value;
  }

  static get QR() {
    return _scanQR;
  }
  static set QR(value) {
    return _scanQR = value;
  }

  static get SEARCH_TYPE() {
    return _searchType;
  }
  static set SEARCH_TYPE(value) {
    return _searchType = value;
  }

  static get KABA() {
    return window.localStorage.getItem("KABA") || _KABA_DEFAULT;
  }
  static set KABA(value) {
    window.localStorage.setItem("KABA", value);
    _KABA_DEFAULT = window.localStorage.getItem("KABA");
    return value;
  }

  static get KABA_USERNAME() {
    return window.localStorage.getItem("KABA_USERNAME") || _KABA_USERNAME;
  }
  static set KABA_USERNAME(value) {
    window.localStorage.setItem("KABA_USERNAME", value);
    _KIOSK_DEFAULT = window.localStorage.getItem("KABA_USERNAME");
    return value;
  }

  static get KABA_PASSWORD() {
    return window.localStorage.getItem("KABA_PASSWORD") || _KABA_PASSWORD;
  }
  static set KABA_PASSWORD(value) {
    window.localStorage.setItem("KABA_PASSWORD", value);
    _KIOSK_DEFAULT = window.localStorage.getItem("KABA_PASSWORD");
    return value;
  }

  static get KIOSK() {
    return window.localStorage.getItem("KIOSK") || _KIOSK_DEFAULT;
  }
  static set KIOSK(value) {
    window.localStorage.setItem("KIOSK", value);
    _KIOSK_DEFAULT = window.localStorage.getItem("KIOSK");
    return value;
  }
}



