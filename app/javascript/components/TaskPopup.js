import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from "@material-ui/core";

import TagSelect from "./TagSelect";
import ParticipantList from "./ParticipantList";
import CommentSection from "./CommentSection";

import "./styles/TaskPopup.css"

class TaskPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasChanged: false
        };
    }

    handleTagChange = (event, index, value) => {
        console.log("Called handleTagChange");
        this.props.onTagChange(event, index, value);
        this.setState({hasChanged: true});
    }

    addParticipant = (userId, callback) => {
        console.log("Adding Participantts via Fetch API")
        let bearer = "Bearer " + localStorage.getItem("jwt");

        const addParti = async() => {
            const csrfToken = document.querySelector("meta[name=csrf-token]").content;

            const response = await fetch("/api/tasks/" + this.props.selectedTask.id, {
                method: "PATCH",
                withCredentials: true,
                credentials: "include",
                headers: {
                  "Authorization": bearer,
                  "Content-Type": "application/json",
                  "X-CSRF-Token": csrfToken
                },
                body: JSON.stringify({task: {
                    "title": this.props.selectedTask.title,
                    "description": this.props.selectedTask.description,
                    "tag_id": this.props.selectedTask.tag_id,
                    "due_date": this.props.selectedTask.due_date,
                    "participants": this.props.selectedTask.participants.concat([userId])
                }})
            });

            if(response.status === 200) {
                console.log("Added participant successfully");
                this.props.fetchTasks(() => this.props.refreshSelected(this.props.selectedTask, callback));
            }
        }

        addParti();
    }

    deleteParticipant = (userId, callback) => {
        let bearer = "Bearer " + localStorage.getItem("jwt");
        console.log(bearer);

        const deleteParti = async() => {
            const csrfToken = document.querySelector("meta[name=csrf-token").content;

            const response = await fetch("/api/tasks/" + this.props.selectedTask.id, {
                method: "PATCH",
                withCredentials: true,
                credentials: "include",
                headers: {
                  "Authorization": bearer,
                  "Content-Type": "application/json",
                  "X-CSRF-Token": csrfToken
                },
                body: JSON.stringify({task: {
                    "title": this.props.selectedTask.title,
                    "description": this.props.selectedTask.description,
                    "tag_id": this.props.selectedTask.tag_id,
                    "due_date": this.props.selectedTask.due_date,
                    "participants": this.props.selectedTask.participants.filter(participant => {return participant !== userId})
                }})
                // body: JSON.stringify ({data: {
                //     id: this.props.selectedTask.id,
                //     type: "tasks",
                //     attributes: {
                //         title: this.props.selectedTask.title,
                //         description: this.props.selectedTask.description,
                //         "tag-id": this.props.selectedTask.tag_id,
                //         "due-date": this.props.selectedTask.due_date,
                //         participants: this.props.selectedTask.participants.filter(participant => {return participant !== userId})
                //     }
                // }})
            });

            if(response.status === 200) {
                this.props.fetchTasks(() => this.props.refreshSelected(this.props.selectedTask, callback));
            }
        }

        deleteParti();
    }

    render() {
        return(
            <Dialog id="popup" fullWidth={true} maxWidth={"md"} open={this.props.isOpened} onClose={this.props.onClose} >
                <DialogTitle id="titleDate">
                    <div id="titleDateBox">
                        <div id="title">
                            {this.props.selectedTask.title}
                        </div>

                        <div id="date">
                            {"Due by: " + new Date(this.props.selectedTask.due_date).toUTCString()}
                        </div>
                    </div>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="description">
                        {this.props.selectedTask.description}
                    </DialogContentText>

                    <div id="comments_tags_participants">
                        <div id="comments">
                            <CommentSection user={this.props.user} users={this.props.users} tags={this.props.tags} task_id={this.props.selectedTask.id}/>
                        </div>

                        <div id="tags_participants">
                            <div id="tags">
                                <TagSelect tags={this.props.tags} tag_id={this.props.selectedTask.tag_id} onChange={this.handleTagChange} />                    
                            </div>
                            <div id="participants">
                                <ParticipantList task={this.props.selectedTask} users={this.props.users} onAdd={this.addParticipant} onDelete={this.deleteParticipant}/>
                            </div>
                            <div id="confirmClose" >
                                <Button variant="outlined" disabled={!this.state.hasChanged} onClick={this.props.onConfirm}>
                                    Confirm Changes
                                </Button>
                                <br></br>
                                <Button variant="outlined" onClick={this.props.onClose}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

export default TaskPopup;