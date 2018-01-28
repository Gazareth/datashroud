import { connect } from 'react-redux';
import { goDeeper, goShallower, focusSector } from '../actions';
import data from "../data/testData2.js";
import Graphs from "../components/Graphs.js";

const getDataLevelData = (dataLevel) => {
  //console.log("GETTING DATA: ",data); //TODO: use dataLevel to get different datas
  return data;
};

const mapStateToProps = state => {
  return {
    dataSet: getDataLevelData(state.dataLevel.level),
    focusId: state.dataFocus
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