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
    
    const vf = (vFactor/scaleFactor);
    const of = isNumber ? -vf+fs : haveFocus ? 0 : 2*vf;//offset factor
    //const ofs = isNumber ? 16*vf**0.05 : vf;//initial offset factor
    const ofs = isNumber ? -2*vf + fs : 2.5*vf;//initial offset factor
    
    const ot = { duration: haveFocus ? td : (!haveFocus && !noFocus) ? td*2 : noFocus ? isNumber ? td*4 : td*2 : 0, delay: (!haveFocus && !noFocus) ? 0 : noFocus ? isNumber ? td*2 : td : 0, ease: easeLinear };//opacity timing
    const st = { duration: td*2*ff, delay: 0, ease: easeExpOut };//scale timing
    
    const nt = { duration: haveFocus ? td*1.5*ff : td*3*ff, delay: haveFocus ? 0 : td+ad, ease: (t)=>easePolyOut(t,10.0) };//number timing
    
    const oft = {duration: td*0.5, ease: (t)=>easePolyOut(t,2.0)};
    
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
              timing: ot,
            },
            {
              SF: [fs],
              OF: [of],
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
          ]}
        >
          {({ opacity, colr, SF, TV, OF }) => {
            return (
              <Text
                x={x}
                y={y}
                width={width*0.8}
                textAnchor="middle"
                verticalAnchor={verticalAnchor}
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
                  transform: `translate3d(0px, ${OF}px, 300px)`,
                  transformStyle: 'preserve-3d'
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