import React from "react";
import Animate from "react-move/Animate";
import { easeLinear, easeExpOut  } from "d3-ease";

const td = 350;//transition duration
const md = 350;//maximum delay

const DataRect1 = React.createClass({
  render() {
   const {isFocus,noFocus,x,y,width,height,colors,getColor,index,root} = this.props;
    
    const ad = Math.round(+(Math.random()*md)); //actual delay
    
    const st = { duration: td*2, delay: isFocus && !noFocus ? 0 : ad, ease: easeExpOut };//scale timing
    const ot = { duration: td, delay: ad, ease: easeLinear };//opacity timing
    
    //const ssf = isFocus && !noFocus ? 1.05 : 1.0;//shape scale factor
    const sv = {s: 0.5, e: 1.0};  //scale values
    
    //const color = colors[Math.floor(index / root.children.length * 6)];
    const color = getColor(index);
    const fc = isFocus ? color : '#666'; //fill color
    //const fc = color;
    const sw = isFocus ? 3.5 : 1.5; //stroke width
    const sf = isFocus ? '#fff' : '#999';//stroke fill
    //const sf = '#fff';
    
    return(
        <Animate
          show={true}

          start={
            {
              opacity: 0.01,
              fill: fc,
              strokeWidth: sw,
              strokeFill: sf,
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
              strokeFill: [sf],
              timing: {...st,duration: noFocus ? (td)*6 : (td)*3,delay: noFocus ? td+ad : 0},
            },
          ]}
        >
          {({ scale, opacity, fill, strokeWidth, strokeFill }) => {
            return (
              <rect
                key={parseInt("1"+(index.toString()))}
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                  fill,
                  stroke: strokeFill,
                  strokeWidth,
                  opacity,
                  transformOrigin: "center",
                  transformBox: "fill-box",
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