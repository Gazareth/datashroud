import React from "react";
import PropTypes from "prop-types";
import TreeCustom from "./TreeMap/ReChartsTreeCustom.js";
import {castDataToTree} from "../utility/DataCasting.js";
import Animate from "react-move/Animate";

const colSeed = Math.random();  //COLOR SEED: picks a region of hue for the graph to spread around

let Graphs = ({onDataViewClick, onDataViewContext, onFocus, focusId, dataSet, dataLevel}) => (
  <div>
    {Object.entries(dataSet).map((a,k)=>a[1]).map((e,i)=> 
      (
      <Animate
        key={i}
        show={i===dataLevel}
        
        start={
            {
              canMouse: false,
            }}
        enter={[
            {
              canMouse: [true],
              timing: { duration: 0, delay: 42*castDataToTree(dataSet[i]).data.length },
            }
               ]}
        >
        {({canMouse}) => {
          return (
            <TreeCustom 
              key={"tree_"+i}
              onDataViewClick={onDataViewClick}
              onDataViewContext={onDataViewContext}
              onFocus={onFocus}
              focusId={focusId}
              dataSet={castDataToTree(dataSet[i])}
              dataLevel={dataLevel}
              colSeed={colSeed} //TODO: Make this into a configurable color picker thing
              canMouse={canMouse}
              isDead={i===dataLevel ? false : true}
            />
          );
        }}
      </Animate>
          )
      
    )}
    </div>
);


Graphs.propTypes = {
  onDataViewClick: PropTypes.func.isRequired,
  onDataViewContext: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  focusId: PropTypes.object.isRequired,
  dataSet: PropTypes.object.isRequired,
  dataLevel: PropTypes.number.isRequired,
};

export default Graphs;