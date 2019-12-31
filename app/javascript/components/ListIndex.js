import React from "react";
import ReactDOM from 'react-dom';
import TaskIndex from "./TaskIndex"
import "./styles/ListIndex.css"

class ListIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <h1 align="center">Board</h1>
                <section>
                    <article>
                        <TaskIndex board_id={0} list_id={1} />
                    </article>
                    <article>
                        <TaskIndex board_id={0} list_id={2} />
                    </article>
                    <article>
                        <TaskIndex board_id={0} list_id={3} />
                    </article>
                    <article>
                        <TaskIndex board_id={0} list_id={4} />
                    </article>
                </section>
            </div>
        );
    }
}

export default ListIndex;