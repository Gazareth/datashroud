const maxDataLevel = 2;

const dataLevel = (state = {level: 0, maxLevel: 2}, action) => {
  switch (action.type) {
    case 'INCREASE_LEVEL':
      console.log("INCREASING LEVEL: ",{...state, level: state.level + (state.level < state.maxLevel ? 1 : 0)});
      return {...state, level: state.level + (state.level < state.maxLevel ? 1 : 0)};
    case 'DECREASE_LEVEL':
      return {...state, level: state.level + (state.level > 0 ? -1 : 0)};
    default:
      return state;
  }
};

export default dataLevel;