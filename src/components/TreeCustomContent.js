import React from "react";
import DataRect1 from "./Basic/DataRect1.js";
import DataRect2 from "./Basic/DataRect2.js";
import TreeText from "./Basic/TreeText.js";

const TreeContent = React.createClass({
  render() {
    const { dataDepth, dataGroup, dataKey, onDataViewClick, onDataViewContext, onFocus, focusId, colors, getColor,
           root, depth, x, y, width, height, index, payload, rank, name } = this.props;

    const root_ = dataDepth === 1 ? root.children[index] : depth > 1 ? root : root.children[index];
    //if( depth === 2 ) console.log(root_, index, index == focusId.now);
    const numChilds = root_.children !== undefined && root_.children !== null ? root_.children.length : 0;

    //const fsf = Math.pow(Math.pow(root_.width,2) + Math.pow(root_.height,2), 0.5)/20; //font size factor
    const hsf = Math.pow(Math.pow(root_.width,2) + Math.pow(root_.height,1.5), 0.15)/6; //HorizontalSizeFactor: corrupted pythag
    const vsf = Math.pow(Math.pow(root_.width,1.25) + Math.pow(root_.height,2), 0.26)/20; //HorizontalSizeFactor: corrupted pythag
    //console.log(fsf);
    
    const setFocus = function(){
      if( this.node !== undefined ){
        //console.log(this.node.parentElement.parentElement);
        this.node.parentElement.parentElement.parentElement.append(this.node.parentElement.parentElement);
        
        //add scale class
        setTimeout( (()=>this.node.parentElement.parentElement.classList.add("tree-focus")).bind(this), 1);
      }
      setTimeout( ()=>onFocus((index+1)),30 );
    };

    
    const unFocus = function(){
      if( this.node !== undefined ){
        //add scale class
        setTimeout( (()=>this.node.parentElement.parentElement.classList.remove("tree-focus")).bind(this), 1);
      }
      
      onFocus(-(index+1));
    };
    
    return (
      <g
        onMouseOver={depth === 1 ? setFocus.bind(this) : null}
        onMouseLeave={depth === 1 ? unFocus.bind(this) : null}
        ref={(n)=>this.node = n}
        >
        {
          depth === 1 ?
          <DataRect1
              isFocus={focusId.now === root_.index || focusId.now === -1 }
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
          (dataDepth === 1 && depth !== 0) || (depth === 2 && index === (numChilds - 1)) ?
          <TreeText
            haveFocus={focusId.now === root_.index}
            noFocus={focusId.now === -1}
            depth={depth}
            scaleFactor={hsf}
            vFactor={vsf}
            
            x={root_.x + root_.width / 2}
            y={root_.y + root_.height / 2}
            width={root_.width}
            //verticalAnchor='end'
            stroke={'#fff'}
            fontSize={20}
            text={root_[dataGroup]}
          >
          </TreeText>
          : null
        }
        {
          (dataDepth === 1 && depth !== 0) || (depth === 2 && index === (numChilds - 1)) ?
            <TreeText
              haveFocus={focusId.now === root_.index}
              noFocus={focusId.now === -1}
              depth={depth}
              scaleFactor={hsf}
              vFactor={vsf}
              
              x={root_.x + root_.width / 2}
              y={root_.y + root_.height / 2}
              width={root_.width}
              //verticalAnchor='start'
              stroke={'#dadada'}
              fontSize={18}
              isNumber={true}
              isTime={true}
              //text={console.log("For: ",root_[dataGroup]," width: ",root_.width," wf ",Math.round(root_[dataGroup].length*18*fsf**2)) || root_[dataKey]}
              text={root_[dataKey]}
              >
            </TreeText>
          : null
        }
      </g>
    );
  }
});

export default TreeContent;