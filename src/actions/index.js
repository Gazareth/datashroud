/*export const goDeeper = () =>({type: "INCREASE_LEVEL"});*/
export const goDeeper = function() {
  console.log("GOING DEEPER!");
  return ({type: "INCREASE_LEVEL"});
};

/*export const goShallower = () =>({type: "DECREASE_LEVEL"});*/
export const goShallower = function(e) {
  console.log("GOING SHALLOWER!");
  e.preventDefault();
  return ({type: "DECREASE_LEVEL"});
};

