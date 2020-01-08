import React from "react";
import { List, ListItem, Button, Typography, ListItemText, IconButton, ListItemSecondaryAction, withStyles, TextField } from "@material-ui/core";

import UserInfo from "./UserInfo";

import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import "./styles/CommentSection.css"

const styles = {
    editDelete: {
        top: "90%",
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

                                <ListItemSecondaryAction classes={{ root: classes.editDelete }}>
                                    <IconButton size="small" color="primary">
                                        <CreateIcon />
                                    </IconButton>
                                    <IconButton size="small" color="secondary" onClick={() => this.handleDelete(comment)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>

                            </ListItem>
                       ))
                    }
                </List>

                <div id="input">
                    <Typography>
                        Post new comment:
                    </Typography>
                    <TextField multiline={true} size="small" fullWidth={true} variant="outlined" />
                    <div id="submitButton">
                        <Button variant="outlined">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CommentSection);