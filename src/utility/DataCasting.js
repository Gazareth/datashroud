require('melt-data');

//This will take a set of data facts and cast them into a format that the TreeGraph will show well
//data - array of fact objects
//measures - the other attributes in the object
//group - the facts are grouped by this field
//orientation - the value to display in the treemap, i.e. time, number of users or number of emails
//aggrMode - the aggregation mode to employ upon bringing values together e.g. to count how many or sum the values
export const castDataToTree = function(data, measures = ["computer","users"], group = "room", orientation = "time", aggrMode = 0) {
  let dat = data;
  
  const aggr = [cast.sum, cast.count];
  console.log(dat);
  dat = cast(dat,[group], aggr[aggrMode],"time");
  
  const datMax = Math.max.apply(Math,dat.map(function(o){return o[orientation];}));
  dat = dat.map((e)=>({ ...e, size: Math.max(e.time ? e.time : 0,Math.round(datMax*0.15)) })); //sets a minimum "box size" to a quarter of the max

  console.log(dat);
  
  return {values: measures, group: "room", dataKey: orientation, sizeKey: "size", data: dat};
};