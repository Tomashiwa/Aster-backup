import React from "react";
import { Button, IconButton, ListItemText, Typography, withStyles } from "@material-ui/core";
import { List, ListItem, ListItemSecondaryAction   } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import AddEditPopup from "./AddEditPopup";
import TaskPopup from "./TaskPopup";

const styles = {
  editDelete: {
    top: '90%'
  },
  dueDate: {
    top: '10%'
  }
};

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      classes: makeStyles (theme => ({
        root: {
            width: '100%',
            overflowX: 'auto',

            maxWidth: 360,
            backgroundColor: theme.palette.background.paper
        },
        table: {
            minWidth: 650
        },
      })),
      isAdding: false, 
      isEditing: false, 
      isInspecting: false,
      isAddingTag: false,
      task_id: 1, 
      title: "", 
      description: "",
      dueDate: new Date(Date.now()).toUTCString(),
      tag_id: 1,
      name: ""
    };
  }

  componentDidMount() {
    fetch("/api/lists").then(async (response) => {
      const { data } = await response.json();
      this.setState({name: data[this.props.list_id - 1].attributes.name});
    });
  }

  handleAdd = () => {
    this.setState({
      title: "",
      description: "",
      dueDate: new Date(Date.now()).toUTCString(),
      tag_id: 1,
      isAdding: true});

    console.log("props:");
    console.log(this.props);
  };

  handleEdit = task => {
    this.setState({
      task_id: task.id,
      title: task.attributes.title,
      description: task.attributes.description,
      dueDate: task.attributes["due-date"], 
      tag_id: task.attributes["tag-id"],
      isEditing: true
    });
  };

  handleSubmit = (newTitle, newDescription) => {
    const addTask = async() => {
      const csrfToken = document.querySelector("meta[name=csrf-token").content;

      const response = await fetch("/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({data: {
          type: "tasks",
          attributes: {
            "list-id": this.props.list_id,
            title: newTitle,
            description: newDescription,
            "tag-id": this.state.tag_id,
            "due-date": this.state.dueDate
          }
        }})
      });

      if(response.status === 201) {
        window.location.reload();
      }
    }

    addTask();
    this.handleClose();
  };

  handleConfirm = (modifiedTitle, modifiedDescription) => event => {
    const saveTask = async() => {
      const csrfToken = document.querySelector("meta[name=csrf-token").content;

      const response = await fetch("/api/tasks/" + this.state.task_id, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({data: {
          id: this.state.task_id,
          type: "tasks",
          attributes: {
            "list-id": this.props.list_id,
            title: modifiedTitle,
            description: modifiedDescription,
            "tag-id": this.state.tag_id,
            "due-date": this.state.dueDate
          }
        }})
      });

      if(response.status === 200) {
        window.location.reload();
      }
    }

    saveTask();
    this.handleClose();
  };

  handleClose = () => {
    this.setState({isAdding: false, isEditing: false, isInspecting: false, isAddingTag: false});
  };

  handleDelete = task => {
    const deleteTask = async() => {
      const csrfToken = document.querySelector("meta[name=csrf-token").content;

      const response = await fetch("/api/tasks/" + task.id, {
          method: "DELETE",
          credentials: "include",
          headers: {
              "X-CSRF-Token": csrfToken
          }
      });

      if (response.status === 204) {
          window.location.reload();
      }
    }

    deleteTask();
  };

  handleDemote = task => {
    console.log("Demoting task:");
    console.log(task);

    if(this.props.list_id <= 1) {
      console.log("Reached lowest list");
    } else {
      console.log("Demoting to list " + (this.props.list_id - 1));

      const demoteTask = async() => {
        const csrfToken = document.querySelector("meta[name=csrf-token").content;
  
        const response = await fetch("/api/tasks/" + task.id, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/vnd.api+json",
            "X-CSRF-Token": csrfToken
          },
          body: JSON.stringify({data: {
            id: task.id,
            type: "tasks",
            attributes: {
              "list-id": this.props.list_id - 1,
              title: task.attributes.title,
              description: task.attributes.description,
              "due-date": task.attributes["due-date"],
              "tag-id": task.attributes["tag-id"]
            }
          }})
        });
  
        if(response.status === 200) {
          window.location.reload();
        }
      }
  
      demoteTask();
    }
  }

  handlePromote = task => {
    console.log("Promoting task:");
    console.log(task);

    console.log("Currently at list " + this.props.list_id);

    if(this.props.list_id >= 4) {
      console.log("Reached highest list");
    } else {
      console.log("Promoting to list " + (this.props.list_id + 1));

      const promoteTask = async() => {
        const csrfToken = document.querySelector("meta[name=csrf-token").content;
  
        const response = await fetch("/api/tasks/" + task.id, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/vnd.api+json",
            "X-CSRF-Token": csrfToken
          },
          body: JSON.stringify({data: {
            id: task.id,
            type: "tasks",
            attributes: {
              "list-id": this.props.list_id + 1,
              title: task.attributes.title,
              description: task.attributes.description,
              "due-date": task.attributes["due-date"],
              "tag-id": task.attributes["tag-id"]
            }
          }})
        });
  
        if(response.status === 200) {
          window.location.reload();
        }
      }
  
      promoteTask();
    }
  }

  handleDateChange = (dateTime, value) => {
    this.setState({dueDate: dateTime.toUTCString()});
  };

  handleTagChange = (event, index, value) => {
    this.setState({tag_id: event.target.value});
  };

  handleNewTag = () => {
    this.setState({isAddingTag: true});
  };

  handleSubmitTag = () => {
    const addTag = async() => {
      const csrfToken = document.querySelector("meta[name=csrf-token").content;

      const response = await fetch("/api/tags", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({data: {
          type: "tags",
          attributes: {
            name: document.getElementById("field_new_add_tag") !== null 
              ? document.getElementById("field_new_add_tag").value
              : document.getElementById("field_edit_add_tag").value
          }
        }})
      });

      if(response.status === 201) {
        this.props.onUpdateTags();
        this.setState({tag_id: this.props.tags.length + 1});
      }
    }
    
    addTag();
    this.handleCancelTag();
  }

  handleCancelTag = () => {
    this.setState({isAddingTag: false});
  }

  onClickTask = task => {
    this.setState({
      isInspecting: true,
      title: task.attributes.title, 
      description: task.attributes.description,
      dueDate: task.attributes["due-date"],
      task_id: task.id,
      tag_id: task.attributes["tag-id"]
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
          <h1 align="center">{this.state.name}</h1>
          
          <List className={this.state.classes.root}>
            {
              this.props.tasks.map(task => (
                <React.Fragment key={task.id}>
                  <ListItem alignItems="flex-start" button={true} divider={true} onClick={() => this.onClickTask(task)}>
                    <ListItemText
                      style={{textAlign:"justify"}}
                      primary={task.attributes.title}
                      secondary={
                        <React.Fragment>
                          <Typography component={"span"} align="left" variant="subtitle2" className={this.state.classes.inline} color="textPrimary">
                            {this.props.tags.length > 0 ? this.props.tags[task.attributes["tag-id"] - 1].attributes.name : "Tags not loaded"}
                          </Typography>
                          <Typography component={"span"} style={{whiteSpace:"pre-line"}}>
                            {"\n" + task.attributes.description}
                          </Typography>
                        </React.Fragment>
                      }
                    />
  
                    <ListItemSecondaryAction classes={{ root: classes.dueDate }}>
                      <Typography align="right" variant="subtitle1" className={this.state.classes.inline} color="textPrimary">
                        {"By: " + new Date(task.attributes["due-date"]).toUTCString()} {/*toDateString()*/}
                      </Typography>
                    </ListItemSecondaryAction>
  
                    <ListItemSecondaryAction classes={{ root: classes.editDelete }}>
                      <IconButton size="small" color="primary" onClick={() => this.handleDemote(task)} classes={{root: classes.taskButtons}}>
                        <ChevronLeftIcon />
                      </IconButton>
                      <IconButton size="small" color="primary" onClick={() => this.handlePromote(task)} classes={{root: classes.taskButtons}}>
                        <ChevronRightIcon />
                      </IconButton>
                      <IconButton size="small" color="primary" onClick={() => this.handleEdit(task)} classes={{ root: classes.taskButtons }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="secondary" onClick={() => this.handleDelete(task)} classes={{ root: classes.taskButtons }}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              ))
            }
          </List>
          <br></br>

          <Button variant="outlined" color="primary" onClick={this.handleAdd}>
            Add Task
          </Button>

          <AddEditPopup title={this.state.title}
            description={this.state.description}
            isOpened={this.state.isAdding || this.state.isEditing} 
            isAdding={this.state.isAdding} 
            onClose={this.handleClose}
            dueDate={this.state.dueDate}
            onDateChange={this.handleDateChange}
            tags={this.props.tags}
            tag_id={this.state.tag_id}
            onNewTag={this.handleNewTag}
            onTagChange={this.handleTagChange}
            isAddingTag={this.state.isAddingTag}
            onAddTag={this.handleSubmitTag}
            onCancelTag={this.handleCancelTag}
            onSubmit={this.handleSubmit}
            onConfirm={this.handleConfirm}/>

          <TaskPopup title={this.state.title}
            description={this.state.description}
            dueDate={this.state.dueDate}
            task_id={this.state.task_id}
            tag_id={this.state.tag_id}
            users={this.props.users}
            tags={this.props.tags}
            isOpened={this.state.isInspecting}
            onTagchange={this.handleTagChange}
            onClose={this.handleClose} />
      </div>
    );
  }
}

export default withStyles(styles)(TaskIndex);