import {Sessions} from "./DataGeneration/DATAGEN_Sessions.js";
import DSO from "./DataShroud/DataShroudO.js";

import DSA from "./DataShroud/DataShroudAggregation.js";

//This contains the raw data with all available metrics/measures
const DS_Data = (new DSO(Sessions))
//parameters
    .parameter("computer","string","Computers")             //0
    .parameter("user", "string", "Users")                   //1
    .parameter("time", "duration","Time")                   //2
    .parameter("session", "object","Sessions")              //3
//statistics
    .statistic("typeCount",[0,1],"countDistinct")           //0
    .statistic("timeTtl",[2],"sum","Total Time")            //1
    .statistic("timeAvg",[2],"avg","Average Time")          //3
    .statistic("sessionTtl",[3],"sum","Total Sessions")     //4
    .statistic("sessionAvg",[3],"sum","Average Sessions")   //5
//groups
    .group({
      name: "session",
      statistics: [1,2],
      subgroups: [
        {
          name: "computer",
          statistics: [1,2,3],
          subgroups: [
            {
              name:"room",
              statistics: [1,2,3]
            }
          ]
        },
        {
          name: "user",
          statistics: [0,2,3],
          subgroups: [
            {
              name: "department",
              statistics: [0,2,3]
            }
          ]
        }
      ]
    })
    .Output();

console.log("SESSIONS!",Sessions);
console.log("DS_OBJ",DS_Data);
//console.log(JSON.stringify(level__.groups));

//console.log(DSA.sum(DS_Data.data,["user"],"time"));

//console.log(DSA.aggregate(DS_Data.data,["user"],"time"));

const data = DS_Data;
/*
      {
        0: level0, 
        1: level1_0
      }
      ;
*/

export default data;