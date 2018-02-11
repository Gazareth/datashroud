import { connect } from 'react-redux';
import { goDeeper, goShallower, focusSector } from '../actions';
import Graphs from "../components/Graphs.js";


const mapStateToProps = (state, ownProps) => {
  return {
    dataSet: ownProps.dataSet,
    dataLevel: state.dataState.level.now,
    //dataSet: getDataLevelData(state.dataLevel.level),
    focusId: state.dataState.focus
  };
};

const mapDispatchToProps = {
    onDataViewClick: goDeeper,
    onDataViewContext: goShallower,
    onFocus: focusSector
};

const GraphsController = connect(
  mapStateToProps,
  mapDispatchToProps
)(Graphs);

export default GraphsController;