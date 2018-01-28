import React from "react";
import Animate from "react-move/Animate";
import { easeLinear, easeExpOut  } from "d3-ease";

const td = 350;//transition duration
const md = 350;//maximum delay

const DataRect1 = React.createClass({
  render() {
   const {isFocus,noFocus,x,y,width,height,colors,index,root} = this.props;
    
    const ad = Math.round(+(Math.random()*md)); //actual delay
    
    const st = { duration: td*2, delay: ad, ease: easeExpOut };//scale timing
    const ot = { duration: td, delay: ad, ease: easeLinear };//opacity timing
    
    const sv = {s: 0.5, e: 1.0};  //scale values
    
    const fc = isFocus ? colors[Math.floor(index / root.children.length * 6)] : '#666'; //fill color
    const sw = isFocus ? 3.5 : 2; //stroke width
    const so = isFocus ? .85 : 0.45
    
    return(
        <Animate
          show={true}

          start={
            {
              opacity: 0.01,
              fill: fc,
              strokeWidth: sw,
              strokeOpacity: so,
              scale: sv.s,
            }
          }
          enter={[
            {
              opacity: [1.0],
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
              opacity: [1.0],
              timing: ot,
            },
            {
              scale: [sv.e],
              timing: st,
            },
            {
              fill: [fc],
              strokeWidth: [sw],
              strokeOpacity: [so],
              timing: {...st,duration: noFocus ? td*6 : td*3,delay: noFocus ? td : 0},
            },
          ]}
        >
          {({ scale, opacity, fill, strokeWidth, strokeOpacity }) => {
            return (
              <rect
                key={parseInt("1"+(index.toString()))}
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                  fill,
                  stroke: '#fff',
                  strokeWidth,
                  strokeOpacity,
                  transformOrigin: "center",
                  opacity,
                  transform: `scale(${scale})`,
                }}
                />
            );
          }}
        </Animate>
    );
  }
});

export default DataRect1;