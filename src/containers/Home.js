import React from "react";
import DataShroud from "./DataShroud";
//import DataOrientationController from "./DataOrientationController";

import DataShroudTimeline from "../components/Timeline/DataShroudTimeline.js";

import data_c_u from "../data/data_computers_users.js";
import data_s from '../data/data_sessions.js';

const colSeed = Math.random();  //COLOR SEED: picks a region of hue for the graph elements to have colours spread around

// Home page component
export default class Home extends React.Component {
  // render
  render() {
	  var headerStyle = {fontWeight: 'bold'};
    return (
      <div className="page-home">
        <h4 style={headerStyle}>Usage TreeMap:</h4>
        
        <DataShroud
          colSeed={colSeed}
          dataSet={data_c_u}
          />
        
        <div><br/><br/><br/><br/><br/>{/*JSON.stringify(Sessions)*/}</div>
        
        <h4 style={headerStyle}>Usage Timeline:</h4>
			
        {<DataShroudTimeline
          dataSet={data_s}
          />}
        
        
        
        <button>
          Activate Lasers
        </button>
        
      </div>
    );
  }
}
