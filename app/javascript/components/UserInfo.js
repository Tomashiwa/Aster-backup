import React from "react";
import {IconButton, Typography, Button} from "@material-ui/core";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./styles/UserInfo.css"

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let UsernameComponent = this.props.user 
            ? <Typography id="userName" variant="h6" noWrap> {this.props.user.attributes.name} </Typography>
            : null;

        return(
            <div id="userInfo">
                <IconButton onClick={() => {}}>
                    <AccountCircleIcon />
                </IconButton>
                
                {UsernameComponent}
            </div>
        );
    }
}

export default UserInfo;