import {rooms_, departments_, users_, computers_} from "./DATAGEN_Dimensions.js";
import {ri_, ra_} from "../../utility/RNG.js";
import moment from 'moment';

const timeFormat = 'YYYY-MM-DD HH:mm:ss'; //time format
const timeOfDay = (d,s)=>moment(d,"YYYYMMDD").clone().startOf('day').add(s,'s');//takes a date in the format YYYYMMDD and returns a time that is s seconds from the start of that day

const date = 20180217;
const dayLength = 86400;

const minSessionLength = 600;   //computer must be on for at least 10 min
const maxSessionCount = 11; //this many sessions in one shift/day is getting a bit ridick
const sessionBreakRatio = 0.75; //how much of the power on time is logged-in sessions as opposed to breaks

const maxSessionVariety = 8;  //number of different types of activities (working, browsing, browsing (productive)) per session
const badBhvrIntvl = 3600; //a bad behaviour will happen between intervals of this length

const isOddd = (n) => (n % 2) == 1;

class DailyComputerSessions{
  constructor(computerName, computerRoom){
    this._name = computerName;
    this._room = computerRoom;
    
    //this._ct = 0; //current time, offset from start of day in seconds
    
    //Cooldowns to pad out randomness
    this._prCD = 0; //profanity
    this._dCD = 0;  //deadline
    this._mCD = 0;  //meeting
    this._pwCD = 0;  //password forgotten
  }
  
  MakeSession(startTime, duration){
    const startMom = timeOfDay(date,startTime);
    
    return ({
      startRaw: startTime,
      endRaw: startTime+duration,
      start: startMom.format(timeFormat),
      end: startMom.clone().add(duration,'s').format(timeFormat),
      time: duration,
    });
  }
  
  //takes a time in seconds and a duration in seconds to provide a session object
  MakeLoggedInSession(startTime, duration){
    
    const l = Math.random() > sessionBreakRatio ? 0 : 1;  //is someone actually logged in?
    const u = l ? users_[ri_(users_.length)] : 0;
    
    //split into multiple sesions: work, browsing, browsing(for reasearch/productive)
    const ssd = ra_(duration,ri_(maxSessionVariety,4)).map((e)=>Math.round(e)); //subsession durations
    //subsessions are only generated for a browsing session
    //so the other sessions are entered as 0 and then filtered out;
    console.log("MAKING SUBSESSIONS FROM: ",ssd);
    const subSessions = ssd.map((e,i)=> isOddd(i) ? this.MakeSession(startTime+ssd.slice(0,i+1).reduce((a,c)=>a+c,0),e) : 0).filter((e)=>e!==0);
    console.log("MADE ",subSessions);
    //also generate bad behaviours at random intervals but sort of depends on how long the session is
    
    
    return ({
      ...this.MakeSession(startTime,(l ? duration : 0)),
      type: "computer",
      name: this._name,
      room: this._room,
      user: u,
      unTime: l ? 0 : duration,
      browsing: subSessions,
    });
  }
  
  
  GenerateSesions(){
    //split day up into 4 parts, the inner two will be the time where the computer is switched on
    const dq = ra_(dayLength,4).map((e)=>Math.round(e));
    
    //the 'day' starts after the FIRST portion and ends at the 3rd
    const shiftLength = dq.slice(1,-1).reduce((a,c)=>a+c,0);  //how long is the computer switched on for?
    
    const activityStart = timeOfDay(date,dq[0]);
    const activityend = activityStart.clone().add(shiftLength,'s');
    
    console.log(dq, dq.reduce((a,c)=>a+c,0));
    //calculate number of sessions and then length of each
    const numSessions = ri_(maxSessionCount,4)+1;
    
    const sd = ra_(shiftLength,numSessions).map((e)=>Math.round(e)); //session durations
    console.log(numSessions,sd);
    //make new array from session times where each element outlines the full session
    const sessions = sd.map((e,i)=>this.MakeLoggedInSession(sd.slice(0,i+1).reduce((a,c)=>a+c,0),e));
    
    console.log(sessions);
    return JSON.stringify(sessions);
  }
}


const DCS = new DailyComputerSessions("Computer1", "Room1");

//const sesions = DCS.GenerateSessions();
const sessions = DCS.GenerateSesions();

export default sessions;

//export default DailyComputerSessions;