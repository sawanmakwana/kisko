import React from "react";
import helpImg from "../../assets/images/help.png"

const Footer = () => {
  return (
    <div className="footer">
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
