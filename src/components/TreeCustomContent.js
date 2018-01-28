import React from "react";
import DataRect1 from "./Basic/DataRect1.js";
import DataRect2 from "./Basic/DataRect2.js";


const TreeContent = React.createClass({
  render() {
    const { onDataViewClick, onDataViewContext, onFocus, focusId, colors, getColor,
           root, depth, x, y, width, height, index, payload, rank, name } = this.props;
    //depth == 2 ? console.log("NAME: ",name,index,root) : null;
    
    return (
      <g
        onMouseOver={depth === 1 ? ()=> onFocus((index+1)) : null}
        onMouseLeave={depth === 1 ? ()=> onFocus(-(index+1)) : null}
        >
        {
          depth === 1 ?
          <DataRect1
              isFocus={focusId.now === index || focusId.now === -1 }
              noFocus={focusId.now === -1}
              {...this.props}
            />
          : (root != undefined && depth === 2) ?
          <DataRect2
              haveFocus={focusId.now === root.index}
              wasFocus={focusId.prev === root.index}
              noFocus={focusId.now === -1}
              {...this.props}
            />
          : null
        }
        {
          depth === 1 ?
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
            style={{pointerEvents: 'none',userSelect: 'none'}}
          >
            {name}
          </text>
          : null
        }
        {
          depth === 1 ?
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
            style={{pointerEvents: 'none',userSelect: 'none'}}
          >
            { '' }
          </text>
          : null
        }
      </g>
    );
  }
});

export default TreeContent;