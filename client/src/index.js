import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./resources/css/main.css";

import Routes from "./routes";

const App = () => (
  <React.Fragment>
    <Router>
      <Routes />
    </Router>
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById("root"));
