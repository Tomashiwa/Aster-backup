import React from "react";
import { Button } from "@material-ui/core";

import TaskIndex from "./TaskIndex"

import "./styles/Board.css"

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagFilterId: -1
        };
    }

    render() {
        return (
            <div>
                <section>
                    {
                        this.props.lists.map(list => 
                            <article key={list.id}>
                                <TaskIndex 
                                    board_id={this.props.id} 
                                    list_id={parseInt(list.id)} 
                                    tasks={this.props.tasks.filter(task => {return parseInt(list.id) === task.attributes["list-id"];})} 
                                    tags={this.props.tags} 
                                    filterTagId={this.props.filterTagId} 
                                    onUpdateTags={this.props.onUpdateTags} />
                            </article>
                        )
                    }
                    
                </section>
            </div>
        );
    }
}

export default Board;