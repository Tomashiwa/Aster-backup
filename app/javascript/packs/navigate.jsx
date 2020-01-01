import React from "react";
import ReactDOM from "react-dom";
import NavigatorApp from "components/NavigatorApp"

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
      <NavigatorApp />,
      document.body.appendChild(document.createElement("div"))
    );
  });