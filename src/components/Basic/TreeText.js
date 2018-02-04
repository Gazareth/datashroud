import React from "react";
import Animate from "react-move/Animate";
import Text from "react-svg-text"; //allows text wrapping
import numeral from "numeral";
const duration = require('human-duration');

import { easeLinear, easeExpOut, easePolyOut } from "d3-ease";

const td = 350;//transition duration
const md = 350;//maximum delay
const ad = Math.round(+(Math.random()*md)); //actual delay

const TreeText = React.createClass({
  render() {
   const {haveFocus, noFocus, fontSize, stroke, scaleFactor, vFactor, verticalAnchor, x, y, width, text, isNumber, isTime} = this.props;
    
    const ff = haveFocus ? 1.1 : 1.0;//focusFactor
    const fs = fontSize*scaleFactor*ff;//fontsize
    
    const ss = ff*(scaleFactor**0.5);//stroke strength
    const op =  haveFocus || noFocus ? 1.0 : 0.25;  //opacity
    
    const of = isNumber ? 20*scaleFactor**0.1 : haveFocus ? -4*scaleFactor : 4*scaleFactor;//offset factor
    const ofs = isNumber ? 4*scaleFactor*2 : 4*scaleFactor*4;//initial offset factor
    
    const ot = { duration: haveFocus ? td : (!haveFocus && !noFocus) ? td*2 : noFocus ? isNumber ? td*4 : td*2 : 0, delay: (!haveFocus && !noFocus) ? 0 : noFocus ? isNumber ? td*2 : td : 0, ease: easeLinear };//opacity timing
    const st = { duration: td*2*ff, delay: 0, ease: easeExpOut };//scale timing
    
    const nt = { duration: haveFocus ? td*1.5*ff : td*3*ff, delay: haveFocus ? 0 : td+ad, ease: (t)=>easePolyOut(t,10.0) };//number timing
    
    return(
        <Animate
          show={ !isNumber || haveFocus}
          
          start={
            {
              opacity: 0.01,
              colr: stroke,
              SF: fs,
              TV: 0,
              OF: ofs
            }
          }
          enter={[
            {
              colr: [stroke],
              opacity: [op],
              timing: ot,
            },
            {
              SF: [fs],
              timing: st,
            },
            {
              TV: [text],
              OF: [of],
              timing: nt,
            }
          ]}
          update={[
            {
              opacity: [op],
              colr: [stroke],
              OF: [of],
              timing: ot,
            },
            {
              SF: [fs],
              timing: st,
            },
            {
              TV: [text],
              timing: nt,
            }
          ]}
          leave={[
            {
              colr: [stroke],
              opacity: [0],
              OF: [ofs],
              timing: st,
            },
            {
              timing: nt,
            }
          ]}
        >
          {({ opacity, colr, SF, TV, OF }) => {
            return (
              <Text
                x={x}
                y={y + OF }
                width={width*ff}
                textAnchor="middle"
                fontSize={SF+'px'}
                lineHeight={fs*1.2+'px'}
                fill={colr}
                stroke={colr}
                strokeOpacity={ss}
                strokeWidth={ss}
                style={{
                  opacity, 
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {isNumber ? isTime ? duration.fmt(1000 * parseInt(text)) : numeral(TV).format('0,0') : text}
              </Text>
            );
          }}
        </Animate>
    );
  }
});

export default TreeText;