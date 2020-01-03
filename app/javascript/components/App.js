import React from "react";
import { Router } from "@reach/router";

import Navigator from "./Navigator";
import Board from "./Board";
import RegisterLoginPopup from "./RegisterLoginPopup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardId: 1,
      tasks: [],
      tags: [],
      users: [],
      filterTagId: "",
      filterSearchTerm: ""
    };
  }

  componentDidMount() {
    fetch("/api/tasks").then(async (response) => {
      const { data } = await response.json();
      this.setState({tasks: data});
    });

    fetch("/api/tags").then(async (response) => {
      const { data } = await response.json();

      console.log("data");
      console.log(data);

      this.setState({tags: data, filterTagId: data[0].id});
    });

    //FETCH USERS
  }

  onFilter = (event) => {
    this.setState({filterTagId: event.target.value});
  }

  onSearch = (searchTerm) => {
    console.log("Searching for:");
    console.log(searchTerm);
  }

  onLogout = () => {
    console.log("Log out")
  }

  render() {
    return (
      <div>
        <Navigator tags={this.state.tags} user={this.state.users} filterTagId={this.state.filterTagId} onLogout={this.onLogout} onFilter={this.onFilter} onSearch={this.onSearch} />
        <Board id={this.state.boardId} tasks={this.state.tasks /* REPLACE WITH OWNER'S TASKS */} users={this.state.users} filterTagId={this.state.filterTagId} filterSearchTerm={this.state.filterSearchTerm} />
        <RegisterLoginPopup users={this.state.users} isOpened={false} />
      </div>
    );
  }
}

export default App;