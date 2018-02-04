import {rooms_, departments_, users_, computers_} from "./Data_Dimensions.js";
import {castDataToTree} from "../utility/DataCasting.js";

//GENERATE DAYTA - Creates "day" summaries for either computer or user activity
//args
//mode - 1 for users, 0 for computers
const generateDayta = function(mode = 0,days=0){
  const roomMax = rooms_.length -1 ;
  const deptMax = departments_.length - 1;
  
  const computerMax = computers_.length - 1;
  const timeMax = 3600+(3600*8);  //10 hours a day max boys!
  const userMax = users_.length;  //number of users in the system
  const userPerCompDay = 5; //how many different users can use one computer per day
  const compPerUserDay = 7; //how many different computers can a user use per day
  
  const currentDay = 20180131;
  const maxDaysBack = days;
  
  const rr = (r=1,e=1)=>Math.round(Math.pow(Math.random(),e)*r);  //rounded random number
  
  let dayData = [];
  
  for(var i=0;i<=maxDaysBack;i++){
    for(var j=0; j< (mode ? userMax :computerMax); j++ ){
      const w = rr(1,0.5) > 0.2;  //Worked? sometimes a computer or user may not have done anything for a particular day

      if( !mode ){
        
        dayData.push({
          computer: computers_[j],
          room: rooms_[rr(roomMax)],
          users: w ? 1+rr(userPerCompDay,2) : 0,
          time: w ? rr(timeMax) : 0,
        });
      } else {
        dayData.push({
          user: users_[j],
          department: departments_[rr(deptMax)],
          computers: w ? 1+rr(compPerUserDay,3) : 0,
          time: w ? rr(timeMax) : 0,
        });
      }
    }
  }
  
  return dayData;
};

const ComputerData = generateDayta(0,0);
const UserData = 0;


//temp function to quickly gen computer or user data
export const getData = function(mode = 0,days=0){
  return castDataToTree(ComputerData);
};