import { Component } from "react";
import { Button } from "react-bootstrap";

class Price extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: `${props.price}$`,
      exchangeRate: 390,
    };
  }

  changeCurrency = () => {
    const { price, exchangeRate } = this.state;
    let modifiedPrice;
    if (price.endsWith("$")) {
      modifiedPrice = parseFloat(price) * exchangeRate + "֏";
    } else {
      modifiedPrice = parseFloat(price) / exchangeRate + "$";
    }

    this.setState({
      price: modifiedPrice,
    });
  };

  render() {
    return (
      <div>
        <span>Price: {this.state.price}</span>
        <button onClick={this.changeCurrency}>Change the currency</button>
      </div>
    );
  }
}

export default Price;
