import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./index.css";

const rootElem = ReactDOM.createRoot(document.getElementById("root"));

rootElem.render(
  <React.Fragment>
    <App />
  </React.Fragment>
);
