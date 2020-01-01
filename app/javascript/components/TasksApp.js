import React from "react";
import { Router } from "@reach/router";
import ListIndex from "./ListIndex";

function TasksApp() {
  return (
    <Router>
      <ListIndex path="/" />
    </Router>
  );
}

export default TasksApp;