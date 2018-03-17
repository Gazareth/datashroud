import {rooms_, departments_, users_, computers_} from "./DATAGEN_Dimensions.js";
import {ri_} from "../../utility/RNG.js";
require('melt-data');

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
  const browsingMax = 0.8; //maximum portion of time per day spent browsing tinternet
  
  const userPerCompDay = 5; //how many different users can use one computer per day
  const compPerUserDay = 7; //how many different computers can a user use per day
  const maxEmail = 50;
  const emailPerDay = maxEmail*.5 + Math.round(Math.random()*maxEmail*.5); //max number of emails per user per day
  
  const currentDay = 20180131;
  const maxDaysBack = days;
  
  let dayData = [];
  
  for(var i=0;i<=maxDaysBack;i++){
    for(var j=0; j< (mode ? userMax :computerMax); j++ ){
      const w = ri_(1,0.5) > 0.2;  //Worked? sometimes a computer or user may not have done anything for a particular day
      const eml = ()=>(Math.round(Math.random()*emailPerDay));//emails per user per day
      const bt = (t)=>Math.round(t - browsingMax*(t*Math.random()));  //resolves time spent browsing
      
      if( !mode ){
        const u = w ? 1+ri_(userPerCompDay,2) : 0; //number of users
        const e = Array.from(Array(u).keys()).reduce(((a,c)=>a+eml()),0); //number of emails sent on this day
        const t = w ? ri_(timeMax) : 0;  //time worked on this computer
        
        dayData.push({
          type: "computer",
          computer: computers_[j],
          room: rooms_[ri_(roomMax)],
          users: u,
          emails: e,  //accumulate random number of emails for all users
          time: w ? ri_(timeMax) : 0,
          browsing: bt(t),
        });
        
        
      } else {
        const t = w ? ri_(timeMax) : 0;  //time worked on computers by this user on this day
        
        dayData.push({
          type: "user",
          user: users_[j],
          department: departments_[ri_(deptMax)],
          computers: w ? 1+ri_(compPerUserDay,3) : 0,
          emails: eml(),
          time: w ? ri_(timeMax) : 0,
          browsing: bt(t),
        });
      }
    }
  }
  
  return dayData;
};

export const ComputerData = generateDayta(0,0);
export const UserData = generateDayta(1,0);

export const TypeCounts = cast([...ComputerData, ...UserData],["type"],cast.count,"count");

//console.log("Casting TypeCounts FROM",[...ComputerData, ...UserData]);
//console.log("GOT: ",TypeCounts);