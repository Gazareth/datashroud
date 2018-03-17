import React from "react";
import DSGoogleTimelineChart from "./content/DSGoogleTimelineChart.js";

import {countDCast} from '../../utility/DataCasting';  //TODO: the casting should happen as you enter data into graph component, which shouldn't be here

const DataShroudTimeline = ({dataSet}) =>
( dataSet.data.length > 0 ?
          <DSGoogleTimelineChart
            dataSet={dataSet.data}
            />
          : null
);

export default DataShroudTimeline;