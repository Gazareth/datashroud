import React from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, Treemap } from 'recharts';
import TreeContent from "./TreeCustomContent.js";
import getColor from "../../utility/ColorGenerator.js";
import getDepth from "../../utility/GetDepth.js";

const sizeKey = "size";
const dataKey = "time";



const TreeCustom = ({onDataViewClick, onDataViewContext, onFocus, focusId, dataSet}) => (
  <ResponsiveContainer
      height={"100%"}
      aspect={16/9}
    >
      <Treemap
        data={dataSet.data}
        dataKey={dataSet.sizeKey}
        aspectRatio={4/3}
        isAnimationActive={false}
        animationEasing="ease-out"
        animationDuration={350}
        //fill="#666"
        content={<TreeContent
                   runSeed={Math.random()}  //TODO: Make this into a configurable color picker thing
                   dataDepth={getDepth(dataSet.data)}
                   dataGroup={dataSet.group}
                   dataKey={dataSet.dataKey}
                   dataFormat={dataSet.format}
                   sizeRatio={dataSet[sizeKey+"Ratio"]}
                   onClick={onDataViewClick}
                   onContextMenu={onDataViewContext}
                   onFocus={onFocus}
                   focusId={focusId}
                   getColor={getColor}/>}
      />
    </ResponsiveContainer>
);

TreeCustom.propTypes = {
  onDataViewClick: PropTypes.func.isRequired,
  onDataViewContext: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  focusId: PropTypes.object.isRequired,
  dataSet: PropTypes.object.isRequired
};

export default TreeCustom;