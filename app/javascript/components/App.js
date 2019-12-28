import React from "react";
import { Router } from "@reach/router";
import TaskIndex from "./TaskIndex";
import ListIndex from "./ListIndex";

function App() {
  return (
    <Router>
      <TaskIndex path="/" list_id={0} />
      <ListIndex path="/board" />
    </Router>
  );
}

export default App;