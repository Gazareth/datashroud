import React from "react";
import Animate from "react-move/Animate";
import { easeLinear, easeExpOut, easeExpIn, easeCircleOut, easeCircleIn, easeSinIn, easeSinOut  } from "d3-ease";

const t_ = 175;//transition time
const md = 350;//maximum delay
const ad = Math.round(+(Math.random()*md)); //actual delay

const DataRect2 = React.createClass({
render() {
   const {haveFocus, wasFocus, noFocus, x,y,width,height,index,root} = this.props;
    
    const f_ = (haveFocus || wasFocus); //has been focused recently?
    const f__ = haveFocus || (wasFocus && noFocus); //I am focused or no one is focused but I was the last to be

    //const sw = Math.pow(root.width*root.height, 1/12);  //stroke width
    const sw = Math.pow(Math.pow(root.width,2) + Math.pow(root.height,2), 0.475)*0.0065;  //stroke width
    const sdo = 2*(width+height); //stroke dash offset = perimeter * 2
  
    const edgeCase = (x-(root.x) === 0) ||  (y-(root.y) === 0) || (x+width === (root.x + root.width)) || (y+height === (root.y + root.height));
  
    const fx = edgeCase && (x-(root.x) !== 0); //should flip x
    const fy = edgeCase && (y-(root.y) !== 0); //should flip y

    //const sdot = {duration: f_ ? t_*12 : 0, delay: (edgeCase ? ad+(t_*2) : ad+(t_*3)), ease: easeExpOut}; //stroke dash offset timing (DELAY)
    //const sdot = {duration: f_ ? t_*12 : 0, delay: (edgeCase ? ad : ad+t_), ease: easeExpOut}; //stroke dash offset timing
    const sdot = {duration: f_ ? t_*12 : 0, delay: (edgeCase ? ad+(t_*0.5) : ad+(t_)), ease: easeExpOut}; //stroke dash offset timing 
    const en_up = [{SDO: [0],timing: sdot,},];

    return(
        <Animate
          show={haveFocus}

          start={
            {
              SDO: sdo,
            }
          }
          enter={en_up}
          update={en_up}
          leave={[
            {
              SDO: [2*(width+height)],
              timing: {duration: (edgeCase ? t_*2+(ad) : t_*2),delay: true ? 0 : (edgeCase ? (t_*3)+(ad) : t_*2), ease: easeLinear},
            },
          ]}
        >
          {({ SDO }) => {
            return (
              <rect
                key={parseInt("2"+(index.toString()))}
                className={edgeCase ? "edgeCase" : "BlackSheep"}
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                  pointerEvents: 'none',
                  fill: 'none',
                  stroke: '#fff',
                  strokeWidth: sw,
                  strokeDasharray: 2*(width+height),
                  strokeDashoffset: SDO,
                  transformOrigin: "center",
                  transform: `scale(${fx ? -1 : 1},${fy ? -1 : 1})`,
                }}
                />
            );
          }}
        </Animate>
    );
  }
});

export default DataRect2;