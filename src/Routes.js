import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HotelSetup from "./components/HotelSetup/HotelSetup";
import Home from "./components/Home";
import CheckIn from "./components/CheckIn";
import CreditCard from "./components/CreditCard";
import BookingId from "./components/BookingId/BookingId";
import ScanQr from "./components/ScanQr";
import { to } from "./RoutesPath";
import ProtectedRoutes from "./ProtectedRoutes";

const Routes = () => {
  return (
    <Router>
      <Route
        exact
        path={to.hotelSetup}
        render={(props) => <HotelSetup {...props} />}
      />
      <ProtectedRoutes>
        <Route
          path={to.bookingId}
          render={(props) => <BookingId {...props} />}
        />
        <Route
          path={to.creditCard}
          render={(props) => <CreditCard {...props} />}
        />
        <Route path={to.checkIn} render={(props) => <CheckIn {...props} />} />
        <Route path={to.home} render={(props) => <Home {...props} />} />
        <Route path={to.scanQr} render={(props) => <ScanQr {...props} />} />
      </ProtectedRoutes>
    </Router>
  );
};
export default Routes;
