
export const goDeeper = function() {
  console.log("GOING DEEPER!");
  return ({type: "INCREASE_LEVEL"});
};


export const goShallower = function(e) {
  console.log("GOING SHALLOWER!");
  e.preventDefault();
  return ({type: "DECREASE_LEVEL"});
};

export const focusSector = function(i) {
  console.log("FOCUSING: ",i);
  return ({type: "FOCUS_INDEX", payload: i});
};