//THIS ONE SEEMS REDUNDANT BUT SERVES AS A PLACE TO SELECT BETWEEN DIFFERENT TYPES OF GRAPH DEPENDNING ON VARIOUS STATE VALUES
import React from "react";
import PropTypes from "prop-types";
import TreeCustom from "./TreeCustom.js";

const Graphs = ({onDataViewClick, onDataViewContext, onFocus, focusId, dataSet}) => (
  <TreeCustom 
    onDataViewClick={onDataViewClick}
    onDataViewContext={onDataViewContext}
    onFocus={onFocus}
    focusId={focusId}
    dataSet={dataSet}
    />
);

Graphs.propTypes = {
  onDataViewClick: PropTypes.func.isRequired,
  onDataViewContext: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  focusId: PropTypes.number.isRequired,
  dataSet: PropTypes.array.isRequired
};

export default Graphs;