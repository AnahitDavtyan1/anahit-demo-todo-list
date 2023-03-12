import { Component } from "react";
import "./App.css";
import Product from "./Product";
import Price from "./Price";
import Counter from "./Counter";

class App extends Component {
  state = {
    amd: 0,
    exchangeRate: 391,
    price: 1000,
    hasClicked: false,
    products: [
      {
        name: "banana",
        price: "5",
        description: "Fresh bananas from Ecuador",
      },
      {
        name: "apple",
        price: "8",
        description: "Golden apples",
      },
      {
        name: "pear",
        price: "8",
        description: "Sweet pears!",
      },
      {
        name: "plum",
        price: "4",
        description: "Sweet plums!",
      },
    ],
  };
  handleInputChange = (event) => {
    this.setState({
      amd: event.target.value,
      price: event.target.price,
      hasClicked: true,
    });
  };

  render() {
    const productComponents = this.state.products.map((product) => {
      return (
        <Product
          key={product.name}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      );
    });
    console.log(productComponents);
    const usd = (this.state.amd / this.state.exchangeRate).toFixed(2);

    return (
      <div className="App">
        <h3>Currency Converter</h3>
        AMD:{" "}
        <input
          type="number"
          placeholder="Input AMD"
          value={this.state.amd}
          onChange={this.handleInputChange}
        />
        ֏ = USD:
        <input type="text" value={usd} readOnly={true} />$
        <hr />
        {productComponents}
        {[
          <span key={2}>Text</span>,
          <span key={3}>Text</span>,
          <span key={9}>Text</span>,
        ]}
        {this.state.products.map((product) => {
          return (
            <Product
              test={false}
              key={product.name}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          );
        })}
        <Counter />
      </div>
    );
  }
}

export default App;
