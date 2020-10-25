import CryptoJS from "crypto-js";

class EnvironmentClass {
  constructor() {
    this.key = CryptoJS.enc.Utf8.parse("1234567890123456");
    this.iv = CryptoJS.enc.Utf8.parse("0000000000000000");
    this.isEncrypt = false;
    this.setEnvironmentVariables();
  }

  setEnvironmentVariables = () => {
    const windowUrl = window.location.href;
    if (windowUrl.indexOf("https") >= 0) {
      const urlArray = windowUrl ? windowUrl.split("/") : [];
      const domain =
        urlArray.length > 0 ? `${urlArray[0]}//${urlArray[2]}` : "";
    }
  };

  getEnvironmentVariables = () => ({
    key: this.key,
    iv: this.iv,
    isEncrypt:this.isEncrypt,
    bookingType:{
      Booking : 1,
      CC      : 2,
      QR      : 3,
      Detail  : 4
    }
  });
}

export default EnvironmentClass;
