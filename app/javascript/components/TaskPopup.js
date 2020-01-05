import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from "@material-ui/core";

import TagSelect from "./TagSelect";
import UserList from "./UserList";
import CommentSection from "./CommentSection";

class TaskPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick = () => {
        console.log("TaskPopup's task id");
        console.log(this.props.task_id);
    }

    render() {
        return(
            <Dialog fullWidth={true} maxWidth={"md"} open={this.props.isOpened} onClose={this.props.onClose} >
                <DialogTitle>
                    {this.props.title}
                </DialogTitle>

                <DialogContent>
                    <Button onClick={this.onClick}>
                        Check Task ID
                    </Button>

                    <DialogContentText>
                        {this.props.description}
                    </DialogContentText>

                    <TagSelect tags={this.props.tags} tag_id={this.props.tag_id} onChange={this.props.onTagChange} />
                    
                    <UserList users={this.props.users} />

                    <CommentSection users={this.props.users} tags={this.props.tags} task_id={this.props.task_id}/>
                </DialogContent>
            </Dialog>
        );
    }
}

export default TaskPopup;