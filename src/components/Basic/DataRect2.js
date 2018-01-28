import React from "react";
import Animate from "react-move/Animate";
import { easeLinear, easeExpOut, easeExpIn, easeCircleOut, easeCircleIn, easeSinIn, easeSinOut  } from "d3-ease";

const td = 350;//transition duration
const md = 350;//maximum delay

const DataRect2 = React.createClass({
render() {
   const {haveFocus, wasFocus, noFocus, x,y,width,height,index,root} = this.props;
    
    const ad = Math.round(+(Math.random()*md)); //actual delay
    
    const st = { duration: td*2, delay: ad, ease: easeExpOut };//scale timing
    const ot = { duration: td, delay: ad, ease: easeLinear };//opacity timing
    
    //const swav = haveFocus && !noFocus ? Math.pow(root.width*root.height, 1/14.5) : 0.5; //stroke width actual values
    const swav = Math.pow(root.width*root.height, 1/14.5);
    const swv = {s: swav, e: swav};  //stroke width values //was 0.5, 2.25
  
    const sf = '#c8c8c8'; //stroke fill
    //if( !haveFocus ){ console.log(root.index," WASFOCUS?: ",wasFocus);}
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
              strokeFill: '#c8c8c8',
              SDO: 2*(width+height),
            }
          }
          enter={[
            {
              strokeFill: [sf],
              timing: st,
            },
            {
              SDO: [0],
              //timing: {duration: td*4+(ad*4),delay: 0, ease: easeExpOut},
              timing: {duration: td*1.5,delay: (edgeCase ? 0 : td*0.75), ease: easeSinOut},
            },
          ]}
          update={[
            {
              strokeFill: [sf],
              timing: st,
            },
            {
              SDO: [0],
              //timing: {duration: td*4+(ad*4),delay: 0, ease: easeExpOut},
              timing: {duration: (haveFocus || wasFocus) ? td*1.5 : 0,delay: (edgeCase ? 0 : td*0.75), ease: easeSinOut},
            },
          ]}
          leave={[
            {
              strokeFill: [sf],
              timing: {...st,duration: noFocus ? td*6 : td*3, delay: noFocus ? td : 0},
            },
            {
              SDO: [2*(width+height)],
              timing: {duration: (edgeCase ? td+(ad) : td),delay: (edgeCase ? (td*0.75)+(ad) : td), ease: easeSinIn},
            },
          ]}
        >
          {({ strokeFill, SDO }) => {
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
                  stroke: (haveFocus || wasFocus) ? '#fff' : strokeFill,
                  strokeWidth: (haveFocus || wasFocus) ? swav : 0.2*swav,
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