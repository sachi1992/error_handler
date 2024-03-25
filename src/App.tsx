import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Example1 from "./components/Example1";
import { ErrorHandler } from "./errorHandler";

function App() {
  return (
    <ErrorHandler>
      <div className="App">
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        >
        Learn React
        </a>
      </header> */}

        <Example1 />
      </div>
    </ErrorHandler>
  );
}

export default App;
