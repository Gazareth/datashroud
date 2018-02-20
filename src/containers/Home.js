import React from "react";
import GraphsController from "./GraphsController";
//import DataOrientationController from "./DataOrientationController";

import data from "../data/testData.js";
import numeral from "numeral";
const duration = require('human-duration');

import sessions from '../data/DataGeneration/DATAGEN_Sessions.js';

//<GraphsController
//          dataSet={data}/>

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <h4>Rooms</h4>
        
        <GraphsController
          dataSet={data}/>
        
        <div>{sessions}</div>
        <button>
          Activate Lasers
        </button>
        
      </div>
    );
  }
}
