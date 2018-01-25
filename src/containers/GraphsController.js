import { connect } from 'react-redux';
import { goDeeper, goShallower } from '../actions';
import { buttons } from "../data/testData1.js";
import Inputs from "../components/Inputs.js";

const getDataLevelView = (dataLevel) => {
  return buttons[dataLevel];
};

const mapStateToProps = state => {
  return {
    dataLevelView: getDataLevelView(state.dataLevel.level)
  };
};

const mapDispatchToProps = {
    onDataViewClick: goDeeper,
    onDataViewContext: goShallower
};

const InputsController = connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputs);

export default InputsController;