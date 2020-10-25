import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HotelSetup from "./components/HotelSetup/HotelSetup";
import Home from "./components/Home";
import CheckIn from "./components/CheckIn";
import CreditCard from "./components/CreditCard";
import BookingId from "./components/BookingId";
import ScanQr from "./components/ScanQr";

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" render={(props) => <HotelSetup {...props} />} />
      <Route path="/booking-id" render={(props) => <BookingId {...props} />} />
      <Route
        path="/credit-card"
        render={(props) => <CreditCard {...props} />}
      />
      <Route path="/check-in" render={(props) => <CheckIn {...props} />} />
      <Route path="/home" render={(props) => <Home {...props} />} />
      <Route path="/scan-qr" render={(props) => <ScanQr {...props} />} />
    </Router>
  );
};
export default Routes;
