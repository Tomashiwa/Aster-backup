import React from "react";
import { Router } from "@reach/router";
import TaskIndex from "./TaskIndex";

function App() {
  return (
    <Router>
      <TaskIndex path="/" />
    </Router>
  );
}

export default App;