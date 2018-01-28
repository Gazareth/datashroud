import React from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, Treemap } from 'recharts';
import TreeContent from "./TreeCustomContent.js";
import getColor from "../data/ColorGenerator.js"

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

const TreeCustom = ({onDataViewClick, onDataViewContext, onFocus, focusId, dataSet}) => (
  <ResponsiveContainer
      width={"100%"}
      aspect={2.075}
    >
      <Treemap
        data={dataSet}
        dataKey="time"
        ratio={4/3}
        stroke="#fff"
        isAnimationActive={false}
        animationEasing="ease-out"
        fill="#8884d8"
        content={<TreeContent
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
  dataSet: PropTypes.array.isRequired
};

export default TreeCustom;