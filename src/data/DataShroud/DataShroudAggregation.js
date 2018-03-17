class DataShroudAggregation {
  //d - data
  //g - grouping(s) to aggregate across
  //p - parameter(s) to aggregate
  
  //array of distinct values for a group
  static group(d,g){
    return Array.from(new Set(d.reduce((a,c)=>[...a,c[g]],[])));
  }
  
  //returns rows that have been grouped arbitrarily and sums a specific parameter across these groupings
  /*static sum(d,g,p){
    console.log("DOING SUM, d g groups ",d,g,this.group(d,g[0]));    
    
    //once we have the groups split into sets, we can sum across them
    //a - aggregated, c - current grouping name (e.g. "room")
    //gr - groups rows, cg - current group value (e.g. "reception")
    //rc - rows combined, cr - current row
    return g.reduce( (a,c)=> this.group(a,c).reduce( (gr,cg)=> [...gr, {...(a.reduce((rc,cr)=> (cr[c] === cg ? {...cr, ...rc, [p]: (rc[p] + cr[p]) } : rc), {[p]:0})) }], [] ) ,d);
  }*/
  
  //takes a set of data and performs aggregation
  //d - data
  //g - grouping(s) to aggregate across
  //p - parameter(s) to aggregate, and aggregation function
  static aggregate(d,g,p){
    //first reduce the data into groups based on g
    const dd = d.reduce((da,dc)=>  [...da, 
             //find if there is yet a row with the distinct group values found in dc
             //if not, return a row to be added to da with the specified grouping values
             //if so, do nothing
             //daa = data aggregated aggregated, dac = data aggregated current row
             ...(da.reduce((daa,dac)=> [...daa,
               //hgv = have group vals
               {...g.reduce((hgv,gv)=> (hgv && dac[gv] === dc[gv], false) ? 
                  //create a version of dc (current data row) with only the specified group parameters
                  //dwg = data with group params only
                  g.reduce((dwg,gv)=> ({...dwg, gv: dc[gv]}), {}) :
                  {}
                  )}]
                  )
          )], {});
    
    return dd;
  }
}

export default DataShroudAggregation;