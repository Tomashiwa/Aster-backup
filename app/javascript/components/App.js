import React from "react";
import { Router } from "@reach/router";
import TaskList from "./TaskList";

function App() {
  return (
    <Router>
      <TaskList path="/" />
    </Router>
  );
}

export default App;