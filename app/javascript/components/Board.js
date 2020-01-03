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

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <section>
                    <article>
                        <TaskIndex board_id={this.props.id} list_id={1} filterTagId={this.props.filterTagId}/>
                    </article>
                    <article>
                        <TaskIndex board_id={this.props.id} list_id={2} filterTagId={this.props.filterTagId}/>
                    </article>
                    <article>
                        <TaskIndex board_id={this.props.id} list_id={3} filterTagId={this.props.filterTagId}/>
                    </article>
                    <article>
                        <TaskIndex board_id={this.props.id} list_id={4} filterTagId={this.props.filterTagId}/>
                    </article>
                </section>
            </div>
        );
    }
}

export default Board;