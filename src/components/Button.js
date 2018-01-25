import React from "react";
import PropTypes from "prop-types";

const DataButton = ({onDataViewClick, onDataViewContext, textStr}) => (
  <button
    onClick={onDataViewClick}
    onContextMenu={onDataViewContext}
    >{textStr}</button>
);

DataButton.propTypes = {
  onDataViewClick: PropTypes.func.isRequired,
  onDataViewContext: PropTypes.func.isRequired,
  textStr: PropTypes.string.isRequired
};

export default DataButton;