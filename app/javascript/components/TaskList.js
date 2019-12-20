import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// function TaskList() {
//   return <div>Hello from my React App inside my Rails App!</div>;
// }

const useStyles = makeStyles ({
  root: {
      width: '100%',
      overflowX: 'auto',
  },
  table: {
      minWidth: 650,
  },
});

const handleDelete = task => {
  const deleteTask = async() => {
      console.log("Attempts to delete");

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

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const requestTasks = async() => {
      const response = await fetch("/api/tasks");
      const { data } = await response.json();
      setTasks(data);
    }

    requestTasks();
  }, []);

  // return tasks.map(task => <div>{task.attributes.title + " , " + task.attributes.description + " , " + task.attributes.tag + " , " + task.attributes["due-date"]}</div>);

  const classes = useStyles();

  return (
    <div>
        <Paper className = {classes.root}>
            <Table className = {classes.table} aria-label = "simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align = "center">Title</TableCell>
                        <TableCell align = "center">Description</TableCell>
                        <TableCell align = "center">Tag</TableCell>
                        <TableCell align = "center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tasks.map(task => (
                          <TableRow key={task.attributes.title}>
                              <TableCell component="th" scope="row" align="center">
                                {task.attributes.title}
                              </TableCell>
                              <TableCell align="center">
                                {task.attributes.description}
                              </TableCell>
                              <TableCell align="center">
                                {task.attributes.tag}
                              </TableCell>
                              <TableCell align="center">
                                <Button color="primary" href={"/edit/" + task.id}>
                                    Edit
                                </Button>
                                <Button color="secondary" onClick={() => handleDelete(task)}>
                                    Delete
                                </Button>
                              </TableCell>
                          </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Paper>
        <Button color="primary" href="/add">
            Add Task
        </Button>
    </div>
  );
}

export default TaskList;