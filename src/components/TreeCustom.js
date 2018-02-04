import React from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, Treemap } from 'recharts';
import TreeContent from "./TreeCustomContent.js";
import getColor from "../utility/ColorGenerator.js";
import getDepth from "../utility/GetDepth.js";

//import ReformJSON from "../utility/ReformJSON.js";

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

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
        stroke="#fff"
        isAnimationActive={false}
        animationEasing="ease-out"
        animationDuration={350}
        fill="#8884d8"
        content={<TreeContent
                   dataDepth={getDepth(dataSet.data)}
                   dataGroup={dataSet.group}
                   dataKey={dataSet.dataKey}
                   onClick={onDataViewClick}
                   onContextMenu={onDataViewContext}
                   onFocus={onFocus}
                   focusId={focusId}
                   colors={COLORS}
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