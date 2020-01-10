import React from "react";
import { List, ListItem, IconButton, Typography, Select, FormControl, MenuItem, InputLabel, Button } from "@material-ui/core";

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
            participants: [],
            potentialParticipants: [],
            newPartiId: 1
        }
    }

    componentDidMount() {
        this.setState({participants: this.props.task.attributes.participants});
    }

    handleClick = () => {
        const potentialParticipants = this.props.users.filter(user => {return this.state.participants.filter(participant => {return parseInt(user.id) === participant}).length === 0})

        this.setState({
            isAdding: true, 
            potentialParticipants: potentialParticipants,
            newPartiId: potentialParticipants[0].id
        });
    }

    handlePartiChange = (event, index, value) => {
        this.setState({newPartiId: event.target.value});
    }

    refreshParticipants = () => {
        this.setState({participants: this.props.task.attributes.participants}, () => console.log(this.props.task.attributes.participants));
    }
    
    handleAdd = () => {
        this.props.onAdd(this.state.newPartiId, this.refreshParticipants);
        this.handleClose();
    }

    handleClose = () => {
        this.setState({isAdding: false, potentialParticipants: []});
    }

    render() {
        return (
            <div>
                <Typography>
                    Participants
                </Typography>

                <List dense={true} disablePadding={true}>
                  {
                      this.state.participants.map((participant) => (
                          <ListItem key={participant} divider={true} disableGutters={true}>
                              <UserInfo user={this.props.users.filter(user => {return parseInt(user.id) === participant;})[0]} />
                          </ListItem>
                      ))
                  }

                  {
                      this.state.isAdding && this.state.potentialParticipants.length >= 1
                        ? <ListItem id="field_part" key={this.props.users.length + 1} disableGutters={true}>
                            <FormControl style={{display: "flex"}}>
                                <InputLabel shrink id="inputLabel_add_part">New participant</InputLabel>
                                <Select
                                    labelId="select_new_partId"
                                    id="select_new_part"
                                    value={this.state.newPartiId}
                                    onChange={this.handlePartiChange}
                                >
                                    {
                                        this.state.potentialParticipants.map(potentialParticipant =>
                                            <MenuItem key={potentialParticipant.id} value={potentialParticipant.id}>{potentialParticipant.attributes.name}</MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                            <IconButton size="small" onClick={this.handleAdd}>
                                <DoneIcon />
                            </IconButton>
                            <IconButton size="small" onClick={this.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </ListItem> 

                        : this.props.users.length > this.state.participants.length
                            ? <ListItem id="addpart_item" key={this.props.users.length + 1} disableGutters={true}>
                                <IconButton id="addpart_icon" onClick={this.handleClick}>
                                    <AddIcon />
                                </IconButton>
                            </ListItem>
                            : null
                  }
                </List>
            </div>
        );
    }
}

export default ParticipantList;