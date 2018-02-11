import React from "react";
import Animate from "react-move/Animate";
import { easeLinear, easeExpOut  } from "d3-ease";

const td = 350;//transition duration
const md = 350;//maximum delay

const DataRect1 = React.createClass({
  render() {
   const {isFocus,noFocus,x,y,width,height,colors,index,root} = this.props;

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

    const sw = isFocus ? 4 : noFocus ? 4.5 : 2; //stroke width
    //const sf = '#fff';
    
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
                  rx={isFocus ? 1 : 1.5}
                  ry={isFocus ? 1 : 1.5}
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
                    borderRadius: '10px',
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