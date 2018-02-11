const maxDataLevel = 2;

//initial states for each part of the state
//
//3 state variables in focus
// now: currently focused data object's ID
// prev: previously focused data object's ID (not including -1  i.e. null selections)
// prev_: previously focused data object's ID (including -1 i.e. null selections)
const s_dataLevel = {now: 0, max: maxDataLevel};
//
const s_dataFocus = {now: -1, prev: -1, prev_: -1};


//Functions to change different parts
const changeLevel = (s,p)=>({
    ...s,
    level: {
      ...s.level,
      now: Math.max(0,Math.min(s.level.now+p,s.level.max)),
    },
    focus: setFocus(s.focus), //changing data level resets the focus
});

const setFocus = (s, p = 0)=>(
  {
      ...s,
      prev_: s.now,
      prev: s.now === -1 ? s.prev : s.now,
      now: p === 0 ? -1 : s.now + p,
    }
);

export const dataState = (state = { level: s_dataLevel, focus: s_dataFocus }, action )=>{
  switch(action.type) {
    case 'INCREASE_LEVEL':
      return changeLevel(state,1);
    case 'DECREASE_LEVEL':
      return changeLevel(state,-1);
    case 'FOCUS_INDEX':
      return {...state, focus: setFocus(state.focus,action.payload)};
    default:
      return state;
  }
};