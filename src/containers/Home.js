import React from "react";
import GraphsController from "./GraphsController";
//import DataOrientationController from "./DataOrientationController";

import data from "../data/testData.js";
import numeral from "numeral";
const duration = require('human-duration');


const dataF = data[1];

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
