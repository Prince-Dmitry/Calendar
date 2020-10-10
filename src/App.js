import React from "react";
import { render } from "react-dom";
import  Calendar from "./components/Calendar";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Calendar />
      </div>
    );
  }
}

export default App;
