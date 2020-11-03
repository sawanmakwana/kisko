import React, { useState, useContext } from "react";
import helpImg from "../../assets/images/help.png";
import languageImg from "../../assets/images/en-lang.png";
import { LANG } from "../../assets/js/language";
import { GlobalConfig } from "../../assets/js/globleConfig";
import { GlobalContext } from "../../assets/js/context";
import { Link } from "react-router-dom";

const Footer = () => {
  const [toggle, setToggle] = useState(false);

  const { setLang, lang } = useContext(GlobalContext);

  return (
    <div className="footer">
      <div className="language">
        <div
          id="lang_selector"
          class={toggle ? `language-dropdown open` : `language-dropdown`}
        >
          {toggle && (
            <ul class="lang-list">
              {Object.keys(LANG).map((lang) => (
                <li
                  class={`lang lang-${lang} selected`}
                  title={lang}
                  onClick={() => {
                    GlobalConfig.Language = lang;
                    setLang(lang);
                    setToggle(false);
                  }}
                >
                  <span class="flag"></span>
                  <p>{lang}</p>
                </li>
              ))}
            </ul>
          )}
          {!toggle && (
            <label
              for="toggle"
              className={`lang-flag lang-${lang}`}
              title="Click to select the language"
              onClick={() => setToggle((t) => !t)}
            >
              <span class="flag"></span>
            </label>
          )}
        </div>
        {!toggle && (
          <div id="lang_selected">
            <p>{lang}</p>
          </div>
        )}
      </div>

      <div className="helpcenter">
        <Link>
          <span>Help</span>
          <img src={helpImg} alt="img" />
        </Link>
      </div>
    </div>
  );
};
export default Footer;
