import {Amalgamate} from "../../utility/Arrays.js";

class DataShroudAggregation {
  
  //GroupMatch - Takes two data rows and checks if they have the same values against given set of groupings
  //returns the row regardless if there is no grouping
  static _groupMatch(d1,d2,g){
    return g.length > 0 ? g.reduce((hgv,gv)=> (hgv && d1[gv] === d2[gv]), true) : true;
  }
  
  //takes an array of data and groups together 
  //with distinct values for multiple specified groupings
  static _group(d,g){
    return d.reduce((da,dc)=>  [...da, 
             //search through da to find if there is a row where values of all keys for g match
             //if such a row is found, do nothing, otherwise add this row to da (but only with the params specified in g)
             //reduce da into dah - da has row?
             ...(da.reduce((dah,dac)=> 
               //search through all g values for the current da row
               //hgv = have group val ? this needs to be true for the whole of g, so is reduced
               dah || this._groupMatch(dc,dac,g), false)) ? [] : [g.reduce((ga,gc)=>({...ga, [gc]: dc[gc]}),{})]
              ]
          , []);
  }
  
  //takes a set of data and performs aggregation
  //d - data array
  //g - groupings array
  //s - statistics array, contains parameter indices
  static aggregate(d,g,s){
    
    //first reduce the data into a dataset that just represents the groupings, this can be 
    //used later when searching for data rows with matching values under these keys
    const gd = this._group(d,Amalgamate(g,"n",false));
    
    console.log("GROUPING! with data: ",d," on groups: ",g," which becomes: ",Amalgamate(g,"n",false)," result: ",gd);
    
    //to place all of the statistics in each row
    //for each grouped data point, generate the aggregated value for each parameter
    return gd.reduce((gda,gc)=> [
      //start with latest build
      ...gda,
      //add on row for this current grouped data point, make new object with stats in
      ...[{
        //build on current row because it has grouping values in
        ...gc,
        //so - stats object, sc - current stat
        ...s.reduce((so,sc)=>({
          ...so,
          [sc.n]: this._doAggr(d,gc,sc.f,sc.p) }),{})
         }]
    ] ,[]);
  }

  //given a data set and a sample row for grouping values, returns array of values for a specific parameter
  //d - data set
  //gv - grouping values (a row of data with values against all appropriate groupings)
  //p - parameter name
  static _getV(d,gv,p){
    return d.reduce((va,dc)=> [...va, ...(this._groupMatch(dc,gv,Object.keys(gv)) ? [dc[p.n]] : [])  ], []);
  }

  //gets a specific aggregation function based on a string specification
  //f - function name
  static _getF(f){
    switch(f){
      case "sum":
        return this._sum.bind(this);
        break;
      case "avg":
        return this._avg.bind(this);
        break;
      case "countd":
        return this._countd.bind(this);
        break;
    }
  }

  //DoAggr - given a data set and a sample row for grouping values, performs the aggregation function specified by string upon the given parameter across all data rows sharing the same grouping values
  //d - data set
  //gr - grouping sample values
  //f - aggregation function (string)
  //p - parameter name to aggregate
  static _doAggr(d,gr,f,p){
    console.log("DOING AGGR ON ",gr,Object.keys(gr),f,p);
    console.log("GOT VALUES: ",this._getV(d,gr,p));
    console.log("Returning: ",(this._getF(f))( this._getV(d,gr,p) ));
    return (this._getF(f))( this._getV(d,gr,p) );
  }
  
  
  //FUNDAMENTAL AGGREGATION FUNCTIONS
  //
  //
  //  SUM
  //takes an array of numeric values v and adds them all up
  static _sum(v){
    console.log("Summing: ",v);
    return v.reduce((a,c)=>a+c,0);
  }
  //
  //  AVERAGE
  //takes an array of numeric values v and adds them and then divides by their number
  static _avg(v){
    return v.length > 0 ? this._sum(v)/v.length : null;
  }
  
  
}


export default DataShroudAggregation.aggregate.bind(DataShroudAggregation);