import React from "react";
import Animate from "react-move/Animate";


import { easeLinear, easeExpOut  } from "d3-ease";

const td = 350;//transition duration
const md = 350;//maximum delay
const ad = Math.round(+(Math.random()*md)); //actual delay

const TreeText = React.createClass({
  render() {
   const {strText, strColor, strSize, strX, strY} = this.props;
    
    const ot = { duration: td, delay: ad, ease: easeLinear };//opacity timing
    
    return(
        <Animate
          start={
            {
              opacity: 0.01,
              colr: strColor,
            }
          }
          enter={[
            {
              colr: [strColor],
              opacity: [1],
              timing: ot,
            },
          ]}
          update={[
            {
              opacity: [1.0],
              colr: [strColor],
              timing: ot,
            },
          ]}
        >
          {({ opacity, colr, x, y }) => {
            return (
              <text
                x={strX}
                y={strY}
                textAnchor="middle"
                fill={colr}
                stroke={colr}
                fontSize={strSize}
                style={{opacity, pointerEvents: 'none',userSelect: 'none'}}
              >
                {strText}
              </text>
            );
          }}
        </Animate>
    );
  }
});

export default TreeText;