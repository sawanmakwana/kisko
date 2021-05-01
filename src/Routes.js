import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HotelSetup from "./components/HotelSetup/HotelSetup";
import Home from "./components/Home";
import CheckIn from "./components/CheckIn";
import CreditCard from "./components/CreditCard/CreditCard";
import BookingId from "./components/BookingId/BookingId";
import ScanQr from "./components/ScanQR/ScanQr";
import { to } from "./RoutesPath";
import ProtectedRoutes from "./ProtectedRoutes";
import BookingDetail from "./components/BookingDetail/BookingDetail";
import BookingInfo from "./components/BookingInfo/BookingInfo";
import ThankYou from "./components/ThankYou";
import SelectKeys from "./components/SelectKeys";
import ScanId from "./components/ScanId";
import ScanbarCode from "./components/ScanbarCode";
import ConfirmDetails from "./components/ConfirmDetails";
import Multibooking from "./components/MultiBooking";
import Terms from "./components/Capture/Terms";
import SwipeCreditCard from "./components/SwipeCreditCard";
import CaptureFrontImage from "./components/Capture/CaptureFrontImage";
import CaptureFace from "./components/Capture/CaptureFace";
import VideoScreen from "./components/videoScreen/VideoScreen";

const Routes = () => {
  return (
    <>
      <ProtectedRoutes
        exact
        path={to.hotelSetup}
        render={(props) => <HotelSetup {...props} />}
      />
      <ProtectedRoutes path={to.bookingId} render={(props) => <BookingId {...props} />} />
      <ProtectedRoutes
        path={to.bookingDetail}
        render={(props) => <BookingDetail  {...props}/>}
      />
      <ProtectedRoutes path={to.bookingInfo} render={(props) => <BookingInfo  {...props}/>} />
      <ProtectedRoutes path={to.multiBooking} render={(props) => <Multibooking {...props}/>} />
      <ProtectedRoutes path={to.creditCard} render={(props) => <CreditCard  {...props}/>} />
      <ProtectedRoutes path={to.checkIn} render={(props) => <CheckIn {...props} />} />
      <ProtectedRoutes path={to.home} render={(props) => <Home  {...props}/>} />
      <ProtectedRoutes path={to.scanQr} render={(props) => <ScanQr {...props} />} />
      <ProtectedRoutes path={to.thankYou} render={(props) => <ThankYou  {...props}/>} />
      <ProtectedRoutes path={to.selectKeys} render={(props) => <SelectKeys  {...props}/>} />
      <ProtectedRoutes path={to.scanId} render={(props) => <ScanId  {...props}/>} />
      <ProtectedRoutes path={to.scanbarCode} render={(props) => <ScanbarCode {...props} />} />
      <ProtectedRoutes path={to.videoScreen} render={(props) => <VideoScreen {...props} />} />
      <ProtectedRoutes
        path={to.confirmDetails}
        render={(props) => <ConfirmDetails {...props} />}
      />
      <ProtectedRoutes path={to.terms} render={(props) => <Terms  {...props}/>} />
      <ProtectedRoutes path={to.swipeCard} render={(props) => <SwipeCreditCard {...props} />} />
      <ProtectedRoutes
        path={to.captureFront}
        render={(props) => <CaptureFrontImage {...props} />}
      />
      <ProtectedRoutes path={to.captureFace} render={(props) => <CaptureFace {...props} />} />
    </>
  );
};
export default Routes;
