import React from "react";
import { List, ListItem, Button, Typography } from "@material-ui/core";

import Comment from "./Comment";
import UserInfo from "./UserInfo";

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Typography>
                    Comments
                </Typography>

                <List>
                    
                </List>
            </div>
        );
    }
}

export default CommentSection;