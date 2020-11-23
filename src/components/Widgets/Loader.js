import React from "react";

const Loader = (props) => {
  return (
    <>
      <div className="loader-bg"> </div>
      <div className="cube-wrapper">
        <div className="cube-folding">
          <span className="leaf1"></span>
          <span className="leaf2"></span>
          <span className="leaf3"></span>
          <span className="leaf4"></span>
        </div>
        <span className="loading" data-name="Loading">
          {props.text || "Loading"}
        </span>
      </div>
    </>
  );
};

export default Loader;
