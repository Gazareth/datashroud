import {exists} from "./CompatibilityFunctions.js";

//Amalgamate
//takes an array of objects and creates an array of all of the p values in the array
export const Amalgamate = (A,p)=>(A.reduce((a,c)=> [...a, ...(exists(c[p]) ? c[p] : [])] , []));

//Map
//Takes an array of indexes and another array, building a third array by picking the indexes contained within the first array FROM the second
export const Pick = (a1,a2)=> a1.map((a1v)=>a2[a1v]);

//FilterFrom
//takes two arrays and returns a1 with all its values that exist or do not exist in a2
//c - condition (true = positive intersection, false = negative)
export const FilterFrom = (a1,a2,c=true)=> (a1.filter ((a1v)=> c === (a2.indexOf(a1v) !== -1)));

//FilterIf
//takes two arrays and returns a1 excluding any of its values where a given property is an array that has at least one value in a2
//a1 - objects that have property p which is an array of values
//a2 - values a1 should not have any of
export const FilterOut = (a1,a2,p)=> (
  a1.filter((a1v)=> (FilterFrom(a2[a1v][p],a1).length === 0) )
);