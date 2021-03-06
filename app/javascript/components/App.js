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
      board: 1,
      filterTagId: 1,
      filterSearchTerm: "",
      errorMsg: ""
    };
  }

  componentDidMount() {
    if(localStorage.getItem("jwt") !== null) {
      this.fetchUsers(localStorage.getItem("name"));
      this.fetchBoards();
      this.fetchLists();
      this.fetchTasks();
      this.fetchTags();
    }
  }

  onFilter = (event) => {
    this.setState({filterTagId: event.target.value});
  }

  onSearch = (searchTerm) => {
    this.setState({filterSearchTerm: searchTerm});
  }

  onLogin = (givenName, givenPassword, callback) => {
    const request = {"auth": {"name": givenName, "password": givenPassword}};

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
        return response.status === 201 ? response.json() : null;
      })
      .then(result => {
        if(result !== null) {
          localStorage.setItem("name", givenName);
          localStorage.setItem("jwt", result.jwt);
          this.fetchUsers(givenName);
          this.fetchBoards();
          this.fetchLists();
          this.fetchTags();
          this.fetchTasks();
          callback();
        } else {
          this.setState({errorMsg: "Invalid username or password."});
        }
      })
    }

    attemptLogin();
  }

  onLogout = () => {    
    localStorage.removeItem("name");
    localStorage.removeItem("jwt");
    this.setState({
      users: [],
      boards: [],
      lists: [],
      tasks: [],
      tags: [],
      user: null
    });
  }

  onRegister = (givenName, givenPassword, callback) => {
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
      const responseJson = await response.json();
      return [response.status, responseJson];
    })
    .then(result => {
      if(result[0] === 201) {
        this.onLogin(givenName, givenPassword, callback);
      } else {
        const errorMessage = result[1];
        this.setState({errorMsg: errorMessage[Object.keys(errorMessage)[0]][0] + "."});
      }
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
      this.setState({
        boards: result,
        board: result.filter(board => board.user_id == this.state.user.id)[0]
      });
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
            {/* this.fetchUsers(givenName);
          this.fetchBoards();
          this.fetchLists();
          this.fetchTags();
          this.fetchTasks(); */}

            {
              this.state.users && this.state.tags
                ? <Navigator 
                    tags={this.state.tags} 
                    user={this.state.user} 
                    filterTagId={this.state.filterTagId} 
                    onLogout={this.onLogout} 
                    onFilter={this.onFilter} 
                    onSearch={this.onSearch} />
                : null              
            }

            <br />

            {
              this.state.users && this.state.lists && this.state.tags && this.state.tags
                ? <Board 
                    id={this.state.board.id} 
                    tasks={this.state.tasks} 
                    lists={this.state.lists} 
                    user={this.state.user} 
                    users={this.state.users} 
                    tags={this.state.tags} 
                    filterTagId={this.state.filterTagId} 
                    filterSearchTerm={this.state.filterSearchTerm}
                    onUpdateTags={this.fetchTags}
                    fetchTasks={this.fetchTasks} /> 
                : null
            }
            
            <RegisterLoginPopup 
              isOpened={localStorage.getItem("jwt") === null}
              onRegister={this.onRegister}
              onLogin={this.onLogin}
              errorMsg={this.state.errorMsg}
              resetErrorMsg={() => this.setState({errorMsg: ""})}               
            />
          </div>
        : <div>LOADING...</div>
    );
  }
}

export default App;