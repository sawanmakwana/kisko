let _token,_hotel,_language;

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
  static get Language() {
    _language = window.localStorage.getItem("language");
    if(!_language) _language = "en";
    return _language;
  }
  static set Language(value) {
    window.localStorage.setItem("language", value);
    _language = window.localStorage.getItem("language");
  }
}
