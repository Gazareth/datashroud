import React from "react";
import InputsController from "./InputsController";

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <h4>Asset Breakdown</h4>
        <InputsController></InputsController>
      </div>
    );
  }
}
