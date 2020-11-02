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
}
