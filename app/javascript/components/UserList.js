import React from "react";
import { List, ListItem, Button, Typography } from "@material-ui/core";

import UserInfo from "./UserInfo";

class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick = () => {
        console.log("props:");
        console.log(this.props);
        console.log("users:");
        console.log(this.props.users);
    }

    render() {
        return (
            <div>
                <Typography>
                    Participants
                </Typography>

                <List>
                  {
                      this.props.users.map(user => (
                          <ListItem key={user.id} alignItems="flex-start" button={true} divider={true}>
                              <UserInfo user={user} />
                          </ListItem>
                      ))
                  }
                </List>

                <Button variant="outlined" color="primary" onClick={this.onClick}>
                    Add User
                </Button>
            </div>
        );
    }
}

export default UserList;