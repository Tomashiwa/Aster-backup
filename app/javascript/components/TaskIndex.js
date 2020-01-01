import React from "react";
import { Select, FormControl, MenuItem, InputLabel, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, ListItemText, Typography, withStyles } from "@material-ui/core";
import { List, ListItem, ListItemSecondaryAction   } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DateFnsUtils from '@date-io/date-fns';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import TagSelect from "./TagSelect";

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
      "tasks": [], 
      "tags": [], 
      "classes": makeStyles (theme => ({
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
      "isAdding": false, 
      "isEditing": false, 
      "isAddingTag": false,
      "task_id": 1, 
      "title": "", 
      "description": "",
      "dueDate" : new Date(Date.now()).toUTCString(),
      "tag_id": 1,
      "name": ""
    };
  }

  componentDidMount() {
    console.log("TaskIndex " + this.props.list_id +  " Properties:");
    console.log(this.props);

    fetch("/api/lists").then(async (response) => {
      const { data } = await response.json();
      this.setState({"name": data[this.props.list_id - 1].attributes.name});
    });

    fetch("/api/tasks").then(async (response) => {
      const { data } = await response.json();
      this.setState({"tasks": data.filter(task => {
        return task.attributes["list-id"] === this.props.list_id;
      })});

      // console.log("Fetched Tasks:");
      // console.log(this.state.tasks);
    });

    fetch("/api/tags").then(async (response) => {
      const { data } = await response.json();
      this.setState({"tags": data});

      // console.log("Fetched Tags:");
      // console.log(this.state.tags);
    })
  }

  handleAdd = () => {
    this.setState({
      "dueDate": new Date(Date.now()).toUTCString(),
      "tag_id": 1,
      "isAdding": true});
  };

  handleEdit = task => {
    this.setState({
      "task_id": task.id,
      "title": task.attributes.title,
      "description": task.attributes.description,
      "dueDate": task.attributes["due-date"], 
      "tag_id": task.attributes["tag-id"],
      "isEditing": true
    });
  };

  handleSubmit = () => { 
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
            title: document.getElementById("field_add_title").value,
            description: document.getElementById("field_add_description").value,
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

  handleConfirm = event => {
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
            title: document.getElementById("field_edit_title").value,
            description: document.getElementById("field_edit_description").value,
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
    this.setState({"isAdding": false, "isEditing": false, "isAddingTag": false});
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
    this.setState({"dueDate": dateTime.toUTCString()});
  };

  handleTagChange = (event, index, value) => {
    this.setState({"tag_id": event.target.value});

    console.log("event:");
    console.log(event);
    console.log("index:");
    console.log(index);
    console.log("value:");
    console.log(value);
  
    console.log("Switched tag_id to:");
    console.log(this.state.tag_id);
  };

  handleNewTag = () => {
    this.setState({"isAddingTag": true});
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
        fetch("/api/tags").then(async (response) => {
          const { data } = await response.json();
          this.setState({"tags": data});
          this.setState({"tag_id": this.state.tags.length, "isAddingTag": false});
        })
      }
    }

    addTag();
  }

  handleCancelTag = () => {
    this.setState({"isAddingTag": false});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
          <h1 align="center">{this.state.name}</h1>
          <List className={this.state.classes.root}>
            {
              this.state.tasks.map(task => (
                <React.Fragment key={task.id}>
                  <ListItem alignItems="flex-start" button={true} divider={true}>
                    <ListItemText
                      style={{textAlign:"justify"}}
                      primary={task.attributes.title}
                      secondary={
                        <React.Fragment>
                          <Typography component={"span"} align="left" variant="subtitle2" className={this.state.classes.inline} color="textPrimary">
                            {this.state.tags.length > 0 ? this.state.tags[task.attributes["tag-id"] - 1].attributes.name : "Tags not loaded"}
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

          <Dialog open={this.state.isAdding} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="dialogTitle_addTask">Add Task</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill in the information below:
              </DialogContentText>

              <TextField autoFocus required={true} margin="dense" id="field_add_title" label="Title" fullWidth />
              <TextField multiline required={true} margin="dense" id="field_add_description" label="Description" fullWidth />
              <br></br>
              <br></br>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  required={true}
                  ampm={false}
                  showTodayButton
                  value={this.state.dueDate}
                  onChange={this.handleDateChange}
                  id="dateTimePicker_dueDate"
                  format="dd/MM/yyyy HH:mm"
                  label="Due date"
                />
              </MuiPickersUtilsProvider>
              <br></br>
              <br></br>
              
              <TagSelect tags={this.state.tags} tag_id={this.state.tag_id} onChange={this.handleTagChange} />

              <IconButton color="primary" onClick={this.handleNewTag}>
                <AddIcon />
              </IconButton>

              {this.state.isAddingTag 
                ? <div>
                    <TextField margin="dense" id="field_new_add_tag" label="New Tag" />
                    <IconButton color="primary" onClick={this.handleSubmitTag}>
                      <DoneIcon />
                    </IconButton> 
                    <IconButton color="primary" onClick={this.handleCancelTag}>
                      <CloseIcon />
                    </IconButton> 
                  </div> 
                : <div></div>}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={this.state.isEditing} onClose={this.handleClose} aria-labelledby="form-dialog-title"> 
            <DialogTitle id="dialogTitle_editTask">Edit Task</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You may edit the details of the task below:
              </DialogContentText>

              <TextField autoFocus required={true} margin="dense" id="field_edit_title" label="Title" defaultValue={this.state.title} fullWidth />
              <TextField multiline required={true} margin="dense" id="field_edit_description" label="Description" defaultValue={this.state.description} fullWidth />
              <br></br>
              <br></br>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  required={true}
                  ampm={false}
                  showTodayButton
                  value={this.state.dueDate}
                  onChange={this.handleDateChange}
                  id="dateTimePicker_edit_dueDate"
                  format="dd/MM/yyyy HH:mm"
                  label="Due date"
                />
              </MuiPickersUtilsProvider>
              <br></br>
              <br></br>
              
              <TagSelect tags={this.state.tags} tag_id={this.state.tag_id} onChange={this.handleTagChange} />

              <IconButton color="primary" onClick={this.handleNewTag}>
                <AddIcon />
              </IconButton>

              {this.state.isAddingTag 
                ? <div>
                    <TextField margin="dense" id="field_edit_add_tag" label="New Tag" />
                    <IconButton color="primary" onClick={this.handleSubmitTag}>
                      <DoneIcon />
                    </IconButton> 
                    <IconButton color="primary" onClick={this.handleCancelTag}>
                      <CloseIcon />
                    </IconButton> 
                  </div> 
                : <div></div>}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleConfirm} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(TaskIndex);