import React from "react";
import { IconButton, InputBase } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import "./styles/SearchBar.css"

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="searchBar">
                <IconButton onClick={this.props.onSearch}>
                    <SearchIcon />
                </IconButton>
                <InputBase
                    placeholder="Search..."
                    inputProps={{ "aria-label": "search"}}
                    onChange={this.props.onTermChange}
                />
            </div>
        );
    }
}

export default SearchBar;