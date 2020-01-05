import React from "react";
import { List, ListItem, Button, Typography, ListItemText } from "@material-ui/core";

import UserInfo from "./UserInfo";

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        fetch("/api/comments").then(async (response) => {
            const { data } = await response.json();
            this.setState({comments: data.filter(comment => {return comment.attributes["task-id"] === parseInt(this.props.task_id);})})
        })
    }
    
    render() {
        return (
            <div>
                <Typography>
                    Comments
                </Typography>

                <List>
                    {
                       this.state.comments.map(comment => (
                            <ListItem key={comment.id} alignItems="flex-start" divider={true}>
                                <ListItemText
                                    style={{textAlign:"justify"}}
                                    primary={<UserInfo user={this.props.users[comment.attributes["user-id"] - 1]}/>}
                                    secondary={comment.attributes.body} />
                            </ListItem>
                       ))
                    }
                </List>
            </div>
        );
    }
}

export default CommentSection;