import React from "react";
import Animate from "react-move/Animate";
import { easeLinear, easeExpOut  } from "d3-ease";

const td = 350;//transition duration
const md = 350;//maximum delay

const swg = 0.18;  //stroke width gradient
const swf_ = (x)=>Math.max(0.1,(9 - swg*x)); //stroke width function: x is number of rects

const DataRect1 = React.createClass({
  render() {
   const {isFocus,noFocus,x,y,width,height,colors,numRects,index,root} = this.props;

    //const ad = Math.round(+(Math.random()*md))*; //actual delay
    const ad = (td/12)*(index+(Math.random()/2));
    
    const st = { duration: td*2, delay: isFocus && !noFocus ? 0 : ad, ease: easeExpOut };//scale timing
    const ot = { duration: td, delay: ad, ease: easeLinear };//opacity timing
    
    //const ssf = isFocus && !noFocus ? 1.05 : 1.0;//shape scale factor
    const sv = {s: 0.25, e: 1.0};  //scale values
    
    //const color = colors[Math.floor(index / root.children.length * 6)];

    const fc = isFocus || noFocus ? colors[0] : '#777'; //fill color
    const sc = isFocus ? colors[1] : noFocus ? '#333' : '#666'; //stroke color
    //const fc = color;
    
    const sw_ = swf_(numRects);
    //console.log("SW_: ",sw_," NUMRECTS: ",numRects);
    const sw = isFocus ? 1.1*sw_ : noFocus ? sw_ : sw_*0.45; //stroke width
    //const sf = '#fff';
    
    const rr = isFocus ? 1.5 : 2; //rect corner radius
    
    return(
        <Animate
          show={true}

          start={
            {
              opacity: 0.01,
              fill: fc,
              scale: sv.s,
            }
          }
          enter={[
            {
              opacity: [1],
              timing: ot,
            },
            {
              scale: [sv.e],
              fill: [fc],
              timing: st,
            },
          ]}
          update={[
            {
              opacity: [1],
              timing: ot,
            },
            {
              scale: [sv.e],
              timing: st,
            },
            {
              fill: [fc],
              timing: {...st,duration: noFocus ? (td)*6 : isFocus ? td*6 : (td)*4,delay: noFocus ? td*0.75+ad : 0},
            },
          ]}
        >
          {({ scale, opacity, fill }) => {
            return (
              <g>
                <rect
                  key={parseInt("1"+(index.toString()))}
                  x={x}
                  y={y}
                  rx={rr}
                  ry={rr}
                  width={width}
                  height={height}
                  style={{
                    fill,
                    stroke: sc,
                    opacity,
                    strokeWidth: sw,
                    transformOrigin: "center",
                    transformBox: "fill-box",
                    transform: `scale(${scale}) translateZ(300px)`,
                    transformStyle: 'preserve-3d'
                  }}
                  >
                </rect>
              </g>
            );
          }}
        </Animate>
    );
  }
});

export default DataRect1;