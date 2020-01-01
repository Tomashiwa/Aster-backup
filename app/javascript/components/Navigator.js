import React from "react";
import { AppBar, Toolbar, Button, Typography, InputBase, IconButton, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "./styles/Navigator.css"

class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "tags": [],
            "tagFilterId": ""
        };
    }

    componentDidMount() {
        fetch("/api/tags").then(async (response) => {
          const { data } = await response.json();
          this.setState({
            "tags": data,
            "tagFilterId": data[0].id
          });
        })
    }

    handleFilterChange = (event, index, value) => {
        this.setState({"tagFilterId": event.target.value});
    }
    
    handleLogOut = () => {
        console.log("tagFilterId:");
        console.log(this.state.tagFilterId);
    }

    render() {
        return(
            <AppBar id="navBar" position="static">
                <Toolbar>
                    <div id="userInfo">
                        <IconButton>
                            <AccountCircleIcon />
                        </IconButton>
                        <Typography id="userName" variant="h6" noWrap>
                            Username
                        </Typography>
                        <Button id="logOut" onClick={this.handleLogOut}>
                            Log out
                        </Button>
                    </div>

                    <div id="searchFilter">
                        <FormControl id="filterForm">
                            <InputLabel shrink id="filterLabel">Filter by:</InputLabel>
                            <Select
                                id="filterSelect"
                                value={this.state.tagFilterId}
                                onChange={this.handleFilterChange}
                            >
                                {
                                this.state.tags.map(tag => 
                                    <MenuItem key={tag.id} value={tag.id}>{tag.attributes.name}</MenuItem>
                                )
                                }
                            </Select>
                        </FormControl>

                        <div id="searchBar">
                            <div>
                                <SearchIcon />
                            </div>
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