import React, { useState, useEffect } from "react";
import moment from "moment";



const Clock = (props) => {
  const [date, setDate] = useState(moment());
  const [clickCounter, setClickCounter] = useState(0);

  const logoutFunc = () => {
    // setLoading(false)

    props.setLoading(false)
    console.log({ clickCounter });
    setClickCounter((clickCounter) => clickCounter + 1);
    if (clickCounter > 4) {
      window.localStorage.clear();
      props.history.push(`/`);
      setClickCounter(0)
    }
  };

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(moment());
  }
  return (
    <div id="clock" onClick={logoutFunc}>
      {date.format("hh:mm")}
    </div>
  );
};
export default Clock;
