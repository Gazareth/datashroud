require('melt-data');

const minLeafSizeRatio = 0.15;

// -- DATASHROUD OBJECT -- ############################################################
//
//   a dsO is comprised of:
//  :: primeEntity - the type of entity the measures are against "computer" (e.g. "computer", or "user")
//  :: measures - facts on the primeEntity with the potential to be represented (e.g. "time", or "emails" sent); each of these must 
//        also include an aggregation method, and a method for formatting the result
//  :: group - the measures are aggregated across this space or time (e.g. "room" or "department")
//   so far we have the potential to map the time spent on a computer within a room or rooms, but some visualisations require one 
//      field to be focused on, and it needs a specific name, for this we have:
//  :: yField
//  :: yAlias
//
// ########################################################

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
  const s = t.map((e)=>cast(d,g,e.a,e.n));
  
  //grab the first of the sets. For each row - x, create a new object containing all the values from all sets
  //create this object by accumulating the properties (into ta - total accumulator) from each of the objects created by
  //iterating through each cs - current set, which is actually a bunch of rows that can be reduced to a single object by
  //accumulating all of the props (into accumulator 'a') from rows with similar [group] value the same as that of x
  const r = s[0].map((x)=> ({...x, ...s.reduce((ta,cs)=>({...ta, ...cs.reduce((a,c)=> c[g] === x[g] ? {...a, ...c} : a,{}) }),{}) }) );

  return r;
};

//This will take a treeData object and a field and generate size values using the field's values, but with a min cutoff
export const reCast = function(tmO, minSize = minTreeBlockSize){
  //get the largest element, then we can do the alias for the tree map so there is no 'zero' boxes
  const datMax = Math.max.apply(null,tmO.data.map((o)=>o[tmO.dK]));
  //console.log("ABOUT TO RECAST! ",tmO.data,sizeField);
  
/*  console.log("RECASTED!: ",{
    ...tmO,
    data: tmO.data.map((e)=>({ ...e, [sizeKey]: Math.max(e[sizeField] ? e[sizeField] : 0,Math.round(datMax*minSize))}))
  });*/
  return {
    ...tmO,
    data: tmO.data.map((e)=>({ ...e, [tmO.sK]: (e[tmO.dK] ? e[tmO.dK] : 0) + Math.round(datMax*minSize), [tmO.sK+"Ratio"]: e[tmO.dK] ? e[tmO.dK]/datMax : 0}))
  };

};


//This will take a set of data facts and cast them into a format that the TreeGraph can represent.
//we will call this a treeData object; it has fields, group, dataKey, sizeKey, data.
//data - array of fact objects
//measures - the attributes of the object
//group - the facts are grouped by this field
//sizeField - the focus value - determines the size of the box in the treemap, i.e. time, number of users or number of emails
//sizeKey - the name of the field that the treemap actually uses to calculate size
//minSize - the minimum Block Size of a 
/*export const castDataToTree2 = function(data, measures, group, sizeField, sizeKey, minSize = minTreeBlockSize) {  
  let dat = data;

  //cast to get the sum or count or whatever of what we wanted
  //dat = cast(dat,[group], aggr[aggrMode],orientation);
  dat = multiCast(dat,[group],measures);

  const tmObj = {fields: measures.map((e)=>e.n), group: "room", dataKey: sizeField, sizeKey, format: measures.find((e)=>e.n === sizeField).f, data: dat}; //tree map object

  return reCast(tmObj,sizeField,sizeKey,minSize);
};*/


//This takes a dataShroud object (dsO) and a ratio
export const castDataToTree = function(dsO, minSize = minLeafSizeRatio) {  
  let dat = dsO.data;

  //console.log("ABOUT TO MULTICAST",dat,[dsO.group],dsO.measures);
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