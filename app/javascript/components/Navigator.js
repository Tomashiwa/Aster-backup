import React from "react";
import { AppBar, Toolbar, InputBase, IconButton } from "@material-ui/core";

import SearchIcon from '@material-ui/icons/Search';

import UserInfo from "./UserInfo";
import TagSelect from "./TagSelect";
import SearchBar from "./SearchBar";

import "./styles/Navigator.css"

class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
    }

    onTermChange = (event) => {
        this.setState({searchTerm: event.target.value});
    }

    render() {
        return( 
            <AppBar id="navBar" position="static">
                <Toolbar>
                    <UserInfo user={"Username"} onLogout={this.props.onLogout} />

                    <div id="searchFilter">
                        <TagSelect tags={this.props.tags} tag_id={this.props.filterTagId} onChange={this.props.onFilter} />
                        <SearchBar onTermChange={this.onTermChange} onSearch={() => this.props.onSearch(this.state.searchTerm)} />
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navigator;