require('melt-data');

const minLeafSizeRatio = 0.15;  //for treemap

// -- DATASHROUD OBJECT -- ############################################################
//
//   a dsO is comprised of:
//  :: groups - array of multilevelled objects describing how the data is 'framed'
//    :: yField
//    :: yAlias
//
// ########################################################


//How many instances of a given value show up under a certain key?
//It does this by putting all the values into an array
//and then Set reduces that array to only have distinct values
const countDistinct = function(data,key){
  return new Set(data.reduce((a,c)=>[...a,c[key]],[])).size;
};

//this counts the number of different (distinct) values each provided key takes
//d - data
//g - array of [n: groupName, a: groupAlias];
//n - key to put group name under when it becomes a value
//v - key the count goes under
export const countDCast = function(d,g,n="type",c="count"){
  return g.map((e)=>({[n]: e.a, [c]: countDistinct(d,e.n)}));
};


//These wrap the meltJS functions so that we don't have to refer to the two aggregation methods outside this file (and outside the function that actually uses them)
//d - original data with all fields present
//g - grouping to aggregate across
//n - name of the field to aggregate
export const countCast = function(d,g,n){
  return cast(d,g,cast.count,n);
};

export const sumCast = function(d,g,n){
  return cast(d,g,cast.sum,n);
};


const genChildren = function(e,orientation,group){
  const val = e[orientation];
  
  //split the total into equal portions
  const share = val / e[group];
  
  //console.log("Making children! e: ",e,"orientation: ",orientation,"group: ",group,"val: ",val,"share: ",share);
  
  //create array of children
  return isNaN(e[group]) ? 0 : Array(e[group]).fill().map((e,i)=>({name: i, size: share}));
  
  return chlds;
};


//This will run the cast function from melt.js against multiple targets to aggregate upon
//d - original data with all fields present
//g - 'group by', i.e. which field is found in common to aggregate across
//t - target(s), objects containing field, aggregation method, and format function if needed {n: "name", a: aggregationFunction, f: (s)=>s.toString()+" Hours" }
const multiCast = function(d,g,t){
  //create the sets of casted tables
  const s = t.map((e)=>e.a(d,g,e.n));
  
  //grab the first of the sets. For each row - x, create a new object containing all the values from all sets
  //create this object by accumulating the properties (into ta - total accumulator) from each of the objects created by
  //iterating through each cs - current set, which is actually a bunch of rows that can be reduced to a single object by
  //accumulating all of the props (into accumulator 'a') from rows with similar [group] value the same as that of x
  const r = s[0].map((x)=> ({...x, ...s.reduce((ta,cs)=>({...ta, ...cs.reduce((a,c)=> c[g] === x[g] ? {...a, ...c} : a,{}) }),{}) }) );

  return r;
};

//This will take a treeData object and a field and generate size values using the field's values, also with a min cutoff
export const reCast = function(tmO, minSize){
  //get the largest element, then we can do the alias for the tree map so there is no 'zero' boxes
  const mM = (d,f)=>f.apply(null,d.data.map((o)=>o[tmO.dK])); //min or max generator function
  const dat = [mM(tmO,Math.min),mM(tmO,Math.max)];
  
  return {
    ...tmO,
    data: tmO.data.map((e)=>({ ...e, [tmO.sK]: (e[tmO.dK] ? e[tmO.dK] : 0) + Math.round(dat[1]*minSize), [tmO.sK+"Ratio"]: e[tmO.dK] ? (e[tmO.dK] - dat[0])/(dat[1] - dat[0]) : 0}))
  };

};


//This takes a dataShroud object (dsO) and a ratio
export const castDataToTree = function(dsO, minSize = minLeafSizeRatio) {  
  let dat = dsO.data;

  //cast to get the sum or count or whatever of what we wanted
  dat = multiCast(dat,[dsO.group],dsO.measures);
  
  //create treeMapObject
  //the measures become just their names, called fields
  //group g, datakey dK, sizeKey sK come straight from the dsO
  //format is found from the measures array, where the name of the measure is equal to the field we are focusing on (yField)
  const tmO = {
    data: dat,
    measures: dsO.measures.map((e)=>e.n), 
    group: dsO.group, 
    dK: dsO.yField, 
    sK: dsO.yAlias, 
    format: dsO.measures.find((e)=>e.n === dsO.yField).f};

  return reCast(tmO,minSize);
};


//This takes a session array and provides a dataset for google timeline chart
//TODO: it should take a DSO and make a timeline array.
export const castDataToTimeline = function(data) {
  return data.map((e)=>[e.computer, e.user+" ["+(Math.max(e.time,e.unTime)|| 1).toString()+"]", e.start.toDate(), e.end.toDate()]);
};