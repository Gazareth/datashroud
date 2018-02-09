//THIS ONE SEEMS REDUNDANT BUT SERVES AS A PLACE TO SELECT BETWEEN DIFFERENT TYPES OF GRAPH DEPENDNING ON VARIOUS STATE VALUES
import React from "react";
import PropTypes from "prop-types";
import TreeCustom from "./ReChartsTreeCustom.js";

import TreemapExample from './ReactVisTreeMap.js';


/*
const Graphs = ({onDataViewClick, onDataViewContext, onFocus, focusId, dataSet}) => (
  <TreeCustom 
    onDataViewClick={onDataViewClick}
    onDataViewContext={onDataViewContext}
    onFocus={onFocus}
    focusId={focusId}
    dataSet={dataSet}
    />
);
*/

const Graphs = ({onDataViewClick, onDataViewContext, onFocus, focusId, dataSet}) => (
  <TreemapExample/>
);

Graphs.propTypes = {
  onDataViewClick: PropTypes.func.isRequired,
  onDataViewContext: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  focusId: PropTypes.object.isRequired,
  dataSet: PropTypes.object.isRequired
};

export default Graphs;