import * as React from "react";
import { Redirect, Route } from "react-router-dom";
import { to } from "./RoutesPath";
export default function ProtectedRoutes(rest) {
  const renderAppropriateRoute = (props) => {
    if (window.location.pathname !== to.hotelSetup) {
      if (!window.localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)) {
        return (
          <Redirect
            to={{
              pathname: to.hotelSetup,
              state: { from: props.location },
            }}
          />
        );
      } else return <Route {...rest} />;
    } else if (
      window.localStorage.getItem(process.env.REACT_APP_TOKEN_NAME) &&
      window.location.pathname === to.hotelSetup
    ) {
      return (
        <Redirect
          to={{
            pathname: "/inbox",
            state: { from: props.location },
          }}
        />
      );
    }
  };

  return <Route {...rest} render={(props) => renderAppropriateRoute(props)} />;
}
