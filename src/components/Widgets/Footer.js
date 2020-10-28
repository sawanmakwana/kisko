import React from "react";
import helpImg from "../../assets/images/help.png";
import languageImg from "../../assets/images/en-lang.png";

const Footer = () => {
  return (
    <div className="footer">
      <div class="language">
        <div class="menu-toggle">
          <span>EN</span>
          <img src={languageImg} alt="img" />
        </div>
        <div class="menu-line" style={{ display: "none" }}>
          <div class="btn-app">
            <span>EN</span>
            <img src={languageImg} alt="img" />
          </div>
          <div class="btn-app">
            <span>EN</span>
            <img src={languageImg} alt="img" />
          </div>
          <div class="btn-app">
            <span>EN</span>
            <img src={languageImg} alt="img" />
          </div>
        </div>
      </div>
      <div className="helpcenter">
        <a href="">
          <span>Help</span>
          <img src={helpImg} alt="img" />
        </a>
      </div>
    </div>
  );
};
export default Footer;
