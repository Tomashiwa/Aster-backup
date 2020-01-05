import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from "@material-ui/core";

import TagSelect from "./TagSelect";
import UserList from "./UserList";
import CommentSection from "./CommentSection";

class TaskPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Dialog fullWidth={true} maxWidth={"md"} open={this.props.isOpened} onClose={this.props.onClose} >
                <DialogTitle>
                    {this.props.title}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {this.props.description}
                    </DialogContentText>

                    <TagSelect tags={this.props.tags} tag_id={this.props.tag_id} onChange={this.props.onTagChange} />
                    
                    <UserList users={this.props.users} />

                    <CommentSection />
                </DialogContent>
            </Dialog>
        );
    }
}

export default TaskPopup;