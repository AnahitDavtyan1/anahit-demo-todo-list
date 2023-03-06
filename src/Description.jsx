import React, { Component } from "react";

class Description extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h3>{this.props.description}</h3>
      </div>
    );
  }
}

export default Description;
