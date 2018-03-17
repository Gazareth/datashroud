import {Sessions} from "./DataGeneration/DATAGEN_Sessions.js";

const DSO =   {
  data: [0,1,2,3],
  parameters: {
    0:{n: "computer", t: "string", a: "Computers"},
    1:{n: "user", t: "string", a: "Users"},
    2:{n: "time", t: "duration", a: "Time"},
    3:{n: "session", t: "object", a: "Sessions"},
  },
  statistics: {
    0:{n: "typeCount", p: [0,1], f: "countDistinct" }, //lack of 'a' field (alias) means it comes from the measures
    1:{n: "timeTtl", p: [2], f: "sum", a: "Total Time"},
    2:{n: "timeAvg", p: [2], f: "avg", a: "Average Time"},
    3:{n: "sessionTtl", p:[3], f: "count", a: "Sessions"},
  },
  groups: {
    n: "session",
    s: [0,1,2],
    g: {
      0: {
        n: "computer",
        s: [1,2,3],
        g: {
          0: {
            n: "room",
            s: [1,2,3],
          }
        }
      },
      1: {
        n: "user",
        s: [0,2,3],
        g: {
          0: {
            n: "department",
            s: [1,2,3]
          },
        }
      }
    }
  }
};