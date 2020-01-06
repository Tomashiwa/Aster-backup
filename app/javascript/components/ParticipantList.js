import React from "react";
import { List, ListItem, Button, Typography } from "@material-ui/core";

import UserInfo from "./UserInfo";

class ParticipantList extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick = () => {
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
                          <ListItem key={user.id} divider={true} style={{display:'flex', justifyContent:'flex-start'}}>
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

export default ParticipantList;