let _token,_hotel,_language,_booking,_connected = 0, _userDetail;

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
  
  
  static get Booking() {
    _booking = window.localStorage.getItem("booking");
    if(_booking){
        _booking = JSON.parse(_booking)
    }else{
        _booking = null;
    }
    return _booking;
  }
  static set Booking(value) {
    window.localStorage.setItem("booking", JSON.stringify(value));
    _booking = window.localStorage.getItem("booking");
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
}
