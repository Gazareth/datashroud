import DSA from "./DataShroudAggregation.js";
import {Pick} from "../../utility/Arrays.js";

class DataShroudCasting {
  
  //ResolveGroups - gets the string field names for the groupings specified by their indices
  //d - datashroud object
  static _resolveGroups(d){
    //ga - groups array
    //gcia - current grouping index array
    return d.cast.g.reduce((ga,gcia)=> [...ga, d.groups[gcia]], []);
  }

  //ResolveParams - links params to stats where possible, returns an array of 'paramstat' objects
  //d - datashroud object
  static _resolveStats(d){
    //sa - stats array
    //sc - current stat (will be in index form)
    return d.cast.s.map(
      (si)=> (
        {
          ...d.statistics[si],
          p: d.parameters[d.statistics[si].p]
        }
      )
    );
  }


  //ApplyCast - returns data object after it has been shaped as dictated by datashroud cast
  static applyCast(d){
    return d.cast.p === [] ? d.data : DSA(d.data,this._resolveGroups(d),this._resolveStats(d));
  }

}

export default DataShroudCasting;