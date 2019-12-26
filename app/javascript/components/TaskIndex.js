import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {"tasks": [], "tags": [], "classes": 
      makeStyles ({
        root: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
      }),
      "isAdding": false, "isEditing": false,
      "taskId": -1, "title": "", "description": "",
      "dueDate" : new Date(Date.now()).toUTCString(),
      "tag": ""
    };
  }

  componentDidMount() {
    const csrfToken = document.querySelector("meta[name=csrf-token").content;

    fetch("/api/tasks").then(async (response) => {
      const { data } = await response.json();
      this.setState({"tasks": data});

      console.log("Fetched Tasks:");
      console.log(this.state.tasks);
    });

    fetch("/api/tags").then(async (response) => {
      const { data } = await response.json();
      this.setState({"tags": data});

      console.log("Fetched Tags:");
      console.log(this.state.tags);
    })
  }

  handleAdd = () => {
    this.setState({
      "dueDate": new Date(Date.now()).toUTCString(),
      "isAdding": true,});
  };

  handleEdit = task => {
    this.setState({
      "taskId": task.id,
      "title": task.attributes.title,
      "description": task.attributes.description,
      "dueDate": task.attributes["due-date"],
      "tag": task.attributes["tag-id"],
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
          id: this.props.taskId,
          type: "tasks",
          attributes: {
            list: null,
            title: document.getElementById("field_add_title").value,
            description: document.getElementById("field_add_description").value,
            tag: this.state.tag,
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

      const response = await fetch("/api/tasks/" + this.state.taskId, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/vnd.api+json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({data: {
          id: this.state.taskId,
          type: "tasks",
          attributes: {
            list: null,
            title: document.getElementById("field_edit_title").value,
            description: document.getElementById("field_edit_description").value,
            tag: this.state.tag,
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
    this.setState({"isAdding": false, "isEditing": false});
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

  handleDateChange = (dateTime, value) => {
    this.setState({"dueDate": dateTime.toUTCString()});
  };

  handleTagChange = (event, index, value) => {
    this.setState({"tag": event.target.value});
  };

  handleNewTag = () => {
    console.log("Creating new tag");
  };

  render() {
    return (
      <div>
          <Paper className = {this.state.classes.root}>
              <Table className = {this.state.classes.table} aria-label = "simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell align = "center">Title</TableCell>
                          <TableCell align = "center">Description</TableCell>
                          <TableCell align = "center">Due date</TableCell>
                          <TableCell align = "center">Tag</TableCell>
                          <TableCell align = "center">Action</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {
                        this.state.tasks.map(task => (
                          <TableRow key={task.attributes.title}>
                              <TableCell component="th" scope="row" align="center">
                                {task.attributes.title}
                              </TableCell>
                              <TableCell align="center">
                                {task.attributes.description}
                              </TableCell>
                              <TableCell align="center">
                                {new Date(task.attributes["due-date"]).toUTCString()}
                              </TableCell>
                              <TableCell align="center">
                                {this.state.tags[task.attributes["tag-id"] - 1].attributes.name}
                              </TableCell>
                              <TableCell align="center">
                                <Button color="primary" onClick={() => this.handleEdit(task)}>
                                    Edit
                                </Button>
                                <Button color="secondary" onClick={() => this.handleDelete(task)}>
                                    Delete
                                </Button>
                              </TableCell>
                          </TableRow>
                        ))
                      }
                  </TableBody>
              </Table>
          </Paper>
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
              
              <FormControl>
                <InputLabel id="inputLabel_add_tag">Tag</InputLabel>
                <Select
                  labelId="select_new_labelId"
                  id="select_add_tag"
                  value={this.state.tag}
                  onChange={this.handleTagChange}
                  autoWidth={true}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </Select>
              </FormControl>

              <Button onClick={this.handleNewTag} color="primary">
                New
              </Button>
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
              
              <FormControl>
                <InputLabel id="inputLabel_edit_tag">Tag</InputLabel>
                <Select
                  labelId="select_new_labelId"
                  id="select_edit_tag"
                  value={this.state.tag}
                  onChange={this.handleTagChange}
                  fullWidth={true}
                  style={{ width: 400}}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </Select>
              </FormControl>
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

export default TaskIndex;