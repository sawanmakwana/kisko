import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { to } from "./RoutesPath";
import { GlobalConfig } from "./assets/js/globleConfig";
export default function ProtectedRoutes(rest) {
  const renderAppropriateRoute = (props) => {
    if (window.location.pathname !== to.hotelSetup) {
      if (!GlobalConfig.Hotel) {
        return (
          <Redirect
            to={{
              pathname: to.hotelSetup,
              state: { from: props.location },
            }}
          />
        );
      } else {
        return <Route {...rest} />;
      }
    } else if (
      GlobalConfig.Hotel &&
      window.location.pathname === to.hotelSetup
    ) {
      return (
        <Redirect
          to={{
            pathname: to.home,
            state: { from: props.location },
          }}
        />
      );
    } else return <Route {...rest} />;
  };

  return <Route {...rest} render={(props) => renderAppropriateRoute(props)} />;
}
