import React from "react";
import HubConnection from "../Connection/hubConnection";
import { to } from "../RoutesPath";
import Footer from "./Widgets/Footer";

const SelectKeys = (props) => {

  const dispatchKeys = async(keyCount = 1) =>{
    
    try{
      await processKey();
      if(keyCount === 2) await processKey();
      props.history.push(to.thankYou)
    }catch(err){
      // TOST Error
      console.log("error")
    }
    
  }

  const processKey = async(data="Test Dummy") =>{
    return new Promise((resolve) => {
      try{
        HubConnection.ACTION("CardSet", "SCT3Q8").then((result) => {
          console.log(`Scan  execution done  `, result);
          HubConnection.ACTION("WriteTrack1", "SCT3Q8","TEXT DUMMY").then((result) => {
            console.log(`WriteTrack1  execution done  `, result);
            HubConnection.ACTION("EjectCard", "SCT3Q8").then((result) => {
              console.log(`EjectCard  execution done  `, result);
              resolve("done")
            });
          });
        });
      }catch(err){
        resolve("error")
      }
      
    })
  }
  return (
    <>
      <div className="container transparent">
        <h2 className="maintitle">Please select number of room key(s)</h2>
        <div className="row mt-5">
          <div className=" col-md-1"></div>
          <div className="col-md-5">
          <div
              className="bluebutton customtext"
              onClick={() => dispatchKeys(1)}
            >
              {" "}
              <span>1</span>
              <div className="noverlay"></div>
            </div>
          </div>
          <div className="col-md-5">
          <div
              className="bluebutton customtext"
              onClick={() => dispatchKeys(2)}
        
            >
              {" "}
              <span>2</span>
              <div className="noverlay"></div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default SelectKeys;
