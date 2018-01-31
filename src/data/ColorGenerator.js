//var HUE_MASTERLIST = [0,45,90,135,180,225,270,315,360];
var HUE_MASTERLIST = [,175,42,270,90,205,0]; //150 is a nice green

var generateHue = () => (HUE_MASTERLIST.length > 0) ? HUE_MASTERLIST.pop() : Math.round( Math.random()*360 );

const MakeColor = ()=> [generateHue(),'50%','50%'];
//['#FF0000','#FFA500','#F8C12D','#8DC77B','#6B8E23','#2E8B57','#1E90FF','#8889DD','#483D8B'];

var colorArr = [];

function getColor(index,invert=false) { 
  if( colorArr[index] == undefined ){
    //colorArr[index] = (ORIG_COLORS[Math.round(Math.random()*ORIG_COLORS.length)]);
    colorArr[index] = MakeColor();
    //console.log("Getting color for ",index,": ",colorArr[index]);
  }
  
  const hueVal = colorArr[index][0] + (invert ? colorArr[index][0] > 180 ? -180 : 180 : 0);
  //console.log('Returning COLOR: ','hsl('+hueVal+','+colorArr[index][1]+','+colorArr[index][2]+')');
  return 'hsl('+hueVal+','+colorArr[index][1]+','+colorArr[index][2]+')';
}

export default getColor;