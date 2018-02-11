import React from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, Treemap } from 'recharts';
import TreeContent from "./TreeCustomContent.js";
import getColor from "../../utility/ColorGenerator.js";
import getDepth from "../../utility/GetDepth.js";

const sizeKey = "size";
const dataKey = "time";



const TreeCustom = ({onDataViewClick, onDataViewContext, onFocus, focusId, dataSet, colSeed, canMouse, isDead}) => (
  <ResponsiveContainer
      height={"100%"}
      aspect={16/9}
    >
      <Treemap
        data={dataSet.data}
        dataKey={dataSet.sK}
        aspectRatio={4/3}
        isAnimationActive={false}
        animationEasing="ease-out"
        animationDuration={350}
        pointerEvents={canMouse && !isDead ? 'all' : 'none'}
        //fill="#666"
        content={<TreeContent
                   dataDepth={getDepth(dataSet.data)}
                   dataGroup={dataSet.group}
                   dataKey={dataSet.dK}
                   dataFormat={dataSet.format}
                   sizeRatioKey={dataSet.sK+"Ratio"}
                   onDataViewClick={onDataViewClick}
                   onDataViewContext={onDataViewContext}
                   onFocus={onFocus}
                   focusId={focusId}
                   colorSeed={colSeed}
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