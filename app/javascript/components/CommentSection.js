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

    onClick = () => {
        console.log("task id:");
        console.log(this.props.task_id);

        console.log("properties:");
        console.log(this.props);

        console.log("comments:");
        console.log(this.state.comments);
    }

    render() {
        return (
            <div>
                <Typography>
                    Comments
                </Typography>

                <Button onClick={this.onClick}>
                    Test Comments
                </Button>

                <List>
                    {
                       this.state.comments.map(comment => (
                            <ListItem key={comment.id} alignItems="flex-start" divider={true}>
                                <ListItemText
                                    primary={<UserInfo user={this.props.users[comment.attributes["user-id"]]}/>}
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