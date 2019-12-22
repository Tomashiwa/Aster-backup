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
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';

class TaskIndex extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {"tasks": [], "classes": 
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
      "dueDate" : new Date(Date.now()).toUTCString(),
      "dueTime" : "",
      "tag": ""
    };
  }

  componentDidMount() {
    fetch("/api/tasks").then(async (response) => {
      const { data } = await response.json();
      this.setState({"tasks": data});
    });

  }

  handleAdd = () => {
    this.setState({"isAdding": true,});
  };

  handleEdit = task => {
    this.setState({"isEditing": true,});
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
            title: document.getElementById("textField_title").value,
            description: document.getElementById("textField_description").value,
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
    this.setState({"isAdding": false, "isEditing": false});
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
                                {task.attributes.tag}
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
            <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill in the information below:
              </DialogContentText>

              <TextField autoFocus required={true} margin="dense" id="textField_title" label="Title" fullWidth />
              <TextField multiline required={true} margin="dense" id="textField_description" label="Description" fullWidth />
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
                <InputLabel id="inputLabel_tag">Tag</InputLabel>
                <Select
                  labelId="select_new_labelId"
                  id="select_tag"
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
              <Button onClick={this.handleSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    );
  }
}

export default TaskIndex;