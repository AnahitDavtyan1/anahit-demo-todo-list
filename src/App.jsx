import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Headline from "./Headline";
import Name from "./Name";
import Product from "./Product";

function App() {
  const greeting = "Hello Function Component!";
  return (
    <div className="App">
      <Name />
      <Headline value={greeting} />
      <Product
        name="bananas"
        price="1$"
        description="Fresh bananas from Ecuador"
      />
    </div>
  );
}

export default App;
