const maxDataLevel = 2;

export const dataLevel = (state = {level: 0, maxLevel: maxDataLevel}, action) => {
  switch (action.type) {
    case 'INCREASE_LEVEL':
      return {...state, level: state.level + (state.level < state.maxLevel ? 1 : 0)};
    case 'DECREASE_LEVEL':
      return {...state, level: state.level + (state.level > 0 ? -1 : 0)};
    default:
      return state;
  }
};

//3 state variables here
// now: currently focused data object's ID
// prev: previously focused data object's ID (not including -1  i.e. null selections)
// prev_: previously focused data object's ID (including -1 i.e. null selections)
export const dataFocus = (state = {now: -1, prev: -1, prev_: -1}, action) => {
  return (action.type == "FOCUS_INDEX" ? {...state, prev_: state.now, prev: state.now === -1 ? state.prev : state.now, now: state.now + action.payload} : state);
};