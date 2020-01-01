import React from "react";
import { AppBar, Toolbar, Button, Typography, InputBase, IconButton, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
            <AppBar position="static">
                <Toolbar>
                    <div>
                        <IconButton>
                            <AccountCircleIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Username
                        </Typography>
                        <Button onClick={this.handleLogOut}>
                            Log out
                        </Button>
                    </div>

                    <FormControl>
                      <InputLabel shrink id="inputLabel_tag_filter">Filter by:</InputLabel>
                      <Select
                        labelId="labelId_tag_filter"
                        id="select_tag_filter"
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

                    <div>
                        <div>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search..."
                            inputProps={{ "aria-label": "search"}}
                        />
                    </div>
                </Toolbar>
            </AppBar>

        );
    }
}

export default Navigator;