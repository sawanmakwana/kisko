import React from "react";
import AlertImg from "../../assets/images/alert.png";
import SearchImg from "../../assets/images/search.png";

const AlertPopup = (props) => {
  const {
    isVisible,
    header,
    subHeader,
    successText,
    cancelText,
    onSuccess,
    onCancel,
    hideIcon
  } = props;

  return (
    <div
      className={`${isVisible ? "cd-popup is-visible" : "cd-popup"}`}
      role="alert"
    >
      <div className="cd-popup-container">
        {hideIcon ? <></>:<img src={AlertImg} className="alertimg" alt="img" />}
        <h5>{header}</h5>
        <p>{subHeader}</p>
        <div className="popupfooter">
        {cancelText && (
            <button className="cancelbutton" onClick={onCancel}>
              {cancelText}{" "}
            </button>
          )}
          {successText && (
            <button className="mainbutton mr-10" onClick={onSuccess}>
              {successText}
              {/* <img src={SearchImg} alt="img" />{" "} */}
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;
