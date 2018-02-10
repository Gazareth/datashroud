import {rooms_, departments_, users_, computers_} from "./Data_Dimensions.js";
import {castDataToTree} from "../utility/DataCasting.js";
import numeral from "numeral";
const duration = require('human-duration');

//GENERATE DAYTA - Creates "day" summaries for either computer or user activity
//args
//mode - 1 for users, 0 for computers
//days - how many days back from today
const generateDayta = function(mode = 0,days=0){
  const roomMax = rooms_.length -1 ;
  const deptMax = departments_.length - 1;
  
  const computerMax = computers_.length - 1;
  const timeMax = 3600+(3600*8);  //10 hours a day max boys!
  const userMax = users_.length;  //number of users in the system
  const userPerCompDay = 5; //how many different users can use one computer per day
  const compPerUserDay = 7; //how many different computers can a user use per day
  const maxEmail = 50;
  const emailPerDay = maxEmail*.5 + Math.round(Math.random()*maxEmail*.5); //max number of emails per user per day

  const currentDay = 20180131;
  const maxDaysBack = days;
  
  const rr = (r=1,e=1)=>Math.round(Math.pow(Math.random(),e)*r);  //rounded random number
  
  let dayData = [];
  
  for(var i=0;i<=maxDaysBack;i++){
    for(var j=0; j< (mode ? userMax :computerMax); j++ ){
      const w = rr(1,0.5) > 0.2;  //Worked? sometimes a computer or user may not have done anything for a particular day
      const eml = ()=>(Math.round(Math.random()*emailPerDay));//emails per user per day
      
      if( !mode ){
        const u = w ? 1+rr(userPerCompDay,2) : 0; //number of users
        const e = Array.from(Array(u).keys()).reduce(((a,c)=>a+eml()),0);
        
        dayData.push({
          computer: computers_[j],
          room: rooms_[rr(roomMax)],
          users: u,
          emails: e,  //accumulate random number of emails for all users
          time: w ? rr(timeMax) : 0,
        });
        
        
      } else {
        dayData.push({
          user: users_[j],
          department: departments_[rr(deptMax)],
          computers: w ? 1+rr(compPerUserDay,3) : 0,
          emails: eml(),
          time: w ? rr(timeMax) : 0,
        });
      }
    }
  }
  
  return dayData;
};

const ComputerData = generateDayta(0,0);
const UserData = generateDayta(1,0);


//temp function to quickly gen computer or user data
//mode - what the data focuses on: computers or users
//measures - the fields to do casts on and how to cast them
//group - what field are the entities grouped by

export const getData = function(
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
};