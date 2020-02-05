import {Sessions} from "./DataGeneration/DATAGEN_Sessions.js";
import DSO from "./DataShroud/DataShroudO.js";

import Cast from "./DataShroud/DataShroudAggregation.js";

//This contains the raw data with all available metrics/measures
const DSObj = (new DSO(Sessions))
//parameters
    .parameter("computer","string","Computers")             //0
    .parameter("user", "string", "Users")                   //1
    .parameter("room", "string", "Rooms")                   //2
    .parameter("department", "string", "Departments")       //3
    .parameter("time", "duration","Time")                   //4
    .parameter("session", "object","Sessions")              //5
    .parameter("count","count","Count")                     //6
//statistics
    .statistic("typeCount",6,"countd","Count Each")       //0
    .statistic("timeTtl",4,"sum","Total Time")            //1
    .statistic("timeAvg",4,"avg","Average Time")          //2
    .statistic("sessionTtl",5,"sum","Total Sessions")     //3
    .statistic("sessionAvg",5,"avg","Average Sessions")   //4
//groups
    .group("session",[1,2,3])                               //0
    .group("computer",[1,2,3,4],[0])                        //1     
    .group("room",[0,1,2,3,4],[0,1])                        //2
    .group("user",[1,2,3,4],[0])                            //3
    .group("department",[0,1,2,3,4],[0,3])                  //4
;

/*{
      name: "session",
      statistics: [1,2],
      subgroups: [
        {
          name: "computer",
          statistics: [1,2,3,4],
          subgroups: [
            {
              name:"room",
              statistics: [1,2,3,4]
            }
          ]
        },
        {
          name: "user",
          statistics: [1,2,3,4],
          subgroups: [
            {
              name: "department",
              statistics: [1,2,3,4]
            }
          ]
        }
      ]
    }*/


console.log("SESSIONS!",Sessions);
console.log("DS_OBJ",DSObj);

//console.log(JSON.stringify(level__.groups));

//console.log(DSA.sum(DSObj.data,["user"],"time"));

//console.log("Apply Cast: ", DSObj.Cast([1,2],[2]));
console.log("Data Cast: ", DSObj.CastData([1,2],[1,2]));

const data = DSObj.Output();
/*
      {
        0: level0, 
        1: level1_0
      }
      ;
*/

export default data;