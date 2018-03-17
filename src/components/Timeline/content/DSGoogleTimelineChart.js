import React from "react";
import { Chart } from 'react-google-charts';

import {castDataToTimeline} from '../../../utility/DataCasting';  //TODO: the casting should happen as you enter data into graph component, which shouldn't be here

const DSGoogleTimelineChart = ({dataSet}) =>
(
  <Chart chartType="Timeline"
    columns={[{ type: 'string', label: 'Computer' },{ type: 'string', label: 'Duration' },{ type: 'date', label: 'Start' },{ type: 'date', label: 'End' }]}
    rows={castDataToTimeline(dataSet)}
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
    chartPackages={["corechart", "timeline"]} 
    />
  );

export default DSGoogleTimelineChart;