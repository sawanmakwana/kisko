import "./assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css";
import "./assets/css/util.css";
import "./assets/css/main.css";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";

import Routes from "./Routes";
import Clock from "./components/Widgets/Clock";
import { GlobalContext } from "./assets/js/context";
import { useState } from "react";
import { GlobalConfig } from "./assets/js/globleConfig";
import { withRouter } from "react-router-dom";

function App(props) {
  const [lang, setLang] = useState(GlobalConfig.Language || "en");
  const [loading, setLoading] = useState(false);

  return (
    <div className="limiter">
      <div className="container-login100">
        <Clock />
        {GlobalConfig.Hotel && (
          <span
            onClick={() => {
              window.localStorage.clear();
              props.history.push(`/`);
            }}
          >
            Logout
          </span>
        )}
        <GlobalContext.Provider value={{ setLang, lang, loading, setLoading }}>
          <Routes />
        </GlobalContext.Provider>
      </div>
    </div>
  );
}

export default withRouter(App);
