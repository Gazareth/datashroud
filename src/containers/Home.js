import React from "react";
import GraphsController from "./GraphsController";
//import DataOrientationController from "./DataOrientationController";

import { getData } from "../data/Data_Computers_Users.js";
import numeral from "numeral";
const duration = require('human-duration');


const dataF = getData(
  "computer",
  [
    {n: "time", a: cast.sum, f: (s)=>duration.fmt(1000 * parseInt(s))},
    {n: "users",a: cast.count, f: (s)=>numeral(s).format('0,0')+" users"},
    {n: "emails",a: cast.sum, f: (s)=>numeral(s).format('0,0')+" emails sent"},
    {n: "browsing",a: cast.sum, f: (s)=>duration.fmt(1000 * parseInt(s))+" browsing tinternet"},
  ],
  "room",
  "browsing",
  "size"
);

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <h4>Rooms</h4>
        <button>
          Activate Lasers
        </button>
        
        <GraphsController
          dataSet={dataF}/>
      </div>
    );
  }
}
