import React from "react";
import { Router } from "@reach/router";
import ListIndex from "./ListIndex";

function App() {
  return (
    <Router>
      <ListIndex path="/" />
    </Router>
  );
}

export default App;