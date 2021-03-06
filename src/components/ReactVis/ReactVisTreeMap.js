// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';

import {Treemap} from 'react-vis';

function _getRandomData(total,min=0) {
  const totalLeaves = total || Math.random() * 20;
  const leaves = [];
  
  for (let i = min; i < min+totalLeaves; i++) {
  const rndm = Math.random();
  const val = rndm * 1000;
    leaves.push({
      name: total ? total : Math.round(val),
      size: val,
      opacity: rndm,
      color: rndm,
      style: {
        border: '3.25px solid white'
      }
    });
  }
  return {
    title: '',
    style: { backgroundColor: '#fff'},
    children: leaves
  };
};

export default class DynamicTreemapExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredNode: false,
      treemapData: _getRandomData(100,50),
      useCirclePacking: false
    };
  }


  render() {
    const {hoveredNode, useCirclePacking} = this.state;
    const treeProps = {
      animation: 'noWobble',
      data: this.state.treemapData,
      onLeafMouseOver: x => this.setState({hoveredNode: x}),
      onLeafMouseOut: () => this.setState({hoveredNode: false}),
      onLeafClick: () => console.log(this.state.hoveredNode) || this.setState({treemapData: _getRandomData()}),
      width: 1024,
      height: 650,
      mode: this.state.useCirclePacking ? 'circlePack' : 'squarify',
      getLabel: x => x.name,
    };
    return (
      <div className="dynamic-treemap-example">
        <button
          onClick={() => this.setState({useCirclePacking: !useCirclePacking})}
          >{'STUFF!'}</button>
        <Treemap {...treeProps}/>
        click above to the update data
        {hoveredNode && hoveredNode.value}
      </div>
    );
  }

}