import {exists} from "../../utility/CompatibilityFunctions.js";
import {Amalgamate,Pick,FilterFrom,FilterOut} from "../../utility/Arrays.js";
import DSC from "./DataShroudCasting.js";
// -- DATASHROUD OBJECT -- ############################################################
//
//    a dsO is comprised of:
//    :: data - raw data to be grouped and aggregated up
//    :: parameters - list of all fields/variables available through the raw data
//      :: {
//          n: "computer",        //(name)
//          t: "string"           //(type)
//          a: "Computers",       //(alias)
//        }
//    :: statistics - templates for parameters to be aggregated
//      :: {
//          n: "computer",        //(name)
//          p: [0,1],             //(parameters to aggregate)
//          f: "countDistinct"    //(function) -- certain strings can be parsed (e.g. sum, avg, count...)
//          a: "Computer",        //(alias) -- optional. alias can come from parameters in some instances
//        }
//    :: groups - separate groups joined by the 'g' key
//        if a group is deployed whilst its 'g' is also deployed, it is ignored
//        {
//          n: "session",         //(name)
//          s: [1,2]              //(statistics that can be aggregated with this group)
//          g: []
//        }
// ########################################################


//DataShroud class - can be used to build up or manipulate the datashroud object
class DataShroud {
  constructor(data=[],parameters=[],statistics=[],groups=[],cast={}){
    this.o = {
      data,
      parameters,
      statistics,
      groups,
      cast
    };
    
    return this;
  }
  
  //Create components via functions
  //
  // [ PARAMETER ]
  // n - name
  // t - type (this helps format the data in the end)
  // a - alias
  parameter(n,t,a){
    this.o.parameters.push({n,t,a});
    return this;
  }
  //
  // [ STATISTIC ]
  // n - name
  // p - parameters
  // f - aggregation function name
  // a - alias
  statistic(n,p,f,a=false){
    this.o.statistics.push(a ? {n,p,f,a} : {n,p,f});
    return this;
  }
  //
  //[ GROUP ]
  //  n - name
  //  s - statistics
  //  g - superceding group (refers to other groups that nullify this one due to having a finer granularity)
  group(n,s,g=[]){
    this.o.groups.push({n,s,g});
    return this;
  }
  //
  // [ CAST ]
  //  g - groupings
  //  s - stats
  
  //############
  
  //Set whole components at once by passing the full object in
  //
  SetComponent(component,payload=0){
    if( payload===0 ){
      return this.o[component];
    }
    this.o[component] = payload;
    return this;
  }
  //
  Data(data){
    return this.SetComponent("data",data);
  }
  //
  Parameters(parameters=0){
    return this.SetComponent("parameters",parameters);
  }
  //
  Statistics(statistics=0){
    return this.SetComponent("statistics",statistics);
  }
  //
  Groups(groups=0){
    return this.SetComponent("groups",groups);
  }
  //
  //############
  
  
  //Sets a cast on the data
  //cast - {g: [0,1], s: [2,3]} - grouping and statistic indices
  Cast(g=[],s=[]){
    if(g.length+s.length === 0) return this.o.cast;
    
    //set the cast
    let c_ = {g, s};

    //FIX CAST (make sure no unavailable groups/stats are in the cast)
    //groups are unavailable if you have also chosen a group with a finer granularity
    c_.g = FilterOut(c_.g,this.o.groups,"g");
    c_.s = FilterFrom(c_.s,Amalgamate(Pick(c_.g,this.o.groups),"s"),true);
    
    return this.SetComponent("cast",c_);
  }
  
  //Returns data through the currently set cast
  CastData(g=[],s=[]){
    //set current cast
    this.Cast(g,s);
    return DSC.applyCast(this.o);
  }
  
  //Return the current DSO
  Output(){
    return this.o;
  }
};

export default DataShroud;