import React from "react";
import { List, ListItem, IconButton, Typography } from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';

import UserInfo from "./UserInfo";

import "./styles/ParticipantList.css"

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

                <List dense={true} disablePadding={true}>
                  {
                      this.props.users.map(user => (
                          <ListItem key={user.id} divider={true} disableGutters={true}>
                              <UserInfo user={user} />
                          </ListItem>
                      ))
                  }
                  <ListItem id="addpart_item" key={this.props.users.length + 1} disableGutters={true}>
                    <IconButton id="addpart_icon" onClick={this.onClick}>
                        <AddIcon />
                    </IconButton>
                  </ListItem>
                </List>

            </div>
        );
    }
}

export default ParticipantList;