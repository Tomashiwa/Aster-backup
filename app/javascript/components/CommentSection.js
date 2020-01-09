import React from "react";
import { List, ListItem, Button, Typography, ListItemText, IconButton, ListItemSecondaryAction, withStyles, TextField } from "@material-ui/core";

import UserInfo from "./UserInfo";

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import "./styles/CommentSection.css"

const styles = {
    editDelete: {
        top: "85%",
        right: 0
    },
    removePadding: {
        paddingLeft: 0,
        paddingRight: 15,
        alignItems: "stretch"
    }
};

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            newComment: "",
            editingCommentID: -1,
            editedComment: "",
        }
    }

    fetchComments = () => {
        fetch("/api/comments").then(async (response) => {
            const { data } = await response.json();
            this.setState({comments: data.filter(comment => {return comment.attributes["task-id"] === parseInt(this.props.task_id);})})
        })
    }

    componentDidMount() {
        this.fetchComments();
    }

    handleAdd = () => {
        const addComment = async() => {
            const csrfToken = document.querySelector("meta[name=csrf-token").content;

            const response = await fetch("/api/comments", {
                method: "POST",
                credential: "include",
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    "X-CSRF-Token": csrfToken
                },
                body: JSON.stringify({data: {
                    type: "comments",
                    attributes: {
                        "user-id": this.props.user.id,
                        "task-id": this.props.task_id,
                        body: this.state.newComment,
                        "updated-at": new Date(Date.now()).toUTCString()
                    }
                }})
            });

            if(response.status === 201) {
                this.setState({newComment: ""});
                this.fetchComments();
            }
        }

        addComment();
    }

    handleEdit = comment => {
        console.log(comment);

        this.setState({editingCommentID: comment.id, editedComment: comment.attributes.body});
    }

    handleSave = () => {
        const saveComment = async() => {
            const csrfToken = document.querySelector("meta[name=csrf-token").content;

            const response = await fetch("/api/comments/" + this.state.editingCommentID, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    "X-CSRF-Token": csrfToken
                },
                body: JSON.stringify({data:{
                    id: this.state.editingCommentID,
                    type: "comments",
                    attributes: {
                        "user-id": this.props.user.id,
                        "task-id": this.props.task_id,
                        body: this.state.editedComment,
                        "updated-at": new Date(Date.now()).toUTCString()
                    }
                }})
            })

            if(response.status === 200) {
                this.setState({editingCommentID: -1, editedComment: ""});
                this.fetchComments();
            }
        }

        saveComment();
    }

    handleCancel =  () => {
        this.setState({editingCommentID: -1, editedComment: ""});
    }

    handleDelete = comment => {
        const deleteComment = async() => {
            const csrfToken = document.querySelector("meta[name=csrf-token").textContent;

            const response = await fetch("/api/comments/" + comment.id, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "X-CSRF-Token": csrfToken
                }
            });

            if(response.status === 204) {
                console.log("Comment has been deleted");
                this.fetchComments();
            }
        }

        deleteComment();
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div>
                <div id="title">
                    <Typography id="titleText">
                        Comments
                    </Typography>
                </div>

                <List>
                    {
                       this.state.comments.map(comment => (
                            <ListItem className="comment" key={comment.id} divider={true} classes={{ root: classes.removePadding }}>
                                <ListItemText
                                    style={{textAlign:"justify"}}
                                    primary={
                                        <div className="userDate">
                                            <UserInfo user={this.props.users[comment.attributes["user-id"] - 1]} textVariant="h6"/>
                                            <Typography> {new Date(comment.attributes["updated-at"]).toUTCString()} </Typography>
                                        </div>
                                    }
                                    secondary={
                                        this.state.editingCommentID !== comment.id ? comment.attributes.body : null
                                } />

                                {
                                    this.state.editingCommentID == comment.id
                                        ? <div>
                                            <TextField className="field_editComment" autoFocus={true} fullWidth={true} value={this.state.editedComment} onChange={event => {this.setState({editedComment: event.target.value})}} multiline={true} size="small" fullWidth={true} variant="outlined" />
                                            <div className="saveCancelButtons">
                                                <Button variant="outlined" onClick={this.handleSave}>
                                                    Save
                                                </Button>
                                                <Button variant="outlined" onClick={this.handleCancel}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                        : null
                                }

                                {
                                    parseInt(this.props.user.id) === comment.attributes["user-id"] && this.state.editingCommentID === -1
                                        ? <ListItemSecondaryAction classes={{ root: classes.editDelete }}>
                                              <IconButton size="small" color="primary" onClick={() => this.handleEdit(comment)}>
                                                  <CreateIcon />
                                              </IconButton>
                                              <IconButton size="small" color="secondary" onClick={() => this.handleDelete(comment)}>
                                                  <DeleteIcon />
                                              </IconButton>
                                          </ListItemSecondaryAction>
                                        : null
                                }
                            </ListItem>
                       ))
                    }
                </List>

                <div id="input">
                    <Typography>
                        Post new comment:
                    </Typography>
                    <TextField id="field_newComment" value={this.state.newComment} onChange={event => {this.setState({newComment: event.target.value})}} multiline={true} size="small" fullWidth={true} variant="outlined" />
                    <div id="submitButton">
                        <Button variant="outlined" onClick={this.handleAdd}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CommentSection);