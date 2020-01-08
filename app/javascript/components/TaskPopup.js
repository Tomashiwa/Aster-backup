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

    render() {
        return(
            <Dialog id="popup" fullWidth={true} maxWidth={"md"} open={this.props.isOpened} onClose={this.props.onClose} >
                <DialogTitle id="titleDate">
                    <div id="titleDateBox">
                        <div id="title">
                            {this.props.title}
                        </div>

                        <div id="date">
                            {"Due by: " + new Date(this.props.dueDate).toUTCString()}
                            {/* {this.props.dueDate} */}
                        </div>
                    </div>
                    {/* {this.props.title} */}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="description">
                        {this.props.description}
                    </DialogContentText>

                    {/* <Button onClick={() => console.log(this.props.user_id)}>
                        test
                    </Button> */}

                    <div id="comments_tags_participants">
                        <div id="comments">
                            <CommentSection user={this.props.user} users={this.props.users} tags={this.props.tags} task_id={this.props.task_id}/>
                        </div>

                        <div id="tags_participants">
                            <div id="tags">
                                <TagSelect tags={this.props.tags} tag_id={this.props.tag_id} onChange={this.handleTagChange} />                    
                            </div>
                            <div id="participants">
                                <ParticipantList users={this.props.users} />
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