import React from "react";
import { List, ListItem, Button, Typography, ListItemText } from "@material-ui/core";

import UserInfo from "./UserInfo";

import "./styles/CommentSection.css"

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

            console.log(response);
        })
    }
    
    render() {
        return (
            <div>
                <Button onClick={() => {console.log(this.state.comments)}}>
                    test
                </Button>

                <Typography>
                    Comments
                </Typography>

                <List style={{maxHeight: "100%", overflow: 'auto'}}>
                    {
                       this.state.comments.map(comment => (
                            <ListItem key={comment.id} alignItems="flex-start" divider={true}>
                                <ListItemText
                                    style={{textAlign:"justify"}}
                                    primary={
                                        <div id="userDate">
                                            <UserInfo user={this.props.users[comment.attributes["user-id"] - 1]} textVariant="h6"/>
                                            <Typography> DATE </Typography>
                                        </div>
                                    }
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