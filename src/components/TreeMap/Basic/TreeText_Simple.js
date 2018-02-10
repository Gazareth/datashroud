import React from "react";
import Animate from "react-move/Animate";
import {Text} from "@vx/text"; //allows text wrapping

import { easeLinear, easeExpOut, easePolyOut } from "d3-ease";

const td = 350;//transition duration
const md = 350;//maximum delay
const ad = Math.round(+(Math.random()*md)); //actual delay

const TreeText = React.createClass({
  render() {
   const {haveFocus, noFocus, fontSize, stroke, scaleFactor, vFactor, verticalAnchor, x, y, width, text, textFormat, isNumber, isTime} = this.props;
    
    const ff = haveFocus ? 1.1 : 1.0;//focusFactor
    const fs = fontSize*ff*(scaleFactor**1.55);//fontsize
    
    const ss = ff*(scaleFactor**0.5);//stroke strength
    
    const vf = (vFactor/scaleFactor);
    const ofs = isNumber ? -vf+fs : haveFocus ? 0 : 2*vf;//offset factor
    //const ofs = isNumber ? -2*vf + fs : 2.5*vf;//initial offset factor
    
    const clr = haveFocus || noFocus ? stroke : '#bababa';
    
    //console.log("TEST: ",text,ofs);
    
    return(
              <Text
                x={x}
                y={y}
                width={width*0.75}
                fontSize={fs+'px'}
                lineHeight={fs*1.2+'px'}
                verticalAnchor={verticalAnchor}
                textAnchor="middle"
                style={{
                  fill: clr,
                  stroke: clr,
                  //strokeWidth: ss,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  transform: `translate3d(0px, ${ofs}px, 0px)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {textFormat ? textFormat(text) : text}
              </Text>
            );
  }
});

export default TreeText;