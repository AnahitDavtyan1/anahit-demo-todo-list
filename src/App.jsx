import logo from "./logo.svg";
import "./App.css";
import Address from "./Address";
import Headline from "./Headline";
function Name() {
  const name = "Anahit";
  return (
    <div>
      {name}
      <Address />
    </div>
  );
}

function App() {
  const greeting = "Hello Function Component!";
  return (
    <div className="App">
      <header className="App-header">
        <Name />
        <Headline value={greeting} />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
