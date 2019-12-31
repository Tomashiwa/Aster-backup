import React from "react";
import { Router } from "@reach/router";
import ListIndex from "./ListIndex";

function App() {
  return (
    <Router>
      <ListIndex path="/" />
      {/* <TaskIndex path="/list" list_id={1} /> */}
    </Router>
  );
}

export default App;