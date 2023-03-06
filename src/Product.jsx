import React, { Component } from "react";
import Description from "./Description";
import Name from "./Name";
import Price from "./Price";

class Product extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Name name={this.props.name} />
        <Price price={this.props.price} />
        <Description description={this.props.description} />
      </div>
    );
  }
}

export default Product;
