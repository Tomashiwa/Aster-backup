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
      // userId: 1,
      boardId: 1,
      filterTagId: "",
      filterSearchTerm: "",
      isRegistering: false
    };
  }

  componentDidMount() {
    // this.fetchUsers();

    // fetch("/api/boards").then(async (response) => {
    //   const { data } = await response.json();
    //   this.setState({ boards: data });
    // })

    // fetch("/api/lists").then(async (response) => {
    //   const { data } = await response.json();
    //   this.setState({ lists: data });
    // })

    // this.fetchTasks();

    // fetch("/api/tags").then(async (response) => {
    //   const { data } = await response.json();
    //   this.setState({tags: data, filterTagId: data[0].id});
    // });
  }

  onFilter = (event) => {
    this.setState({filterTagId: event.target.value});
  }

  onSearch = (searchTerm) => {
    this.setState({filterSearchTerm: searchTerm});
  }

  onLogin = () => {
    const name = document.getElementById("field_name").value;
    const password = document.getElementById("field_password").value;
    const request = {"auth": {"name": name, "password": password}};

    console.log("request:");
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
        return response.status === 201 ? response.json() : null;
      })
      .then(result => {
        if(result !== null) {
            localStorage.setItem("jwt", result.jwt);
            fetchUsers();
            console.log("Logged in successfully");
        }
      })
    }

    const fetchUsers = async() => {
      let bearer = "Bearer " + localStorage.getItem("jwt");

      console.log(bearer);

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
          console.log("Users fetch response:");
          console.log(response);

          return response.json();
      })
      .then(result => {
        const filteredResults = result.map(user => {
          delete user.password_digest;
          return user;
        });

        this.setState({users: filteredResults, user: filteredResults.filter(user => user.name === name)[0]});
        
        // console.log("users:");
        // console.log(filteredResults);
        // console.log("selectedName:");
        // console.log(name);
        // console.log("selectedUser:");
        // console.log(filteredResults.filter(user => user.name === name)[0]);
      })
    }

    attemptLogin();
  }

  onLogout = () => {    
    localStorage.removeItem("jwt");
    this.setState({user: null});
    console.log("Logout successfully");
  }

  onRegister = () => {
    console.log("Register");
  }

  fetchUsers = () => {
    fetch("/api/users").then(async (response) => {
      const { data } = await response.json();
      this.setState({ users: data });
    })
  }

  fetchTasks = callback => {
    fetch("/api/tasks").then(async (response) => {
      const { data } = await response.json();
      this.setState({tasks: data}, callback);
    });
  }

  fetchTags = () => {
    fetch("/api/tags").then(async (response) => {
      const { data } = await response.json();
      this.setState({tags: data});
    });
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
              isOpened={this.state.user === null}
              onRegister={this.onLogout/*onRegister*/}
              onLogin={this.onLogin}               
            />
          </div>
        : <div>LOADING...</div>
    );
  }
}

export default App;