import React from "react";
import GraphsController from "./GraphsController";
//import DataOrientationController from "./DataOrientationController";

import data_c_u from "../data/data_computers_users.js";

import sessions from '../data/DataGeneration/DATAGEN_Sessions.js';
import {castDataToTimeline} from '../utility/DataCasting';  //TODO: the casting should happen as you enter data into graph component, which shouldn't be here

import { Chart } from 'react-google-charts';
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
          dataSet={data_c_u}/>
        
        <div>{JSON.stringify(sessions)}</div>
        
        <Chart chartType="Timeline"
            columns={[{ type: 'string', label: 'Computer' },{ type: 'string', label: 'Duration' },{ type: 'date', label: 'Start' },{ type: 'date', label: 'End' }]}
            rows={castDataToTimeline(sessions)}
            graph_id={'timeline1'}
            width="100%"
            height="800px"
            legend_toggle
            options={{
              hAxis: {    
                minValue: new Date("17 Feb 2018 00:00:00 GMT"),
                maxValue: new Date("17 Feb 2018 23:59:59 GMT")
              }
            }}
            chartPackages={["corechart", "timeline"]} />;
        
        <button>
          Activate Lasers
        </button>
        
      </div>
    );
  }
}
