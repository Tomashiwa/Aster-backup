import React from "react";
import { List, ListItem, Button, Typography, ListItemText, IconButton, ListItemSecondaryAction, withStyles, TextField } from "@material-ui/core";

import UserInfo from "./UserInfo";

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import "./styles/CommentSection.css"
import { isThisSecond } from "date-fns";

const styles = {
    editDelete: {
        top: "85%",
        right: 0
    },
    removePadding: {
        paddingLeft: 0,
        paddingRight: 15
    }
};

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            newComment: "",
            isCommenting: false,
            version: 1
        }
    }

    fetchComments = () => {
        fetch("/api/comments").then(async (response) => {
            const { data } = await response.json();
            this.setState({comments: data.filter(comment => {return comment.attributes["task-id"] === parseInt(this.props.task_id);})})

            console.log(response);
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

    handleEdit = () => {

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
                            <ListItem className="comment" key={comment.id} alignItems="flex-start" divider={true} classes={{ root: classes.removePadding }}>
                                <ListItemText
                                    style={{textAlign:"justify"}}
                                    primary={
                                        <div className="userDate">
                                            <UserInfo user={this.props.users[comment.attributes["user-id"] - 1]} textVariant="h6"/>
                                            <Typography> {new Date(comment.attributes["updated-at"]).toUTCString()} </Typography>
                                        </div>
                                    }
                                    secondary={comment.attributes.body} />

                                {
                                    parseInt(this.props.user.id) === comment.attributes["user-id"]
                                        ? <ListItemSecondaryAction classes={{ root: classes.editDelete }}>
                                              <IconButton size="small" color="primary">
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