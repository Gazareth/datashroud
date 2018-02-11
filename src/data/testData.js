import {ComputerData, UserData} from "./DataGeneration/DATAGEN_Computers_Users.js";
import numeral from "numeral";
const duration = require('human-duration');


/*const getData = function(
  dataMode = "computer",
  measures = [
    {n: "time", a: cast.sum, f: (s)=>duration.fmt(1000 * parseInt(s))}
  ],
  group = "room",
  sizeField = "time",
  sizeName = "size"
  ){
  const datas = {computer: ComputerData, user: UserData};
  return castDataToTree(datas[dataMode],measures,group,sizeField,sizeName);
};*/
  

const level0 = ["computers","users"];  //todo: these strings should be dataShroud objects

//computers
const level1_0 = {
      data: ComputerData,
      primeEntity: "computer",
      measures:  [
          {n: "time", a: cast.sum, f: (s)=>duration.fmt(1000 * parseInt(s))},
          {n: "users",a: cast.count, f: (s)=>numeral(s).format('0,0')+" users"},
          {n: "emails",a: cast.sum, f: (s)=>numeral(s).format('0,0')+" emails sent"},
          {n: "browsing",a: cast.sum, f: (s)=>duration.fmt(1000 * parseInt(s))+" browsing tinternet"},
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
          {n: "time", a: cast.sum, f: (s)=>duration.fmt(1000 * parseInt(s))},
          {n: "computers",a: cast.count, f: (s)=>numeral(s).format('0,0')+" users"},
          {n: "emails",a: cast.sum, f: (s)=>numeral(s).format('0,0')+" emails sent"},
          {n: "browsing",a: cast.sum, f: (s)=>duration.fmt(1000 * parseInt(s))+" browsing tinternet"},
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