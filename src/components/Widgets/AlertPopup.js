import React from "react";
import AlertImg from "../../assets/images/alert.png";
import SearchImg from "../../assets/images/search.png";

const AlertPopup = (props) => {
  const { isVisible } = props;

  return (
    <div
      className={`${isVisible ? "cd-popup is-visible" : "cd-popup"}`}
      role="alert"
    >
      <div className="cd-popup-container">
        <img src={AlertImg} className="alertimg" alt="img" />
        <h5>Invalid QR Code</h5>
        <p>QR Code is invalid. Please rescan.</p>
        <div className="popupfooter">
          <button className="mainbutton mr-10">
            Scan Again <img src={SearchImg} alt="img" />{" "}
          </button>
          <button className="cancelbutton">Cancel </button>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;
