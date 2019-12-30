import React from "react";
import TaskIndex from "./TaskIndex"

class ListIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <h1 align="center">Board</h1>
                <TaskIndex board_id={0} list_id={0} />
                <TaskIndex board_id={0} list_id={1} />
                <TaskIndex board_id={0} list_id={2} />
            </div>
        );
    }
}

export default ListIndex;