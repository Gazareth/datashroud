import React from "react";
import PropTypes from "prop-types";
import DataButton from "./Button.js";

const Inputs = ({dataLevelView,onDataViewClick,onDataViewContext}) => (
      <div>
        {dataLevelView.map( (textStr,index) =>
          <DataButton
            key={index}
            onDataViewClick={onDataViewClick}
            onDataViewContext={onDataViewContext}
            textStr={textStr}
          />
                          )}
    </div>
);

Inputs.propTypes = {
  dataLevelView: PropTypes.array.isRequired,
  onDataViewClick: PropTypes.func.isRequired,
  onDataViewContext: PropTypes.func.isRequired
};


export default Inputs;