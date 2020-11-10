import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { to } from "./RoutesPath";
import { GlobalConfig } from "./assets/js/globleConfig";
export default function ProtectedRoutes(rest) {
  const renderAppropriateRoute = (props) => {
    console.log({ hash: window.location.hash, to: to.hotelSetup });
    if (window.location.hash.substring(1) !== to.hotelSetup) {
    console.log({ hash: window.location });

      if (!GlobalConfig.Hotel) {
        console.log({ hash: window.location });

        return <Redirect to={to.hotelSetup} />;
      } else {
        console.log({ hash: window.location });

        return <Route {...rest} />;
      }
    } else if (
      GlobalConfig.Hotel &&
      window.location.hash.substring(1) === to.hotelSetup
    ) {
      return <Redirect to={to.home} />;
    } else return <Route {...rest} />;
  };

  return <Route {...rest} render={()=>renderAppropriateRoute()} />;
}
