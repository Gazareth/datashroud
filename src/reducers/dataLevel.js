const maxDataLevel = 2;

export const dataLevel = (state = {level: 0, maxLevel: 2}, action) => {
  switch (action.type) {
    case 'INCREASE_LEVEL':
      return {...state, level: state.level + (state.level < state.maxLevel ? 1 : 0)};
    case 'DECREASE_LEVEL':
      return {...state, level: state.level + (state.level > 0 ? -1 : 0)};
    case 'FOCUS_INDEX':
      return {...state, focusedSector: action.payload};
    default:
      return state;
  }
};

export const dataFocus = (state = -1, action) => {
  return (action.type == "FOCUS_INDEX" ? state + action.payload : state);
};