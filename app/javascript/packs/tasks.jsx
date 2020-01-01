import React from "react";
import ReactDOM from "react-dom";
import TasksApp from "components/TasksApp";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <TasksApp />,
    document.body.appendChild(document.createElement("div"))
  );
});