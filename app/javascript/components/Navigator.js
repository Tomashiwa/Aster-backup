import React from "react";
import { AppBar, Toolbar, Button, Typography, InputBase, IconButton, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import UserInfo from "./UserInfo";
import TagSelect from "./TagSelect";
import SearchBar from "./SearchBar";

import "./styles/Navigator.css"

class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterTagId: 1
        };
    }

    componentDidMount() {
        // this.setState({filterTagId: this.props.tags[0].id});
    }

    render() {
        return( 
            <AppBar id="navBar" position="static">
                <Toolbar>
                    <UserInfo user={"Sotato"} onLogout={this.props.onLogout} />

                    {/* <div id="userInfo">
                        <IconButton onClick={this.props.onLogout}>
                            <AccountCircleIcon />
                        </IconButton>
                        <Typography id="userName" variant="h6" noWrap>
                            Username
                        </Typography>
                        <Button id="logOut" onClick={this.props.onLogout}>
                            Log out
                        </Button>
                    </div> */}

                    <div id="searchFilter">
                        <TagSelect tags={this.props.tags} tag_id={this.props.filterTagId} onChange={this.props.onFilter} />

                        <div id="searchBar">
                            <IconButton onClick={this.props.onSearch}>
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                placeholder="Search..."
                                inputProps={{ "aria-label": "search"}}
                            />
                        </div>
                    </div>
                </Toolbar>
            </AppBar>

        );
    }
}

export default Navigator;