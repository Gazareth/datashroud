import React from "react";
import DataRect1 from "./Basic/DataRect1.js";
import DataRect2 from "./Basic/DataRect2.js";
import TreeText from "./Basic/TreeText_Simple.js";

const TreeContent = React.createClass({
  render() {
    const { dataDepth, dataGroup, dataKey, dataFormat, sizeRatioKey, onDataViewClick, onDataViewContext, onFocus, focusId, getColor, colorSeed, 
           root, depth, x, y, width, height, index, payload, rank, name } = this.props;

    const root_ = dataDepth === 1 ? root.children[index] : depth > 1 ? root : root.children[index];
    //if( depth === 2 ) console.log(root_, index, index == focusId.now);
    const numChilds = root_.children !== undefined && root_.children !== null ? root_.children.length : 0;

    //const fsf = Math.pow(Math.pow(root_.width,2) + Math.pow(root_.height,2), 0.5)/20; //font size factor
    const hsf = Math.pow(Math.pow(root_.width,2) + Math.pow(root_.height,1.5), 0.15)/6; //HorizontalSizeFactor: corrupted pythag
    const vsf = Math.pow(Math.pow(root_.width,1.25) + Math.pow(root_.height,2), 0.15); //HorizontalSizeFactor: corrupted pythag
    //console.log(fsf);
    
    const noFocus = focusId.now < 0;
    let isDead = false;
    
    const parentCheck = (node)=> this.node && this.node.parentElement && this.node.parentElement.parentElement;
    
    const setFocus = function(){
      if( parentCheck() ){
        //console.log(this.node.parentElement.parentElement);
        this.node.parentElement.parentElement.parentElement.append(this.node.parentElement.parentElement);
        
        //add scale class
        setTimeout( (()=> parentCheck() ? this.node.parentElement.parentElement.classList.add("tree-focus") : null).bind(this), 1);
      }
      
      onFocus((index+1));
      //setTimeout( ()=>onFocus((index+1)),30);
    };

    
    const unFocus = function(){
      if( parentCheck() ){
        //add scale class
        setTimeout( (()=> parentCheck() ? (this.node.parentElement.parentElement.classList.remove("tree-focus")) : null).bind(this), 1);
      }
      
      onFocus(-(index+1));
    };
    
    return (
      <g
        onMouseOver={depth === 1 ? setFocus.bind(this) : null}
        onMouseLeave={depth === 1 ? unFocus.bind(this) : null}
        onClick={onDataViewClick}
        onContextMenu={onDataViewContext}
        ref={(n)=>this.node = n}
        >
        {
          depth === 1 ?
          <DataRect1
              isFocus={focusId.now === root_.index }
              noFocus={noFocus}
              colors={getColor(index,root_[sizeRatioKey],colorSeed)}
              {...this.props}
            />
          : (root_ != undefined && depth === 2 && (focusId.now === root_.index) || (focusId.prev === root_.index && noFocus)) ?
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
            noFocus={noFocus}
            depth={depth}
            scaleFactor={hsf}
            vFactor={vsf}
            
            x={root_.x + root_.width / 2}
            y={root_.y + root_.height / 2}
            width={root_.width}
            verticalAnchor='end'
            stroke={'#fff'}
            fontSize={22}
            text={root_[dataGroup]}
          >
          </TreeText>
          : null
        }
        {
          (focusId.now === root_.index) && (dataDepth === 1 && depth !== 0) || (depth === 2 && index === (numChilds - 1)) ?
            <TreeText
              haveFocus={focusId.now === root_.index}
              noFocus={noFocus}
              depth={depth}
              scaleFactor={hsf}
              vFactor={vsf}
              
              x={root_.x + root_.width / 2}
              y={root_.y + root_.height / 2}
              width={root_.width}
              verticalAnchor='start'
              stroke={'#dadada'}
              fontSize={18}
              isNumber={true}
              isTime={true}
              //text={console.log("For: ",root_[dataGroup]," width: ",root_.width," wf ",Math.round(root_[dataGroup].length*18*fsf**2)) || root_[dataKey]}
              text={root_[dataKey]}
              textFormat={dataFormat}
              >
            </TreeText>
          : null
        }
      </g>
    );
  }
});

export default TreeContent;