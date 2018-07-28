import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <App target="2018-08-17 07:00:00" />,
  document.getElementById("root")
);
registerServiceWorker();
