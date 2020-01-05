import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from "@material-ui/core";

import TagSelect from "./TagSelect";
import ParticipantList from "./ParticipantList";
import CommentSection from "./CommentSection";

import "./styles/TaskPopup.css"

class TaskPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Dialog id="popup" fullWidth={true} maxWidth={"md"} open={this.props.isOpened} onClose={this.props.onClose} >
                <DialogTitle id="title">
                    {this.props.title}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="description">
                        {this.props.description}
                    </DialogContentText>

                    <div id="comments_tags_participants">
                        <div id="comments">
                            <CommentSection users={this.props.users} tags={this.props.tags} task_id={this.props.task_id}/>
                        </div>

                        <div id="tags_participants">
                            <div id="tags">
                                <TagSelect tags={this.props.tags} tag_id={this.props.tag_id} onChange={this.props.onTagChange} />                    
                            </div>
                            <div id="participants">
                                <ParticipantList users={this.props.users} />
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

export default TaskPopup;