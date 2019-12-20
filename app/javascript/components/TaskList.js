import React, { useEffect, useState } from "react";
import { string } from "prop-types";

// function TaskList() {
//   return <div>Hello from my React App inside my Rails App!</div>;
// }

// const useStyles = makeStyles ({
//   root: {
//       width: '100%',
//       overflowX: 'auto',
//   },
//   table: {
//       minWidth: 650,
//   },
// });

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const requestTasks = async() => {
      const response = await fetch("/api/tasks");
      const { data } = await response.json();
      console.log("data: ");
      console.log(data);
      
      setTasks(data);
    }

    requestTasks();
  }, []);

  // return tasks.map(task => <div>{Time.parse(task.attributes["due-date"])}</div>);
  // return tasks.map(task => <div>{new Date(task.attributes["due-date"]).getDate()}</div>);
  return tasks.map(task => <div>{task.attributes.title + " , " + task.attributes.description + " , " + task.attributes.tag + " , " + task.attributes["due-date"]}</div>);

  // const classes = useStyles();
}

export default TaskList;