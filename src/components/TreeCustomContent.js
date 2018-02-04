import React from "react";
import DataRect1 from "./Basic/DataRect1.js";
import DataRect2 from "./Basic/DataRect2.js";
import TreeText from "./Basic/TreeText.js";

const TreeContent = React.createClass({
  render() {
    const { dataDepth, dataGroup, dataKey, onDataViewClick, onDataViewContext, onFocus, focusId, colors, getColor,
           root, depth, x, y, width, height, index, payload, rank, name } = this.props;
    //depth == 2 ? console.log("NAME: ",name,index,root) : null;
    //console.log("dataD",dataDepth);
    ///const root_ = ( dataDepth === 1 ) ? dataSet[index] : root;
    const root_ = dataDepth === 1 ? root.children[index] : root;
    //console.log(root_);
    //console.log("this is ",index," and root index is: ",root.children[index]);
    //console.log("but root is: ",root);
    const numChilds = root_.children !== undefined && root_.children !== null ? root_.children.length : 0;
    
    const setFocus = function(){
      if( this.node !== undefined ){
        //console.log(this.node.parentElement.parentElement);
        this.node.parentElement.parentElement.parentElement.append(this.node.parentElement.parentElement); 
      }
      onFocus((index+1));
    };

    return (
      <g
        onMouseOver={depth === 1 ? setFocus.bind(this) : null}
        onMouseLeave={depth === 1 ? ()=> onFocus(-(index+1)) : null}
        ref={(n)=>this.node = n}
        >
        {
          depth === 1 ?
          <DataRect1
              isFocus={focusId.now === index || focusId.now === -1 }
              noFocus={focusId.now === -1}
              {...this.props}
            />
          : (root_ != undefined && depth === 2 && (focusId.now === root_.index) || (focusId.prev === root_.index && focusId.now === -1)) ?
          <DataRect2
              haveFocus={focusId.now === root_.index}
              wasFocus={focusId.prev === root_.index}
              noFocus={focusId.now === -1}
              {...this.props}
            />
          : null
        }
        {
          (dataDepth === 1) || (depth === 2 && index === (numChilds - 1)) ?
          <text
            x={root_.x + root_.width / 2}
            y={root_.y + root_.height / 2}
            textAnchor="middle"
            fill="#dadada"
            stroke='#dadada'
            fontSize='1.35em'
            style={{pointerEvents: 'none',userSelect: 'none'}}
          >
            {root_[dataGroup]}
          </text>
          : null
        }
        {
          (dataDepth === 1) || (depth === 2 && index === (numChilds - 1)) ?
            <TreeText
              strX={root_.x + root_.width / 2}
              strY={root_.y + root_.height / 2 + 24}
              strSize='1.1em'
              strColor='#fff'
              strText={numChilds || root_[dataKey]}
              >
            </TreeText>
          : null
        }
      </g>
    );
  }
});

export default TreeContent;