import { to } from '../RoutesPath';

class ErrorHandler {
  static errorHandler = error => {
    switch (error.status) {
      case 400:
        break;
      case 401:
        sessionStorage.removeItem('hotel');
        window.location.pathname = to.hotelSetup;
        break;
      case 403:
        break;
      case 404:
        break;
      case 500:
        break;
      case 502:
        break;
      case 502.3:
        break;
      default:
        break;
    }
    return false;
  }
}

export default ErrorHandler;