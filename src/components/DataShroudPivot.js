//This puts a different graph on the screen depending on the  data setup

import React from "react";
import PropTypes from "prop-types";
import DataShroudTreeMap from "./TreeMap/DataShroudTreeMap.js";


class DataShroudPivot extends React.Component {
  constructor(props){
    super(props);
    //dispatch!
  }
  
  
  render() {
    const {onDataViewClick, onDataViewContext, onFocus, focusId, dataSet, dLevel, colSeed} = this.props;
    return (
      <div>
        {Object.entries(dataSet).map((a,k)=>a[1]).map((e,i)=> 
          (
          //vLevel - virtual Level of data, doesn't come into effect until vLevel = dLevel
            <DataShroudTreeMap
              key={"0_"+i}
              colSeed={colSeed}
              vLevel={i}
              {...this.props}
              />
            )
        )}
      </div>
    );

  }
}


DataShroudPivot.propTypes = {
  onDataViewClick: PropTypes.func.isRequired,
  onDataViewContext: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  focusId: PropTypes.object.isRequired,
  dataSet: PropTypes.object.isRequired,
  dLevel: PropTypes.number.isRequired,
  colSeed: PropTypes.number.isRequired,
};

export default DataShroudPivot;