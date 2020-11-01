import React, { useState, useEffect } from "react";
import moment from "moment"
    // interval = setInterval(async ()=>{
      
    //   const Counter = Number(counter)-1000;
    //   // Counter = (Counter-1000);
    //   await setCounter(Counter);
    //   console.log(Counter)
    //   if(Counter <= 1000){
    //     setDisableRescan(false);
    //     setCounter(180000);
    //     interval && clearInterval(interval)
    //   }
    // },1000)
    // return;
const Clock = () => {
  const [date, setDate] = useState(moment());

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(moment());
  }
  return <div id="clock">{date.format("hh:mm")}</div>;
};
export default Clock;
