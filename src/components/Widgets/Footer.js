import React, { useState, useContext } from "react";
import helpImg from "../../assets/images/help.png";
import languageImg from "../../assets/images/en-lang.png";
import { LANG } from "../../assets/js/language";
import { GlobalConfig } from "../../assets/js/globleConfig";
import { GlobalContext } from "../../assets/js/context";

const Footer = () => {
  const [toggle, setToggle] = useState(false);

  const { setLang, lang } = useContext(GlobalContext);

  return (
    <div className="footer">
      <div className="language">
        <div className="menu-toggle" onClick={() => setToggle((t) => !t)}>
          <span>{lang}</span>
          <img src={languageImg} alt="img" />
        </div>
        {toggle && (
          <div className="menu-line">
            {Object.keys(LANG).map((lang) => (
              <div
                className="btn-app"
                onClick={() => {
                  GlobalConfig.Language = lang;
                  setLang(lang);
                  setToggle(false);
                }}
              >
                <span>{lang}</span>
                <img src={languageImg} alt="img" />
              </div>
            ))}
          </div>
        )}
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
