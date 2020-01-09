import React from "react";
import { List, ListItem, IconButton, Typography, Select, FormControl, MenuItem, InputLabel } from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import UserInfo from "./UserInfo";

import "./styles/ParticipantList.css"

class ParticipantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdding: false,
            newPartiId: 1
        }
    }

    handleClick = () => {
        this.setState({isAdding: true});
    }

    handleClose = () => {
        this.setState({isAdding: false});
    }

    handleAdd = () => {

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

                  {
                      this.state.isAdding
                        ? <ListItem id="field_part" key={this.props.users.length + 1} disableGutters={true}>
                            <FormControl style={{display: "flex"}}>
                                <InputLabel shrink id="inputLabel_add_part">New participant</InputLabel>
                                <Select
                                    labelId="select_new_partId"
                                    id="select_new_part"
                                    value={this.state.newPartiId}
                                    onChange={this.handleChange}
                                >
                                    {
                                        this.props.users.map(user =>
                                            <MenuItem key={user.id} value={user.id}>{user.attributes.name}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                            <IconButton size="small">
                                <DoneIcon />
                            </IconButton>
                            <IconButton size="small" onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </ListItem> 

                        : <ListItem id="addpart_item" key={this.props.users.length + 1} disableGutters={true}>
                            <IconButton id="addpart_icon" onClick={this.handleClick}>
                                <AddIcon />
                            </IconButton>
                        </ListItem>
                  }

                  
                </List>

            </div>
        );
    }
}

export default ParticipantList;