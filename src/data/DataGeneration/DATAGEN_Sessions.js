import {GetUser, GetComputer} from "./DATAGEN_Dimensions_Computers_Users.js";
import {exists} from "../../utility/CompatibilityFunctions.js";
import {ri_, ra_, rp_} from "../../utility/RNG.js";  //ri_ = random integer; ra_ = randomly-split array
import moment from 'moment';

require('melt-data');

//object property get: o - object, pn - property name, f - false return value
const op_ = (o,pn,f)=> exists(o) && exists(o[pn]) ? o[pn] : f;

const timeFormat = 'YYYY-MM-DD HH:mm:ss'; //time format
const timeOfDay = (d,s)=>moment(d,"YYYYMMDD").clone().startOf('day').add(s,'s');//takes a date in the format YYYYMMDD and returns a time that is s seconds from the start of that day

const date = 20180217;
const dayLength = 86400;

const minSessionLength = 600;   //computer must be on for at least 10 min
const maxSessionCount = 11; //this many sessions in one shift/day is getting a bit ridick
const sessionCountCurve = 1;
const sessionBreakRatio = 0.75; //how much of the power on time is logged-in sessions as opposed to breaks

const maxSessionVariety = 8;  //number of different types of activities (working, browsing, browsing (productive)) per session
const badBhvrIntvl = 3600; //a bad behaviour will happen between intervals of this length

const maxWordsPerSec = 6;
const minWordsPerEmail = 4;
const maxWordsPerEmail = 2000;

const metrics = {
  browsing: ["browsing","time","browsing"],
  emails: Array(3).fill("emails"),
  words: ["emails","words","words"],
  emailTime: ["emails","time","emailTime"],
};
      


class DailyComputerSessions{
  constructor(computer){
    this._computer = computer;
    
    this._userWords = {["testName"]: {total: 0, current: 0}};
    
    //Cooldowns to pad out randomness (maybe)
    this._prCD = 0; //profanity
    this._dCD = 0;  //deadline
    this._mCD = 0;  //meeting
    this._pwCD = 0;  //password forgotten
    
    this._sessionTypes = [
      {n: "emails", f: this.WriteEmails.bind(this)},
      {n: "browsing", f: this.BrowseWeb.bind(this)},
      {n: "research", f: this.DoResearch.bind(this)},
    ];
    
    return {object: this, data: (this.GenerateSesions())};
  }
  
  DoResearch(){
    return {};
  }
  
  BrowseWeb(){
    return {};
  }
  
  WriteEmails(d, u){  //duration, user
    let emails = 0;
    let words = 0;
    
    let uW = {...(this._userWords[u])}; //userWords
    uW = Object.keys(uW).reduce((a,c)=>({...a, [c]: uW[c]}),{total: 0, current: 0});  //put 0 into each incase not present
    
    for( var i = 1 ; i<=d; i++){
      const typed = ri_(maxWordsPerSec,2);
      
      uW.current += typed;
      words += typed;
      const emailWords = minWordsPerEmail + (ri_(maxWordsPerEmail - minWordsPerEmail,2));
      if( uW.current >= emailWords ){
        const rem = uW.current % emailWords;
        uW.total += uW.current;
        uW.current = rem;
        emails++;
      }
    }
    
    //update the cache
    this._userWords[u] = uW;
    return {words, emails};
  }
  
  ResolveSubSessions(subSessions,metrics){
    return subSessions.reduce((sSm,sS,i)=> ({...sSm, ...(metrics.reduce((tm,m)=> ({...tm, ...(sS.type === m[0] ? {[m[2]]: op_(tm,m[1],0) + sS[m[1]]} : {})}), {}))}),{});
  }
  
  MakeSubSessionInfo(pid,duration,user){
    const id = rp_(Array.from(this._sessionTypes.keys()).filter((e)=>e!==pid));
    
    return {typeId: id, type: this._sessionTypes[id].n, ...(this._sessionTypes[id].f(duration,user))};
  }
  
  MakeSession(startTime, duration, subSession=false, u=false){
    const startMom = timeOfDay(date,startTime);
    
    let subSessionInfo = subSession === false ? {} : this.MakeSubSessionInfo(subSession,duration,u);
    
    return ({
      ...subSessionInfo,
      //startRaw: startTime,
      //endRaw: startTime+duration,
      start: startMom,
      end: startMom.clone().add(duration,'s'),
      time: duration,
    });
  }
  
  //takes a time in seconds and a duration in seconds to provide a session object
  MakeLoggedInSession(startTime, duration){
    
    const l = Math.random() > sessionBreakRatio ? 0 : 1;  //is someone actually logged in?
    const u = l ? GetUser() : {user: 0, department: 0}; //get a user
    const usr = u.user;
    const dpt = u.department;
    
    //split into multiple sesions: work, browsing, browsing(for reasearch/productive)
    const ssd = ra_(duration,ri_(maxSessionVariety,4)).map((e)=>Math.round(e)); //subsession durations
    //subsessions are only generated for a browsing session
    //so the other sessions are entered as 0 and then filtered out;
    //console.log("MAKING SUBSESSIONS FROM: ",ssd);
    const subSessions = ssd.reduce((a,c,i)=> [...a, (this.MakeSession( (op_(a[i-1],"endTime",startTime)),c,op_(a[i-1],"typeId",-1),usr))],[]);
    
    //!!!!!
    //      GENERATE BAD BEHAVIOURS at random intervals but sort of depends on how long the session is
    //!!!
    
    return ({
      type: "computer",
      computer: this._computer.computer,
      room: this._computer.room,
      user: usr,
      department: dpt,
      ...this.MakeSession(startTime,(l ? duration : 0)),
      unTime: l ? 0 : duration,
      //browsing: subSessions.reduce((a,c)=>c.type==="browsing" ? a+c.time : a,0),
      //emails: subSessions.reduce((a,c)=>c.type==="emails" ? a+c.time : a,0),
      ...this.ResolveSubSessions(subSessions,[metrics.browsing,metrics.emails,metrics.words]),
      subSessions,
    });
  }
  
  
  GenerateSesions(){
    //split day up into 4 parts, the inner two will be the time where the computer is switched on
    const dq = ra_(dayLength,4).map((e)=>Math.round(e));
    
    //the 'day' starts after the FIRST portion and ends at the 3rd
    const shiftLength = dq.slice(1,-1).reduce((a,c)=>a+c,0);  //how long is the computer switched on for?
    
    const activityStart = dq[0];
    //const activityend = activityStart.clone().add(shiftLength,'s'); //don't really need this as shiftLength already limits the below
    
    //calculate number of sessions and then length of each
    const numSessions = ri_(maxSessionCount,sessionCountCurve)+1;
    
    const sd = ra_(shiftLength,numSessions).map((e)=>Math.round(e)); //session durations

    //make new array from session times where each element outlines the full session
    const sessions = sd.map((e,i)=>this.MakeLoggedInSession(activityStart + sd.slice(0,i).reduce((a,c)=>a+c,0),e)).filter((e)=>e.unTime === 0);
    
    //console.log("RESULT: ",sessions);
    return (sessions);
  }
}


const DCS = [
  ...((new DailyComputerSessions(GetComputer())).data), 
  ...((new DailyComputerSessions(GetComputer())).data)
];

console.log("DCS IS : ",DCS);

//const sesions = DCS.GenerateSessions();
export const Sessions = DCS;//;.GenerateSesions();

//export default DailyComputerSessions;