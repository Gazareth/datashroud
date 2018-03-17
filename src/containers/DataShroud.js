import { connect } from 'react-redux';
import { goDeeper, goShallower, focusSector } from '../actions';
import DataShroudPivot from "../components/DataShroudPivot.js";

const mapStateToProps = (state, ownProps) => {
  return {
    dataSet: ownProps.dataSet,
    dLevel: state.dataState.level.now,  //data level
    //dataSet: getDataLevelData(state.dataLevel.level),
    focusId: state.dataState.focus,
    colSeed: ownProps.colSeed
  };
};

const mapDispatchToProps = {
    onDataViewClick: goDeeper,
    onDataViewContext: goShallower,
    onFocus: focusSector
};

const DataShroud = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataShroudPivot);

export default DataShroud;