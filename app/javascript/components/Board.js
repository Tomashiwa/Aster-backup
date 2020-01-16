import React from "react";

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
                                    tasks={this.props.tasks.filter(task => {
                                        const hasPassFilter = this.props.filterTagId > 1
                                            ? parseInt(this.props.filterTagId) === task.tag_id
                                            : true;

                                        const hasPassSearch = this.props.filterSearchTerm !== ""
                                            ? task.title.toLowerCase().includes(this.props.filterSearchTerm.toLowerCase()) 
                                                || task.description.toLowerCase().includes(this.props.filterSearchTerm.toLowerCase())
                                            : true;

                                        return parseInt(list.id) === task.list_id && hasPassFilter && hasPassSearch;
                                    })}
                                    user={this.props.user}
                                    users={this.props.users}
                                    tags={this.props.tags} 
                                    filterTagId={this.props.filterTagId} 
                                    onUpdateTags={this.props.onUpdateTags}
                                    fetchTasks={this.props.fetchTasks} />
                            </article>
                        )
                    }
                    
                </section>
            </div>
        );
    }
}

export default Board;