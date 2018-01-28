import React from "react";
import Animate from "react-move/Animate";
import { easeLinear, easeExpOut, easeExpIn, easeCircleOut, easeCircleIn  } from "d3-ease";

const td = 350;//transition duration
const md = 350;//maximum delay

const DataRect2 = React.createClass({
render() {
   const {haveFocus, noFocus, x,y,width,height,colors,index,root} = this.props;
    
    const ad = Math.round(+(Math.random()*md)); //actual delay
    
    const st = { duration: td*1.25, delay: ad, ease: easeExpOut };//scale timing
    const ot = { duration: td, delay: ad, ease: easeLinear };//opacity timing
    
    const sv = {s: 0.5, e: 1.0};  //scale values
    const swv = {s: 0.5, e: 2.25};  //stroke width values
  
  
    //if(haveFocus) { console.log(root);}
    const fx = (x-(root.x) !== 0); //flip x
    const fy = (y-(root.y) !== 0); //flip y
  
    const edgeCase = (x-(root.x) === 0) ||  (y-(root.y) === 0) || (x+width === (root.x + root.width)) || (y+height === (root.y + root.height));
  
    //if( haveFocus && !edgeCase ){ console.log("NOT ONE!",index,x-root.x,y-root.y,(root.width + root.x) - (x + width), (root.height + root.y) - (y + height));}
  
    //if( (x-(root.x)) == 0 ){console.log("FLIPPING: ");}
    return(
        <Animate
          show={haveFocus}

          start={
            {
              strokeWidth: swv.s,
              SDO: 2*(width+height),
            }
          }
          enter={[
            {
              strokeWidth: [swv.e],
              timing: {duration: td,delay: td*1.5, ease: easeLinear},
            },
            {
              SDO: [0],
              //timing: {duration: td*4+(ad*4),delay: 0, ease: easeExpOut},
              timing: {duration: td*4+(ad*4),delay: (edgeCase ? 0 : td), ease: easeExpOut},
            },
          ]}
          update={[
            {
              strokeWidth: [swv.e],
              timing: {duration: td,delay: 0, ease: easeLinear},
            },
            {
              SDO: [0],
              //timing: {duration: td*4+(ad*4),delay: 0, ease: easeExpOut},
              timing: {duration: td*4+(ad*4),delay:0, ease: easeExpOut},
            },
          ]}
          leave={[
            {
              strokeWidth: [swv.s],
              timing: {duration: td, delay: (edgeCase ? td*2 : 0), ease: easeExpOut},
            },
            {
              SDO: [2*(width+height)],
              timing: {duration: (edgeCase ? td*2+(ad*2) : 0),delay: 0, ease: easeCircleOut},
            },
          ]}
        >
          {({ strokeWidth, SDO }) => {
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
                  stroke: `${haveFocus || noFocus ? ('#fff') : '#999'}`,
                  strokeWidth: `${haveFocus || noFocus ? strokeWidth : swv.s }`,
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