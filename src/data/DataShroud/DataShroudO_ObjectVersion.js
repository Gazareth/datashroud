//THIS IS THE OBJECT VERSION, IN CASE ARRAYS DON'T WORK
import {exists} from "../../utility/CompatibilityFunctions.js";
// -- DATASHROUD OBJECT -- ############################################################
//
//    a dsO is comprised of:
//    :: data - raw data to be grouped and aggregated up
//    :: parameters - variables available through the raw data
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
//    :: groups - hierarchical structure of available groupings for the data
//        in this example we have two routes to go down because the data can be framed around computers or users,
//        and they each have their own group types
//        {
//          n: "session",
//          s: [0,1,2],
//          g: {
//            0: {
//              n: "computer",
//              s: [1,2,3],
//              g: {
//                0: {
//                  n: "room",
//                  s: [1,2,3],
//                }
//              }
//            },
//            1: {
//              n: "user",
//              s: [0,2,3],
//              g: {
//                0: {
//                  n: "department",
//                  s: [1,2,3]
//                },
//              }
//            }
//          }
//        }
// ########################################################

//utility methods
const strMax = (a,b)=> parseInt(b) > parseInt(a) ? parseInt(b) : parseInt(a); 
const getNextKey = (o)=> exists(o) && exists(Object.keys(o)) && o !== {} ? (Object.keys(o).reduce( (a,c)=>strMax(a,c)+1,0)) :  0;
const getCurKey = (o)=> Math.max( getNextKey(o)-1, 0);
const resolveGroups = (go)=> exists(go) && exists(go.reduce) ? go.reduce((a,c,i)=> ({...a, [i]: {n: c.name, s: c.statistics, g: resolveGroups(c.subgroups)}}),{}) : {};


//DataShroud class - used to build datashroud objects
class DataShroud {
  constructor(data={},parameters={},statistics={},groups={}){
    this.o = {
      data,
      parameters,
      statistics,
      groups
    };
    
    return this;
  }
  
  //Create components via functions
  //
  parameter(n,t,a){
    this.o.parameters[getNextKey(this.o.parameters)] = {n,t,a};
    return this;
  }
  //
  statistic(n,p,f,a=false){
    this.o.statistics[getNextKey(this.o.statistics)] = a ? {n,p,f,a} : {n,p,f};
    return this;
  }
  //
  group(g){
    this.o.groups = {
      n: g.name,
      s: g.statistics,
      g: resolveGroups(g.subgroups)
    };
    return this;
  }
  //
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
  
  
  //Return the current DSO
  Output(){
    return this.o;
  }
};

export default DataShroud;