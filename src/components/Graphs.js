//THIS ONE SEEMS REDUNDANT BUT SERVES AS A PLACE TO SELECT BETWEEN DIFFERENT TYPES OF GRAPH DEPENDNING ON VARIOUS STATE VALUES
import React from "react";
import PropTypes from "prop-types";
import TreeCustom from "./TreeMap/ReChartsTreeCustom.js";
import {castDataToTree} from "../utility/DataCasting.js";

const Graphs = ({onDataViewClick, onDataViewContext, onFocus, focusId, dataSet, dataLevel}) => (
  <TreeCustom 
    onDataViewClick={onDataViewClick}
    onDataViewContext={onDataViewContext}
    onFocus={onFocus}
    thisLevel={1}
    focusId={focusId}
    dataSet={castDataToTree(dataSet)}
    dataLevel={dataLevel}
    />
);


Graphs.propTypes = {
  onDataViewClick: PropTypes.func.isRequired,
  onDataViewContext: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  focusId: PropTypes.object.isRequired,
  dataSet: PropTypes.object.isRequired
};

export default Graphs;