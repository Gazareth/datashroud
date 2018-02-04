//const getDepth = ({ o }) => 1 + ( (o && o.map) ? Math.max(...o.map(getDepth)) : 0);

//const getDepth = (o) => (1 + (o && o.map ? Math.max(...o.map(getDepth)) : 0));

const getDepth = function(o) {
  var dep = 0;
  //console.log("running get depth for ", o, " map function is: ",o.map);
  if( o ){
    if( Array.isArray(o) ){
      //console.log("o is an array! ",o);
      dep = 1 + (o && o.map ? Math.max(...o.map(getDepth)) : 0);
    } else if( typeof o === 'object' ) {
      //it is an object,not an array, so we do object mapping
      //console.log("o is an object! ",o);
      dep = Math.max( ...Object.keys(o).map((oc, i) => getDepth(o[oc])) );
    }
  }
  //console.log("Depth of ",o," is ",dep);
  return dep;
};


export default getDepth;