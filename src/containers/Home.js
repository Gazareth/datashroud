import React from "react";
import GraphsController from "./GraphsController";

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <h4>Asset Breakdown</h4>
        <GraphsController
          onMouseLeave={console.log("LEAVING!")}
          />
      </div>
    );
  }
}
