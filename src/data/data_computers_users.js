import {ComputerData, UserData, TypeCounts} from "./DataGeneration/DATAGEN_Computers_Users.js";
import {sumCast, countCast} from '../utility/DataCasting';
import numeral from "numeral";
const duration = require('human-duration');

//FORMATTING; s - string
const f_t = (s)=>duration.fmt(1000 * parseInt(s)); //TIME
const f_i = (s)=>numeral(s).format('0,0'); //INTEGER

const level0 =
  {
    data: TypeCounts,
    primeEntities: {0: "Computers", 1: "Users"},
    measures:  [
        {n: "count",a: sumCast, f: (s)=>f_i(s)},
      ],
    group: "type",
    yField: "count",
    yAlias: "size"
  };

//computers
const level1_0 = {
      data: ComputerData,
      primeEntity: "computer",
      measures:  [
          {n: "time", a: sumCast, f: (s)=>f_t(s)},
          {n: "users",a: countCast, f: (s)=>f_i(s)+" users"},
          {n: "emails",a: sumCast, f: (s)=>f_i(s)+" emails sent"},
          {n: "browsing",a: sumCast, f: (s)=>f_t(s)+" browsing tinternet"},
        ],
      group: "room",
      yField: "browsing",
      yAlias: "size"
};

//users
const level1_1 = {
      data: UserData,
      primeEntity: "computer",
      measures:  [
          {n: "time", a: sumCast, f: (s)=>duration.fmt(1000 * parseInt(s))},
          {n: "computers",a: countCast, f: (s)=>numeral(s).format('0,0')+" computers"},
          {n: "emails",a: sumCast, f: (s)=>numeral(s).format('0,0')+" emails sent"},
          {n: "browsing",a: sumCast, f: (s)=>duration.fmt(1000 * parseInt(s))+" browsing tinternet"},
        ],
      group: "room",
      yField: "browsing",
      yAlias: "size"
};

//computers
const level2_0 = {
      data: ComputerData,
      primeEntity: "computer",
      measures:  [
          {n: "time", a: sumCast, f: (s)=>f_t(s)},
          {n: "users",a: countCast, f: (s)=>f_i(s)+" users"},
          {n: "emails",a: sumCast, f: (s)=>f_i(s)+" emails sent"},
          {n: "browsing",a: sumCast, f: (s)=>f_t(s)+" browsing tinternet"},
        ],
      group: "room",
      yField: "browsing",
      yAlias: "size"
};

const data = 
      {
        0: level0, 
        1: level1_0
      }
      ;

export default data;