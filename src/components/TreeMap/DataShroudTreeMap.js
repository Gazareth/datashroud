import React from "react";
import PropTypes from "prop-types";

import Animate from "react-move/Animate";
import DSRechartsTreeMap from "./content/DSRechartsTreeMap.js";
import {castDataToTree} from "../../utility/DataCasting.js";

const DataShroudTreeMap = ({dataSet, dLevel, vLevel, onDataViewClick, onDataViewContext, onFocus, focusId, colSeed, canMouse, isDead}) =>
(  <Animate
    key={"DSTree_"+vLevel}
    show={vLevel===dLevel}

    start={
        {
          canMouse: false,
        }}
    enter={[
        {
          canMouse: [true],
          timing: { duration: 0, delay: 42*castDataToTree(dataSet[vLevel]).data.length },
        }
           ]}
    >
    {({canMouse}) => {
      return (
        <DSRechartsTreeMap 
          key={"DSRTM_"+vLevel}
          onDataViewClick={onDataViewClick}
          onDataViewContext={onDataViewContext}
          onFocus={onFocus}
          focusId={focusId}
          dataSet={castDataToTree(dataSet[vLevel])}
          dLevel={dLevel}
          colSeed={colSeed} //TODO: Make this into a configurable color picker thing
          canMouse={canMouse}
          isDead={vLevel===dLevel ? false : true}
        />
      );
    }}
  </Animate>
);


DataShroudTreeMap.propTypes = {
  dataSet: PropTypes.object.isRequired,
  vLevel: PropTypes.number.isRequired,
  dLevel: PropTypes.number.isRequired,
  onDataViewClick: PropTypes.func.isRequired,
  onDataViewContext: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  focusId: PropTypes.object.isRequired,
  colSeed: PropTypes.number.isRequired
};

export default DataShroudTreeMap;