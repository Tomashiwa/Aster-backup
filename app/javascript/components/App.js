import React from "react";

import Navigator from "./Navigator";
import Board from "./Board";
import RegisterLoginPopup from "./RegisterLoginPopup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      boards: [],
      lists: [],
      tasks: [],
      tags: [],
      user: null,
      boardId: 1,
      filterTagId: 1,
      filterSearchTerm: ""
    };
  }

  componentDidMount() {
    if(localStorage.getItem("jwt") !== null) {
      this.fetchUsers(localStorage.getItem("name"));
      this.fetchBoards();
      this.fetchLists();
      this.fetchTags();
      this.fetchTasks();
      console.log("Remain logged in");
    }
  }

  onFilter = (event) => {
    this.setState({filterTagId: event.target.value});
  }

  onSearch = (searchTerm) => {
    this.setState({filterSearchTerm: searchTerm});
  }

  onLogin = (givenName, givenPassword) => {
    const request = {"auth": {"name": givenName, "password": givenPassword}};
    console.log("Login request:");
    console.log(request);

    const attemptLogin = async() => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    
      fetch("/api/user_token", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/vnd.api+json",
            "X-CSRF-Token": csrfToken
        },  
        body: JSON.stringify(request)
      })
      .then(response => {
        console.log("login response:");
        console.log(response);
        
        return response.status === 201 ? response.json() : null;
      })
      .then(result => {
        console.log("login result:");
        console.log(result);

        if(result !== null) {
          localStorage.setItem("name", givenName);
          localStorage.setItem("jwt", result.jwt);
          this.fetchUsers(givenName);
          this.fetchBoards();
          this.fetchLists();
          this.fetchTags();
          this.fetchTasks();
          console.log("Logged in successfully");
        }
      })
    }

    attemptLogin();
  }

  onLogout = () => {    
    localStorage.removeItem("name");
    localStorage.removeItem("jwt");
    this.setState({user: null});
    console.log("Logout successfully");
  }

  onRegister = (givenName, givenPassword) => {
    console.log("Register");

    console.log("givenName");
    console.log(givenName);
    console.log("givenPassword");
    console.log(givenPassword);

    fetch("/api/users", {
      method: "POST",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({user: {
        "name": givenName,
        "password": givenPassword,
        "password_confirmation": givenPassword,
        "admin": false
      }})
    })
    .then(async(response) => {
      return response.json();
    })
    .then(result => {
      console.log("result:");
      console.log(result);
      console.log("Registered successfully");
      this.onLogin(givenName, givenPassword);
    })
  }

  fetchUsers = (name) => {
    let bearer = "Bearer " + localStorage.getItem("jwt");

    fetch("/api/users", {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json"
      }
    })
    .then(async(response) => {
        return response.json();
    })
    .then(result => {
      this.setState({users: result, user: result.filter(user => user.name === name)[0]});
    })
  }

  fetchBoards = () => {
    let bearer = "Bearer " + localStorage.getItem("jwt");

    fetch("/api/boards", {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json"
      }
    })
    .then(async(response) => {
        return response.json();
    })
    .then(result => {
      this.setState({boards: result});
    })
  }

  fetchLists = () => {
    let bearer = "Bearer " + localStorage.getItem("jwt");

    fetch("/api/lists", {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json"
      }
    })
    .then(async(response) => {
      return response.json();
    })
    .then(result => {
      this.setState({lists: result});
    })
  }

  fetchTags = () => {
    let bearer = "Bearer " + localStorage.getItem("jwt");

    fetch("/api/tags", {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json"
      }
    })
    .then(async(response) => {
      return response.json();
    })
    .then(result => {
      this.setState({tags: result});
    })
  }
  
  fetchTasks = callback => {
    let bearer = "Bearer " + localStorage.getItem("jwt");
    console.log(bearer);

    fetch("/api/tasks", {
      method: "GET",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Authorization": bearer,
        "Content-Type": "application/json"
      }
    })
    .then(async(response) => {
      return response.json();
    })
    .then(result => {
      this.setState({tasks: result}, callback);
    })
  }


  render() {
    return (
      this.state
        ? <div>
            <Navigator 
              tags={this.state.tags} 
              user={this.state.user} 
              filterTagId={this.state.filterTagId} 
              onLogout={this.onLogout} 
              onFilter={this.onFilter} 
              onSearch={this.onSearch} />

            <Board 
              id={this.state.boardId} 
              tasks={this.state.tasks} 
              lists={this.state.lists} 
              user={this.state.user} 
              users={this.state.users} 
              tags={this.state.tags} 
              filterTagId={this.state.filterTagId} 
              filterSearchTerm={this.state.filterSearchTerm}
              onUpdateTags={this.fetchTags}
              fetchTasks={this.fetchTasks} />

            <RegisterLoginPopup 
              isOpened={localStorage.getItem("jwt") === null}
              onRegister={this.onRegister}
              onLogin={this.onLogin}               
            />
          </div>
        : <div>LOADING...</div>
    );
  }
}

export default App;