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
        const addParti = async() => {
            const csrfToken = document.querySelector("meta[name=csrf-token").content;

            const response = await fetch("/api/tasks/" + this.props.selectedTask.id, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    "X-CSRF-Token": csrfToken
                },
                body: JSON.stringify ({data: {
                    id: this.props.selectedTask.id,
                    type: "tasks",
                    attributes: {
                        title: this.props.selectedTask.attributes.title,
                        description: this.props.selectedTask.attributes.description,
                        "tag-id": this.props.selectedTask.attributes["tag-id"],
                        "due-date": this.props.selectedTask.attributes["due-date"],
                        participants: this.props.selectedTask.attributes.participants.concat([userId])
                    }
                }})
            });

            if(response.status === 200) {
                this.props.fetchTasks(() => this.props.refreshSelected(this.props.selectedTask, callback));
            }
        }

        addParti();
    }

    deleteParticipant = (userId, callback) => {
        const deleteParti = async() => {
            const csrfToken = document.querySelector("meta[name=csrf-token").content;

            const response = await fetch("/api/tasks/" + this.props.selectedTask.id, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    "X-CSRF-Token": csrfToken
                },
                body: JSON.stringify ({data: {
                    id: this.props.selectedTask.id,
                    type: "tasks",
                    attributes: {
                        title: this.props.selectedTask.attributes.title,
                        description: this.props.selectedTask.attributes.description,
                        "tag-id": this.props.selectedTask.attributes["tag-id"],
                        "due-date": this.props.selectedTask.attributes["due-date"],
                        participants: this.props.selectedTask.attributes.participants.filter(participant => {return participant !== userId})
                    }
                }})
            });

            if(response.status === 200) {
                this.props.fetchTasks(() => this.props.refreshSelected(this.props.selectedTask, callback));
            }
        }

        console.log("userId");
        console.log(userId);
        console.log("participants pre-delete:");
        console.log(this.props.selectedTask.attributes.participants);
        console.log("participants post-filter:");
        console.log(this.props.selectedTask.attributes.participants.filter(participant => {return participant !== userId}));

        deleteParti();
    }

    render() {
        return(
            <Dialog id="popup" fullWidth={true} maxWidth={"md"} open={this.props.isOpened} onClose={this.props.onClose} >
                <DialogTitle id="titleDate">
                    <div id="titleDateBox">
                        <div id="title">
                            {this.props.selectedTask.attributes.title}
                        </div>

                        <div id="date">
                            {"Due by: " + new Date(this.props.selectedTask.attributes["due-date"]).toUTCString()}
                        </div>
                    </div>
                </DialogTitle>

                <DialogContent>
                    <Button onClick={() => console.log(this.props.selectedTask)}>
                        test selected task
                    </Button>

                    <DialogContentText id="description">
                        {this.props.selectedTask.attributes.description}
                    </DialogContentText>

                    <div id="comments_tags_participants">
                        <div id="comments">
                            <CommentSection user={this.props.user} users={this.props.users} tags={this.props.tags} task_id={this.props.selectedTask.id}/>
                        </div>

                        <div id="tags_participants">
                            <div id="tags">
                                <TagSelect tags={this.props.tags} tag_id={this.props.selectedTask.attributes["tag-id"]} onChange={this.handleTagChange} />                    
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