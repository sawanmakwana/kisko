
import { to } from '../RoutesPath';
class Settings {

  logOut = () => {
    sessionStorage.clear();
    window.location.pathname = to.hotelSetup;
  }

   queryFromObject = (obj) => {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p) && (obj[p] !== null && obj[p] !== undefined && obj[p] !== '')) {
        str.push(encodeURIComponent(p) +'=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }
  get token() {
    const TOKEN = sessionStorage.getItem('hotel_token');
    return TOKEN ? TOKEN : undefined;
  }

  set token(token) {
    sessionStorage.setItem('hotel_token', token);
  }
}

export default new Settings();
